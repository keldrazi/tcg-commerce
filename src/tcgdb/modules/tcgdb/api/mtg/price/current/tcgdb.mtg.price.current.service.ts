import { Injectable } from '@nestjs/common';
import { TCGdbAPIUtilService } from 'src/tcgdb/modules/tcgdb/api/util/tcgdb.api.util.service';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { map, catchError, lastValueFrom } from 'rxjs';
import { ForbiddenException } from '@nestjs/common';

@Injectable()
export class TCGdbMTGPriceCurrentService {

    constructor(
        private tcgdbAPIUtilService: TCGdbAPIUtilService,
        private configService: ConfigService,
        private httpService: HttpService,
    ) {}


    private tcgdbAPIURL = this.configService.get('TCGDB_API_URL');
    
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
    
    async getTCGdbMTGPricesCurrentByTCGdbId(tcgdbCardId: string) {
        
        const accessToken = await this.tcgdbAPIUtilService.getTCGdbAPIAccessToken();
        const url = this.tcgdbAPIURL + '/tcgdb/mtg/price/current/tcgdb/id/' + tcgdbCardId;
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

    async getTCGdbMTGPricesCurrentByTCGdbIdAndProductCardPrinting(tcgdbCardId: string, printingName: string) {
        
        const accessToken = await this.tcgdbAPIUtilService.getTCGdbAPIAccessToken();
        const url = this.tcgdbAPIURL + '/tcgdb/mtg/price/current/tcgdb/id/' + tcgdbCardId + '/printing/' + printingName;
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
