import { Injectable } from '@nestjs/common';
import { TCGdbAPIUtilService } from 'src/tcgdb/modules/tcgdb/api/util/tcgdb.api.util.service';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { map, catchError, lastValueFrom } from 'rxjs';
import { ForbiddenException } from '@nestjs/common';

@Injectable()
export class TCGdbPokemonPriceCurrentService {

    constructor(
        private tcgdbAPIUtilService: TCGdbAPIUtilService,
        private configService: ConfigService,
        private httpService: HttpService,
    ) {}


    private tcgdbAPIURL = this.configService.get('TCGDB_API_URL');
    
    async getTCGdbPokemonPricesCurrentBySetCode(setCode: string) {
        
        //GET ALL TCGDB PRICES BY SET CODE;
        const accessToken = await this.tcgdbAPIUtilService.getTCGdbAPIAccessToken();
        const url = this.tcgdbAPIURL + '/tcgdb/pokemon/price/current/set/code/' + setCode;
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
    
    async getTCGdbPokemonPricesCurrentBySetId(tcgdbSetId: string) {
        
        //GET ALL TCGDB PRICES BY SET ID;
        const accessToken = await this.tcgdbAPIUtilService.getTCGdbAPIAccessToken();
        const url = this.tcgdbAPIURL + '/tcgdb/pokemon/price/current/set/id/' + tcgdbSetId;
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
    
    async getTCGdbPokemonPricesCurrentByTCGdbId(tcgdbCardId: string) {
        
        const accessToken = await this.tcgdbAPIUtilService.getTCGdbAPIAccessToken();
        const url = this.tcgdbAPIURL + '/tcgdb/pokemon/price/current/tcgdb/id/' + tcgdbCardId;
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

    async getTCGdbPokemonPricesCurrentByTCGdbIdAndProductCardPrinting(tcgdbCardId: string, printingName: string) {
        
        const accessToken = await this.tcgdbAPIUtilService.getTCGdbAPIAccessToken();
        const url = this.tcgdbAPIURL + '/tcgdb/pokemon/price/current/tcgdb/id/' + tcgdbCardId + '/printing/' + printingName;
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
