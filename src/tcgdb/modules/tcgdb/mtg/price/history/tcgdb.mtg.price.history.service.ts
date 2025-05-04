import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TCGPlayerMTGPriceService } from 'src/tcgdb/modules/tcgplayer/mtg/price/tcgplayer.mtg.price.service';
import { TCGdbMTGCardService } from 'src/tcgdb/modules/tcgdb/mtg/card/tcgdb.mtg.card.service';
import { TCGdbMTGPricesHistoryDTO, TCGdbMTGPriceHistoryDTO } from './dto/tcgdb.mtg.price.history.dto';
import { TCGdbMTGPriceHistory } from 'src/typeorm/entities/tcgdb/modules/tcgdb/mtg/price/history/tcgdb.mtg.price.history.entity';
import { TCGdbMTGCardDTO } from 'src/tcgdb/modules/tcgdb/mtg/card/dto/tcgdb.mtg.card.dto';
import { TCGPlayerMTGPrice } from 'src/typeorm/entities/tcgdb/modules/tcgplayer/mtg/price/tcgplayer.mtg.price.entity';

@Injectable()
export class TCGdbMTGPriceHistoryService {

    constructor(
        @InjectRepository(TCGdbMTGPriceHistory) private tcgdbMTGPriceHistoryRepository: Repository<TCGdbMTGPriceHistory>, 
        private tcgPlayerMTGPriceService: TCGPlayerMTGPriceService,
        private tcgdbMTGCardService: TCGdbMTGCardService,
    ) {}

    async getTCGdbMTGPricesHistoryByCardIdAndDate(cardId: string) {
        
        let date = new Date();

        const tcgdbMTGPriceHistorys = await this.tcgdbMTGPriceHistoryRepository.find({
            where: {
                tcgdbMTGCardId: cardId,
                tcgdbMTGPriceHistoryCreateDate: date,
            }
        });

        let tcgdbMTGPriceHistoryDTOs: TCGdbMTGPriceHistoryDTO[] = [];

        for(let i = 0; i < tcgdbMTGPriceHistorys.length; i++) {
            let tcgdbMTGPriceHistory = tcgdbMTGPriceHistorys[i];

            let tcgdbMTGPriceHistoryDTO: TCGdbMTGPriceHistoryDTO = {
                tcgdbMTGPriceHistoryId: tcgdbMTGPriceHistory.tcgdbMTGPriceHistoryId,
                tcgdbMTGCardId: tcgdbMTGPriceHistory.tcgdbMTGCardId,
                tcgdbMTGPriceHistoryTCGPlayerId: tcgdbMTGPriceHistory.tcgdbMTGPriceHistoryTCGPlayerId,
                tcgdbMTGPriceHistorySetAbbreviation: tcgdbMTGPriceHistory.tcgdbMTGPriceHistorySetAbbreviation,
                tcgdbMTGPriceHistoryLowPrice: tcgdbMTGPriceHistory.tcgdbMTGPriceHistoryLowPrice,
                tcgdbMTGPriceHistoryMidPrice: tcgdbMTGPriceHistory.tcgdbMTGPriceHistoryMidPrice,
                tcgdbMTGPriceHistoryHighPrice: tcgdbMTGPriceHistory.tcgdbMTGPriceHistoryHighPrice,
                tcgdbMTGPriceHistoryMarketPrice: tcgdbMTGPriceHistory.tcgdbMTGPriceHistoryMarketPrice,
                tcgdbMTGPriceHistoryDirectLowPrice: tcgdbMTGPriceHistory.tcgdbMTGPriceHistoryDirectLowPrice,
                tcgdbMTGPriceHistorySubTypeName: tcgdbMTGPriceHistory.tcgdbMTGPriceHistorySubTypeName,
                tcgdbMTGPriceHistoryCreateDate: tcgdbMTGPriceHistory.tcgdbMTGPriceHistoryCreateDate,
                tcgdbMTGPriceHistoryUpdateDate: tcgdbMTGPriceHistory.tcgdbMTGPriceHistoryUpdateDate
            }

            tcgdbMTGPriceHistoryDTOs.push(tcgdbMTGPriceHistoryDTO);

        }

        let tcgdbMTGPriceHistorysDTO: TCGdbMTGPricesHistoryDTO = {
            tcgdbMTGPricesHistory: tcgdbMTGPriceHistoryDTOs,
        }

        return tcgdbMTGPriceHistorysDTO;

    }  

    async getTCGdbMTGPricesHistoryByCardId(cardId: string) {
        
        const tcgdbMTGPriceHistorys = await this.tcgdbMTGPriceHistoryRepository.find({
            where: {
                tcgdbMTGCardId: cardId,
            }
        });

        let tcgdbMTGPriceHistoryDTOs: TCGdbMTGPriceHistoryDTO[] = [];

        for(let i = 0; i < tcgdbMTGPriceHistorys.length; i++) {
            let tcgdbMTGPriceHistory = tcgdbMTGPriceHistorys[i];

            let tcgdbMTGPriceHistoryDTO: TCGdbMTGPriceHistoryDTO = {
                tcgdbMTGPriceHistoryId: tcgdbMTGPriceHistory.tcgdbMTGPriceHistoryId,
                tcgdbMTGCardId: tcgdbMTGPriceHistory.tcgdbMTGCardId,
                tcgdbMTGPriceHistoryTCGPlayerId: tcgdbMTGPriceHistory.tcgdbMTGPriceHistoryTCGPlayerId,
                tcgdbMTGPriceHistorySetAbbreviation: tcgdbMTGPriceHistory.tcgdbMTGPriceHistorySetAbbreviation,
                tcgdbMTGPriceHistoryLowPrice: tcgdbMTGPriceHistory.tcgdbMTGPriceHistoryLowPrice,
                tcgdbMTGPriceHistoryMidPrice: tcgdbMTGPriceHistory.tcgdbMTGPriceHistoryMidPrice,
                tcgdbMTGPriceHistoryHighPrice: tcgdbMTGPriceHistory.tcgdbMTGPriceHistoryHighPrice,
                tcgdbMTGPriceHistoryMarketPrice: tcgdbMTGPriceHistory.tcgdbMTGPriceHistoryMarketPrice,
                tcgdbMTGPriceHistoryDirectLowPrice: tcgdbMTGPriceHistory.tcgdbMTGPriceHistoryDirectLowPrice,
                tcgdbMTGPriceHistorySubTypeName: tcgdbMTGPriceHistory.tcgdbMTGPriceHistorySubTypeName,
                tcgdbMTGPriceHistoryCreateDate: tcgdbMTGPriceHistory.tcgdbMTGPriceHistoryCreateDate,
                tcgdbMTGPriceHistoryUpdateDate: tcgdbMTGPriceHistory.tcgdbMTGPriceHistoryUpdateDate
            }

            tcgdbMTGPriceHistoryDTOs.push(tcgdbMTGPriceHistoryDTO);

        }

        let tcgdbMTGPriceHistorysDTO: TCGdbMTGPricesHistoryDTO = {
            tcgdbMTGPricesHistory: tcgdbMTGPriceHistoryDTOs,
        }

        return tcgdbMTGPriceHistorysDTO;

    } 

    async getTCGdbMTGPricesHistoryBySetAbbreviationAndDate(setAbbreviation: string, priceHistoryDate: Date) {
        
        const tcgdbMTGPriceHistorys = await this.tcgdbMTGPriceHistoryRepository.find({
            where: {
                tcgdbMTGPriceHistorySetAbbreviation: setAbbreviation,
                tcgdbMTGPriceHistoryCreateDate: priceHistoryDate,
            }
        });

        let tcgdbMTGPriceHistoryDTOs: TCGdbMTGPriceHistoryDTO[] = [];

        for(let i = 0; i < tcgdbMTGPriceHistorys.length; i++) {
            let tcgdbMTGPriceHistory = tcgdbMTGPriceHistorys[i];

            let tcgdbMTGPriceHistoryDTO: TCGdbMTGPriceHistoryDTO = {
                tcgdbMTGPriceHistoryId: tcgdbMTGPriceHistory.tcgdbMTGPriceHistoryId,
                tcgdbMTGCardId: tcgdbMTGPriceHistory.tcgdbMTGCardId,
                tcgdbMTGPriceHistoryTCGPlayerId: tcgdbMTGPriceHistory.tcgdbMTGPriceHistoryTCGPlayerId,
                tcgdbMTGPriceHistorySetAbbreviation: tcgdbMTGPriceHistory.tcgdbMTGPriceHistorySetAbbreviation,
                tcgdbMTGPriceHistoryLowPrice: tcgdbMTGPriceHistory.tcgdbMTGPriceHistoryLowPrice,
                tcgdbMTGPriceHistoryMidPrice: tcgdbMTGPriceHistory.tcgdbMTGPriceHistoryMidPrice,
                tcgdbMTGPriceHistoryHighPrice: tcgdbMTGPriceHistory.tcgdbMTGPriceHistoryHighPrice,
                tcgdbMTGPriceHistoryMarketPrice: tcgdbMTGPriceHistory.tcgdbMTGPriceHistoryMarketPrice,
                tcgdbMTGPriceHistoryDirectLowPrice: tcgdbMTGPriceHistory.tcgdbMTGPriceHistoryDirectLowPrice,
                tcgdbMTGPriceHistorySubTypeName: tcgdbMTGPriceHistory.tcgdbMTGPriceHistorySubTypeName,
                tcgdbMTGPriceHistoryCreateDate: tcgdbMTGPriceHistory.tcgdbMTGPriceHistoryCreateDate,
                tcgdbMTGPriceHistoryUpdateDate: tcgdbMTGPriceHistory.tcgdbMTGPriceHistoryUpdateDate
            }

            tcgdbMTGPriceHistoryDTOs.push(tcgdbMTGPriceHistoryDTO);

        }

        return tcgdbMTGPriceHistoryDTOs;

    } 
    
    async createTCGdbMTGPricesHistory(tcgdbMTGCard: TCGdbMTGCardDTO, tcgPlayerMTGPrice: TCGPlayerMTGPrice) {

        const newTCGdbMTGPrice = this.tcgdbMTGPriceHistoryRepository.create({
            tcgdbMTGCardId: tcgdbMTGCard.tcgdbMTGCardId,
            tcgdbMTGPriceHistoryTCGPlayerId: tcgPlayerMTGPrice.tcgPlayerMTGPriceProductId,
            tcgdbMTGPriceHistorySetAbbreviation: tcgdbMTGCard.tcgdbMTGCardSetAbbreviation,
            tcgdbMTGPriceHistoryLowPrice: tcgPlayerMTGPrice.tcgPlayerMTGPriceLowPrice,
            tcgdbMTGPriceHistoryMidPrice: tcgPlayerMTGPrice.tcgPlayerMTGPriceMidPrice,
            tcgdbMTGPriceHistoryHighPrice: tcgPlayerMTGPrice.tcgPlayerMTGPriceHighPrice,
            tcgdbMTGPriceHistoryMarketPrice: tcgPlayerMTGPrice.tcgPlayerMTGPriceMarketPrice,
            tcgdbMTGPriceHistoryDirectLowPrice: tcgPlayerMTGPrice.tcgPlayerMTGPriceDirectLowPrice,
            tcgdbMTGPriceHistorySubTypeName: tcgPlayerMTGPrice.tcgPlayerMTGPriceSubTypeName,
        });

        await this.tcgdbMTGPriceHistoryRepository.save(newTCGdbMTGPrice);
        
        return true;

    }    
}


