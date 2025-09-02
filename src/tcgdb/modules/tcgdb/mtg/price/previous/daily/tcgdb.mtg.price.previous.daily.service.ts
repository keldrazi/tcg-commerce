import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TCGdbMTGSetService } from 'src/tcgdb/modules/tcgdb/mtg/set/tcgdb.mtg.set.service';
import { TCGdbMTGPriceCurrentService } from 'src/tcgdb/modules/tcgdb/mtg/price/current/tcgdb.mtg.price.current.service';

import { TCGdbMTGPricesPreviousDailyDTO, TCGdbMTGPricePreviousDailyDTO } from './dto/tcgdb.mtg.price.previous.daily.dto';
import { TCGdbMTGPricePreviousDaily } from 'src/typeorm/entities/tcgdb/modules/tcgdb/mtg/price/previous/daily/tcgdb.mtg.price.previous.daily.entity';
import { TCGdbMTGPriceHistoryDTO } from 'src/tcgdb/modules/tcgdb/mtg/price/history/dto/tcgdb.mtg.price.history.dto';
import { TCGdbMTGPriceCurrentDTO } from 'src/tcgdb/modules/tcgdb/mtg/price/current/dto/tcgdb.mtg.price.current.dto';

@Injectable()
export class TCGdbMTGPricePreviousDailyService {

    constructor(
        @InjectRepository(TCGdbMTGPricePreviousDaily) private tcgdbMTGPricePreviousDailyRepository: Repository<TCGdbMTGPricePreviousDaily>, 
        private tcgdbMTGSetService: TCGdbMTGSetService,
        private tcgdbMTGPriceCurrentService: TCGdbMTGPriceCurrentService,
    ) {}

    async getTCGdbMTGPricePreviousDailyBySetCode(setCode: string) {
        let tcgdbMTGPricePreviousDailys = await this.tcgdbMTGPricePreviousDailyRepository.find({
            where: {
                tcgdbMTGPricePreviousDailySetCode: setCode,
            }
        });

        let tcgdbMTGPricePreviousDailyDTOs: TCGdbMTGPricePreviousDailyDTO[] = [];

        for(let i = 0; i < tcgdbMTGPricePreviousDailys.length; i++) {
            let tcgdbMTGPricePreviousDaily = tcgdbMTGPricePreviousDailys[i];

            let tcgdbMTGPricePreviousDailyDTO: TCGdbMTGPricePreviousDailyDTO = ({ ...tcgdbMTGPricePreviousDaily });

            tcgdbMTGPricePreviousDailyDTOs.push(tcgdbMTGPricePreviousDailyDTO);
        }

        return tcgdbMTGPricePreviousDailyDTOs;

    }

    async createTCGdbMTGPricePreviousDailyBySet() {


        //REMOVE ALL TCGDB PRICE CHANGE DAILY RECORDS;
        await this.tcgdbMTGPricePreviousDailyRepository.createQueryBuilder()
            .delete()
            .from(TCGdbMTGPricePreviousDaily)
            .execute();

        let createTCGdbMTGPricePreviousDailyRecordCount = 0;

        //GET ALL TCGDB SETS;
        const tcgdbMTGSets = await this.tcgdbMTGSetService.getTCGdbMTGSets();
        
        for(let i=0; i < tcgdbMTGSets.length; i++) {
            const tcgdbMTGSet = tcgdbMTGSets[i];
            
            //GET YESTERDAYS DATE;
            let priceHistoryDate = new Date();
            priceHistoryDate.setDate(priceHistoryDate.getDate() - 1); // yesterday

            //CURRENT PRICES;
            let tcgdbMTGPriceCurrents = await this.tcgdbMTGPriceCurrentService.getTCGdbMTGPricesCurrentBySetCode(tcgdbMTGSet.tcgdbMTGSetCode);

            if(tcgdbMTGPriceCurrents.length == 0) {
                console.log("No current prices for set: " + tcgdbMTGSet.tcgdbMTGSetCode);
                continue;
            }


            for(let j=0; j < tcgdbMTGPriceCurrents.length; j++) {
                let tcgdbMTGPriceCurrent = tcgdbMTGPriceCurrents[j];
                let tcgdbMTGPricePreviousDaily = new TCGdbMTGPricePreviousDaily();
                tcgdbMTGPricePreviousDaily.tcgdbMTGCardId = tcgdbMTGPriceCurrent.tcgdbMTGCardId;
                tcgdbMTGPricePreviousDaily.tcgdbMTGPricePreviousDailyTCGPlayerId = tcgdbMTGPriceCurrent.tcgdbMTGPriceCurrentTCGPlayerId;
                tcgdbMTGPricePreviousDaily.tcgdbMTGPricePreviousDailySetCode = tcgdbMTGPriceCurrent.tcgdbMTGPriceCurrentSetCode;
                tcgdbMTGPricePreviousDaily.tcgdbMTGPricePreviousDailyLowPrice = tcgdbMTGPriceCurrent.tcgdbMTGPriceCurrentLowPrice;
                tcgdbMTGPricePreviousDaily.tcgdbMTGPricePreviousDailyMidPrice = tcgdbMTGPriceCurrent.tcgdbMTGPriceCurrentMidPrice;
                tcgdbMTGPricePreviousDaily.tcgdbMTGPricePreviousDailyHighPrice = tcgdbMTGPriceCurrent.tcgdbMTGPriceCurrentHighPrice;
                tcgdbMTGPricePreviousDaily.tcgdbMTGPricePreviousDailyMarketPrice = tcgdbMTGPriceCurrent.tcgdbMTGPriceCurrentMarketPrice;
                tcgdbMTGPricePreviousDaily.tcgdbMTGPricePreviousDailyDirectLowPrice = tcgdbMTGPriceCurrent.tcgdbMTGPriceCurrentDirectLowPrice;
                tcgdbMTGPricePreviousDaily.tcgdbMTGPricePreviousDailySubTypeName = tcgdbMTGPriceCurrent.tcgdbMTGPriceCurrentSubTypeName;
                tcgdbMTGPricePreviousDaily.tcgdbMTGPricePreviousDailyCreateDate = new Date();
                tcgdbMTGPricePreviousDaily.tcgdbMTGPricePreviousDailyUpdateDate = new Date();

                await this.tcgdbMTGPricePreviousDailyRepository.save(tcgdbMTGPricePreviousDaily);
            }

        }

        return createTCGdbMTGPricePreviousDailyRecordCount;

    }

}


