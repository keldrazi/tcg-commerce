import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TCGPlayerPokemonPriceService } from 'src/tcgdb/modules/tcgplayer/pokemon/price/tcgplayer.pokemon.price.service';
import { TCGdbPokemonCardService } from 'src/tcgdb/modules/tcgdb/pokemon/card/tcgdb.pokemon.card.service';
import { TCGdbPokemonPricesCurrentDTO, TCGdbPokemonPriceCurrentDTO } from './dto/tcgdb.pokemon.price.current.dto';
import { TCGdbPokemonPriceCurrent } from 'src/typeorm/entities/tcgdb/modules/tcgdb/pokemon/price/current/tcgdb.pokemon.price.current.entity';

@Injectable()
export class TCGdbPokemonPriceCurrentService {

    constructor(
        @InjectRepository(TCGdbPokemonPriceCurrent) private tcgdbPokemonPriceCurrentRepository: Repository<TCGdbPokemonPriceCurrent>, 
        private tcgPlayerPokemonPriceService: TCGPlayerPokemonPriceService,
        private tcgdbPokemonCardService: TCGdbPokemonCardService,
    ) {}

    async getTCGdbPokemonPricesCurrentByCardIdAndDate(cardId: string) {
            
        let date = new Date();

        const tcgdbPokemonPricesCurrent = await this.tcgdbPokemonPriceCurrentRepository.find({
            where: {
                tcgdbPokemonCardId: cardId,
                tcgdbPokemonPriceCurrentCreateDate: date,
            }
        });

        let tcgdbPokemonPriceCurrentDTOs: TCGdbPokemonPriceCurrentDTO[] = [];

        for(let i = 0; i < tcgdbPokemonPricesCurrent.length; i++) {
            let tcgdbPokemonPriceCurrent = tcgdbPokemonPricesCurrent[i];

            let tcgdbPokemonPriceCurrentDTO: TCGdbPokemonPriceCurrentDTO = {
                tcgdbPokemonCardId: tcgdbPokemonPriceCurrent.tcgdbPokemonCardId,
                tcgdbPokemonPriceCurrentTCGPlayerId: tcgdbPokemonPriceCurrent.tcgdbPokemonPriceCurrentTCGPlayerId,
                tcgdbPokemonPriceCurrentSetCode: tcgdbPokemonPriceCurrent.tcgdbPokemonPriceCurrentSetCode,
                tcgdbPokemonPriceCurrentLowPrice: tcgdbPokemonPriceCurrent.tcgdbPokemonPriceCurrentLowPrice,
                tcgdbPokemonPriceCurrentMidPrice: tcgdbPokemonPriceCurrent.tcgdbPokemonPriceCurrentMidPrice,
                tcgdbPokemonPriceCurrentHighPrice: tcgdbPokemonPriceCurrent.tcgdbPokemonPriceCurrentHighPrice,
                tcgdbPokemonPriceCurrentMarketPrice: tcgdbPokemonPriceCurrent.tcgdbPokemonPriceCurrentMarketPrice,
                tcgdbPokemonPriceCurrentDirectLowPrice: tcgdbPokemonPriceCurrent.tcgdbPokemonPriceCurrentDirectLowPrice,
                tcgdbPokemonPriceCurrentSubTypeName: tcgdbPokemonPriceCurrent.tcgdbPokemonPriceCurrentSubTypeName,
            }

            tcgdbPokemonPriceCurrentDTOs.push(tcgdbPokemonPriceCurrentDTO);

        }

        let tcgdbPokemonPricesCurrentDTO: TCGdbPokemonPricesCurrentDTO = {
            tcgdbPokemonPricesCurrent: tcgdbPokemonPriceCurrentDTOs,
        }

        return tcgdbPokemonPricesCurrentDTO;

    }  

    async getTCGdbPokemonPricesCurrentByCardId(cardId: string) {
        
        const tcgdbPokemonPricesCurrent = await this.tcgdbPokemonPriceCurrentRepository.find({
            where: {
                tcgdbPokemonCardId: cardId,
            }
        });

        let tcgdbPokemonPriceCurrentDTOs: TCGdbPokemonPriceCurrentDTO[] = [];

        for(let i = 0; i < tcgdbPokemonPricesCurrent.length; i++) {
            let tcgdbPokemonPriceCurrent = tcgdbPokemonPricesCurrent[i];

            let tcgdbPokemonPriceCurrentDTO: TCGdbPokemonPriceCurrentDTO = {
                tcgdbPokemonCardId: tcgdbPokemonPriceCurrent.tcgdbPokemonCardId,
                tcgdbPokemonPriceCurrentTCGPlayerId: tcgdbPokemonPriceCurrent.tcgdbPokemonPriceCurrentTCGPlayerId,
                tcgdbPokemonPriceCurrentSetCode: tcgdbPokemonPriceCurrent.tcgdbPokemonPriceCurrentSetCode,
                tcgdbPokemonPriceCurrentLowPrice: tcgdbPokemonPriceCurrent.tcgdbPokemonPriceCurrentLowPrice,
                tcgdbPokemonPriceCurrentMidPrice: tcgdbPokemonPriceCurrent.tcgdbPokemonPriceCurrentMidPrice,
                tcgdbPokemonPriceCurrentHighPrice: tcgdbPokemonPriceCurrent.tcgdbPokemonPriceCurrentHighPrice,
                tcgdbPokemonPriceCurrentMarketPrice: tcgdbPokemonPriceCurrent.tcgdbPokemonPriceCurrentMarketPrice,
                tcgdbPokemonPriceCurrentDirectLowPrice: tcgdbPokemonPriceCurrent.tcgdbPokemonPriceCurrentDirectLowPrice,
                tcgdbPokemonPriceCurrentSubTypeName: tcgdbPokemonPriceCurrent.tcgdbPokemonPriceCurrentSubTypeName,
            }

            tcgdbPokemonPriceCurrentDTOs.push(tcgdbPokemonPriceCurrentDTO);

        }

        let tcgdbPokemonPricesCurrentDTO: TCGdbPokemonPricesCurrentDTO = {
            tcgdbPokemonPricesCurrent: tcgdbPokemonPriceCurrentDTOs,
        }

        return tcgdbPokemonPricesCurrentDTO;

    }  

    async createTCGdbPokemonPrices() {

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

            const newTCGdbPokemonPriceCurrent = this.tcgdbPokemonPriceCurrentRepository.create({
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

            await this.tcgdbPokemonPriceCurrentRepository.save(newTCGdbPokemonPriceCurrent);
            
            tcgdbPokemonPriceCurrentRecordCount++;
        }

        await this.tcgPlayerPokemonPriceService.updateTCGPlayerPokemonPricesIsProcessed();
        
        return tcgdbPokemonPriceCurrentRecordCount;

    }  
    
}


