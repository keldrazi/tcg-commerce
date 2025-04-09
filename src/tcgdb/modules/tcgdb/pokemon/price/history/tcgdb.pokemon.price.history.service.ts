import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TCGPlayerPokemonPriceService } from 'src/tcgdb/modules/tcgplayer/pokemon/price/tcgplayer.pokemon.price.service';
import { TCGdbPokemonCardService } from 'src/tcgdb/modules/tcgdb/pokemon/card/tcgdb.pokemon.card.service';
import { TCGdbPokemonPricesHistoryDTO, TCGdbPokemonPriceHistoryDTO } from './dto/tcgdb.pokemon.price.history.dto';
import { TCGdbPokemonPriceHistory } from 'src/typeorm/entities/tcgdb/modules/tcgdb/pokemon/price/history/tcgdb.pokemon.price.history.entity';

@Injectable()
export class TCGdbPokemonPriceHistoryService {

    constructor(
        @InjectRepository(TCGdbPokemonPriceHistory) private tcgdbPokemonPriceHistoryRepository: Repository<TCGdbPokemonPriceHistory>, 
        private tcgPlayerPokemonPriceService: TCGPlayerPokemonPriceService,
        private tcgdbPokemonCardService: TCGdbPokemonCardService,
    ) {}

    async getTCGdbPokemonPricesHistoryByCardIdAndDate(cardId: string) {
            
        let date = new Date();

        const tcgdbPokemonPricesHistory = await this.tcgdbPokemonPriceHistoryRepository.find({
            where: {
                tcgdbPokemonCardId: cardId,
                tcgdbPokemonPriceHistoryCreateDate: date,
            }
        });

        let tcgdbPokemonPriceHistoryDTOs: TCGdbPokemonPriceHistoryDTO[] = [];

        for(let i = 0; i < tcgdbPokemonPricesHistory.length; i++) {
            let tcgdbPokemonPriceHistory = tcgdbPokemonPricesHistory[i];

            let tcgdbPokemonPriceHistoryDTO: TCGdbPokemonPriceHistoryDTO = {
                tcgdbPokemonCardId: tcgdbPokemonPriceHistory.tcgdbPokemonCardId,
                tcgdbPokemonPriceHistoryTCGPlayerId: tcgdbPokemonPriceHistory.tcgdbPokemonPriceHistoryTCGPlayerId,
                tcgdbPokemonPriceHistorySetAbbreviation: tcgdbPokemonPriceHistory.tcgdbPokemonPriceHistorySetAbbreviation,
                tcgdbPokemonPriceHistoryLowPrice: tcgdbPokemonPriceHistory.tcgdbPokemonPriceHistoryLowPrice,
                tcgdbPokemonPriceHistoryMidPrice: tcgdbPokemonPriceHistory.tcgdbPokemonPriceHistoryMidPrice,
                tcgdbPokemonPriceHistoryHighPrice: tcgdbPokemonPriceHistory.tcgdbPokemonPriceHistoryHighPrice,
                tcgdbPokemonPriceHistoryMarketPrice: tcgdbPokemonPriceHistory.tcgdbPokemonPriceHistoryMarketPrice,
                tcgdbPokemonPriceHistoryDirectLowPrice: tcgdbPokemonPriceHistory.tcgdbPokemonPriceHistoryDirectLowPrice,
                tcgdbPokemonPriceHistorySubTypeName: tcgdbPokemonPriceHistory.tcgdbPokemonPriceHistorySubTypeName,
            }

            tcgdbPokemonPriceHistoryDTOs.push(tcgdbPokemonPriceHistoryDTO);

        }

        let tcgdbPokemonPricesHistoryDTO: TCGdbPokemonPricesHistoryDTO = {
            tcgdbPokemonPricesHistory: tcgdbPokemonPriceHistoryDTOs,
        }

        return tcgdbPokemonPricesHistoryDTO;

    }  

    async getTCGdbPokemonPricesHistoryByCardId(cardId: string) {
        
        const tcgdbPokemonPricesHistory = await this.tcgdbPokemonPriceHistoryRepository.find({
            where: {
                tcgdbPokemonCardId: cardId,
            }
        });

        let tcgdbPokemonPriceHistoryDTOs: TCGdbPokemonPriceHistoryDTO[] = [];

        for(let i = 0; i < tcgdbPokemonPricesHistory.length; i++) {
            let tcgdbPokemonPriceHistory = tcgdbPokemonPricesHistory[i];

            let tcgdbPokemonPriceHistoryDTO: TCGdbPokemonPriceHistoryDTO = {
                tcgdbPokemonCardId: tcgdbPokemonPriceHistory.tcgdbPokemonCardId,
                tcgdbPokemonPriceHistoryTCGPlayerId: tcgdbPokemonPriceHistory.tcgdbPokemonPriceHistoryTCGPlayerId,
                tcgdbPokemonPriceHistorySetAbbreviation: tcgdbPokemonPriceHistory.tcgdbPokemonPriceHistorySetAbbreviation,
                tcgdbPokemonPriceHistoryLowPrice: tcgdbPokemonPriceHistory.tcgdbPokemonPriceHistoryLowPrice,
                tcgdbPokemonPriceHistoryMidPrice: tcgdbPokemonPriceHistory.tcgdbPokemonPriceHistoryMidPrice,
                tcgdbPokemonPriceHistoryHighPrice: tcgdbPokemonPriceHistory.tcgdbPokemonPriceHistoryHighPrice,
                tcgdbPokemonPriceHistoryMarketPrice: tcgdbPokemonPriceHistory.tcgdbPokemonPriceHistoryMarketPrice,
                tcgdbPokemonPriceHistoryDirectLowPrice: tcgdbPokemonPriceHistory.tcgdbPokemonPriceHistoryDirectLowPrice,
                tcgdbPokemonPriceHistorySubTypeName: tcgdbPokemonPriceHistory.tcgdbPokemonPriceHistorySubTypeName,
            }

            tcgdbPokemonPriceHistoryDTOs.push(tcgdbPokemonPriceHistoryDTO);

        }

        let tcgdbPokemonPricesHistoryDTO: TCGdbPokemonPricesHistoryDTO = {
            tcgdbPokemonPricesHistory: tcgdbPokemonPriceHistoryDTOs,
        }

        return tcgdbPokemonPricesHistoryDTO;

    }  

    async createTCGdbPokemonPrices() {

        let tcgdbPokemonPriceHistoryRecordCount = 0;
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

            const newTCGdbPokemonPriceHistory = this.tcgdbPokemonPriceHistoryRepository.create({
                tcgdbPokemonCardId: tcgdbPokemonCard.tcgdbPokemonCardId,
                tcgdbPokemonPriceHistoryTCGPlayerId: tcgPlayerPokemonPrice.tcgPlayerPokemonPriceProductId,
                tcgdbPokemonPriceHistorySetAbbreviation: tcgdbPokemonCard.tcgdbPokemonCardSetAbbreviation,
                tcgdbPokemonPriceHistoryLowPrice: tcgPlayerPokemonPrice.tcgPlayerPokemonPriceLowPrice,
                tcgdbPokemonPriceHistoryMidPrice: tcgPlayerPokemonPrice.tcgPlayerPokemonPriceMidPrice,
                tcgdbPokemonPriceHistoryHighPrice: tcgPlayerPokemonPrice.tcgPlayerPokemonPriceHighPrice,
                tcgdbPokemonPriceHistoryMarketPrice: tcgPlayerPokemonPrice.tcgPlayerPokemonPriceMarketPrice,
                tcgdbPokemonPriceHistoryDirectLowPrice: tcgPlayerPokemonPrice.tcgPlayerPokemonPriceDirectLowPrice,
                tcgdbPokemonPriceHistorySubTypeName: tcgPlayerPokemonPrice.tcgPlayerPokemonPriceSubTypeName,
            });

            await this.tcgdbPokemonPriceHistoryRepository.save(newTCGdbPokemonPriceHistory);
            
            tcgdbPokemonPriceHistoryRecordCount++;
        }

        await this.tcgPlayerPokemonPriceService.updateTCGPlayerPokemonPricesIsProcessed();
        
        return tcgdbPokemonPriceHistoryRecordCount;

    }  
    
}


