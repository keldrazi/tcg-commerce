import { HttpService } from '@nestjs/axios';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { map, catchError, lastValueFrom } from 'rxjs';
import { TCGdbPokemonRarityDTO } from './dto/tcgdb.pokemon.rarity.dto';
import { TCGdbAPIUtilService } from 'src/tcgdb/modules/tcgdb/api/util/tcgdb.api.util.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TCGdbPokemonRarityService {

    constructor(
        private tcgdbAPIUtilService: TCGdbAPIUtilService,
        private httpService: HttpService,
        private configService: ConfigService,
    ) {}

    private tcgdbAPIURL = this.configService.get('TCGDB_API_URL');
    
    async getTCGdbPokemonRarities() {
        
        let tcgdbPokemonRarityDTOs: TCGdbPokemonRarityDTO[] = [];

        //GET ALL TCGDB RARITIES;
        const accessToken = await this.tcgdbAPIUtilService.getTCGdbAPIAccessToken();

        const url = this.tcgdbAPIURL + '/tcgdb/pokemon/rarity/all';
        const headers = { 'Authorization': 'Bearer ' + accessToken };
        const response = this.httpService.get(url, { headers }).pipe(
            map(response => response.data),
            catchError(error => {
                throw new ForbiddenException(error.response.data);
            })
        );

        let data = await lastValueFrom(response);

        for(let i=0; i < data.length; i++) {
            const tcgdbPokemonRarity = data[i];
            
            let tcgdbPokemonRarityDTO: TCGdbPokemonRarityDTO = ({ ...tcgdbPokemonRarity });
                
            tcgdbPokemonRarityDTOs.push(tcgdbPokemonRarityDTO);
        }

        return tcgdbPokemonRarityDTOs;
    }
}


