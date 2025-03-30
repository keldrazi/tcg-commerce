import { HttpService } from '@nestjs/axios';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { map, catchError, lastValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PokemonTCGAPISetService {

    constructor(
        private httpService: HttpService,
        private configService: ConfigService,  
    ) {}

    private pokemonTCGAPISetURI = 'https://api.pokemontcg.io/v2/sets';
    
    async getPokemonTCGAPISets() {

        const headers = {
            'X-Api-Key': this.configService.get('POKEMON_TCG_IO_API_KEY')
        }

        const request = this.httpService.get(this.pokemonTCGAPISetURI, {headers: headers})
            .pipe(map((response) => response.data))
            .pipe(
                catchError(() => {
                  throw new ForbiddenException('API not available: ' + this.pokemonTCGAPISetURI);
                }),
              );

        const setData = await lastValueFrom(request);

        return setData.data;
        
    }
}


