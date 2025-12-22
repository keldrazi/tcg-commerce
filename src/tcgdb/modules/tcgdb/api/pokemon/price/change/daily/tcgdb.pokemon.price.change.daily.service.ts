import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TCGdbPokemonPriceChangeDailyDTO } from './dto/tcgdb.pokemon.price.change.daily.dto';
import { TCGdbAPIUtilService } from 'src/tcgdb/modules/tcgdb/api/util/tcgdb.api.util.service';
import { HttpService } from '@nestjs/axios';
import { map, catchError } from 'rxjs/operators';
import { lastValueFrom } from 'rxjs';
import { ForbiddenException } from '@nestjs/common';

@Injectable()
export class TCGdbPokemonPriceChangeDailyService {

    constructor(
        private tcgdbAPIUtilService: TCGdbAPIUtilService,
        private httpService: HttpService,
        private configService: ConfigService,
    ) {}

    private tcgdbAPIURL = this.configService.get('TCGDB_API_URL');

    async getTCGdbPokemonPriceChangeDailyBySet(setCode: string) {
        
        let tcgdbPokemonPriceChangeDailyDTOs: TCGdbPokemonPriceChangeDailyDTO[] = [];

        //GET ALL TCGDB CARDS BY SET CODE;
        const accessToken = await this.tcgdbAPIUtilService.getTCGdbAPIAccessToken();
        const url = this.tcgdbAPIURL + '/tcgdb/pokemon/price/change/daily/set/' + setCode;
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

    async getTCGdbPokemonPriceChangeDailyChangesLowBySet(setCode: string) {
        let tcgdbPokemonPriceChangeDailyDTOs: TCGdbPokemonPriceChangeDailyDTO[] = [];

        //GET ALL TCGDB CARDS BY SET CODE;
        const accessToken = await this.tcgdbAPIUtilService.getTCGdbAPIAccessToken();
        const url = this.tcgdbAPIURL + '/tcgdb/pokemon/price/change/daily/set/' + setCode + '/changes/low';
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

    async getTCGdbPokemonPriceChangeDailyChangesMarketBySet(setCode: string) {
        let tcgdbPokemonPriceChangeDailyDTOs: TCGdbPokemonPriceChangeDailyDTO[] = [];

        //GET ALL TCGDB CARDS BY SET CODE;
        const accessToken = await this.tcgdbAPIUtilService.getTCGdbAPIAccessToken();
        const url = this.tcgdbAPIURL + '/tcgdb/pokemon/price/change/daily/set/' + setCode + '/changes/market';
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

    async getTCGdbPokemonPriceChangeDailyIncreaseBySet(setCode: string) {

        let tcgdbPokemonPriceChangeDailyDTOs: TCGdbPokemonPriceChangeDailyDTO[] = [];

        //GET ALL TCGDB CARDS BY SET CODE;
        const accessToken = await this.tcgdbAPIUtilService.getTCGdbAPIAccessToken();
        const url = this.tcgdbAPIURL + '/tcgdb/pokemon/price/change/daily/set/' + setCode + '/increase';
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

    async getTCGdbPokemonPriceChangeDailyDecreaseBySet(setCode: string) {

        let tcgdbPokemonPriceChangeDailyDTOs: TCGdbPokemonPriceChangeDailyDTO[] = [];

        //GET ALL TCGDB CARDS BY SET CODE;
        const accessToken = await this.tcgdbAPIUtilService.getTCGdbAPIAccessToken();
        const url = this.tcgdbAPIURL + '/tcgdb/pokemon/price/change/daily/set/' + setCode + '/decrease';
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


