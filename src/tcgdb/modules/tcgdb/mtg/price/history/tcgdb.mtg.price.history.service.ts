import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
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

            let tcgdbMTGPriceHistoryDTO: TCGdbMTGPriceHistoryDTO = ({ ...tcgdbMTGPriceHistory });

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

            let tcgdbMTGPriceHistoryDTO: TCGdbMTGPriceHistoryDTO = ({ ...tcgdbMTGPriceHistory });

            tcgdbMTGPriceHistoryDTOs.push(tcgdbMTGPriceHistoryDTO);

        }

        let tcgdbMTGPriceHistorysDTO: TCGdbMTGPricesHistoryDTO = {
            tcgdbMTGPricesHistory: tcgdbMTGPriceHistoryDTOs,
        }

        return tcgdbMTGPriceHistorysDTO;

    } 

    async getTCGdbMTGPricesHistoryBySetCodeAndDate(setCode: string, priceHistoryDate: Date) {
        
        let startOfDay = new Date(priceHistoryDate);
        startOfDay.setHours(0, 0, 0, 0); // Set to 12:00:00 am

        const endOfDay = new Date(priceHistoryDate);
        endOfDay.setHours(23, 59, 59, 999); // Set to 11:59:59 pm

        const tcgdbMTGPriceHistorys = await this.tcgdbMTGPriceHistoryRepository.find({
            where: {
                tcgdbMTGPriceHistorySetCode: setCode,
                tcgdbMTGPriceHistoryCreateDate: Between(startOfDay, endOfDay),
            }
        });

        let tcgdbMTGPriceHistoryDTOs: TCGdbMTGPriceHistoryDTO[] = [];

        for(let i = 0; i < tcgdbMTGPriceHistorys.length; i++) {
            let tcgdbMTGPriceHistory = tcgdbMTGPriceHistorys[i];

            let tcgdbMTGPriceHistoryDTO: TCGdbMTGPriceHistoryDTO = ({ ...tcgdbMTGPriceHistory });

            tcgdbMTGPriceHistoryDTOs.push(tcgdbMTGPriceHistoryDTO);

        }

        return tcgdbMTGPriceHistoryDTOs;

    } 
    
    async createTCGdbMTGPricesHistory(tcgdbMTGCard: TCGdbMTGCardDTO, tcgPlayerMTGPrice: TCGPlayerMTGPrice) {

        const newTCGdbMTGPrice = this.tcgdbMTGPriceHistoryRepository.create({
            tcgdbMTGCardId: tcgdbMTGCard.tcgdbMTGCardId,
            tcgdbMTGPriceHistoryTCGPlayerId: tcgPlayerMTGPrice.tcgPlayerMTGPriceProductId,
            tcgdbMTGPriceHistorySetCode: tcgdbMTGCard.tcgdbMTGCardSetCode,
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


