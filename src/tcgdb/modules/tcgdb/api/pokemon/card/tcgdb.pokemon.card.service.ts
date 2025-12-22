import { HttpService } from '@nestjs/axios';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { map, catchError, lastValueFrom } from 'rxjs';
import { TCGdbPokemonCardDTO } from './dto/tcgdb.pokemon.card.dto';
import { TCGdbPokemonSetDTO } from 'src/tcgdb/modules/tcgdb/api/pokemon/set/dto/tcgdb.pokemon.set.dto';
import { TCGdbPokemonSetService } from 'src/tcgdb/modules/tcgdb/api/pokemon/set/tcgdb.pokemon.set.service';
import { TCGdbAPIUtilService } from 'src/tcgdb/modules/tcgdb/api/util/tcgdb.api.util.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TCGdbPokemonCardService {

    constructor(
        private tcgdbAPIUtilService: TCGdbAPIUtilService,
        private httpService: HttpService,
        private configService: ConfigService,
        private tcgdbPokemonSetService: TCGdbPokemonSetService,
    ) {}

    private tcgdbAPIURL = this.configService.get('TCGDB_API_URL');
    
    async getTCGdbPokemonCardsBySetCode(setCode: string) {
        
        let tcgdbPokemonCardDTOs: TCGdbPokemonCardDTO[] = [];
        
        //GET TCGDB SET BY SET CODE;
        let tcgdbPokemonSetDTO: TCGdbPokemonSetDTO = await this.tcgdbPokemonSetService.getTCGdbPokemonSetBySetCode(setCode);

        //GET ALL TCGDB CARDS BY SET CODE;
        const accessToken = await this.tcgdbAPIUtilService.getTCGdbAPIAccessToken();
        const url = this.tcgdbAPIURL + '/tcgdb/pokemon/card/set/code/' + setCode;
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

    async getTCGdbPokemonCardsBySetId(setId: string) {
        
        let tcgdbPokemonCardDTOs: TCGdbPokemonCardDTO[] = [];
        
        //GET TCGDB SET BY SET ID;
        let tcgdbPokemonSetDTO: TCGdbPokemonSetDTO = await this.tcgdbPokemonSetService.getTCGdbPokemonSetBySetId(setId);

        //GET ALL TCGDB CARDS BY SET CODE;
        const accessToken = await this.tcgdbAPIUtilService.getTCGdbAPIAccessToken();
        const url = this.tcgdbAPIURL + '/tcgdb/pokemon/card/set/id/' + setId;
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


