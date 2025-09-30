import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TCGdbMTGSetService } from 'src/tcgdb/modules/tcgdb/api/mtg/set/tcgdb.mtg.set.service';
import { TCGdbMTGPriceCurrentService } from 'src/tcgdb/modules/tcgdb/api/mtg/price/current/tcgdb.mtg.price.current.service';
import { TCGdbMTGPriceHistoryService } from 'src/tcgdb/modules/tcgdb/api/mtg/price/history/tcgdb.mtg.price.history.service';
import { TCGdbMTGPricesChangeWeeklyDTO, TCGdbMTGPriceChangeWeeklyDTO, CreateTCGdbMTGPriceChangeWeeklyDTO } from './dto/tcgdb.mtg.price.change.weekly.dto';
import { TCGdbMTGPriceChangeWeekly } from "src/typeorm/entities/tcgdb/modules/tcgdb/api/mtg/price/change/weekly/tcgdb.mtg.price.change.weekly.entity";
import { TCGdbMTGPriceHistoryDTO } from 'src/tcgdb/modules/tcgdb/api/mtg/price/history/dto/tcgdb.mtg.price.history.dto';
import { TCGdbMTGPriceCurrentDTO } from 'src/tcgdb/modules/tcgdb/api/mtg/price/current/dto/tcgdb.mtg.price.current.dto';

@Injectable()
export class TCGdbMTGPriceChangeWeeklyService {

    constructor(
        @InjectRepository(TCGdbMTGPriceChangeWeekly) private tcgdbMTGPriceChangeWeeklyRepository: Repository<TCGdbMTGPriceChangeWeekly>, 
        private tcgdbMTGSetService: TCGdbMTGSetService,
        private tcgdbMTGPriceHistoryService: TCGdbMTGPriceHistoryService,
        private tcgdbMTGPriceCurrentService: TCGdbMTGPriceCurrentService,
    ) {}

    async getTCGdbMTGPriceChangeWeeklyBySet(setCode: string) {
        let tcgdbMTGPriceChangeWeeklys = await this.tcgdbMTGPriceChangeWeeklyRepository.find({
            where: {
                tcgdbMTGPriceChangeWeeklySetCode: setCode,
            }
        });

        let tcgdbMTGPriceChangeWeeklyDTOs: TCGdbMTGPriceChangeWeeklyDTO[] = [];

        for(let i = 0; i < tcgdbMTGPriceChangeWeeklys.length; i++) {
            let tcgdbMTGPriceChangeWeekly = tcgdbMTGPriceChangeWeeklys[i];

            let tcgdbMTGPriceChangeWeeklyDTO: TCGdbMTGPriceChangeWeeklyDTO = ({ ...tcgdbMTGPriceChangeWeekly });

            tcgdbMTGPriceChangeWeeklyDTOs.push(tcgdbMTGPriceChangeWeeklyDTO);
        }

        return tcgdbMTGPriceChangeWeeklyDTOs;

    }

    async createTCGdbMTGPriceChangeWeeklyBySet() {


        //REMOVE ALL TCGDB PRICE CHANGE DAILY RECORDS;
        await this.tcgdbMTGPriceChangeWeeklyRepository.createQueryBuilder()
            .delete()
            .from(TCGdbMTGPriceChangeWeekly)
            .execute();

        let createTCGdbMTGPriceChangeWeeklyRecordCount = 0;

        //GET ALL TCGDB SETS;
        const tcgdbMTGSets = await this.tcgdbMTGSetService.getTCGdbMTGSets();
        
        for(let i=0; i < tcgdbMTGSets.length; i++) {
            const tcgdbMTGSet = tcgdbMTGSets[i];
            
            //GET YESTERDAYS DATE;
            let priceHistoryDate = new Date();
            priceHistoryDate.setDate(priceHistoryDate.getDate() - 7); // 7 days ago

            //CURRENT PRICES;
            let tcgdbMTGPriceCurrents = await this.tcgdbMTGPriceCurrentService.getTCGdbMTGPricesCurrentBySetCode(tcgdbMTGSet.tcgdbMTGSetCode);

            if(tcgdbMTGPriceCurrents.length == 0) {
                console.log("No current prices for set: " + tcgdbMTGSet.tcgdbMTGSetCode);
                continue;
            }

            //HISTORY PRICES;
            let tcgdbMTGPriceHistorys = await this.tcgdbMTGPriceHistoryService.getTCGdbMTGPricesHistoryBySetCodeAndDate(tcgdbMTGSet.tcgdbMTGSetCode, priceHistoryDate);

            if(tcgdbMTGPriceHistorys.length == 0) {
                console.log("No history prices for set: " + tcgdbMTGSet.tcgdbMTGSetCode);
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
                        await this.createTCGdbMTGPriceChangeWeekly(tcgdbMTGPriceCurrent, tcgdbMTGPriceHistory);
                        createTCGdbMTGPriceChangeWeeklyRecordCount++;
                    }
                    catch (error) {
                        console.log("Error creating TCGdbMTGPriceChangeWeekly: " + error);
                        continue;
                    }
                }
            }

        }

        return createTCGdbMTGPriceChangeWeeklyRecordCount;

    }

    async findTCGdbMTGPriceHistory(tcgdbMTGPriceHistorys: TCGdbMTGPriceHistoryDTO[], searchCriteria: Partial<TCGdbMTGPriceHistoryDTO>) {
        return tcgdbMTGPriceHistorys.find(dto =>
            Object.keys(searchCriteria).every(key => dto[key as keyof TCGdbMTGPriceHistoryDTO] === searchCriteria[key as keyof TCGdbMTGPriceHistoryDTO])
          ); 
    }

    async createTCGdbMTGPriceChangeWeekly(tcgdbMTGPriceCurrent: TCGdbMTGPriceCurrentDTO, tcgdbMTGPriceHistory: TCGdbMTGPriceHistoryDTO) {
        
        let tcgdbMTGPriceChangeWeeklyLowPriceDifference = 0;
        let tcgdbMTGPriceChangeWeeklyLowPricePercentage = 0;

        if(tcgdbMTGPriceCurrent.tcgdbMTGPriceCurrentLowPrice != null && tcgdbMTGPriceHistory.tcgdbMTGPriceHistoryLowPrice != null) {
            tcgdbMTGPriceChangeWeeklyLowPriceDifference = tcgdbMTGPriceCurrent.tcgdbMTGPriceCurrentLowPrice - tcgdbMTGPriceHistory.tcgdbMTGPriceHistoryLowPrice;
            tcgdbMTGPriceChangeWeeklyLowPriceDifference = parseFloat(tcgdbMTGPriceChangeWeeklyLowPriceDifference.toFixed(2));
            tcgdbMTGPriceChangeWeeklyLowPricePercentage = (tcgdbMTGPriceChangeWeeklyLowPriceDifference / tcgdbMTGPriceHistory.tcgdbMTGPriceHistoryLowPrice) * 100;
            tcgdbMTGPriceChangeWeeklyLowPricePercentage = parseFloat(tcgdbMTGPriceChangeWeeklyLowPricePercentage.toFixed(2));
            
        }
        
        let tcgdbMTGPriceChangeWeeklyMidPriceDifference = 0;
        let tcgdbMTGPriceChangeWeeklyMidPricePercentage = 0;

        if(tcgdbMTGPriceCurrent.tcgdbMTGPriceCurrentMidPrice != null && tcgdbMTGPriceHistory.tcgdbMTGPriceHistoryMidPrice != null) {
            tcgdbMTGPriceChangeWeeklyMidPriceDifference = tcgdbMTGPriceCurrent.tcgdbMTGPriceCurrentMidPrice - tcgdbMTGPriceHistory.tcgdbMTGPriceHistoryMidPrice;
            tcgdbMTGPriceChangeWeeklyMidPriceDifference = parseFloat(tcgdbMTGPriceChangeWeeklyMidPriceDifference.toFixed(2));
            tcgdbMTGPriceChangeWeeklyMidPricePercentage = (tcgdbMTGPriceChangeWeeklyMidPriceDifference / tcgdbMTGPriceHistory.tcgdbMTGPriceHistoryMidPrice) * 100;
            tcgdbMTGPriceChangeWeeklyMidPricePercentage = parseFloat(tcgdbMTGPriceChangeWeeklyMidPricePercentage.toFixed(2));
        }

        let tcgdbMTGPriceChangeWeeklyHighPriceDifference = 0;
        let tcgdbMTGPriceChangeWeeklyHighPricePercentage = 0;

        if(tcgdbMTGPriceCurrent.tcgdbMTGPriceCurrentHighPrice != null && tcgdbMTGPriceHistory.tcgdbMTGPriceHistoryHighPrice != null) {
            tcgdbMTGPriceChangeWeeklyHighPriceDifference = tcgdbMTGPriceCurrent.tcgdbMTGPriceCurrentHighPrice - tcgdbMTGPriceHistory.tcgdbMTGPriceHistoryHighPrice;
            tcgdbMTGPriceChangeWeeklyHighPriceDifference = parseFloat(tcgdbMTGPriceChangeWeeklyHighPriceDifference.toFixed(2));
            tcgdbMTGPriceChangeWeeklyHighPricePercentage = (tcgdbMTGPriceChangeWeeklyHighPriceDifference / tcgdbMTGPriceHistory.tcgdbMTGPriceHistoryHighPrice) * 100;
            tcgdbMTGPriceChangeWeeklyHighPricePercentage = parseFloat(tcgdbMTGPriceChangeWeeklyHighPricePercentage.toFixed(2));
        }

        let tcgdbMTGPriceChangeWeeklyMarketPriceDifference = 0;
        let tcgdbMTGPriceChangeWeeklyMarketPricePercentage = 0;

        if(tcgdbMTGPriceCurrent.tcgdbMTGPriceCurrentMarketPrice != null && tcgdbMTGPriceHistory.tcgdbMTGPriceHistoryMarketPrice != null) {
            tcgdbMTGPriceChangeWeeklyMarketPriceDifference = tcgdbMTGPriceCurrent.tcgdbMTGPriceCurrentMarketPrice - tcgdbMTGPriceHistory.tcgdbMTGPriceHistoryMarketPrice;
            tcgdbMTGPriceChangeWeeklyMarketPriceDifference = parseFloat(tcgdbMTGPriceChangeWeeklyMarketPriceDifference.toFixed(2));
            tcgdbMTGPriceChangeWeeklyMarketPricePercentage = (tcgdbMTGPriceChangeWeeklyMarketPriceDifference / tcgdbMTGPriceHistory.tcgdbMTGPriceHistoryMarketPrice) * 100;
            tcgdbMTGPriceChangeWeeklyMarketPricePercentage =  parseFloat(tcgdbMTGPriceChangeWeeklyMarketPricePercentage.toFixed(2));
        }
        
        
        let createTCGdbMTGPriceChangeWeeklyDTO: CreateTCGdbMTGPriceChangeWeeklyDTO = {
            tcgdbMTGCardId: tcgdbMTGPriceCurrent.tcgdbMTGCardId,
            tcgdbMTGPriceChangeWeeklyTCGPlayerId: tcgdbMTGPriceCurrent.tcgdbMTGPriceCurrentTCGPlayerId,
            tcgdbMTGPriceChangeWeeklySetCode: tcgdbMTGPriceCurrent.tcgdbMTGPriceCurrentSetCode,
            tcgdbMTGPriceChangeWeeklyCurrentLowPrice: tcgdbMTGPriceCurrent.tcgdbMTGPriceCurrentLowPrice,
            tcgdbMTGPriceChangeWeeklyPreviousLowPrice: tcgdbMTGPriceHistory.tcgdbMTGPriceHistoryLowPrice,
            tcgdbMTGPriceChangeWeeklyLowPriceDifference: tcgdbMTGPriceChangeWeeklyLowPriceDifference,
            tcgdbMTGPriceChangeWeeklyLowPricePercentage: tcgdbMTGPriceChangeWeeklyLowPricePercentage,
            tcgdbMTGPriceChangeWeeklyCurrentMidPrice: tcgdbMTGPriceCurrent.tcgdbMTGPriceCurrentMidPrice,
            tcgdbMTGPriceChangeWeeklyPreviousMidPrice: tcgdbMTGPriceHistory.tcgdbMTGPriceHistoryMidPrice,
            tcgdbMTGPriceChangeWeeklyMidPriceDifference: tcgdbMTGPriceChangeWeeklyMidPriceDifference,
            tcgdbMTGPriceChangeWeeklyMidPricePercentage: tcgdbMTGPriceChangeWeeklyMidPricePercentage,
            tcgdbMTGPriceChangeWeeklyCurrentHighPrice: tcgdbMTGPriceCurrent.tcgdbMTGPriceCurrentHighPrice,
            tcgdbMTGPriceChangeWeeklyPreviousHighPrice: tcgdbMTGPriceHistory.tcgdbMTGPriceHistoryHighPrice,
            tcgdbMTGPriceChangeWeeklyHighPriceDifference: tcgdbMTGPriceChangeWeeklyHighPriceDifference,
            tcgdbMTGPriceChangeWeeklyHighPricePercentage: tcgdbMTGPriceChangeWeeklyHighPricePercentage,
            tcgdbMTGPriceChangeWeeklyCurrentMarketPrice: tcgdbMTGPriceCurrent.tcgdbMTGPriceCurrentMarketPrice,
            tcgdbMTGPriceChangeWeeklyPreviousMarketPrice: tcgdbMTGPriceHistory.tcgdbMTGPriceHistoryMarketPrice,
            tcgdbMTGPriceChangeWeeklyMarketPriceDifference: tcgdbMTGPriceChangeWeeklyMarketPriceDifference,
            tcgdbMTGPriceChangeWeeklyMarketPricePercentage: tcgdbMTGPriceChangeWeeklyMarketPricePercentage,
            tcgdbMTGPriceChangeWeeklySubTypeName: tcgdbMTGPriceCurrent.tcgdbMTGPriceCurrentSubTypeName
        }

        const newTCGdbMTGPriceChangeWeekly = this.tcgdbMTGPriceChangeWeeklyRepository.create(createTCGdbMTGPriceChangeWeeklyDTO);
        await this.tcgdbMTGPriceChangeWeeklyRepository.save(newTCGdbMTGPriceChangeWeekly);

        return true;
        
    } 
}


