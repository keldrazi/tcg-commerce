import { Injectable } from '@nestjs/common';
import { TCGPlayerMTGPriceService } from 'src/tcgdb/modules/tcgplayer/mtg/price/tcgplayer.mtg.price.service';
import { TCGdbMTGCardService } from 'src/tcgdb/modules/tcgdb/api/mtg/card/tcgdb.mtg.card.service';
import { TCGdbMTGPriceHistoryService } from 'src/tcgdb/modules/tcgdb/api/mtg/price/history/tcgdb.mtg.price.history.service';
import { TCGdbMTGPricesCurrentDTO, TCGdbMTGPriceCurrentDTO } from './dto/tcgdb.mtg.price.current.dto';
import { TCGdbAPIUtilService } from 'src/tcgdb/modules/tcgdb/api/util/tcgdb.api.util.service';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { map, catchError, lastValueFrom } from 'rxjs';
import { ForbiddenException } from '@nestjs/common';

@Injectable()
export class TCGdbMTGPriceCurrentService {

    constructor(
        private tcgPlayerMTGPriceService: TCGPlayerMTGPriceService,
        private tcgdbMTGCardService: TCGdbMTGCardService,
        private tcgdbMTGPriceHistoryService: TCGdbMTGPriceHistoryService,
        private tcgdbAPIUtilService: TCGdbAPIUtilService,
        private configService: ConfigService,
        private httpService: HttpService,
    ) {}


    private tcgdbAPIURL = this.configService.get('TCGDB_API_URL');
    /*
    async getTCGdbMTGPricesCurrentByCardId(cardId: string) {
        
        const tcgdbMTGPriceCurrents = await this.tcgdbMTGPriceCurrentRepository.find({
            where: {
                tcgdbMTGCardId: cardId,
            }
        });

        let tcgdbMTGPriceCurrentDTOs: TCGdbMTGPriceCurrentDTO[] = [];

        for(let i = 0; i < tcgdbMTGPriceCurrents.length; i++) {
            let tcgdbMTGPriceCurrent = tcgdbMTGPriceCurrents[i];

            let tcgdbMTGPriceCurrentDTO: TCGdbMTGPriceCurrentDTO = { ...tcgdbMTGPriceCurrent };
            
            tcgdbMTGPriceCurrentDTOs.push(tcgdbMTGPriceCurrentDTO);

        }

        let tcgdbMTGPriceCurrentsDTO: TCGdbMTGPricesCurrentDTO = {
            tcgdbMTGPricesCurrent: tcgdbMTGPriceCurrentDTOs,
        }

        return tcgdbMTGPriceCurrentsDTO;

    } 
    async getTCGdbMTGPricesCurrentByCardIdAndProductCardPrinting(tcgdbMTGCardId: string, tcgdbMTGPriceCurrentSubTypeName: string) {
        const tcgdbMTGPriceCurrent = await this.tcgdbMTGPriceCurrentRepository.findOne({
            where: {
                tcgdbMTGCardId: tcgdbMTGCardId,
                tcgdbMTGPriceCurrentSubTypeName: tcgdbMTGPriceCurrentSubTypeName,
            }
        });

        if(tcgdbMTGPriceCurrent == null) {
            return null;
        }

        let tcgdbMTGPriceCurrentDTO: TCGdbMTGPriceCurrentDTO = { ...tcgdbMTGPriceCurrent };

        return tcgdbMTGPriceCurrentDTO;

    }
    */
    
    async getTCGdbMTGPricesCurrentBySetCode(setCode: string) {
        
        //GET ALL TCGDB PRICES BY SET CODE;
        const accessToken = await this.tcgdbAPIUtilService.getTCGdbAPIAccessToken();
        const url = this.tcgdbAPIURL + '/tcgdb/mtg/price/current/set/code/' + setCode;
        const headers = { 'Authorization': 'Bearer ' + accessToken };
        const response = this.httpService.get(url, { headers }).pipe(
            map(response => response.data),
            catchError(error => {
                throw new ForbiddenException(error.response.data);
            })
        );

        let data = await lastValueFrom(response);

        return data;

    }
        async getTCGdbMTGPricesCurrentBySetId(tcgdbSetId: string) {
        
        //GET ALL TCGDB PRICES BY SET ID;
        const accessToken = await this.tcgdbAPIUtilService.getTCGdbAPIAccessToken();
        const url = this.tcgdbAPIURL + '/tcgdb/mtg/price/current/set/id/' + tcgdbSetId;
        const headers = { 'Authorization': 'Bearer ' + accessToken };
        const response = this.httpService.get(url, { headers }).pipe(
            map(response => response.data),
            catchError(error => {
                throw new ForbiddenException(error.response.data);
            })
        );

        let data = await lastValueFrom(response);

        return data;
 
    } 
    /*
    async createTCGdbMTGPricesCurrent() {

        //REMOVE ALL CURRENT PRICES;
        await this.tcgdbMTGPriceCurrentRepository.createQueryBuilder()
            .delete()
            .from(TCGdbMTGPriceCurrent)
            .execute();


        let tcgdbMTGPriceCurrentRecordCount = 0;
        let tcgPlayerMTGPrices = await this.tcgPlayerMTGPriceService.getTCGPlayerMTGPricesToProcess();

        //TO DO: CREATE AN ERROR TO RETURN;
        if(tcgPlayerMTGPrices == null) {
            return null;
        }

        for(let i = 0; i < tcgPlayerMTGPrices.length; i++) {
            let tcgPlayerMTGPrice = tcgPlayerMTGPrices[i];
            let tcgdbMTGCard = await this.tcgdbMTGCardService.getTCGdbMTGCardByTCGPlayerId(tcgPlayerMTGPrice.tcgPlayerMTGPriceProductId);

            //TO DO: CREATE AN ERROR TO LOG;
            if(tcgdbMTGCard == null) {
                continue;
            }

            const newTCGdbMTGPrice = this.tcgdbMTGPriceCurrentRepository.create({
                tcgdbMTGCardId: tcgdbMTGCard.tcgdbMTGCardId,
                tcgdbMTGPriceCurrentTCGPlayerId: tcgPlayerMTGPrice.tcgPlayerMTGPriceProductId,
                tcgdbMTGPriceCurrentSetCode: tcgdbMTGCard.tcgdbMTGCardSetCode,
                tcgdbMTGPriceCurrentLowPrice: tcgPlayerMTGPrice.tcgPlayerMTGPriceLowPrice,
                tcgdbMTGPriceCurrentMidPrice: tcgPlayerMTGPrice.tcgPlayerMTGPriceMidPrice,
                tcgdbMTGPriceCurrentHighPrice: tcgPlayerMTGPrice.tcgPlayerMTGPriceHighPrice,
                tcgdbMTGPriceCurrentMarketPrice: tcgPlayerMTGPrice.tcgPlayerMTGPriceMarketPrice,
                tcgdbMTGPriceCurrentDirectLowPrice: tcgPlayerMTGPrice.tcgPlayerMTGPriceDirectLowPrice,
                tcgdbMTGPriceCurrentSubTypeName: tcgPlayerMTGPrice.tcgPlayerMTGPriceSubTypeName,
            });

            await this.tcgdbMTGPriceCurrentRepository.save(newTCGdbMTGPrice);
            await this.tcgdbMTGPriceHistoryService.createTCGdbMTGPricesHistory(tcgdbMTGCard, tcgPlayerMTGPrice);
            
            tcgdbMTGPriceCurrentRecordCount++;
        }

        await this.tcgPlayerMTGPriceService.updateTCGPlayerMTGPricesIsProcessed();
        await this.tcgPlayerMTGPriceService.deleteTCGPlayerMTGPricesIsProcessed();
        
        return tcgdbMTGPriceCurrentRecordCount;

    } 
        */   
}


