import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TCGdbPokemonSetService } from 'src/tcgdb/modules/tcgdb/pokemon/set/tcgdb.pokemon.set.service';
import { TCGdbPokemonPriceCurrentService } from 'src/tcgdb/modules/tcgdb/pokemon/price/current/tcgdb.pokemon.price.current.service';
import { TCGdbPokemonPriceHistoryService } from 'src/tcgdb/modules/tcgdb/pokemon/price/history/tcgdb.pokemon.price.history.service';
import { TCGdbPokemonPricesChangeMonthlyDTO, TCGdbPokemonPriceChangeMonthlyDTO, CreateTCGdbPokemonPriceChangeMonthlyDTO } from './dto/tcgdb.pokemon.price.change.monthly.dto';
import { TCGdbPokemonPriceChangeMonthly } from "src/typeorm/entities/tcgdb/modules/tcgdb/pokemon/price/change/monthly/tcgdb.pokemon.price.change.monthly.entity";
import { TCGdbPokemonPriceHistoryDTO } from 'src/tcgdb/modules/tcgdb/pokemon/price/history/dto/tcgdb.pokemon.price.history.dto';
import { TCGdbPokemonPriceCurrentDTO } from 'src/tcgdb/modules/tcgdb/pokemon/price/current/dto/tcgdb.pokemon.price.current.dto';

@Injectable()
export class TCGdbPokemonPriceChangeMonthlyService {

    constructor(
        @InjectRepository(TCGdbPokemonPriceChangeMonthly) private tcgdbPokemonPriceChangeMonthlyRepository: Repository<TCGdbPokemonPriceChangeMonthly>, 
        private tcgdbPokemonSetService: TCGdbPokemonSetService,
        private tcgdbPokemonPriceHistoryService: TCGdbPokemonPriceHistoryService,
        private tcgdbPokemonPriceCurrentService: TCGdbPokemonPriceCurrentService,
    ) {}

    async getTCGdbPokemonPriceChangeMonthlyBySet(setCode: string) {
        let tcgdbPokemonPriceChangeMonthlys = await this.tcgdbPokemonPriceChangeMonthlyRepository.find({
            where: {
                tcgdbPokemonPriceChangeMonthlySetCode: setCode,
            }
        });

        let tcgdbPokemonPriceChangeMonthlyDTOs: TCGdbPokemonPriceChangeMonthlyDTO[] = [];

        for(let i = 0; i < tcgdbPokemonPriceChangeMonthlys.length; i++) {
            let tcgdbPokemonPriceChangeMonthly = tcgdbPokemonPriceChangeMonthlys[i];

            let tcgdbPokemonPriceChangeMonthlyDTO: TCGdbPokemonPriceChangeMonthlyDTO = ({ ...tcgdbPokemonPriceChangeMonthly });
           
            tcgdbPokemonPriceChangeMonthlyDTOs.push(tcgdbPokemonPriceChangeMonthlyDTO);
        }

        return tcgdbPokemonPriceChangeMonthlyDTOs;

    }

    async createTCGdbPokemonPriceChangeMonthlyBySet() {


        //REMOVE ALL TCGDB PRICE CHANGE DAILY RECORDS;
        await this.tcgdbPokemonPriceChangeMonthlyRepository.createQueryBuilder()
            .delete()
            .from(TCGdbPokemonPriceChangeMonthly)
            .execute();

        let createTCGdbPokemonPriceChangeMonthlyRecordCount = 0;

        //GET ALL TCGDB SETS;
        const tcgdbPokemonSets = await this.tcgdbPokemonSetService.getTCGdbPokemonSets();
        
        for(let i=0; i < tcgdbPokemonSets.length; i++) {
            const tcgdbPokemonSet = tcgdbPokemonSets[i];
            
            //GET YESTERDAYS DATE;
            let priceHistoryDate = new Date();
            priceHistoryDate.setDate(priceHistoryDate.getDate() - 30); // 30 days ago

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
                        await this.createTCGdbPokemonPriceChangeMonthly(tcgdbPokemonPriceCurrent, tcgdbPokemonPriceHistory);
                        createTCGdbPokemonPriceChangeMonthlyRecordCount++;
                    }
                    catch (error) {
                        console.log("Error creating TCGdbPokemonPriceChangeMonthly: " + error);
                        continue;
                    }
                }
            }

        }

        return createTCGdbPokemonPriceChangeMonthlyRecordCount;

    }

    async findTCGdbPokemonPriceHistory(tcgdbPokemonPriceHistorys: TCGdbPokemonPriceHistoryDTO[], searchCriteria: Partial<TCGdbPokemonPriceHistoryDTO>) {
        return tcgdbPokemonPriceHistorys.find(dto =>
            Object.keys(searchCriteria).every(key => dto[key as keyof TCGdbPokemonPriceHistoryDTO] === searchCriteria[key as keyof TCGdbPokemonPriceHistoryDTO])
          ); 
    }

    async createTCGdbPokemonPriceChangeMonthly(tcgdbPokemonPriceCurrent: TCGdbPokemonPriceCurrentDTO, tcgdbPokemonPriceHistory: TCGdbPokemonPriceHistoryDTO) {
        
        let tcgdbPokemonPriceChangeMonthlyLowPriceDifference = 0;
        let tcgdbPokemonPriceChangeMonthlyLowPricePercentage = 0;

        if(tcgdbPokemonPriceCurrent.tcgdbPokemonPriceCurrentLowPrice != null && tcgdbPokemonPriceHistory.tcgdbPokemonPriceHistoryLowPrice != null) {
            tcgdbPokemonPriceChangeMonthlyLowPriceDifference = tcgdbPokemonPriceCurrent.tcgdbPokemonPriceCurrentLowPrice - tcgdbPokemonPriceHistory.tcgdbPokemonPriceHistoryLowPrice;
            tcgdbPokemonPriceChangeMonthlyLowPriceDifference = parseFloat(tcgdbPokemonPriceChangeMonthlyLowPriceDifference.toFixed(2));
            tcgdbPokemonPriceChangeMonthlyLowPricePercentage = (tcgdbPokemonPriceChangeMonthlyLowPriceDifference / tcgdbPokemonPriceHistory.tcgdbPokemonPriceHistoryLowPrice) * 100;
            tcgdbPokemonPriceChangeMonthlyLowPricePercentage = parseFloat(tcgdbPokemonPriceChangeMonthlyLowPricePercentage.toFixed(2));
            
        }
        
        let tcgdbPokemonPriceChangeMonthlyMidPriceDifference = 0;
        let tcgdbPokemonPriceChangeMonthlyMidPricePercentage = 0;

        if(tcgdbPokemonPriceCurrent.tcgdbPokemonPriceCurrentMidPrice != null && tcgdbPokemonPriceHistory.tcgdbPokemonPriceHistoryMidPrice != null) {
            tcgdbPokemonPriceChangeMonthlyMidPriceDifference = tcgdbPokemonPriceCurrent.tcgdbPokemonPriceCurrentMidPrice - tcgdbPokemonPriceHistory.tcgdbPokemonPriceHistoryMidPrice;
            tcgdbPokemonPriceChangeMonthlyMidPriceDifference = parseFloat(tcgdbPokemonPriceChangeMonthlyMidPriceDifference.toFixed(2));
            tcgdbPokemonPriceChangeMonthlyMidPricePercentage = (tcgdbPokemonPriceChangeMonthlyMidPriceDifference / tcgdbPokemonPriceHistory.tcgdbPokemonPriceHistoryMidPrice) * 100;
            tcgdbPokemonPriceChangeMonthlyMidPricePercentage = parseFloat(tcgdbPokemonPriceChangeMonthlyMidPricePercentage.toFixed(2));
        }

        let tcgdbPokemonPriceChangeMonthlyHighPriceDifference = 0;
        let tcgdbPokemonPriceChangeMonthlyHighPricePercentage = 0;

        if(tcgdbPokemonPriceCurrent.tcgdbPokemonPriceCurrentHighPrice != null && tcgdbPokemonPriceHistory.tcgdbPokemonPriceHistoryHighPrice != null) {
            tcgdbPokemonPriceChangeMonthlyHighPriceDifference = tcgdbPokemonPriceCurrent.tcgdbPokemonPriceCurrentHighPrice - tcgdbPokemonPriceHistory.tcgdbPokemonPriceHistoryHighPrice;
            tcgdbPokemonPriceChangeMonthlyHighPriceDifference = parseFloat(tcgdbPokemonPriceChangeMonthlyHighPriceDifference.toFixed(2));
            tcgdbPokemonPriceChangeMonthlyHighPricePercentage = (tcgdbPokemonPriceChangeMonthlyHighPriceDifference / tcgdbPokemonPriceHistory.tcgdbPokemonPriceHistoryHighPrice) * 100;
            tcgdbPokemonPriceChangeMonthlyHighPricePercentage = parseFloat(tcgdbPokemonPriceChangeMonthlyHighPricePercentage.toFixed(2));
        }

        let tcgdbPokemonPriceChangeMonthlyMarketPriceDifference = 0;
        let tcgdbPokemonPriceChangeMonthlyMarketPricePercentage = 0;

        if(tcgdbPokemonPriceCurrent.tcgdbPokemonPriceCurrentMarketPrice != null && tcgdbPokemonPriceHistory.tcgdbPokemonPriceHistoryMarketPrice != null) {
            tcgdbPokemonPriceChangeMonthlyMarketPriceDifference = tcgdbPokemonPriceCurrent.tcgdbPokemonPriceCurrentMarketPrice - tcgdbPokemonPriceHistory.tcgdbPokemonPriceHistoryMarketPrice;
            tcgdbPokemonPriceChangeMonthlyMarketPriceDifference = parseFloat(tcgdbPokemonPriceChangeMonthlyMarketPriceDifference.toFixed(2));
            tcgdbPokemonPriceChangeMonthlyMarketPricePercentage = (tcgdbPokemonPriceChangeMonthlyMarketPriceDifference / tcgdbPokemonPriceHistory.tcgdbPokemonPriceHistoryMarketPrice) * 100;
            tcgdbPokemonPriceChangeMonthlyMarketPricePercentage =  parseFloat(tcgdbPokemonPriceChangeMonthlyMarketPricePercentage.toFixed(2));
        }
        
        
        let createTCGdbPokemonPriceChangeMonthlyDTO: CreateTCGdbPokemonPriceChangeMonthlyDTO = {
            tcgdbPokemonCardId: tcgdbPokemonPriceCurrent.tcgdbPokemonCardId,
            tcgdbPokemonPriceChangeMonthlyTCGPlayerId: tcgdbPokemonPriceCurrent.tcgdbPokemonPriceCurrentTCGPlayerId,
            tcgdbPokemonPriceChangeMonthlySetCode: tcgdbPokemonPriceCurrent.tcgdbPokemonPriceCurrentSetCode,
            tcgdbPokemonPriceChangeMonthlyCurrentLowPrice: tcgdbPokemonPriceCurrent.tcgdbPokemonPriceCurrentLowPrice,
            tcgdbPokemonPriceChangeMonthlyPreviousLowPrice: tcgdbPokemonPriceHistory.tcgdbPokemonPriceHistoryLowPrice,
            tcgdbPokemonPriceChangeMonthlyLowPriceDifference: tcgdbPokemonPriceChangeMonthlyLowPriceDifference,
            tcgdbPokemonPriceChangeMonthlyLowPricePercentage: tcgdbPokemonPriceChangeMonthlyLowPricePercentage,
            tcgdbPokemonPriceChangeMonthlyCurrentMidPrice: tcgdbPokemonPriceCurrent.tcgdbPokemonPriceCurrentMidPrice,
            tcgdbPokemonPriceChangeMonthlyPreviousMidPrice: tcgdbPokemonPriceHistory.tcgdbPokemonPriceHistoryMidPrice,
            tcgdbPokemonPriceChangeMonthlyMidPriceDifference: tcgdbPokemonPriceChangeMonthlyMidPriceDifference,
            tcgdbPokemonPriceChangeMonthlyMidPricePercentage: tcgdbPokemonPriceChangeMonthlyMidPricePercentage,
            tcgdbPokemonPriceChangeMonthlyCurrentHighPrice: tcgdbPokemonPriceCurrent.tcgdbPokemonPriceCurrentHighPrice,
            tcgdbPokemonPriceChangeMonthlyPreviousHighPrice: tcgdbPokemonPriceHistory.tcgdbPokemonPriceHistoryHighPrice,
            tcgdbPokemonPriceChangeMonthlyHighPriceDifference: tcgdbPokemonPriceChangeMonthlyHighPriceDifference,
            tcgdbPokemonPriceChangeMonthlyHighPricePercentage: tcgdbPokemonPriceChangeMonthlyHighPricePercentage,
            tcgdbPokemonPriceChangeMonthlyCurrentMarketPrice: tcgdbPokemonPriceCurrent.tcgdbPokemonPriceCurrentMarketPrice,
            tcgdbPokemonPriceChangeMonthlyPreviousMarketPrice: tcgdbPokemonPriceHistory.tcgdbPokemonPriceHistoryMarketPrice,
            tcgdbPokemonPriceChangeMonthlyMarketPriceDifference: tcgdbPokemonPriceChangeMonthlyMarketPriceDifference,
            tcgdbPokemonPriceChangeMonthlyMarketPricePercentage: tcgdbPokemonPriceChangeMonthlyMarketPricePercentage,
            tcgdbPokemonPriceChangeMonthlySubTypeName: tcgdbPokemonPriceCurrent.tcgdbPokemonPriceCurrentSubTypeName
        }

        const newTCGdbPokemonPriceChangeMonthly = this.tcgdbPokemonPriceChangeMonthlyRepository.create(createTCGdbPokemonPriceChangeMonthlyDTO);
        await this.tcgdbPokemonPriceChangeMonthlyRepository.save(newTCGdbPokemonPriceChangeMonthly);

        return true;
        
    } 
}


