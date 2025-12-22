import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TCGdbMTGPriceChangeMonthlyDTO } from './dto/tcgdb.mtg.price.change.monthly.dto';
import { TCGdbAPIUtilService } from 'src/tcgdb/modules/tcgdb/api/util/tcgdb.api.util.service';
import { HttpService } from '@nestjs/axios';
import { map, catchError } from 'rxjs/operators';
import { lastValueFrom } from 'rxjs';
import { ForbiddenException } from '@nestjs/common';

@Injectable()
export class TCGdbMTGPriceChangeMonthlyService {

    constructor(
        private tcgdbAPIUtilService: TCGdbAPIUtilService,
        private httpService: HttpService,
        private configService: ConfigService,
    ) {}

    private tcgdbAPIURL = this.configService.get('TCGDB_API_URL');

    async getTCGdbMTGPriceChangeMonthlyBySet(setCode: string) {
        
        let tcgdbMTGPriceChangeMonthlyDTOs: TCGdbMTGPriceChangeMonthlyDTO[] = [];

        //GET ALL TCGDB CARDS BY SET CODE;
        const accessToken = await this.tcgdbAPIUtilService.getTCGdbAPIAccessToken();
        const url = this.tcgdbAPIURL + '/tcgdb/mtg/price/change/monthly/set/' + setCode;
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


