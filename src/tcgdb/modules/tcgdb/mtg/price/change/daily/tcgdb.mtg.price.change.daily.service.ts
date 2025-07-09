import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TCGdbMTGSetService } from 'src/tcgdb/modules/tcgdb/mtg/set/tcgdb.mtg.set.service';
import { TCGdbMTGPriceCurrentService } from 'src/tcgdb/modules/tcgdb/mtg/price/current/tcgdb.mtg.price.current.service';
import { TCGdbMTGPriceHistoryService } from 'src/tcgdb/modules/tcgdb/mtg/price/history/tcgdb.mtg.price.history.service';
import { TCGdbMTGPricesChangeDailyDTO, TCGdbMTGPriceChangeDailyDTO, CreateTCGdbMTGPriceChangeDailyDTO } from './dto/tcgdb.mtg.price.change.daily.dto';
import { TCGdbMTGPriceChangeDaily } from 'src/typeorm/entities/tcgdb/modules/tcgdb/mtg/price/change/daily/tcgdb.mtg.price.change.daily.entity';
import { TCGdbMTGPriceHistoryDTO } from 'src/tcgdb/modules/tcgdb/mtg/price/history/dto/tcgdb.mtg.price.history.dto';
import { TCGdbMTGPriceCurrentDTO } from 'src/tcgdb/modules/tcgdb/mtg/price/current/dto/tcgdb.mtg.price.current.dto';

@Injectable()
export class TCGdbMTGPriceChangeDailyService {

    constructor(
        @InjectRepository(TCGdbMTGPriceChangeDaily) private tcgdbMTGPriceChangeDailyRepository: Repository<TCGdbMTGPriceChangeDaily>, 
        private tcgdbMTGSetService: TCGdbMTGSetService,
        private tcgdbMTGPriceHistoryService: TCGdbMTGPriceHistoryService,
        private tcgdbMTGPriceCurrentService: TCGdbMTGPriceCurrentService,
    ) {}

    async getTCGdbMTGPriceChangeDailyBySet(setAbbreviation: string) {
        let tcgdbMTGPriceChangeDailys = await this.tcgdbMTGPriceChangeDailyRepository.find({
            where: {
                tcgdbMTGPriceChangeDailySetAbbreviation: setAbbreviation,
            }
        });

        let tcgdbMTGPriceChangeDailyDTOs: TCGdbMTGPriceChangeDailyDTO[] = [];

        for(let i = 0; i < tcgdbMTGPriceChangeDailys.length; i++) {
            let tcgdbMTGPriceChangeDaily = tcgdbMTGPriceChangeDailys[i];

            let tcgdbMTGPriceChangeDailyDTO: TCGdbMTGPriceChangeDailyDTO = ({ ...tcgdbMTGPriceChangeDaily });

            tcgdbMTGPriceChangeDailyDTOs.push(tcgdbMTGPriceChangeDailyDTO);
        }

        return tcgdbMTGPriceChangeDailyDTOs;

    }

    async createTCGdbMTGPriceChangeDailyBySet() {


        //REMOVE ALL TCGDB PRICE CHANGE DAILY RECORDS;
        await this.tcgdbMTGPriceChangeDailyRepository.createQueryBuilder()
            .delete()
            .from(TCGdbMTGPriceChangeDaily)
            .execute();

        let createTCGdbMTGPriceChangeDailyRecordCount = 0;

        //GET ALL TCGDB SETS;
        const tcgdbMTGSets = await this.tcgdbMTGSetService.getTCGdbMTGSets();
        
        for(let i=0; i < tcgdbMTGSets.length; i++) {
            const tcgdbMTGSet = tcgdbMTGSets[i];
            
            //GET YESTERDAYS DATE;
            let priceHistoryDate = new Date();
            priceHistoryDate.setDate(priceHistoryDate.getDate() - 1); // yesterday

            //CURRENT PRICES;
            let tcgdbMTGPriceCurrents = await this.tcgdbMTGPriceCurrentService.getTCGdbMTGPricesCurrentBySetAbbreviation(tcgdbMTGSet.tcgdbMTGSetAbbreviation);

            if(tcgdbMTGPriceCurrents.length == 0) {
                console.log("No current prices for set: " + tcgdbMTGSet.tcgdbMTGSetAbbreviation);
                continue;
            }

            //HISTORY PRICES;
            let tcgdbMTGPriceHistorys = await this.tcgdbMTGPriceHistoryService.getTCGdbMTGPricesHistoryBySetAbbreviationAndDate(tcgdbMTGSet.tcgdbMTGSetAbbreviation, priceHistoryDate);

            if(tcgdbMTGPriceHistorys.length == 0) {
                console.log("No history prices for set: " + tcgdbMTGSet.tcgdbMTGSetAbbreviation);
                continue;
            }

            for(let j=0; j < tcgdbMTGPriceCurrents.length; j++) {
                let tcgdbMTGPriceCurrent = tcgdbMTGPriceCurrents[j];
                let searchCriteria: Partial<TCGdbMTGPriceHistoryDTO> = {
                    tcgdbMTGCardId: tcgdbMTGPriceCurrent.tcgdbMTGCardId,
                    tcgdbMTGPriceHistoryTCGPlayerId: tcgdbMTGPriceCurrent.tcgdbMTGPriceCurrentTCGPlayerId,
                    tcgdbMTGPriceHistorySubTypeName: tcgdbMTGPriceCurrent.tcgdbMTGPriceCurrentSubTypeName
                }

                let tcgdbMTGPriceHistory = await this.findTCGdbMTGPriceHistory(tcgdbMTGPriceHistorys, searchCriteria);
                if(tcgdbMTGPriceHistory) {
                    try {
                        await this.createTCGdbMTGPriceChangeDaily(tcgdbMTGPriceCurrent, tcgdbMTGPriceHistory);
                        createTCGdbMTGPriceChangeDailyRecordCount++;
                    }
                    catch (error) {
                        console.log("Error creating TCGdbMTGPriceChangeDaily: " + error);
                        continue;
                    }
                }
            }

        }

        return createTCGdbMTGPriceChangeDailyRecordCount;

    }

    async findTCGdbMTGPriceHistory(tcgdbMTGPriceHistorys: TCGdbMTGPriceHistoryDTO[], searchCriteria: Partial<TCGdbMTGPriceHistoryDTO>) {
        return tcgdbMTGPriceHistorys.find(dto =>
            Object.keys(searchCriteria).every(key => dto[key as keyof TCGdbMTGPriceHistoryDTO] === searchCriteria[key as keyof TCGdbMTGPriceHistoryDTO])
          ); 
    }

    async createTCGdbMTGPriceChangeDaily(tcgdbMTGPriceCurrent: TCGdbMTGPriceCurrentDTO, tcgdbMTGPriceHistory: TCGdbMTGPriceHistoryDTO) {
        
        let tcgdbMTGPriceChangeDailyLowPriceDifference = 0;
        let tcgdbMTGPriceChangeDailyLowPricePercentage = 0;

        if(tcgdbMTGPriceCurrent.tcgdbMTGPriceCurrentLowPrice != null && tcgdbMTGPriceHistory.tcgdbMTGPriceHistoryLowPrice != null) {
            tcgdbMTGPriceChangeDailyLowPriceDifference = tcgdbMTGPriceCurrent.tcgdbMTGPriceCurrentLowPrice - tcgdbMTGPriceHistory.tcgdbMTGPriceHistoryLowPrice;
            tcgdbMTGPriceChangeDailyLowPriceDifference = parseFloat(tcgdbMTGPriceChangeDailyLowPriceDifference.toFixed(2));
            tcgdbMTGPriceChangeDailyLowPricePercentage = (tcgdbMTGPriceChangeDailyLowPriceDifference / tcgdbMTGPriceHistory.tcgdbMTGPriceHistoryLowPrice) * 100;
            tcgdbMTGPriceChangeDailyLowPricePercentage = parseFloat(tcgdbMTGPriceChangeDailyLowPricePercentage.toFixed(2));
            
        }
        
        let tcgdbMTGPriceChangeDailyMidPriceDifference = 0;
        let tcgdbMTGPriceChangeDailyMidPricePercentage = 0;

        if(tcgdbMTGPriceCurrent.tcgdbMTGPriceCurrentMidPrice != null && tcgdbMTGPriceHistory.tcgdbMTGPriceHistoryMidPrice != null) {
            tcgdbMTGPriceChangeDailyMidPriceDifference = tcgdbMTGPriceCurrent.tcgdbMTGPriceCurrentMidPrice - tcgdbMTGPriceHistory.tcgdbMTGPriceHistoryMidPrice;
            tcgdbMTGPriceChangeDailyMidPriceDifference = parseFloat(tcgdbMTGPriceChangeDailyMidPriceDifference.toFixed(2));
            tcgdbMTGPriceChangeDailyMidPricePercentage = (tcgdbMTGPriceChangeDailyMidPriceDifference / tcgdbMTGPriceHistory.tcgdbMTGPriceHistoryMidPrice) * 100;
            tcgdbMTGPriceChangeDailyMidPricePercentage = parseFloat(tcgdbMTGPriceChangeDailyMidPricePercentage.toFixed(2));
        }

        let tcgdbMTGPriceChangeDailyHighPriceDifference = 0;
        let tcgdbMTGPriceChangeDailyHighPricePercentage = 0;

        if(tcgdbMTGPriceCurrent.tcgdbMTGPriceCurrentHighPrice != null && tcgdbMTGPriceHistory.tcgdbMTGPriceHistoryHighPrice != null) {
            tcgdbMTGPriceChangeDailyHighPriceDifference = tcgdbMTGPriceCurrent.tcgdbMTGPriceCurrentHighPrice - tcgdbMTGPriceHistory.tcgdbMTGPriceHistoryHighPrice;
            tcgdbMTGPriceChangeDailyHighPriceDifference = parseFloat(tcgdbMTGPriceChangeDailyHighPriceDifference.toFixed(2));
            tcgdbMTGPriceChangeDailyHighPricePercentage = (tcgdbMTGPriceChangeDailyHighPriceDifference / tcgdbMTGPriceHistory.tcgdbMTGPriceHistoryHighPrice) * 100;
            tcgdbMTGPriceChangeDailyHighPricePercentage = parseFloat(tcgdbMTGPriceChangeDailyHighPricePercentage.toFixed(2));
        }

        let tcgdbMTGPriceChangeDailyMarketPriceDifference = 0;
        let tcgdbMTGPriceChangeDailyMarketPricePercentage = 0;

        if(tcgdbMTGPriceCurrent.tcgdbMTGPriceCurrentMarketPrice != null && tcgdbMTGPriceHistory.tcgdbMTGPriceHistoryMarketPrice != null) {
            tcgdbMTGPriceChangeDailyMarketPriceDifference = tcgdbMTGPriceCurrent.tcgdbMTGPriceCurrentMarketPrice - tcgdbMTGPriceHistory.tcgdbMTGPriceHistoryMarketPrice;
            tcgdbMTGPriceChangeDailyMarketPriceDifference = parseFloat(tcgdbMTGPriceChangeDailyMarketPriceDifference.toFixed(2));
            tcgdbMTGPriceChangeDailyMarketPricePercentage = (tcgdbMTGPriceChangeDailyMarketPriceDifference / tcgdbMTGPriceHistory.tcgdbMTGPriceHistoryMarketPrice) * 100;
            tcgdbMTGPriceChangeDailyMarketPricePercentage =  parseFloat(tcgdbMTGPriceChangeDailyMarketPricePercentage.toFixed(2));
        }
        
        
        let createTCGdbMTGPriceChangeDailyDTO: CreateTCGdbMTGPriceChangeDailyDTO = {
            tcgdbMTGCardId: tcgdbMTGPriceCurrent.tcgdbMTGCardId,
            tcgdbMTGPriceChangeDailyTCGPlayerId: tcgdbMTGPriceCurrent.tcgdbMTGPriceCurrentTCGPlayerId,
            tcgdbMTGPriceChangeDailySetAbbreviation: tcgdbMTGPriceCurrent.tcgdbMTGPriceCurrentSetAbbreviation,
            tcgdbMTGPriceChangeDailyCurrentLowPrice: tcgdbMTGPriceCurrent.tcgdbMTGPriceCurrentLowPrice,
            tcgdbMTGPriceChangeDailyPreviousLowPrice: tcgdbMTGPriceHistory.tcgdbMTGPriceHistoryLowPrice,
            tcgdbMTGPriceChangeDailyLowPriceDifference: tcgdbMTGPriceChangeDailyLowPriceDifference,
            tcgdbMTGPriceChangeDailyLowPricePercentage: tcgdbMTGPriceChangeDailyLowPricePercentage,
            tcgdbMTGPriceChangeDailyCurrentMidPrice: tcgdbMTGPriceCurrent.tcgdbMTGPriceCurrentMidPrice,
            tcgdbMTGPriceChangeDailyPreviousMidPrice: tcgdbMTGPriceHistory.tcgdbMTGPriceHistoryMidPrice,
            tcgdbMTGPriceChangeDailyMidPriceDifference: tcgdbMTGPriceChangeDailyMidPriceDifference,
            tcgdbMTGPriceChangeDailyMidPricePercentage: tcgdbMTGPriceChangeDailyMidPricePercentage,
            tcgdbMTGPriceChangeDailyCurrentHighPrice: tcgdbMTGPriceCurrent.tcgdbMTGPriceCurrentHighPrice,
            tcgdbMTGPriceChangeDailyPreviousHighPrice: tcgdbMTGPriceHistory.tcgdbMTGPriceHistoryHighPrice,
            tcgdbMTGPriceChangeDailyHighPriceDifference: tcgdbMTGPriceChangeDailyHighPriceDifference,
            tcgdbMTGPriceChangeDailyHighPricePercentage: tcgdbMTGPriceChangeDailyHighPricePercentage,
            tcgdbMTGPriceChangeDailyCurrentMarketPrice: tcgdbMTGPriceCurrent.tcgdbMTGPriceCurrentMarketPrice,
            tcgdbMTGPriceChangeDailyPreviousMarketPrice: tcgdbMTGPriceHistory.tcgdbMTGPriceHistoryMarketPrice,
            tcgdbMTGPriceChangeDailyMarketPriceDifference: tcgdbMTGPriceChangeDailyMarketPriceDifference,
            tcgdbMTGPriceChangeDailyMarketPricePercentage: tcgdbMTGPriceChangeDailyMarketPricePercentage,
            tcgdbMTGPriceChangeDailySubTypeName: tcgdbMTGPriceCurrent.tcgdbMTGPriceCurrentSubTypeName
        }

        const newTCGdbMTGPriceChangeDaily = this.tcgdbMTGPriceChangeDailyRepository.create(createTCGdbMTGPriceChangeDailyDTO);
        
        await this.tcgdbMTGPriceChangeDailyRepository.save(newTCGdbMTGPriceChangeDaily);

        return true;
        
    } 
}


