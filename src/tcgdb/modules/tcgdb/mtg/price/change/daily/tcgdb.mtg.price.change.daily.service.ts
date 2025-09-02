import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TCGdbMTGSetService } from 'src/tcgdb/modules/tcgdb/mtg/set/tcgdb.mtg.set.service';
import { TCGdbMTGPriceCurrentService } from 'src/tcgdb/modules/tcgdb/mtg/price/current/tcgdb.mtg.price.current.service';
import { TCGdbMTGPricePreviousDailyService } from 'src/tcgdb/modules/tcgdb/mtg/price/previous/daily/tcgdb.mtg.price.previous.daily.service';
import { TCGdbMTGPricesChangeDailyDTO, TCGdbMTGPriceChangeDailyDTO, CreateTCGdbMTGPriceChangeDailyDTO } from './dto/tcgdb.mtg.price.change.daily.dto';
import { TCGdbMTGPriceChangeDaily } from 'src/typeorm/entities/tcgdb/modules/tcgdb/mtg/price/change/daily/tcgdb.mtg.price.change.daily.entity';
import { TCGdbMTGPricePreviousDailyDTO } from 'src/tcgdb/modules/tcgdb/mtg/price/previous/daily/dto/tcgdb.mtg.price.previous.daily.dto';
import { TCGdbMTGPriceCurrentDTO } from 'src/tcgdb/modules/tcgdb/mtg/price/current/dto/tcgdb.mtg.price.current.dto';

@Injectable()
export class TCGdbMTGPriceChangeDailyService {

    constructor(
        @InjectRepository(TCGdbMTGPriceChangeDaily) private tcgdbMTGPriceChangeDailyRepository: Repository<TCGdbMTGPriceChangeDaily>, 
        private tcgdbMTGSetService: TCGdbMTGSetService,
        private tcgdbMTGPricePreviousDailyService: TCGdbMTGPricePreviousDailyService,
        private tcgdbMTGPriceCurrentService: TCGdbMTGPriceCurrentService,
    ) {}

    async getTCGdbMTGPriceChangeDailyBySet(setCode: string) {
        let tcgdbMTGPriceChangeDailys = await this.tcgdbMTGPriceChangeDailyRepository.find({
            where: {
                tcgdbMTGPriceChangeDailySetCode: setCode,
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

            //CURRENT PRICES;
            let tcgdbMTGPriceCurrents = await this.tcgdbMTGPriceCurrentService.getTCGdbMTGPricesCurrentBySetCode(tcgdbMTGSet.tcgdbMTGSetCode);

            if(tcgdbMTGPriceCurrents.length == 0) {
                console.log("No current prices for set: " + tcgdbMTGSet.tcgdbMTGSetCode);
                continue;
            }

            //PREVIOUS DAILY PRICES;
            let tcgdbMTGPricePreviousDailys = await this.tcgdbMTGPricePreviousDailyService.getTCGdbMTGPricePreviousDailyBySetCode(tcgdbMTGSet.tcgdbMTGSetCode);

            if(tcgdbMTGPricePreviousDailys.length == 0) {
                console.log("No previous daily prices for set: " + tcgdbMTGSet.tcgdbMTGSetCode);
                continue;
            }

            for(let j=0; j < tcgdbMTGPriceCurrents.length; j++) {
                let tcgdbMTGPriceCurrent = tcgdbMTGPriceCurrents[j];
                let searchCriteria: Partial<TCGdbMTGPricePreviousDailyDTO> = {
                    tcgdbMTGCardId: tcgdbMTGPriceCurrent.tcgdbMTGCardId,
                    tcgdbMTGPricePreviousDailyTCGPlayerId: tcgdbMTGPriceCurrent.tcgdbMTGPriceCurrentTCGPlayerId,
                    tcgdbMTGPricePreviousDailySubTypeName: tcgdbMTGPriceCurrent.tcgdbMTGPriceCurrentSubTypeName
                }

                let tcgdbMTGPricePreviousDaily = await this.findTCGdbMTGPricePreviousDaily(tcgdbMTGPricePreviousDailys, searchCriteria);
                if(tcgdbMTGPricePreviousDaily) {
                    try {
                        await this.createTCGdbMTGPriceChangeDaily(tcgdbMTGPriceCurrent, tcgdbMTGPricePreviousDaily);
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

    async findTCGdbMTGPricePreviousDaily(tcgdbMTGPricePreviousDailys: TCGdbMTGPricePreviousDailyDTO[], searchCriteria: Partial<TCGdbMTGPricePreviousDailyDTO>) {
        return tcgdbMTGPricePreviousDailys.find(dto =>
            Object.keys(searchCriteria).every(key => dto[key as keyof TCGdbMTGPricePreviousDailyDTO] === searchCriteria[key as keyof TCGdbMTGPricePreviousDailyDTO])
          ); 
    }

    async createTCGdbMTGPriceChangeDaily(tcgdbMTGPriceCurrent: TCGdbMTGPriceCurrentDTO, tcgdbMTGPricePreviousDaily: TCGdbMTGPricePreviousDailyDTO) {

        let tcgdbMTGPriceChangeDailyLowPriceDifference = 0;
        let tcgdbMTGPriceChangeDailyLowPricePercentage = 0;

        if(tcgdbMTGPriceCurrent.tcgdbMTGPriceCurrentLowPrice != null && tcgdbMTGPricePreviousDaily.tcgdbMTGPricePreviousDailyLowPrice != null) {
            tcgdbMTGPriceChangeDailyLowPriceDifference = tcgdbMTGPriceCurrent.tcgdbMTGPriceCurrentLowPrice - tcgdbMTGPricePreviousDaily.tcgdbMTGPricePreviousDailyLowPrice;
            tcgdbMTGPriceChangeDailyLowPriceDifference = parseFloat(tcgdbMTGPriceChangeDailyLowPriceDifference.toFixed(2));
            tcgdbMTGPriceChangeDailyLowPricePercentage = (tcgdbMTGPriceChangeDailyLowPriceDifference / tcgdbMTGPricePreviousDaily.tcgdbMTGPricePreviousDailyLowPrice) * 100;
            tcgdbMTGPriceChangeDailyLowPricePercentage = parseFloat(tcgdbMTGPriceChangeDailyLowPricePercentage.toFixed(2));
            
        }
        
        let tcgdbMTGPriceChangeDailyMidPriceDifference = 0;
        let tcgdbMTGPriceChangeDailyMidPricePercentage = 0;

        if(tcgdbMTGPriceCurrent.tcgdbMTGPriceCurrentMidPrice != null && tcgdbMTGPricePreviousDaily.tcgdbMTGPricePreviousDailyMidPrice != null) {
            tcgdbMTGPriceChangeDailyMidPriceDifference = tcgdbMTGPriceCurrent.tcgdbMTGPriceCurrentMidPrice - tcgdbMTGPricePreviousDaily.tcgdbMTGPricePreviousDailyMidPrice;
            tcgdbMTGPriceChangeDailyMidPriceDifference = parseFloat(tcgdbMTGPriceChangeDailyMidPriceDifference.toFixed(2));
            tcgdbMTGPriceChangeDailyMidPricePercentage = (tcgdbMTGPriceChangeDailyMidPriceDifference / tcgdbMTGPricePreviousDaily.tcgdbMTGPricePreviousDailyMidPrice) * 100;
            tcgdbMTGPriceChangeDailyMidPricePercentage = parseFloat(tcgdbMTGPriceChangeDailyMidPricePercentage.toFixed(2));
        }

        let tcgdbMTGPriceChangeDailyHighPriceDifference = 0;
        let tcgdbMTGPriceChangeDailyHighPricePercentage = 0;

        if(tcgdbMTGPriceCurrent.tcgdbMTGPriceCurrentHighPrice != null && tcgdbMTGPricePreviousDaily.tcgdbMTGPricePreviousDailyHighPrice != null) {
            tcgdbMTGPriceChangeDailyHighPriceDifference = tcgdbMTGPriceCurrent.tcgdbMTGPriceCurrentHighPrice - tcgdbMTGPricePreviousDaily.tcgdbMTGPricePreviousDailyHighPrice;
            tcgdbMTGPriceChangeDailyHighPriceDifference = parseFloat(tcgdbMTGPriceChangeDailyHighPriceDifference.toFixed(2));
            tcgdbMTGPriceChangeDailyHighPricePercentage = (tcgdbMTGPriceChangeDailyHighPriceDifference / tcgdbMTGPricePreviousDaily.tcgdbMTGPricePreviousDailyHighPrice) * 100;
            tcgdbMTGPriceChangeDailyHighPricePercentage = parseFloat(tcgdbMTGPriceChangeDailyHighPricePercentage.toFixed(2));
        }

        let tcgdbMTGPriceChangeDailyMarketPriceDifference = 0;
        let tcgdbMTGPriceChangeDailyMarketPricePercentage = 0;

        if(tcgdbMTGPriceCurrent.tcgdbMTGPriceCurrentMarketPrice != null && tcgdbMTGPricePreviousDaily.tcgdbMTGPricePreviousDailyMarketPrice != null) {
            tcgdbMTGPriceChangeDailyMarketPriceDifference = tcgdbMTGPriceCurrent.tcgdbMTGPriceCurrentMarketPrice - tcgdbMTGPricePreviousDaily.tcgdbMTGPricePreviousDailyMarketPrice;
            tcgdbMTGPriceChangeDailyMarketPriceDifference = parseFloat(tcgdbMTGPriceChangeDailyMarketPriceDifference.toFixed(2));
            tcgdbMTGPriceChangeDailyMarketPricePercentage = (tcgdbMTGPriceChangeDailyMarketPriceDifference / tcgdbMTGPricePreviousDaily.tcgdbMTGPricePreviousDailyMarketPrice) * 100;
            tcgdbMTGPriceChangeDailyMarketPricePercentage =  parseFloat(tcgdbMTGPriceChangeDailyMarketPricePercentage.toFixed(2));
        }
        
        
        let createTCGdbMTGPriceChangeDailyDTO: CreateTCGdbMTGPriceChangeDailyDTO = {
            tcgdbMTGCardId: tcgdbMTGPriceCurrent.tcgdbMTGCardId,
            tcgdbMTGPriceChangeDailyTCGPlayerId: tcgdbMTGPriceCurrent.tcgdbMTGPriceCurrentTCGPlayerId,
            tcgdbMTGPriceChangeDailySetCode: tcgdbMTGPriceCurrent.tcgdbMTGPriceCurrentSetCode,
            tcgdbMTGPriceChangeDailyCurrentLowPrice: tcgdbMTGPriceCurrent.tcgdbMTGPriceCurrentLowPrice,
            tcgdbMTGPriceChangeDailyPreviousLowPrice: tcgdbMTGPricePreviousDaily.tcgdbMTGPricePreviousDailyLowPrice,
            tcgdbMTGPriceChangeDailyLowPriceDifference: tcgdbMTGPriceChangeDailyLowPriceDifference,
            tcgdbMTGPriceChangeDailyLowPricePercentage: tcgdbMTGPriceChangeDailyLowPricePercentage,
            tcgdbMTGPriceChangeDailyCurrentMidPrice: tcgdbMTGPriceCurrent.tcgdbMTGPriceCurrentMidPrice,
            tcgdbMTGPriceChangeDailyPreviousMidPrice: tcgdbMTGPricePreviousDaily.tcgdbMTGPricePreviousDailyMidPrice,
            tcgdbMTGPriceChangeDailyMidPriceDifference: tcgdbMTGPriceChangeDailyMidPriceDifference,
            tcgdbMTGPriceChangeDailyMidPricePercentage: tcgdbMTGPriceChangeDailyMidPricePercentage,
            tcgdbMTGPriceChangeDailyCurrentHighPrice: tcgdbMTGPriceCurrent.tcgdbMTGPriceCurrentHighPrice,
            tcgdbMTGPriceChangeDailyPreviousHighPrice: tcgdbMTGPricePreviousDaily.tcgdbMTGPricePreviousDailyHighPrice,
            tcgdbMTGPriceChangeDailyHighPriceDifference: tcgdbMTGPriceChangeDailyHighPriceDifference,
            tcgdbMTGPriceChangeDailyHighPricePercentage: tcgdbMTGPriceChangeDailyHighPricePercentage,
            tcgdbMTGPriceChangeDailyCurrentMarketPrice: tcgdbMTGPriceCurrent.tcgdbMTGPriceCurrentMarketPrice,
            tcgdbMTGPriceChangeDailyPreviousMarketPrice: tcgdbMTGPricePreviousDaily.tcgdbMTGPricePreviousDailyMarketPrice,
            tcgdbMTGPriceChangeDailyMarketPriceDifference: tcgdbMTGPriceChangeDailyMarketPriceDifference,
            tcgdbMTGPriceChangeDailyMarketPricePercentage: tcgdbMTGPriceChangeDailyMarketPricePercentage,
            tcgdbMTGPriceChangeDailySubTypeName: tcgdbMTGPriceCurrent.tcgdbMTGPriceCurrentSubTypeName
        }

        const newTCGdbMTGPriceChangeDaily = this.tcgdbMTGPriceChangeDailyRepository.create(createTCGdbMTGPriceChangeDailyDTO);
        
        await this.tcgdbMTGPriceChangeDailyRepository.save(newTCGdbMTGPriceChangeDaily);

        return true;
        
    } 
}


