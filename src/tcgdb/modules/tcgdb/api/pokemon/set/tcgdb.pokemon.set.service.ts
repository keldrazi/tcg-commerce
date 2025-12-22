
import { HttpService } from '@nestjs/axios';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { map, catchError, lastValueFrom } from 'rxjs';
import { TCGdbPokemonSetDTO } from './dto/tcgdb.pokemon.set.dto';
import { TCGdbAPIUtilService } from 'src/tcgdb/modules/tcgdb/api/util/tcgdb.api.util.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TCGdbPokemonSetService {

    constructor(
        private tcgdbAPIUtilService: TCGdbAPIUtilService,
        private httpService: HttpService,
        private configService: ConfigService,
    ) {}

    private tcgdbAPIURL = this.configService.get('TCGDB_API_URL');
    
    async getTCGdbPokemonSets() {
        
        let tcgdbPokemonSetDTOs: TCGdbPokemonSetDTO[] = [];

        //GET ALL TCGDB SETS;
        const accessToken = await this.tcgdbAPIUtilService.getTCGdbAPIAccessToken();

        const url = this.tcgdbAPIURL + '/tcgdb/pokemon/set/all';
        const headers = { 'Authorization': 'Bearer ' + accessToken };
        const response = this.httpService.get(url, { headers }).pipe(
            map(response => response.data),
            catchError(error => {
                throw new ForbiddenException(error.response.data);
            })
        );

        let data = await lastValueFrom(response);

        for(let i=0; i < data.length; i++) {
            const tcgdbPokemonSet = data[i];
            
            let tcgdbPokemonSetDTO: TCGdbPokemonSetDTO = ({ ...tcgdbPokemonSet });

            tcgdbPokemonSetDTOs.push(tcgdbPokemonSetDTO);
        }

        return tcgdbPokemonSetDTOs;

    }

    async getTCGdbPokemonSetBySetCode(setCode: string) {

        //GET TCGDB SET BY SET CODE;
        const accessToken = await this.tcgdbAPIUtilService.getTCGdbAPIAccessToken();

        const url = this.tcgdbAPIURL + '/tcgdb/pokemon/set/code/' + setCode;
        const headers = { 'Authorization': 'Bearer ' + accessToken };
        const response = this.httpService.get(url, { headers }).pipe(
            map(response => response.data),
            catchError(error => {
                throw new ForbiddenException(error.response.data);
            })
        );

        let data = await lastValueFrom(response);

        let tcgdbPokemonSetDTO: TCGdbPokemonSetDTO = ({ ...data });

        return tcgdbPokemonSetDTO;
        
    }

    async getTCGdbPokemonSetBySetId(setId: string) {

        //GET TCGDB SET BY SET CODE;
        const accessToken = await this.tcgdbAPIUtilService.getTCGdbAPIAccessToken();

        const url = this.tcgdbAPIURL + '/tcgdb/pokemon/set/id/' + setId;
        const headers = { 'Authorization': 'Bearer ' + accessToken };
        const response = this.httpService.get(url, { headers }).pipe(
            map(response => response.data),
            catchError(error => {
                throw new ForbiddenException(error.response.data);
            })
        );

        let data = await lastValueFrom(response);

        let tcgdbPokemonSetDTO: TCGdbPokemonSetDTO = ({ ...data });

        return tcgdbPokemonSetDTO;
        
    }

}


