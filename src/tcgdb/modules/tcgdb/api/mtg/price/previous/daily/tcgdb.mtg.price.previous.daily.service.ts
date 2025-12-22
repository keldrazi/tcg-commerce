import { Injectable } from '@nestjs/common';
import { TCGdbAPIUtilService } from 'src/tcgdb/modules/tcgdb/api/util/tcgdb.api.util.service';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { map, catchError, lastValueFrom } from 'rxjs';
import { ForbiddenException } from '@nestjs/common';

@Injectable()
export class TCGdbMTGPricePreviousDailyService {

    constructor(
        private tcgdbAPIUtilService: TCGdbAPIUtilService,
        private configService: ConfigService,
        private httpService: HttpService,
    ) {}


    private tcgdbAPIURL = this.configService.get('TCGDB_API_URL');
    
    async getTCGdbMTGPricePreviousDailyBySet(setCode: string) {
        
        //GET ALL TCGDB PRICES BY SET CODE;
        const accessToken = await this.tcgdbAPIUtilService.getTCGdbAPIAccessToken();
        const url = this.tcgdbAPIURL + '/tcgdb/mtg/price/previous/daily/set/' + setCode;
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
