import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TCGdbMTGPriceChangeDailyDTO } from './dto/tcgdb.mtg.price.change.daily.dto';
import { TCGdbAPIUtilService } from 'src/tcgdb/modules/tcgdb/api/util/tcgdb.api.util.service';
import { HttpService } from '@nestjs/axios';
import { map, catchError } from 'rxjs/operators';
import { lastValueFrom } from 'rxjs';
import { ForbiddenException } from '@nestjs/common';

@Injectable()
export class TCGdbMTGPriceChangeDailyService {

    constructor(
        private tcgdbAPIUtilService: TCGdbAPIUtilService,
        private httpService: HttpService,
        private configService: ConfigService,
    ) {}

    private tcgdbAPIURL = this.configService.get('TCGDB_API_URL');

    async getTCGdbMTGPriceChangeDailyBySet(setCode: string) {
        
        let tcgdbMTGPriceChangeDailyDTOs: TCGdbMTGPriceChangeDailyDTO[] = [];

        //GET ALL TCGDB CARDS BY SET CODE;
        const accessToken = await this.tcgdbAPIUtilService.getTCGdbAPIAccessToken();
        const url = this.tcgdbAPIURL + '/tcgdb/mtg/price/change/daily/set/' + setCode;
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

    async getTCGdbMTGPriceChangeDailyChangesLowBySet(setCode: string) {
        let tcgdbMTGPriceChangeDailyDTOs: TCGdbMTGPriceChangeDailyDTO[] = [];

        //GET ALL TCGDB CARDS BY SET CODE;
        const accessToken = await this.tcgdbAPIUtilService.getTCGdbAPIAccessToken();
        const url = this.tcgdbAPIURL + '/tcgdb/mtg/price/change/daily/set/' + setCode + '/changes/low';
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

    async getTCGdbMTGPriceChangeDailyChangesMarketBySet(setCode: string) {
        let tcgdbMTGPriceChangeDailyDTOs: TCGdbMTGPriceChangeDailyDTO[] = [];

        //GET ALL TCGDB CARDS BY SET CODE;
        const accessToken = await this.tcgdbAPIUtilService.getTCGdbAPIAccessToken();
        const url = this.tcgdbAPIURL + '/tcgdb/mtg/price/change/daily/set/' + setCode + '/changes/market';
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

    async getTCGdbMTGPriceChangeDailyIncreaseBySet(setCode: string) {

        let tcgdbMTGPriceChangeDailyDTOs: TCGdbMTGPriceChangeDailyDTO[] = [];

        //GET ALL TCGDB CARDS BY SET CODE;
        const accessToken = await this.tcgdbAPIUtilService.getTCGdbAPIAccessToken();
        const url = this.tcgdbAPIURL + '/tcgdb/mtg/price/change/daily/set/' + setCode + '/increase';
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

    async getTCGdbMTGPriceChangeDailyDecreaseBySet(setCode: string) {

        let tcgdbMTGPriceChangeDailyDTOs: TCGdbMTGPriceChangeDailyDTO[] = [];

        //GET ALL TCGDB CARDS BY SET CODE;
        const accessToken = await this.tcgdbAPIUtilService.getTCGdbAPIAccessToken();
        const url = this.tcgdbAPIURL + '/tcgdb/mtg/price/change/daily/set/' + setCode + '/decrease';
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


}


