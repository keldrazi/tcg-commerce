import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TCGdbMTGSetService } from 'src/tcgdb/modules/tcgdb/mtg/set/tcgdb.mtg.set.service';
import { TCGdbMTGPriceCurrentService } from 'src/tcgdb/modules/tcgdb/mtg/price/current/tcgdb.mtg.price.current.service';
import { TCGdbMTGPriceHistoryService } from 'src/tcgdb/modules/tcgdb/mtg/price/history/tcgdb.mtg.price.history.service';
import { TCGdbMTGPricesChangeYearlyDTO, TCGdbMTGPriceChangeYearlyDTO, CreateTCGdbMTGPriceChangeYearlyDTO } from './dto/tcgdb.mtg.price.change.yearly.dto';
import { TCGdbMTGPriceChangeYearly } from "src/typeorm/entities/tcgdb/modules/tcgdb/mtg/price/change/yearly/tcgdb.mtg.price.change.yearly.entity";
import { TCGdbMTGPriceHistoryDTO } from 'src/tcgdb/modules/tcgdb/mtg/price/history/dto/tcgdb.mtg.price.history.dto';
import { TCGdbMTGPriceCurrentDTO } from 'src/tcgdb/modules/tcgdb/mtg/price/current/dto/tcgdb.mtg.price.current.dto';

@Injectable()
export class TCGdbMTGPriceChangeYearlyService {

    constructor(
        @InjectRepository(TCGdbMTGPriceChangeYearly) private tcgdbMTGPriceChangeYearlyRepository: Repository<TCGdbMTGPriceChangeYearly>, 
        private tcgdbMTGSetService: TCGdbMTGSetService,
        private tcgdbMTGPriceHistoryService: TCGdbMTGPriceHistoryService,
        private tcgdbMTGPriceCurrentService: TCGdbMTGPriceCurrentService,
    ) {}

    async getTCGdbMTGPriceChangeYearlyBySet(setAbbreviation: string) {
        let tcgdbMTGPriceChangeYearlys = await this.tcgdbMTGPriceChangeYearlyRepository.find({
            where: {
                tcgdbMTGPriceChangeYearlySetAbbreviation: setAbbreviation,
            }
        });

        let tcgdbMTGPriceChangeYearlyDTOs: TCGdbMTGPriceChangeYearlyDTO[] = [];

        for(let i = 0; i < tcgdbMTGPriceChangeYearlys.length; i++) {
            let tcgdbMTGPriceChangeYearly = tcgdbMTGPriceChangeYearlys[i];

            let tcgdbMTGPriceChangeYearlyDTO: TCGdbMTGPriceChangeYearlyDTO = ({ ...tcgdbMTGPriceChangeYearly });

            tcgdbMTGPriceChangeYearlyDTOs.push(tcgdbMTGPriceChangeYearlyDTO);
        }

        return tcgdbMTGPriceChangeYearlyDTOs;

    }

    async createTCGdbMTGPriceChangeYearlyBySet() {
        //REMOVE ALL TCGDB PRICE CHANGE DAILY RECORDS;
        await this.tcgdbMTGPriceChangeYearlyRepository.createQueryBuilder()
            .delete()
            .from(TCGdbMTGPriceChangeYearly)
            .execute();

        let createTCGdbMTGPriceChangeYearlyRecordCount = 0;

        //GET ALL TCGDB SETS;
        const tcgdbMTGSets = await this.tcgdbMTGSetService.getTCGdbMTGSets();
        
        for(let i=0; i < tcgdbMTGSets.length; i++) {
            const tcgdbMTGSet = tcgdbMTGSets[i];
            
            //GET YESTERDAYS DATE;
            let priceHistoryDate = new Date();
            priceHistoryDate.setDate(priceHistoryDate.getDate() - 365); // 365 days ago

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
                        await this.createTCGdbMTGPriceChangeYearly(tcgdbMTGPriceCurrent, tcgdbMTGPriceHistory);
                        createTCGdbMTGPriceChangeYearlyRecordCount++;
                    }
                    catch (error) {
                        console.log("Error creating TCGdbMTGPriceChangeYearly: " + error);
                        continue;
                    }
                }
            }

        }

        return createTCGdbMTGPriceChangeYearlyRecordCount;

    }

    async findTCGdbMTGPriceHistory(tcgdbMTGPriceHistorys: TCGdbMTGPriceHistoryDTO[], searchCriteria: Partial<TCGdbMTGPriceHistoryDTO>) {
        return tcgdbMTGPriceHistorys.find(dto =>
            Object.keys(searchCriteria).every(key => dto[key as keyof TCGdbMTGPriceHistoryDTO] === searchCriteria[key as keyof TCGdbMTGPriceHistoryDTO])
          ); 
    }

    async createTCGdbMTGPriceChangeYearly(tcgdbMTGPriceCurrent: TCGdbMTGPriceCurrentDTO, tcgdbMTGPriceHistory: TCGdbMTGPriceHistoryDTO) {
        
        let tcgdbMTGPriceChangeYearlyLowPriceDifference = 0;
        let tcgdbMTGPriceChangeYearlyLowPricePercentage = 0;

        if(tcgdbMTGPriceCurrent.tcgdbMTGPriceCurrentLowPrice != null && tcgdbMTGPriceHistory.tcgdbMTGPriceHistoryLowPrice != null) {
            tcgdbMTGPriceChangeYearlyLowPriceDifference = tcgdbMTGPriceCurrent.tcgdbMTGPriceCurrentLowPrice - tcgdbMTGPriceHistory.tcgdbMTGPriceHistoryLowPrice;
            tcgdbMTGPriceChangeYearlyLowPriceDifference = parseFloat(tcgdbMTGPriceChangeYearlyLowPriceDifference.toFixed(2));
            tcgdbMTGPriceChangeYearlyLowPricePercentage = (tcgdbMTGPriceChangeYearlyLowPriceDifference / tcgdbMTGPriceHistory.tcgdbMTGPriceHistoryLowPrice) * 100;
            tcgdbMTGPriceChangeYearlyLowPricePercentage = parseFloat(tcgdbMTGPriceChangeYearlyLowPricePercentage.toFixed(2));
            
        }
        
        let tcgdbMTGPriceChangeYearlyMidPriceDifference = 0;
        let tcgdbMTGPriceChangeYearlyMidPricePercentage = 0;

        if(tcgdbMTGPriceCurrent.tcgdbMTGPriceCurrentMidPrice != null && tcgdbMTGPriceHistory.tcgdbMTGPriceHistoryMidPrice != null) {
            tcgdbMTGPriceChangeYearlyMidPriceDifference = tcgdbMTGPriceCurrent.tcgdbMTGPriceCurrentMidPrice - tcgdbMTGPriceHistory.tcgdbMTGPriceHistoryMidPrice;
            tcgdbMTGPriceChangeYearlyMidPriceDifference = parseFloat(tcgdbMTGPriceChangeYearlyMidPriceDifference.toFixed(2));
            tcgdbMTGPriceChangeYearlyMidPricePercentage = (tcgdbMTGPriceChangeYearlyMidPriceDifference / tcgdbMTGPriceHistory.tcgdbMTGPriceHistoryMidPrice) * 100;
            tcgdbMTGPriceChangeYearlyMidPricePercentage = parseFloat(tcgdbMTGPriceChangeYearlyMidPricePercentage.toFixed(2));
        }

        let tcgdbMTGPriceChangeYearlyHighPriceDifference = 0;
        let tcgdbMTGPriceChangeYearlyHighPricePercentage = 0;

        if(tcgdbMTGPriceCurrent.tcgdbMTGPriceCurrentHighPrice != null && tcgdbMTGPriceHistory.tcgdbMTGPriceHistoryHighPrice != null) {
            tcgdbMTGPriceChangeYearlyHighPriceDifference = tcgdbMTGPriceCurrent.tcgdbMTGPriceCurrentHighPrice - tcgdbMTGPriceHistory.tcgdbMTGPriceHistoryHighPrice;
            tcgdbMTGPriceChangeYearlyHighPriceDifference = parseFloat(tcgdbMTGPriceChangeYearlyHighPriceDifference.toFixed(2));
            tcgdbMTGPriceChangeYearlyHighPricePercentage = (tcgdbMTGPriceChangeYearlyHighPriceDifference / tcgdbMTGPriceHistory.tcgdbMTGPriceHistoryHighPrice) * 100;
            tcgdbMTGPriceChangeYearlyHighPricePercentage = parseFloat(tcgdbMTGPriceChangeYearlyHighPricePercentage.toFixed(2));
        }

        let tcgdbMTGPriceChangeYearlyMarketPriceDifference = 0;
        let tcgdbMTGPriceChangeYearlyMarketPricePercentage = 0;

        if(tcgdbMTGPriceCurrent.tcgdbMTGPriceCurrentMarketPrice != null && tcgdbMTGPriceHistory.tcgdbMTGPriceHistoryMarketPrice != null) {
            tcgdbMTGPriceChangeYearlyMarketPriceDifference = tcgdbMTGPriceCurrent.tcgdbMTGPriceCurrentMarketPrice - tcgdbMTGPriceHistory.tcgdbMTGPriceHistoryMarketPrice;
            tcgdbMTGPriceChangeYearlyMarketPriceDifference = parseFloat(tcgdbMTGPriceChangeYearlyMarketPriceDifference.toFixed(2));
            tcgdbMTGPriceChangeYearlyMarketPricePercentage = (tcgdbMTGPriceChangeYearlyMarketPriceDifference / tcgdbMTGPriceHistory.tcgdbMTGPriceHistoryMarketPrice) * 100;
            tcgdbMTGPriceChangeYearlyMarketPricePercentage =  parseFloat(tcgdbMTGPriceChangeYearlyMarketPricePercentage.toFixed(2));
        }
        
        
        let createTCGdbMTGPriceChangeYearlyDTO: CreateTCGdbMTGPriceChangeYearlyDTO = {
            tcgdbMTGCardId: tcgdbMTGPriceCurrent.tcgdbMTGCardId,
            tcgdbMTGPriceChangeYearlyTCGPlayerId: tcgdbMTGPriceCurrent.tcgdbMTGPriceCurrentTCGPlayerId,
            tcgdbMTGPriceChangeYearlySetAbbreviation: tcgdbMTGPriceCurrent.tcgdbMTGPriceCurrentSetAbbreviation,
            tcgdbMTGPriceChangeYearlyCurrentLowPrice: tcgdbMTGPriceCurrent.tcgdbMTGPriceCurrentLowPrice,
            tcgdbMTGPriceChangeYearlyPreviousLowPrice: tcgdbMTGPriceHistory.tcgdbMTGPriceHistoryLowPrice,
            tcgdbMTGPriceChangeYearlyLowPriceDifference: tcgdbMTGPriceChangeYearlyLowPriceDifference,
            tcgdbMTGPriceChangeYearlyLowPricePercentage: tcgdbMTGPriceChangeYearlyLowPricePercentage,
            tcgdbMTGPriceChangeYearlyCurrentMidPrice: tcgdbMTGPriceCurrent.tcgdbMTGPriceCurrentMidPrice,
            tcgdbMTGPriceChangeYearlyPreviousMidPrice: tcgdbMTGPriceHistory.tcgdbMTGPriceHistoryMidPrice,
            tcgdbMTGPriceChangeYearlyMidPriceDifference: tcgdbMTGPriceChangeYearlyMidPriceDifference,
            tcgdbMTGPriceChangeYearlyMidPricePercentage: tcgdbMTGPriceChangeYearlyMidPricePercentage,
            tcgdbMTGPriceChangeYearlyCurrentHighPrice: tcgdbMTGPriceCurrent.tcgdbMTGPriceCurrentHighPrice,
            tcgdbMTGPriceChangeYearlyPreviousHighPrice: tcgdbMTGPriceHistory.tcgdbMTGPriceHistoryHighPrice,
            tcgdbMTGPriceChangeYearlyHighPriceDifference: tcgdbMTGPriceChangeYearlyHighPriceDifference,
            tcgdbMTGPriceChangeYearlyHighPricePercentage: tcgdbMTGPriceChangeYearlyHighPricePercentage,
            tcgdbMTGPriceChangeYearlyCurrentMarketPrice: tcgdbMTGPriceCurrent.tcgdbMTGPriceCurrentMarketPrice,
            tcgdbMTGPriceChangeYearlyPreviousMarketPrice: tcgdbMTGPriceHistory.tcgdbMTGPriceHistoryMarketPrice,
            tcgdbMTGPriceChangeYearlyMarketPriceDifference: tcgdbMTGPriceChangeYearlyMarketPriceDifference,
            tcgdbMTGPriceChangeYearlyMarketPricePercentage: tcgdbMTGPriceChangeYearlyMarketPricePercentage,
            tcgdbMTGPriceChangeYearlySubTypeName: tcgdbMTGPriceCurrent.tcgdbMTGPriceCurrentSubTypeName
        }

        const newTCGdbMTGPriceChangeYearly = this.tcgdbMTGPriceChangeYearlyRepository.create(createTCGdbMTGPriceChangeYearlyDTO);
        await this.tcgdbMTGPriceChangeYearlyRepository.save(newTCGdbMTGPriceChangeYearly);

        return true;
        
    } 
}


