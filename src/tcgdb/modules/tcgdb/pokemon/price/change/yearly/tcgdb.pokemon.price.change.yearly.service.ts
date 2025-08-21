import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TCGdbPokemonSetService } from 'src/tcgdb/modules/tcgdb/pokemon/set/tcgdb.pokemon.set.service';
import { TCGdbPokemonPriceCurrentService } from 'src/tcgdb/modules/tcgdb/pokemon/price/current/tcgdb.pokemon.price.current.service';
import { TCGdbPokemonPriceHistoryService } from 'src/tcgdb/modules/tcgdb/pokemon/price/history/tcgdb.pokemon.price.history.service';
import { TCGdbPokemonPricesChangeYearlyDTO, TCGdbPokemonPriceChangeYearlyDTO, CreateTCGdbPokemonPriceChangeYearlyDTO } from './dto/tcgdb.pokemon.price.change.yearly.dto';
import { TCGdbPokemonPriceChangeYearly } from "src/typeorm/entities/tcgdb/modules/tcgdb/pokemon/price/change/yearly/tcgdb.pokemon.price.change.yearly.entity";
import { TCGdbPokemonPriceHistoryDTO } from 'src/tcgdb/modules/tcgdb/pokemon/price/history/dto/tcgdb.pokemon.price.history.dto';
import { TCGdbPokemonPriceCurrentDTO } from 'src/tcgdb/modules/tcgdb/pokemon/price/current/dto/tcgdb.pokemon.price.current.dto';

@Injectable()
export class TCGdbPokemonPriceChangeYearlyService {

    constructor(
        @InjectRepository(TCGdbPokemonPriceChangeYearly) private tcgdbPokemonPriceChangeYearlyRepository: Repository<TCGdbPokemonPriceChangeYearly>, 
        private tcgdbPokemonSetService: TCGdbPokemonSetService,
        private tcgdbPokemonPriceHistoryService: TCGdbPokemonPriceHistoryService,
        private tcgdbPokemonPriceCurrentService: TCGdbPokemonPriceCurrentService,
    ) {}

    async getTCGdbPokemonPriceChangeYearlyBySet(setCode: string) {
        let tcgdbPokemonPriceChangeYearlys = await this.tcgdbPokemonPriceChangeYearlyRepository.find({
            where: {
                tcgdbPokemonPriceChangeYearlySetCode: setCode,
            }
        });

        let tcgdbPokemonPriceChangeYearlyDTOs: TCGdbPokemonPriceChangeYearlyDTO[] = [];

        for(let i = 0; i < tcgdbPokemonPriceChangeYearlys.length; i++) {
            let tcgdbPokemonPriceChangeYearly = tcgdbPokemonPriceChangeYearlys[i];

            let tcgdbPokemonPriceChangeYearlyDTO: TCGdbPokemonPriceChangeYearlyDTO = ({ ...tcgdbPokemonPriceChangeYearly });

            tcgdbPokemonPriceChangeYearlyDTOs.push(tcgdbPokemonPriceChangeYearlyDTO);
        }

        return tcgdbPokemonPriceChangeYearlyDTOs;

    }

    async createTCGdbPokemonPriceChangeYearlyBySet() {
        //REMOVE ALL TCGDB PRICE CHANGE DAILY RECORDS;
        await this.tcgdbPokemonPriceChangeYearlyRepository.createQueryBuilder()
            .delete()
            .from(TCGdbPokemonPriceChangeYearly)
            .execute();

        let createTCGdbPokemonPriceChangeYearlyRecordCount = 0;

        //GET ALL TCGDB SETS;
        const tcgdbPokemonSets = await this.tcgdbPokemonSetService.getTCGdbPokemonSets();
        
        for(let i=0; i < tcgdbPokemonSets.length; i++) {
            const tcgdbPokemonSet = tcgdbPokemonSets[i];
            
            //GET YESTERDAYS DATE;
            let priceHistoryDate = new Date();
            priceHistoryDate.setDate(priceHistoryDate.getDate() - 365); // 365 days ago

            //CURRENT PRICES;
            let tcgdbPokemonPriceCurrents = await this.tcgdbPokemonPriceCurrentService.getTCGdbPokemonPricesCurrentBySetCode(tcgdbPokemonSet.tcgdbPokemonSetCode);

            if(tcgdbPokemonPriceCurrents.length == 0) {
                console.log("No current prices for set: " + tcgdbPokemonSet.tcgdbPokemonSetCode);
                continue;
            }

            //HISTORY PRICES;
            let tcgdbPokemonPriceHistorys = await this.tcgdbPokemonPriceHistoryService.getTCGdbPokemonPricesHistoryBySetCodeAndDate(tcgdbPokemonSet.tcgdbPokemonSetCode, priceHistoryDate);

            if(tcgdbPokemonPriceHistorys.length == 0) {
                console.log("No history prices for set: " + tcgdbPokemonSet.tcgdbPokemonSetCode);
                continue;
            }

            for(let j=0; j < tcgdbPokemonPriceCurrents.length; j++) {
                let tcgdbPokemonPriceCurrent = tcgdbPokemonPriceCurrents[j];
                let searchCriteria: Partial<TCGdbPokemonPriceHistoryDTO> = {
                    tcgdbPokemonCardId: tcgdbPokemonPriceCurrent.tcgdbPokemonCardId,
                    tcgdbPokemonPriceHistoryTCGPlayerId: tcgdbPokemonPriceCurrent.tcgdbPokemonPriceCurrentTCGPlayerId,
                    tcgdbPokemonPriceHistorySubTypeName: tcgdbPokemonPriceCurrent.tcgdbPokemonPriceCurrentSubTypeName
                }

                let tcgdbPokemonPriceHistory = await this.findTCGdbPokemonPriceHistory(tcgdbPokemonPriceHistorys, searchCriteria);
                if(tcgdbPokemonPriceHistory) {
                    try {
                        await this.createTCGdbPokemonPriceChangeYearly(tcgdbPokemonPriceCurrent, tcgdbPokemonPriceHistory);
                        createTCGdbPokemonPriceChangeYearlyRecordCount++;
                    }
                    catch (error) {
                        console.log("Error creating TCGdbPokemonPriceChangeYearly: " + error);
                        continue;
                    }
                }
            }

        }

        return createTCGdbPokemonPriceChangeYearlyRecordCount;

    }

    async findTCGdbPokemonPriceHistory(tcgdbPokemonPriceHistorys: TCGdbPokemonPriceHistoryDTO[], searchCriteria: Partial<TCGdbPokemonPriceHistoryDTO>) {
        return tcgdbPokemonPriceHistorys.find(dto =>
            Object.keys(searchCriteria).every(key => dto[key as keyof TCGdbPokemonPriceHistoryDTO] === searchCriteria[key as keyof TCGdbPokemonPriceHistoryDTO])
          ); 
    }

    async createTCGdbPokemonPriceChangeYearly(tcgdbPokemonPriceCurrent: TCGdbPokemonPriceCurrentDTO, tcgdbPokemonPriceHistory: TCGdbPokemonPriceHistoryDTO) {
        
        let tcgdbPokemonPriceChangeYearlyLowPriceDifference = 0;
        let tcgdbPokemonPriceChangeYearlyLowPricePercentage = 0;

        if(tcgdbPokemonPriceCurrent.tcgdbPokemonPriceCurrentLowPrice != null && tcgdbPokemonPriceHistory.tcgdbPokemonPriceHistoryLowPrice != null) {
            tcgdbPokemonPriceChangeYearlyLowPriceDifference = tcgdbPokemonPriceCurrent.tcgdbPokemonPriceCurrentLowPrice - tcgdbPokemonPriceHistory.tcgdbPokemonPriceHistoryLowPrice;
            tcgdbPokemonPriceChangeYearlyLowPriceDifference = parseFloat(tcgdbPokemonPriceChangeYearlyLowPriceDifference.toFixed(2));
            tcgdbPokemonPriceChangeYearlyLowPricePercentage = (tcgdbPokemonPriceChangeYearlyLowPriceDifference / tcgdbPokemonPriceHistory.tcgdbPokemonPriceHistoryLowPrice) * 100;
            tcgdbPokemonPriceChangeYearlyLowPricePercentage = parseFloat(tcgdbPokemonPriceChangeYearlyLowPricePercentage.toFixed(2));
            
        }
        
        let tcgdbPokemonPriceChangeYearlyMidPriceDifference = 0;
        let tcgdbPokemonPriceChangeYearlyMidPricePercentage = 0;

        if(tcgdbPokemonPriceCurrent.tcgdbPokemonPriceCurrentMidPrice != null && tcgdbPokemonPriceHistory.tcgdbPokemonPriceHistoryMidPrice != null) {
            tcgdbPokemonPriceChangeYearlyMidPriceDifference = tcgdbPokemonPriceCurrent.tcgdbPokemonPriceCurrentMidPrice - tcgdbPokemonPriceHistory.tcgdbPokemonPriceHistoryMidPrice;
            tcgdbPokemonPriceChangeYearlyMidPriceDifference = parseFloat(tcgdbPokemonPriceChangeYearlyMidPriceDifference.toFixed(2));
            tcgdbPokemonPriceChangeYearlyMidPricePercentage = (tcgdbPokemonPriceChangeYearlyMidPriceDifference / tcgdbPokemonPriceHistory.tcgdbPokemonPriceHistoryMidPrice) * 100;
            tcgdbPokemonPriceChangeYearlyMidPricePercentage = parseFloat(tcgdbPokemonPriceChangeYearlyMidPricePercentage.toFixed(2));
        }

        let tcgdbPokemonPriceChangeYearlyHighPriceDifference = 0;
        let tcgdbPokemonPriceChangeYearlyHighPricePercentage = 0;

        if(tcgdbPokemonPriceCurrent.tcgdbPokemonPriceCurrentHighPrice != null && tcgdbPokemonPriceHistory.tcgdbPokemonPriceHistoryHighPrice != null) {
            tcgdbPokemonPriceChangeYearlyHighPriceDifference = tcgdbPokemonPriceCurrent.tcgdbPokemonPriceCurrentHighPrice - tcgdbPokemonPriceHistory.tcgdbPokemonPriceHistoryHighPrice;
            tcgdbPokemonPriceChangeYearlyHighPriceDifference = parseFloat(tcgdbPokemonPriceChangeYearlyHighPriceDifference.toFixed(2));
            tcgdbPokemonPriceChangeYearlyHighPricePercentage = (tcgdbPokemonPriceChangeYearlyHighPriceDifference / tcgdbPokemonPriceHistory.tcgdbPokemonPriceHistoryHighPrice) * 100;
            tcgdbPokemonPriceChangeYearlyHighPricePercentage = parseFloat(tcgdbPokemonPriceChangeYearlyHighPricePercentage.toFixed(2));
        }

        let tcgdbPokemonPriceChangeYearlyMarketPriceDifference = 0;
        let tcgdbPokemonPriceChangeYearlyMarketPricePercentage = 0;

        if(tcgdbPokemonPriceCurrent.tcgdbPokemonPriceCurrentMarketPrice != null && tcgdbPokemonPriceHistory.tcgdbPokemonPriceHistoryMarketPrice != null) {
            tcgdbPokemonPriceChangeYearlyMarketPriceDifference = tcgdbPokemonPriceCurrent.tcgdbPokemonPriceCurrentMarketPrice - tcgdbPokemonPriceHistory.tcgdbPokemonPriceHistoryMarketPrice;
            tcgdbPokemonPriceChangeYearlyMarketPriceDifference = parseFloat(tcgdbPokemonPriceChangeYearlyMarketPriceDifference.toFixed(2));
            tcgdbPokemonPriceChangeYearlyMarketPricePercentage = (tcgdbPokemonPriceChangeYearlyMarketPriceDifference / tcgdbPokemonPriceHistory.tcgdbPokemonPriceHistoryMarketPrice) * 100;
            tcgdbPokemonPriceChangeYearlyMarketPricePercentage =  parseFloat(tcgdbPokemonPriceChangeYearlyMarketPricePercentage.toFixed(2));
        }
        
        
        let createTCGdbPokemonPriceChangeYearlyDTO: CreateTCGdbPokemonPriceChangeYearlyDTO = {
            tcgdbPokemonCardId: tcgdbPokemonPriceCurrent.tcgdbPokemonCardId,
            tcgdbPokemonPriceChangeYearlyTCGPlayerId: tcgdbPokemonPriceCurrent.tcgdbPokemonPriceCurrentTCGPlayerId,
            tcgdbPokemonPriceChangeYearlySetCode: tcgdbPokemonPriceCurrent.tcgdbPokemonPriceCurrentSetCode,
            tcgdbPokemonPriceChangeYearlyCurrentLowPrice: tcgdbPokemonPriceCurrent.tcgdbPokemonPriceCurrentLowPrice,
            tcgdbPokemonPriceChangeYearlyPreviousLowPrice: tcgdbPokemonPriceHistory.tcgdbPokemonPriceHistoryLowPrice,
            tcgdbPokemonPriceChangeYearlyLowPriceDifference: tcgdbPokemonPriceChangeYearlyLowPriceDifference,
            tcgdbPokemonPriceChangeYearlyLowPricePercentage: tcgdbPokemonPriceChangeYearlyLowPricePercentage,
            tcgdbPokemonPriceChangeYearlyCurrentMidPrice: tcgdbPokemonPriceCurrent.tcgdbPokemonPriceCurrentMidPrice,
            tcgdbPokemonPriceChangeYearlyPreviousMidPrice: tcgdbPokemonPriceHistory.tcgdbPokemonPriceHistoryMidPrice,
            tcgdbPokemonPriceChangeYearlyMidPriceDifference: tcgdbPokemonPriceChangeYearlyMidPriceDifference,
            tcgdbPokemonPriceChangeYearlyMidPricePercentage: tcgdbPokemonPriceChangeYearlyMidPricePercentage,
            tcgdbPokemonPriceChangeYearlyCurrentHighPrice: tcgdbPokemonPriceCurrent.tcgdbPokemonPriceCurrentHighPrice,
            tcgdbPokemonPriceChangeYearlyPreviousHighPrice: tcgdbPokemonPriceHistory.tcgdbPokemonPriceHistoryHighPrice,
            tcgdbPokemonPriceChangeYearlyHighPriceDifference: tcgdbPokemonPriceChangeYearlyHighPriceDifference,
            tcgdbPokemonPriceChangeYearlyHighPricePercentage: tcgdbPokemonPriceChangeYearlyHighPricePercentage,
            tcgdbPokemonPriceChangeYearlyCurrentMarketPrice: tcgdbPokemonPriceCurrent.tcgdbPokemonPriceCurrentMarketPrice,
            tcgdbPokemonPriceChangeYearlyPreviousMarketPrice: tcgdbPokemonPriceHistory.tcgdbPokemonPriceHistoryMarketPrice,
            tcgdbPokemonPriceChangeYearlyMarketPriceDifference: tcgdbPokemonPriceChangeYearlyMarketPriceDifference,
            tcgdbPokemonPriceChangeYearlyMarketPricePercentage: tcgdbPokemonPriceChangeYearlyMarketPricePercentage,
            tcgdbPokemonPriceChangeYearlySubTypeName: tcgdbPokemonPriceCurrent.tcgdbPokemonPriceCurrentSubTypeName
        }

        const newTCGdbPokemonPriceChangeYearly = this.tcgdbPokemonPriceChangeYearlyRepository.create(createTCGdbPokemonPriceChangeYearlyDTO);
        await this.tcgdbPokemonPriceChangeYearlyRepository.save(newTCGdbPokemonPriceChangeYearly);

        return true;
        
    } 
}


