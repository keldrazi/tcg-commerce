import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TCGdbPokemonSetService } from 'src/tcgdb/modules/tcgdb/pokemon/set/tcgdb.pokemon.set.service';
import { TCGdbPokemonPriceCurrentService } from 'src/tcgdb/modules/tcgdb/pokemon/price/current/tcgdb.pokemon.price.current.service';
import { TCGdbPokemonPriceHistoryService } from 'src/tcgdb/modules/tcgdb/pokemon/price/history/tcgdb.pokemon.price.history.service';
import { TCGdbPokemonPricesChangeDailyDTO, TCGdbPokemonPriceChangeDailyDTO, CreateTCGdbPokemonPriceChangeDailyDTO } from './dto/tcgdb.pokemon.price.change.daily.dto';
import { TCGdbPokemonPriceChangeDaily } from 'src/typeorm/entities/tcgdb/modules/tcgdb/pokemon/price/change/daily/tcgdb.pokemon.price.change.daily.entity';
import { TCGdbPokemonPriceHistoryDTO } from 'src/tcgdb/modules/tcgdb/pokemon/price/history/dto/tcgdb.pokemon.price.history.dto';
import { TCGdbPokemonPriceCurrentDTO } from 'src/tcgdb/modules/tcgdb/pokemon/price/current/dto/tcgdb.pokemon.price.current.dto';

@Injectable()
export class TCGdbPokemonPriceChangeDailyService {

    constructor(
        @InjectRepository(TCGdbPokemonPriceChangeDaily) private tcgdbPokemonPriceChangeDailyRepository: Repository<TCGdbPokemonPriceChangeDaily>, 
        private tcgdbPokemonSetService: TCGdbPokemonSetService,
        private tcgdbPokemonPriceHistoryService: TCGdbPokemonPriceHistoryService,
        private tcgdbPokemonPriceCurrentService: TCGdbPokemonPriceCurrentService,
    ) {}

    async getTCGdbPokemonPriceChangeDailyBySet(setCode: string) {
        let tcgdbPokemonPriceChangeDailys = await this.tcgdbPokemonPriceChangeDailyRepository.find({
            where: {
                tcgdbPokemonPriceChangeDailySetCode: setCode,
            }
        });

        let tcgdbPokemonPriceChangeDailyDTOs: TCGdbPokemonPriceChangeDailyDTO[] = [];

        for(let i = 0; i < tcgdbPokemonPriceChangeDailys.length; i++) {
            let tcgdbPokemonPriceChangeDaily = tcgdbPokemonPriceChangeDailys[i];

            let tcgdbPokemonPriceChangeDailyDTO: TCGdbPokemonPriceChangeDailyDTO = ({ ...tcgdbPokemonPriceChangeDaily });

            tcgdbPokemonPriceChangeDailyDTOs.push(tcgdbPokemonPriceChangeDailyDTO);
        }

        return tcgdbPokemonPriceChangeDailyDTOs;

    }

    async createTCGdbPokemonPriceChangeDailyBySet() {


        //REMOVE ALL TCGDB PRICE CHANGE DAILY RECORDS;
        await this.tcgdbPokemonPriceChangeDailyRepository.createQueryBuilder()
            .delete()
            .from(TCGdbPokemonPriceChangeDaily)
            .execute();

        let createTCGdbPokemonPriceChangeDailyRecordCount = 0;

        //GET ALL TCGDB SETS;
        const tcgdbPokemonSets = await this.tcgdbPokemonSetService.getTCGdbPokemonSets();
        
        for(let i=0; i < tcgdbPokemonSets.length; i++) {
            const tcgdbPokemonSet = tcgdbPokemonSets[i];
            
            //GET YESTERDAYS DATE;
            let priceHistoryDate = new Date();
            priceHistoryDate.setDate(priceHistoryDate.getDate() - 1); // yesterday

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
                        await this.createTCGdbPokemonPriceChangeDaily(tcgdbPokemonPriceCurrent, tcgdbPokemonPriceHistory);
                        createTCGdbPokemonPriceChangeDailyRecordCount++;
                    }
                    catch (error) {
                        console.log("Error creating TCGdbPokemonPriceChangeDaily: " + error);
                        continue;
                    }
                }
            }

        }

        return createTCGdbPokemonPriceChangeDailyRecordCount;

    }

    async findTCGdbPokemonPriceHistory(tcgdbPokemonPriceHistorys: TCGdbPokemonPriceHistoryDTO[], searchCriteria: Partial<TCGdbPokemonPriceHistoryDTO>) {
        return tcgdbPokemonPriceHistorys.find(dto =>
            Object.keys(searchCriteria).every(key => dto[key as keyof TCGdbPokemonPriceHistoryDTO] === searchCriteria[key as keyof TCGdbPokemonPriceHistoryDTO])
          ); 
    }

    async createTCGdbPokemonPriceChangeDaily(tcgdbPokemonPriceCurrent: TCGdbPokemonPriceCurrentDTO, tcgdbPokemonPriceHistory: TCGdbPokemonPriceHistoryDTO) {
        
        let tcgdbPokemonPriceChangeDailyLowPriceDifference = 0;
        let tcgdbPokemonPriceChangeDailyLowPricePercentage = 0;

        if(tcgdbPokemonPriceCurrent.tcgdbPokemonPriceCurrentLowPrice != null && tcgdbPokemonPriceHistory.tcgdbPokemonPriceHistoryLowPrice != null) {
            tcgdbPokemonPriceChangeDailyLowPriceDifference = tcgdbPokemonPriceCurrent.tcgdbPokemonPriceCurrentLowPrice - tcgdbPokemonPriceHistory.tcgdbPokemonPriceHistoryLowPrice;
            tcgdbPokemonPriceChangeDailyLowPriceDifference = parseFloat(tcgdbPokemonPriceChangeDailyLowPriceDifference.toFixed(2));
            tcgdbPokemonPriceChangeDailyLowPricePercentage = (tcgdbPokemonPriceChangeDailyLowPriceDifference / tcgdbPokemonPriceHistory.tcgdbPokemonPriceHistoryLowPrice) * 100;
            tcgdbPokemonPriceChangeDailyLowPricePercentage = parseFloat(tcgdbPokemonPriceChangeDailyLowPricePercentage.toFixed(2));
            
        }
        
        let tcgdbPokemonPriceChangeDailyMidPriceDifference = 0;
        let tcgdbPokemonPriceChangeDailyMidPricePercentage = 0;

        if(tcgdbPokemonPriceCurrent.tcgdbPokemonPriceCurrentMidPrice != null && tcgdbPokemonPriceHistory.tcgdbPokemonPriceHistoryMidPrice != null) {
            tcgdbPokemonPriceChangeDailyMidPriceDifference = tcgdbPokemonPriceCurrent.tcgdbPokemonPriceCurrentMidPrice - tcgdbPokemonPriceHistory.tcgdbPokemonPriceHistoryMidPrice;
            tcgdbPokemonPriceChangeDailyMidPriceDifference = parseFloat(tcgdbPokemonPriceChangeDailyMidPriceDifference.toFixed(2));
            tcgdbPokemonPriceChangeDailyMidPricePercentage = (tcgdbPokemonPriceChangeDailyMidPriceDifference / tcgdbPokemonPriceHistory.tcgdbPokemonPriceHistoryMidPrice) * 100;
            tcgdbPokemonPriceChangeDailyMidPricePercentage = parseFloat(tcgdbPokemonPriceChangeDailyMidPricePercentage.toFixed(2));
        }

        let tcgdbPokemonPriceChangeDailyHighPriceDifference = 0;
        let tcgdbPokemonPriceChangeDailyHighPricePercentage = 0;

        if(tcgdbPokemonPriceCurrent.tcgdbPokemonPriceCurrentHighPrice != null && tcgdbPokemonPriceHistory.tcgdbPokemonPriceHistoryHighPrice != null) {
            tcgdbPokemonPriceChangeDailyHighPriceDifference = tcgdbPokemonPriceCurrent.tcgdbPokemonPriceCurrentHighPrice - tcgdbPokemonPriceHistory.tcgdbPokemonPriceHistoryHighPrice;
            tcgdbPokemonPriceChangeDailyHighPriceDifference = parseFloat(tcgdbPokemonPriceChangeDailyHighPriceDifference.toFixed(2));
            tcgdbPokemonPriceChangeDailyHighPricePercentage = (tcgdbPokemonPriceChangeDailyHighPriceDifference / tcgdbPokemonPriceHistory.tcgdbPokemonPriceHistoryHighPrice) * 100;
            tcgdbPokemonPriceChangeDailyHighPricePercentage = parseFloat(tcgdbPokemonPriceChangeDailyHighPricePercentage.toFixed(2));
        }

        let tcgdbPokemonPriceChangeDailyMarketPriceDifference = 0;
        let tcgdbPokemonPriceChangeDailyMarketPricePercentage = 0;

        if(tcgdbPokemonPriceCurrent.tcgdbPokemonPriceCurrentMarketPrice != null && tcgdbPokemonPriceHistory.tcgdbPokemonPriceHistoryMarketPrice != null) {
            tcgdbPokemonPriceChangeDailyMarketPriceDifference = tcgdbPokemonPriceCurrent.tcgdbPokemonPriceCurrentMarketPrice - tcgdbPokemonPriceHistory.tcgdbPokemonPriceHistoryMarketPrice;
            tcgdbPokemonPriceChangeDailyMarketPriceDifference = parseFloat(tcgdbPokemonPriceChangeDailyMarketPriceDifference.toFixed(2));
            tcgdbPokemonPriceChangeDailyMarketPricePercentage = (tcgdbPokemonPriceChangeDailyMarketPriceDifference / tcgdbPokemonPriceHistory.tcgdbPokemonPriceHistoryMarketPrice) * 100;
            tcgdbPokemonPriceChangeDailyMarketPricePercentage =  parseFloat(tcgdbPokemonPriceChangeDailyMarketPricePercentage.toFixed(2));
        }
        
        
        let createTCGdbPokemonPriceChangeDailyDTO: CreateTCGdbPokemonPriceChangeDailyDTO = {
            tcgdbPokemonCardId: tcgdbPokemonPriceCurrent.tcgdbPokemonCardId,
            tcgdbPokemonPriceChangeDailyTCGPlayerId: tcgdbPokemonPriceCurrent.tcgdbPokemonPriceCurrentTCGPlayerId,
            tcgdbPokemonPriceChangeDailySetCode: tcgdbPokemonPriceCurrent.tcgdbPokemonPriceCurrentSetCode,
            tcgdbPokemonPriceChangeDailyCurrentLowPrice: tcgdbPokemonPriceCurrent.tcgdbPokemonPriceCurrentLowPrice,
            tcgdbPokemonPriceChangeDailyPreviousLowPrice: tcgdbPokemonPriceHistory.tcgdbPokemonPriceHistoryLowPrice,
            tcgdbPokemonPriceChangeDailyLowPriceDifference: tcgdbPokemonPriceChangeDailyLowPriceDifference,
            tcgdbPokemonPriceChangeDailyLowPricePercentage: tcgdbPokemonPriceChangeDailyLowPricePercentage,
            tcgdbPokemonPriceChangeDailyCurrentMidPrice: tcgdbPokemonPriceCurrent.tcgdbPokemonPriceCurrentMidPrice,
            tcgdbPokemonPriceChangeDailyPreviousMidPrice: tcgdbPokemonPriceHistory.tcgdbPokemonPriceHistoryMidPrice,
            tcgdbPokemonPriceChangeDailyMidPriceDifference: tcgdbPokemonPriceChangeDailyMidPriceDifference,
            tcgdbPokemonPriceChangeDailyMidPricePercentage: tcgdbPokemonPriceChangeDailyMidPricePercentage,
            tcgdbPokemonPriceChangeDailyCurrentHighPrice: tcgdbPokemonPriceCurrent.tcgdbPokemonPriceCurrentHighPrice,
            tcgdbPokemonPriceChangeDailyPreviousHighPrice: tcgdbPokemonPriceHistory.tcgdbPokemonPriceHistoryHighPrice,
            tcgdbPokemonPriceChangeDailyHighPriceDifference: tcgdbPokemonPriceChangeDailyHighPriceDifference,
            tcgdbPokemonPriceChangeDailyHighPricePercentage: tcgdbPokemonPriceChangeDailyHighPricePercentage,
            tcgdbPokemonPriceChangeDailyCurrentMarketPrice: tcgdbPokemonPriceCurrent.tcgdbPokemonPriceCurrentMarketPrice,
            tcgdbPokemonPriceChangeDailyPreviousMarketPrice: tcgdbPokemonPriceHistory.tcgdbPokemonPriceHistoryMarketPrice,
            tcgdbPokemonPriceChangeDailyMarketPriceDifference: tcgdbPokemonPriceChangeDailyMarketPriceDifference,
            tcgdbPokemonPriceChangeDailyMarketPricePercentage: tcgdbPokemonPriceChangeDailyMarketPricePercentage,
            tcgdbPokemonPriceChangeDailySubTypeName: tcgdbPokemonPriceCurrent.tcgdbPokemonPriceCurrentSubTypeName
        }

        const newTCGdbPokemonPriceChangeDaily = this.tcgdbPokemonPriceChangeDailyRepository.create(createTCGdbPokemonPriceChangeDailyDTO);
        
        await this.tcgdbPokemonPriceChangeDailyRepository.save(newTCGdbPokemonPriceChangeDaily);

        return true;
        
    } 
}


