import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TCGdbMTGSetService } from 'src/tcgdb/modules/tcgdb/mtg/set/tcgdb.mtg.set.service';
import { TCGdbMTGPriceCurrentService } from 'src/tcgdb/modules/tcgdb/mtg/price/current/tcgdb.mtg.price.current.service';
import { TCGdbMTGPriceHistoryService } from 'src/tcgdb/modules/tcgdb/mtg/price/history/tcgdb.mtg.price.history.service';
import { TCGdbMTGPricesChangeMonthlyDTO, TCGdbMTGPriceChangeMonthlyDTO, CreateTCGdbMTGPriceChangeMonthlyDTO } from './dto/tcgdb.mtg.price.change.monthly.dto';
import { TCGdbMTGPriceChangeMonthly } from "src/typeorm/entities/tcgdb/modules/tcgdb/mtg/price/change/monthly/tcgdb.mtg.price.change.monthly.entity";
import { TCGdbMTGPriceHistoryDTO } from 'src/tcgdb/modules/tcgdb/mtg/price/history/dto/tcgdb.mtg.price.history.dto';
import { TCGdbMTGPriceCurrentDTO } from 'src/tcgdb/modules/tcgdb/mtg/price/current/dto/tcgdb.mtg.price.current.dto';

@Injectable()
export class TCGdbMTGPriceChangeMonthlyService {

    constructor(
        @InjectRepository(TCGdbMTGPriceChangeMonthly) private tcgdbMTGPriceChangeMonthlyRepository: Repository<TCGdbMTGPriceChangeMonthly>, 
        private tcgdbMTGSetService: TCGdbMTGSetService,
        private tcgdbMTGPriceHistoryService: TCGdbMTGPriceHistoryService,
        private tcgdbMTGPriceCurrentService: TCGdbMTGPriceCurrentService,
    ) {}

    async getTCGdbMTGPriceChangeMonthlyBySet(setAbbreviation: string) {
        let tcgdbMTGPriceChangeMonthlys = await this.tcgdbMTGPriceChangeMonthlyRepository.find({
            where: {
                tcgdbMTGPriceChangeMonthlySetAbbreviation: setAbbreviation,
            }
        });

        let tcgdbMTGPriceChangeMonthlyDTOs: TCGdbMTGPriceChangeMonthlyDTO[] = [];

        for(let i = 0; i < tcgdbMTGPriceChangeMonthlys.length; i++) {
            let tcgdbMTGPriceChangeMonthly = tcgdbMTGPriceChangeMonthlys[i];

            let tcgdbMTGPriceChangeMonthlyDTO: TCGdbMTGPriceChangeMonthlyDTO = ({ ...tcgdbMTGPriceChangeMonthly });
           
            tcgdbMTGPriceChangeMonthlyDTOs.push(tcgdbMTGPriceChangeMonthlyDTO);
        }

        return tcgdbMTGPriceChangeMonthlyDTOs;

    }

    async createTCGdbMTGPriceChangeMonthlyBySet() {


        //REMOVE ALL TCGDB PRICE CHANGE DAILY RECORDS;
        await this.tcgdbMTGPriceChangeMonthlyRepository.createQueryBuilder()
            .delete()
            .from(TCGdbMTGPriceChangeMonthly)
            .execute();

        let createTCGdbMTGPriceChangeMonthlyRecordCount = 0;

        //GET ALL TCGDB SETS;
        const tcgdbMTGSets = await this.tcgdbMTGSetService.getTCGdbMTGSets();
        
        for(let i=0; i < tcgdbMTGSets.length; i++) {
            const tcgdbMTGSet = tcgdbMTGSets[i];
            
            //GET YESTERDAYS DATE;
            let priceHistoryDate = new Date();
            priceHistoryDate.setDate(priceHistoryDate.getDate() - 30); // 30 days ago

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
                        await this.createTCGdbMTGPriceChangeMonthly(tcgdbMTGPriceCurrent, tcgdbMTGPriceHistory);
                        createTCGdbMTGPriceChangeMonthlyRecordCount++;
                    }
                    catch (error) {
                        console.log("Error creating TCGdbMTGPriceChangeMonthly: " + error);
                        continue;
                    }
                }
            }

        }

        return createTCGdbMTGPriceChangeMonthlyRecordCount;

    }

    async findTCGdbMTGPriceHistory(tcgdbMTGPriceHistorys: TCGdbMTGPriceHistoryDTO[], searchCriteria: Partial<TCGdbMTGPriceHistoryDTO>) {
        return tcgdbMTGPriceHistorys.find(dto =>
            Object.keys(searchCriteria).every(key => dto[key as keyof TCGdbMTGPriceHistoryDTO] === searchCriteria[key as keyof TCGdbMTGPriceHistoryDTO])
          ); 
    }

    async createTCGdbMTGPriceChangeMonthly(tcgdbMTGPriceCurrent: TCGdbMTGPriceCurrentDTO, tcgdbMTGPriceHistory: TCGdbMTGPriceHistoryDTO) {
        
        let tcgdbMTGPriceChangeMonthlyLowPriceDifference = 0;
        let tcgdbMTGPriceChangeMonthlyLowPricePercentage = 0;

        if(tcgdbMTGPriceCurrent.tcgdbMTGPriceCurrentLowPrice != null && tcgdbMTGPriceHistory.tcgdbMTGPriceHistoryLowPrice != null) {
            tcgdbMTGPriceChangeMonthlyLowPriceDifference = tcgdbMTGPriceCurrent.tcgdbMTGPriceCurrentLowPrice - tcgdbMTGPriceHistory.tcgdbMTGPriceHistoryLowPrice;
            tcgdbMTGPriceChangeMonthlyLowPriceDifference = parseFloat(tcgdbMTGPriceChangeMonthlyLowPriceDifference.toFixed(2));
            tcgdbMTGPriceChangeMonthlyLowPricePercentage = (tcgdbMTGPriceChangeMonthlyLowPriceDifference / tcgdbMTGPriceHistory.tcgdbMTGPriceHistoryLowPrice) * 100;
            tcgdbMTGPriceChangeMonthlyLowPricePercentage = parseFloat(tcgdbMTGPriceChangeMonthlyLowPricePercentage.toFixed(2));
            
        }
        
        let tcgdbMTGPriceChangeMonthlyMidPriceDifference = 0;
        let tcgdbMTGPriceChangeMonthlyMidPricePercentage = 0;

        if(tcgdbMTGPriceCurrent.tcgdbMTGPriceCurrentMidPrice != null && tcgdbMTGPriceHistory.tcgdbMTGPriceHistoryMidPrice != null) {
            tcgdbMTGPriceChangeMonthlyMidPriceDifference = tcgdbMTGPriceCurrent.tcgdbMTGPriceCurrentMidPrice - tcgdbMTGPriceHistory.tcgdbMTGPriceHistoryMidPrice;
            tcgdbMTGPriceChangeMonthlyMidPriceDifference = parseFloat(tcgdbMTGPriceChangeMonthlyMidPriceDifference.toFixed(2));
            tcgdbMTGPriceChangeMonthlyMidPricePercentage = (tcgdbMTGPriceChangeMonthlyMidPriceDifference / tcgdbMTGPriceHistory.tcgdbMTGPriceHistoryMidPrice) * 100;
            tcgdbMTGPriceChangeMonthlyMidPricePercentage = parseFloat(tcgdbMTGPriceChangeMonthlyMidPricePercentage.toFixed(2));
        }

        let tcgdbMTGPriceChangeMonthlyHighPriceDifference = 0;
        let tcgdbMTGPriceChangeMonthlyHighPricePercentage = 0;

        if(tcgdbMTGPriceCurrent.tcgdbMTGPriceCurrentHighPrice != null && tcgdbMTGPriceHistory.tcgdbMTGPriceHistoryHighPrice != null) {
            tcgdbMTGPriceChangeMonthlyHighPriceDifference = tcgdbMTGPriceCurrent.tcgdbMTGPriceCurrentHighPrice - tcgdbMTGPriceHistory.tcgdbMTGPriceHistoryHighPrice;
            tcgdbMTGPriceChangeMonthlyHighPriceDifference = parseFloat(tcgdbMTGPriceChangeMonthlyHighPriceDifference.toFixed(2));
            tcgdbMTGPriceChangeMonthlyHighPricePercentage = (tcgdbMTGPriceChangeMonthlyHighPriceDifference / tcgdbMTGPriceHistory.tcgdbMTGPriceHistoryHighPrice) * 100;
            tcgdbMTGPriceChangeMonthlyHighPricePercentage = parseFloat(tcgdbMTGPriceChangeMonthlyHighPricePercentage.toFixed(2));
        }

        let tcgdbMTGPriceChangeMonthlyMarketPriceDifference = 0;
        let tcgdbMTGPriceChangeMonthlyMarketPricePercentage = 0;

        if(tcgdbMTGPriceCurrent.tcgdbMTGPriceCurrentMarketPrice != null && tcgdbMTGPriceHistory.tcgdbMTGPriceHistoryMarketPrice != null) {
            tcgdbMTGPriceChangeMonthlyMarketPriceDifference = tcgdbMTGPriceCurrent.tcgdbMTGPriceCurrentMarketPrice - tcgdbMTGPriceHistory.tcgdbMTGPriceHistoryMarketPrice;
            tcgdbMTGPriceChangeMonthlyMarketPriceDifference = parseFloat(tcgdbMTGPriceChangeMonthlyMarketPriceDifference.toFixed(2));
            tcgdbMTGPriceChangeMonthlyMarketPricePercentage = (tcgdbMTGPriceChangeMonthlyMarketPriceDifference / tcgdbMTGPriceHistory.tcgdbMTGPriceHistoryMarketPrice) * 100;
            tcgdbMTGPriceChangeMonthlyMarketPricePercentage =  parseFloat(tcgdbMTGPriceChangeMonthlyMarketPricePercentage.toFixed(2));
        }
        
        
        let createTCGdbMTGPriceChangeMonthlyDTO: CreateTCGdbMTGPriceChangeMonthlyDTO = {
            tcgdbMTGCardId: tcgdbMTGPriceCurrent.tcgdbMTGCardId,
            tcgdbMTGPriceChangeMonthlyTCGPlayerId: tcgdbMTGPriceCurrent.tcgdbMTGPriceCurrentTCGPlayerId,
            tcgdbMTGPriceChangeMonthlySetAbbreviation: tcgdbMTGPriceCurrent.tcgdbMTGPriceCurrentSetAbbreviation,
            tcgdbMTGPriceChangeMonthlyCurrentLowPrice: tcgdbMTGPriceCurrent.tcgdbMTGPriceCurrentLowPrice,
            tcgdbMTGPriceChangeMonthlyPreviousLowPrice: tcgdbMTGPriceHistory.tcgdbMTGPriceHistoryLowPrice,
            tcgdbMTGPriceChangeMonthlyLowPriceDifference: tcgdbMTGPriceChangeMonthlyLowPriceDifference,
            tcgdbMTGPriceChangeMonthlyLowPricePercentage: tcgdbMTGPriceChangeMonthlyLowPricePercentage,
            tcgdbMTGPriceChangeMonthlyCurrentMidPrice: tcgdbMTGPriceCurrent.tcgdbMTGPriceCurrentMidPrice,
            tcgdbMTGPriceChangeMonthlyPreviousMidPrice: tcgdbMTGPriceHistory.tcgdbMTGPriceHistoryMidPrice,
            tcgdbMTGPriceChangeMonthlyMidPriceDifference: tcgdbMTGPriceChangeMonthlyMidPriceDifference,
            tcgdbMTGPriceChangeMonthlyMidPricePercentage: tcgdbMTGPriceChangeMonthlyMidPricePercentage,
            tcgdbMTGPriceChangeMonthlyCurrentHighPrice: tcgdbMTGPriceCurrent.tcgdbMTGPriceCurrentHighPrice,
            tcgdbMTGPriceChangeMonthlyPreviousHighPrice: tcgdbMTGPriceHistory.tcgdbMTGPriceHistoryHighPrice,
            tcgdbMTGPriceChangeMonthlyHighPriceDifference: tcgdbMTGPriceChangeMonthlyHighPriceDifference,
            tcgdbMTGPriceChangeMonthlyHighPricePercentage: tcgdbMTGPriceChangeMonthlyHighPricePercentage,
            tcgdbMTGPriceChangeMonthlyCurrentMarketPrice: tcgdbMTGPriceCurrent.tcgdbMTGPriceCurrentMarketPrice,
            tcgdbMTGPriceChangeMonthlyPreviousMarketPrice: tcgdbMTGPriceHistory.tcgdbMTGPriceHistoryMarketPrice,
            tcgdbMTGPriceChangeMonthlyMarketPriceDifference: tcgdbMTGPriceChangeMonthlyMarketPriceDifference,
            tcgdbMTGPriceChangeMonthlyMarketPricePercentage: tcgdbMTGPriceChangeMonthlyMarketPricePercentage,
            tcgdbMTGPriceChangeMonthlySubTypeName: tcgdbMTGPriceCurrent.tcgdbMTGPriceCurrentSubTypeName
        }

        const newTCGdbMTGPriceChangeMonthly = this.tcgdbMTGPriceChangeMonthlyRepository.create(createTCGdbMTGPriceChangeMonthlyDTO);
        await this.tcgdbMTGPriceChangeMonthlyRepository.save(newTCGdbMTGPriceChangeMonthly);

        return true;
        
    } 
}


