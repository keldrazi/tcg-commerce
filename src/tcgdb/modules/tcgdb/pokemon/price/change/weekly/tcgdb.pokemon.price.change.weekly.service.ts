import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TCGdbPokemonSetService } from 'src/tcgdb/modules/tcgdb/pokemon/set/tcgdb.pokemon.set.service';
import { TCGdbPokemonPriceCurrentService } from 'src/tcgdb/modules/tcgdb/pokemon/price/current/tcgdb.pokemon.price.current.service';
import { TCGdbPokemonPriceHistoryService } from 'src/tcgdb/modules/tcgdb/pokemon/price/history/tcgdb.pokemon.price.history.service';
import { TCGdbPokemonPricesChangeWeeklyDTO, TCGdbPokemonPriceChangeWeeklyDTO, CreateTCGdbPokemonPriceChangeWeeklyDTO } from './dto/tcgdb.pokemon.price.change.weekly.dto';
import { TCGdbPokemonPriceChangeWeekly } from "src/typeorm/entities/tcgdb/modules/tcgdb/pokemon/price/change/weekly/tcgdb.pokemon.price.change.weekly.entity";
import { TCGdbPokemonPriceHistoryDTO } from 'src/tcgdb/modules/tcgdb/pokemon/price/history/dto/tcgdb.pokemon.price.history.dto';
import { TCGdbPokemonPriceCurrentDTO } from 'src/tcgdb/modules/tcgdb/pokemon/price/current/dto/tcgdb.pokemon.price.current.dto';

@Injectable()
export class TCGdbPokemonPriceChangeWeeklyService {

    constructor(
        @InjectRepository(TCGdbPokemonPriceChangeWeekly) private tcgdbPokemonPriceChangeWeeklyRepository: Repository<TCGdbPokemonPriceChangeWeekly>, 
        private tcgdbPokemonSetService: TCGdbPokemonSetService,
        private tcgdbPokemonPriceHistoryService: TCGdbPokemonPriceHistoryService,
        private tcgdbPokemonPriceCurrentService: TCGdbPokemonPriceCurrentService,
    ) {}

    async getTCGdbPokemonPriceChangeWeeklyBySet(setCode: string) {
        let tcgdbPokemonPriceChangeWeeklys = await this.tcgdbPokemonPriceChangeWeeklyRepository.find({
            where: {
                tcgdbPokemonPriceChangeWeeklySetCode: setCode,
            }
        });

        let tcgdbPokemonPriceChangeWeeklyDTOs: TCGdbPokemonPriceChangeWeeklyDTO[] = [];

        for(let i = 0; i < tcgdbPokemonPriceChangeWeeklys.length; i++) {
            let tcgdbPokemonPriceChangeWeekly = tcgdbPokemonPriceChangeWeeklys[i];

            let tcgdbPokemonPriceChangeWeeklyDTO: TCGdbPokemonPriceChangeWeeklyDTO = ({ ...tcgdbPokemonPriceChangeWeekly });

            tcgdbPokemonPriceChangeWeeklyDTOs.push(tcgdbPokemonPriceChangeWeeklyDTO);
        }

        return tcgdbPokemonPriceChangeWeeklyDTOs;

    }

    async createTCGdbPokemonPriceChangeWeeklyBySet() {


        //REMOVE ALL TCGDB PRICE CHANGE DAILY RECORDS;
        await this.tcgdbPokemonPriceChangeWeeklyRepository.createQueryBuilder()
            .delete()
            .from(TCGdbPokemonPriceChangeWeekly)
            .execute();

        let createTCGdbPokemonPriceChangeWeeklyRecordCount = 0;

        //GET ALL TCGDB SETS;
        const tcgdbPokemonSets = await this.tcgdbPokemonSetService.getTCGdbPokemonSets();
        
        for(let i=0; i < tcgdbPokemonSets.length; i++) {
            const tcgdbPokemonSet = tcgdbPokemonSets[i];
            
            //GET YESTERDAYS DATE;
            let priceHistoryDate = new Date();
            priceHistoryDate.setDate(priceHistoryDate.getDate() - 7); // 7 days ago

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
                        await this.createTCGdbPokemonPriceChangeWeekly(tcgdbPokemonPriceCurrent, tcgdbPokemonPriceHistory);
                        createTCGdbPokemonPriceChangeWeeklyRecordCount++;
                    }
                    catch (error) {
                        console.log("Error creating TCGdbPokemonPriceChangeWeekly: " + error);
                        continue;
                    }
                }
            }

        }

        return createTCGdbPokemonPriceChangeWeeklyRecordCount;

    }

    async findTCGdbPokemonPriceHistory(tcgdbPokemonPriceHistorys: TCGdbPokemonPriceHistoryDTO[], searchCriteria: Partial<TCGdbPokemonPriceHistoryDTO>) {
        return tcgdbPokemonPriceHistorys.find(dto =>
            Object.keys(searchCriteria).every(key => dto[key as keyof TCGdbPokemonPriceHistoryDTO] === searchCriteria[key as keyof TCGdbPokemonPriceHistoryDTO])
          ); 
    }

    async createTCGdbPokemonPriceChangeWeekly(tcgdbPokemonPriceCurrent: TCGdbPokemonPriceCurrentDTO, tcgdbPokemonPriceHistory: TCGdbPokemonPriceHistoryDTO) {
        
        let tcgdbPokemonPriceChangeWeeklyLowPriceDifference = 0;
        let tcgdbPokemonPriceChangeWeeklyLowPricePercentage = 0;

        if(tcgdbPokemonPriceCurrent.tcgdbPokemonPriceCurrentLowPrice != null && tcgdbPokemonPriceHistory.tcgdbPokemonPriceHistoryLowPrice != null) {
            tcgdbPokemonPriceChangeWeeklyLowPriceDifference = tcgdbPokemonPriceCurrent.tcgdbPokemonPriceCurrentLowPrice - tcgdbPokemonPriceHistory.tcgdbPokemonPriceHistoryLowPrice;
            tcgdbPokemonPriceChangeWeeklyLowPriceDifference = parseFloat(tcgdbPokemonPriceChangeWeeklyLowPriceDifference.toFixed(2));
            tcgdbPokemonPriceChangeWeeklyLowPricePercentage = (tcgdbPokemonPriceChangeWeeklyLowPriceDifference / tcgdbPokemonPriceHistory.tcgdbPokemonPriceHistoryLowPrice) * 100;
            tcgdbPokemonPriceChangeWeeklyLowPricePercentage = parseFloat(tcgdbPokemonPriceChangeWeeklyLowPricePercentage.toFixed(2));
            
        }
        
        let tcgdbPokemonPriceChangeWeeklyMidPriceDifference = 0;
        let tcgdbPokemonPriceChangeWeeklyMidPricePercentage = 0;

        if(tcgdbPokemonPriceCurrent.tcgdbPokemonPriceCurrentMidPrice != null && tcgdbPokemonPriceHistory.tcgdbPokemonPriceHistoryMidPrice != null) {
            tcgdbPokemonPriceChangeWeeklyMidPriceDifference = tcgdbPokemonPriceCurrent.tcgdbPokemonPriceCurrentMidPrice - tcgdbPokemonPriceHistory.tcgdbPokemonPriceHistoryMidPrice;
            tcgdbPokemonPriceChangeWeeklyMidPriceDifference = parseFloat(tcgdbPokemonPriceChangeWeeklyMidPriceDifference.toFixed(2));
            tcgdbPokemonPriceChangeWeeklyMidPricePercentage = (tcgdbPokemonPriceChangeWeeklyMidPriceDifference / tcgdbPokemonPriceHistory.tcgdbPokemonPriceHistoryMidPrice) * 100;
            tcgdbPokemonPriceChangeWeeklyMidPricePercentage = parseFloat(tcgdbPokemonPriceChangeWeeklyMidPricePercentage.toFixed(2));
        }

        let tcgdbPokemonPriceChangeWeeklyHighPriceDifference = 0;
        let tcgdbPokemonPriceChangeWeeklyHighPricePercentage = 0;

        if(tcgdbPokemonPriceCurrent.tcgdbPokemonPriceCurrentHighPrice != null && tcgdbPokemonPriceHistory.tcgdbPokemonPriceHistoryHighPrice != null) {
            tcgdbPokemonPriceChangeWeeklyHighPriceDifference = tcgdbPokemonPriceCurrent.tcgdbPokemonPriceCurrentHighPrice - tcgdbPokemonPriceHistory.tcgdbPokemonPriceHistoryHighPrice;
            tcgdbPokemonPriceChangeWeeklyHighPriceDifference = parseFloat(tcgdbPokemonPriceChangeWeeklyHighPriceDifference.toFixed(2));
            tcgdbPokemonPriceChangeWeeklyHighPricePercentage = (tcgdbPokemonPriceChangeWeeklyHighPriceDifference / tcgdbPokemonPriceHistory.tcgdbPokemonPriceHistoryHighPrice) * 100;
            tcgdbPokemonPriceChangeWeeklyHighPricePercentage = parseFloat(tcgdbPokemonPriceChangeWeeklyHighPricePercentage.toFixed(2));
        }

        let tcgdbPokemonPriceChangeWeeklyMarketPriceDifference = 0;
        let tcgdbPokemonPriceChangeWeeklyMarketPricePercentage = 0;

        if(tcgdbPokemonPriceCurrent.tcgdbPokemonPriceCurrentMarketPrice != null && tcgdbPokemonPriceHistory.tcgdbPokemonPriceHistoryMarketPrice != null) {
            tcgdbPokemonPriceChangeWeeklyMarketPriceDifference = tcgdbPokemonPriceCurrent.tcgdbPokemonPriceCurrentMarketPrice - tcgdbPokemonPriceHistory.tcgdbPokemonPriceHistoryMarketPrice;
            tcgdbPokemonPriceChangeWeeklyMarketPriceDifference = parseFloat(tcgdbPokemonPriceChangeWeeklyMarketPriceDifference.toFixed(2));
            tcgdbPokemonPriceChangeWeeklyMarketPricePercentage = (tcgdbPokemonPriceChangeWeeklyMarketPriceDifference / tcgdbPokemonPriceHistory.tcgdbPokemonPriceHistoryMarketPrice) * 100;
            tcgdbPokemonPriceChangeWeeklyMarketPricePercentage =  parseFloat(tcgdbPokemonPriceChangeWeeklyMarketPricePercentage.toFixed(2));
        }
        
        
        let createTCGdbPokemonPriceChangeWeeklyDTO: CreateTCGdbPokemonPriceChangeWeeklyDTO = {
            tcgdbPokemonCardId: tcgdbPokemonPriceCurrent.tcgdbPokemonCardId,
            tcgdbPokemonPriceChangeWeeklyTCGPlayerId: tcgdbPokemonPriceCurrent.tcgdbPokemonPriceCurrentTCGPlayerId,
            tcgdbPokemonPriceChangeWeeklySetCode: tcgdbPokemonPriceCurrent.tcgdbPokemonPriceCurrentSetCode,
            tcgdbPokemonPriceChangeWeeklyCurrentLowPrice: tcgdbPokemonPriceCurrent.tcgdbPokemonPriceCurrentLowPrice,
            tcgdbPokemonPriceChangeWeeklyPreviousLowPrice: tcgdbPokemonPriceHistory.tcgdbPokemonPriceHistoryLowPrice,
            tcgdbPokemonPriceChangeWeeklyLowPriceDifference: tcgdbPokemonPriceChangeWeeklyLowPriceDifference,
            tcgdbPokemonPriceChangeWeeklyLowPricePercentage: tcgdbPokemonPriceChangeWeeklyLowPricePercentage,
            tcgdbPokemonPriceChangeWeeklyCurrentMidPrice: tcgdbPokemonPriceCurrent.tcgdbPokemonPriceCurrentMidPrice,
            tcgdbPokemonPriceChangeWeeklyPreviousMidPrice: tcgdbPokemonPriceHistory.tcgdbPokemonPriceHistoryMidPrice,
            tcgdbPokemonPriceChangeWeeklyMidPriceDifference: tcgdbPokemonPriceChangeWeeklyMidPriceDifference,
            tcgdbPokemonPriceChangeWeeklyMidPricePercentage: tcgdbPokemonPriceChangeWeeklyMidPricePercentage,
            tcgdbPokemonPriceChangeWeeklyCurrentHighPrice: tcgdbPokemonPriceCurrent.tcgdbPokemonPriceCurrentHighPrice,
            tcgdbPokemonPriceChangeWeeklyPreviousHighPrice: tcgdbPokemonPriceHistory.tcgdbPokemonPriceHistoryHighPrice,
            tcgdbPokemonPriceChangeWeeklyHighPriceDifference: tcgdbPokemonPriceChangeWeeklyHighPriceDifference,
            tcgdbPokemonPriceChangeWeeklyHighPricePercentage: tcgdbPokemonPriceChangeWeeklyHighPricePercentage,
            tcgdbPokemonPriceChangeWeeklyCurrentMarketPrice: tcgdbPokemonPriceCurrent.tcgdbPokemonPriceCurrentMarketPrice,
            tcgdbPokemonPriceChangeWeeklyPreviousMarketPrice: tcgdbPokemonPriceHistory.tcgdbPokemonPriceHistoryMarketPrice,
            tcgdbPokemonPriceChangeWeeklyMarketPriceDifference: tcgdbPokemonPriceChangeWeeklyMarketPriceDifference,
            tcgdbPokemonPriceChangeWeeklyMarketPricePercentage: tcgdbPokemonPriceChangeWeeklyMarketPricePercentage,
            tcgdbPokemonPriceChangeWeeklySubTypeName: tcgdbPokemonPriceCurrent.tcgdbPokemonPriceCurrentSubTypeName
        }

        const newTCGdbPokemonPriceChangeWeekly = this.tcgdbPokemonPriceChangeWeeklyRepository.create(createTCGdbPokemonPriceChangeWeeklyDTO);
        await this.tcgdbPokemonPriceChangeWeeklyRepository.save(newTCGdbPokemonPriceChangeWeekly);

        return true;
        
    } 
}


