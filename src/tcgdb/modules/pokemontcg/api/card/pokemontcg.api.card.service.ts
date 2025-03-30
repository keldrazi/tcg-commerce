import { HttpService } from '@nestjs/axios';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { map, catchError, lastValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';


@Injectable()
export class PokemonTCGAPICardService {

    constructor(
        private httpService: HttpService, 
        private configService: ConfigService, 
    ) {}


    
    async getPokemonTCGAPICardsByPokemonTCGSet(pokemonTCGSet: any) {

        let pokemonTCGCardData: any[] = [];
        pokemonTCGCardData = await this.getPokemonTCGAPICardsBySetSearchURI(pokemonTCGSet.pokemonTCGPokemonSetSearchURI, pokemonTCGSet.pokemonTCGPokemonSetSearchURI, 1, pokemonTCGCardData);

        return pokemonTCGCardData;
    }

    async getPokemonTCGAPICardsBySetSearchURI(setSearchURI: string, setSearchBaseURI: string, page: number, pokemonTCGCardData: any[]) {

        const headers = {
            'X-Api-Key': this.configService.get('POKEMON_TCG_IO_API_KEY')
        }

        const request = this.httpService.get(setSearchURI, { headers: headers })
            .pipe(map((response) => response.data))
            .pipe(
                catchError(() => {
                  throw new ForbiddenException('API not available');
                }),
              );

        const data = await lastValueFrom(request);
        const pokemonTCGCardDataResult = data.data;

        pokemonTCGCardData = pokemonTCGCardData.concat(pokemonTCGCardDataResult);

        if(data.count == 250) {
            var nextPage = page + 1;
            var nextSetSearchURI = setSearchBaseURI + '&page=' + nextPage.toString();
            await this.getPokemonTCGAPICardsBySetSearchURI(nextSetSearchURI, setSearchBaseURI, nextPage, pokemonTCGCardData);
        }
        
        
        return pokemonTCGCardData;
    }

}


