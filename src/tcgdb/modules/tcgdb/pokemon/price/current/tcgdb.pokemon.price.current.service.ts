import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TCGPlayerPokemonPriceService } from 'src/tcgdb/modules/tcgplayer/pokemon/price/tcgplayer.pokemon.price.service';
import { TCGdbPokemonCardService } from 'src/tcgdb/modules/tcgdb/pokemon/card/tcgdb.pokemon.card.service';
import { TCGdbPokemonPriceHistoryService } from 'src/tcgdb/modules/tcgdb/pokemon/price/history/tcgdb.pokemon.price.history.service';
import { TCGdbPokemonPricesCurrentDTO, TCGdbPokemonPriceCurrentDTO } from './dto/tcgdb.pokemon.price.current.dto';
import { TCGdbPokemonPriceCurrent } from 'src/typeorm/entities/tcgdb/modules/tcgdb/pokemon/price/current/tcgdb.pokemon.price.current.entity';

@Injectable()
export class TCGdbPokemonPriceCurrentService {

    constructor(
        @InjectRepository(TCGdbPokemonPriceCurrent) private tcgdbPokemonPriceCurrentRepository: Repository<TCGdbPokemonPriceCurrent>, 
        private tcgPlayerPokemonPriceService: TCGPlayerPokemonPriceService,
        private tcgdbPokemonCardService: TCGdbPokemonCardService,
        private tcgdbPokemonPriceHistoryService: TCGdbPokemonPriceHistoryService,
    ) {}

    async getTCGdbPokemonPricesCurrentByCardId(cardId: string) {
        
        const tcgdbPokemonPriceCurrents = await this.tcgdbPokemonPriceCurrentRepository.find({
            where: {
                tcgdbPokemonCardId: cardId,
            }
        });

        let tcgdbPokemonPriceCurrentDTOs: TCGdbPokemonPriceCurrentDTO[] = [];

        for(let i = 0; i < tcgdbPokemonPriceCurrents.length; i++) {
            let tcgdbPokemonPriceCurrent = tcgdbPokemonPriceCurrents[i];

            let tcgdbPokemonPriceCurrentDTO: TCGdbPokemonPriceCurrentDTO = { ...tcgdbPokemonPriceCurrent };
            
            tcgdbPokemonPriceCurrentDTOs.push(tcgdbPokemonPriceCurrentDTO);

        }

        let tcgdbPokemonPriceCurrentsDTO: TCGdbPokemonPricesCurrentDTO = {
            tcgdbPokemonPricesCurrent: tcgdbPokemonPriceCurrentDTOs,
        }

        return tcgdbPokemonPriceCurrentsDTO;

    } 
    async getTCGdbPokemonPricesCurrentByCardIdAndProductCardPrinting(tcgdbPokemonCardId: string, tcgdbPokemonPriceCurrentSubTypeName: string) {
        const tcgdbPokemonPriceCurrent = await this.tcgdbPokemonPriceCurrentRepository.findOne({
            where: {
                tcgdbPokemonCardId: tcgdbPokemonCardId,
                tcgdbPokemonPriceCurrentSubTypeName: tcgdbPokemonPriceCurrentSubTypeName,
            }
        });

        if(tcgdbPokemonPriceCurrent == null) {
            return null;
        }

        let tcgdbPokemonPriceCurrentDTO: TCGdbPokemonPriceCurrentDTO = { ...tcgdbPokemonPriceCurrent };

        return tcgdbPokemonPriceCurrentDTO;

    }

    async getTCGdbPokemonPricesCurrentBySetCode(setCode: string) {
        
        const tcgdbPokemonPriceCurrents = await this.tcgdbPokemonPriceCurrentRepository.find({
            where: {
                tcgdbPokemonPriceCurrentSetCode: setCode,
            }
        });

        let tcgdbPokemonPriceCurrentDTOs: TCGdbPokemonPriceCurrentDTO[] = [];

        for(let i = 0; i < tcgdbPokemonPriceCurrents.length; i++) {
            let tcgdbPokemonPriceCurrent = tcgdbPokemonPriceCurrents[i];

            let tcgdbPokemonPriceCurrentDTO: TCGdbPokemonPriceCurrentDTO = { ...tcgdbPokemonPriceCurrent };

            tcgdbPokemonPriceCurrentDTOs.push(tcgdbPokemonPriceCurrentDTO);

        }

        return tcgdbPokemonPriceCurrentDTOs;

    } 
    
    async createTCGdbPokemonPricesCurrent() {

        //REMOVE ALL CURRENT PRICES;
        await this.tcgdbPokemonPriceCurrentRepository.createQueryBuilder()
            .delete()
            .from(TCGdbPokemonPriceCurrent)
            .execute();


        let tcgdbPokemonPriceCurrentRecordCount = 0;
        let tcgPlayerPokemonPrices = await this.tcgPlayerPokemonPriceService.getTCGPlayerPokemonPricesToProcess();

        //TO DO: CREATE AN ERROR TO RETURN;
        if(tcgPlayerPokemonPrices == null) {
            return null;
        }

        for(let i = 0; i < tcgPlayerPokemonPrices.length; i++) {
            let tcgPlayerPokemonPrice = tcgPlayerPokemonPrices[i];
            let tcgdbPokemonCard = await this.tcgdbPokemonCardService.getTCGdbPokemonCardByTCGPlayerId(tcgPlayerPokemonPrice.tcgPlayerPokemonPriceProductId);

            //TO DO: CREATE AN ERROR TO LOG;
            if(tcgdbPokemonCard == null) {
                continue;
            }

            const newTCGdbPokemonPrice = this.tcgdbPokemonPriceCurrentRepository.create({
                tcgdbPokemonCardId: tcgdbPokemonCard.tcgdbPokemonCardId,
                tcgdbPokemonPriceCurrentTCGPlayerId: tcgPlayerPokemonPrice.tcgPlayerPokemonPriceProductId,
                tcgdbPokemonPriceCurrentSetCode: tcgdbPokemonCard.tcgdbPokemonCardSetCode,
                tcgdbPokemonPriceCurrentLowPrice: tcgPlayerPokemonPrice.tcgPlayerPokemonPriceLowPrice,
                tcgdbPokemonPriceCurrentMidPrice: tcgPlayerPokemonPrice.tcgPlayerPokemonPriceMidPrice,
                tcgdbPokemonPriceCurrentHighPrice: tcgPlayerPokemonPrice.tcgPlayerPokemonPriceHighPrice,
                tcgdbPokemonPriceCurrentMarketPrice: tcgPlayerPokemonPrice.tcgPlayerPokemonPriceMarketPrice,
                tcgdbPokemonPriceCurrentDirectLowPrice: tcgPlayerPokemonPrice.tcgPlayerPokemonPriceDirectLowPrice,
                tcgdbPokemonPriceCurrentSubTypeName: tcgPlayerPokemonPrice.tcgPlayerPokemonPriceSubTypeName,
            });

            await this.tcgdbPokemonPriceCurrentRepository.save(newTCGdbPokemonPrice);
            await this.tcgdbPokemonPriceHistoryService.createTCGdbPokemonPricesHistory(tcgdbPokemonCard, tcgPlayerPokemonPrice);
            
            tcgdbPokemonPriceCurrentRecordCount++;
        }

        await this.tcgPlayerPokemonPriceService.updateTCGPlayerPokemonPricesIsProcessed();
        await this.tcgPlayerPokemonPriceService.deleteTCGPlayerPokemonPricesIsProcessed();
        
        return tcgdbPokemonPriceCurrentRecordCount;

    }    
}


