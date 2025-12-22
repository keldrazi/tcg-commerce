import { HttpService } from '@nestjs/axios';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { map, catchError, lastValueFrom } from 'rxjs';
import { TCGdbPokemonConditionDTO } from './dto/tcgdb.pokemon.condition.dto';
import { TCGdbAPIUtilService } from 'src/tcgdb/modules/tcgdb/api/util/tcgdb.api.util.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TCGdbPokemonConditionService {

    constructor(
        private tcgdbAPIUtilService: TCGdbAPIUtilService,
        private httpService: HttpService,
        private configService: ConfigService,
    ) {}

    private tcgdbAPIURL = this.configService.get('TCGDB_API_URL');
    
    async getTCGdbPokemonConditions() {
        
        let tcgdbPokemonConditionDTOs: TCGdbPokemonConditionDTO[] = [];

        //GET ALL TCGDB CONDITIONS;
        const accessToken = await this.tcgdbAPIUtilService.getTCGdbAPIAccessToken();

        const url = this.tcgdbAPIURL + '/tcgdb/pokemon/condition/all';
        const headers = { 'Authorization': 'Bearer ' + accessToken };
        const response = this.httpService.get(url, { headers }).pipe(
            map(response => response.data),
            catchError(error => {
                throw new ForbiddenException(error.response.data);
            })
        );

        let data = await lastValueFrom(response);

        for(let i=0; i < data.length; i++) {
            const tcgdbPokemonCondition = data[i];
            
            let tcgdbPokemonConditionDTO: TCGdbPokemonConditionDTO = ({ ...tcgdbPokemonCondition });

            tcgdbPokemonConditionDTOs.push(tcgdbPokemonConditionDTO);
        }

        return tcgdbPokemonConditionDTOs;
    }

}


