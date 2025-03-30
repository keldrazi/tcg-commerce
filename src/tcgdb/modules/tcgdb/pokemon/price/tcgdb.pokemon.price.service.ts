import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TCGPlayerPokemonPriceService } from 'src/tcgdb/modules/tcgplayer/pokemon/price/tcgplayer.pokemon.price.service';
import { TCGdbPokemonCardService } from 'src/tcgdb/modules/tcgdb/pokemon/card/tcgdb.pokemon.card.service';
import { TCGdbPokemonPricesDTO, TCGdbPokemonPriceDTO } from './dto/tcgdb.pokemon.price.dto';
import { TCGdbPokemonPrice } from 'src/typeorm/entities/tcgdb/modules/tcgdb/pokemon/price/tcgdb.pokemon.price.entity';

@Injectable()
export class TCGdbPokemonPriceService {

    constructor(
        @InjectRepository(TCGdbPokemonPrice) private tcgdbPokemonPriceRepository: Repository<TCGdbPokemonPrice>, 
        private tcgPlayerPokemonPriceService: TCGPlayerPokemonPriceService,
        private tcgdbPokemonCardService: TCGdbPokemonCardService,
    ) {}

    async getTCGdbPokemonPricesByCardIdAndDate(cardId: string) {
            
        let date = new Date();

        const tcgdbPokemonPrices = await this.tcgdbPokemonPriceRepository.find({
            where: {
                tcgdbPokemonCardId: cardId,
                tcgdbPokemonPriceCreateDate: date,
            }
        });

        let tcgdbPokemonPriceDTOs: TCGdbPokemonPriceDTO[] = [];

        for(let i = 0; i < tcgdbPokemonPrices.length; i++) {
            let tcgdbPokemonPrice = tcgdbPokemonPrices[i];

            let tcgdbPokemonPriceDTO: TCGdbPokemonPriceDTO = {
                tcgdbPokemonPriceLowPrice: tcgdbPokemonPrice.tcgdbPokemonPriceLowPrice,
                tcgdbPokemonPriceMidPrice: tcgdbPokemonPrice.tcgdbPokemonPriceMidPrice,
                tcgdbPokemonPriceHighPrice: tcgdbPokemonPrice.tcgdbPokemonPriceHighPrice,
                tcgdbPokemonPriceMarketPrice: tcgdbPokemonPrice.tcgdbPokemonPriceMarketPrice,
                tcgdbPokemonPriceDirectLowPrice: tcgdbPokemonPrice.tcgdbPokemonPriceDirectLowPrice,
                tcgdbPokemonPriceSubTypeName: tcgdbPokemonPrice.tcgdbPokemonPriceSubTypeName,
            }

            tcgdbPokemonPriceDTOs.push(tcgdbPokemonPriceDTO);

        }

        let tcgdbPokemonPricesDTO: TCGdbPokemonPricesDTO = {
            tcgdbPokemonPrices: tcgdbPokemonPriceDTOs,
        }

        return tcgdbPokemonPricesDTO;

    }  

    async getTCGdbPokemonPricesByCardId(cardId: string) {
        
        const tcgdbPokemonPrices = await this.tcgdbPokemonPriceRepository.find({
            where: {
                tcgdbPokemonCardId: cardId,
            }
        });

        let tcgdbPokemonPriceDTOs: TCGdbPokemonPriceDTO[] = [];

        for(let i = 0; i < tcgdbPokemonPrices.length; i++) {
            let tcgdbPokemonPrice = tcgdbPokemonPrices[i];

            let tcgdbPokemonPriceDTO: TCGdbPokemonPriceDTO = {
                tcgdbPokemonPriceLowPrice: tcgdbPokemonPrice.tcgdbPokemonPriceLowPrice,
                tcgdbPokemonPriceMidPrice: tcgdbPokemonPrice.tcgdbPokemonPriceMidPrice,
                tcgdbPokemonPriceHighPrice: tcgdbPokemonPrice.tcgdbPokemonPriceHighPrice,
                tcgdbPokemonPriceMarketPrice: tcgdbPokemonPrice.tcgdbPokemonPriceMarketPrice,
                tcgdbPokemonPriceDirectLowPrice: tcgdbPokemonPrice.tcgdbPokemonPriceDirectLowPrice,
                tcgdbPokemonPriceSubTypeName: tcgdbPokemonPrice.tcgdbPokemonPriceSubTypeName,
            }

            tcgdbPokemonPriceDTOs.push(tcgdbPokemonPriceDTO);

        }

        let tcgdbPokemonPricesDTO: TCGdbPokemonPricesDTO = {
            tcgdbPokemonPrices: tcgdbPokemonPriceDTOs,
        }

        return tcgdbPokemonPricesDTO;

    }  

    async createTCGdbPokemonPrices() {

        let tcgdbPokemonPriceRecordCount = 0;
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

            const newTCGdbPokemonPrice = this.tcgdbPokemonPriceRepository.create({
                tcgdbPokemonCardId: tcgdbPokemonCard.tcgdbPokemonCardId,
                tcgdbPokemonPriceTCGPlayerId: tcgPlayerPokemonPrice.tcgPlayerPokemonPriceProductId,
                tcgdbPokemonPriceSetAbbreviation: tcgdbPokemonCard.tcgdbPokemonCardSetAbbreviation,
                tcgdbPokemonPriceLowPrice: tcgPlayerPokemonPrice.tcgPlayerPokemonPriceLowPrice,
                tcgdbPokemonPriceMidPrice: tcgPlayerPokemonPrice.tcgPlayerPokemonPriceMidPrice,
                tcgdbPokemonPriceHighPrice: tcgPlayerPokemonPrice.tcgPlayerPokemonPriceHighPrice,
                tcgdbPokemonPriceMarketPrice: tcgPlayerPokemonPrice.tcgPlayerPokemonPriceMarketPrice,
                tcgdbPokemonPriceDirectLowPrice: tcgPlayerPokemonPrice.tcgPlayerPokemonPriceDirectLowPrice,
                tcgdbPokemonPriceSubTypeName: tcgPlayerPokemonPrice.tcgPlayerPokemonPriceSubTypeName,
            });

            await this.tcgdbPokemonPriceRepository.save(newTCGdbPokemonPrice);
            
            tcgdbPokemonPriceRecordCount++;
        }

        await this.tcgPlayerPokemonPriceService.updateTCGPlayerPokemonPricesIsProcessed();
        
        return tcgdbPokemonPriceRecordCount;

    }  
    
}


