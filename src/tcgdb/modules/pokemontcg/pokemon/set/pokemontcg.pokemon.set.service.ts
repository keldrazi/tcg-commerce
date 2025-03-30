import { Injectable, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpService } from '@nestjs/axios';
import { map, catchError, lastValueFrom } from 'rxjs';
import { Repository } from 'typeorm';
import { PokemonTCGPokemonSet } from 'src/typeorm/entities/tcgdb/modules/tcgdb/pokemontcgtcg/pokemon/set/pokemontcg.pokemon.set.entity';
import { PokemonTCGAPISetService } from 'src/tcgdb/modules/pokemontcg/api/set/pokemontcg.api.set.service';

@Injectable()
export class PokemonTCGPokemonSetService {

    constructor(
        @InjectRepository(PokemonTCGPokemonSet) private pokemonTCGPokemonSetRepository: Repository<PokemonTCGPokemonSet>,
        private httpService: HttpService,
        private pokemonTCGAPISetService: PokemonTCGAPISetService,
    ) {}

    private POKEMON_TCG_SET_SEARCH_URI = 'https://api.pokemontcg.io/v2/cards?q=set.id:';

    async getPokemonTCGPokemonSets() {
        const pokemonTCGPokemonSets = await this.pokemonTCGPokemonSetRepository.find();
        
        return pokemonTCGPokemonSets;
    }

    async getPokemonTCGPokemonSetByPokemonTCGId(pokemonTCGPokemonSetId: string) {
        const pokemonTCGPokemonSet = await this.pokemonTCGPokemonSetRepository.findOne({
            where: {
                pokemonTCGPokemonSetPokemonTCGId: pokemonTCGPokemonSetId,
            }
        });

        return pokemonTCGPokemonSet;
    }

    async getPokemonTCGPokemonSetByTCGPlayerId(tcgPlayerId: number) {
        const pokemonTCGPokemonSet = await this.pokemonTCGPokemonSetRepository.findOne({
            where: {
                pokemonTCGPokemonSetTCGPlayerId: tcgPlayerId,
            }
        });

        return pokemonTCGPokemonSet;
    }

    async createPokemonTCGPokemonSets() {
        
        let pokemonTCGPokemonSetRecordCount = 0;

        let pokemonTCGPokemonSets = await this.pokemonTCGAPISetService.getPokemonTCGAPISets();

        for(let i = 0; i < pokemonTCGPokemonSets.length; i++) {
            
            const pokemonTCGPokemonSet = pokemonTCGPokemonSets[i];
            
            //CHECK TO SEE IF THE SET EXISTS;
            const pokemonTCGSetCheck = await this.getPokemonTCGPokemonSetByPokemonTCGId(pokemonTCGPokemonSet.id);
            
            //SET DOESN'T EXIST - CREATE SET;
            if(pokemonTCGSetCheck == null) {

                let pokemonTCGPokemonSetSearchURI = this.POKEMON_TCG_SET_SEARCH_URI + pokemonTCGPokemonSet.id;
                
                const newPokemonTCGPokemonSet = this.pokemonTCGPokemonSetRepository.create({    
                    pokemonTCGPokemonSetPokemonTCGId: pokemonTCGPokemonSet.id,
                    pokemonTCGPokemonSetName: pokemonTCGPokemonSet.name,
                    pokemonTCGPokemonSetSeries: pokemonTCGPokemonSet.series,
                    pokemonTCGPokemonSetPtcgoCode: pokemonTCGPokemonSet.ptcgoCode,
                    pokemonTCGPokemonSetSymbolImage: pokemonTCGPokemonSet.images.symbol,
                    pokemonTCGPokemonSetLogoImage: pokemonTCGPokemonSet.images.logo,
                    pokemonTCGPokemonSetTotal: pokemonTCGPokemonSet.total,
                    pokemonTCGPokemonSetPrintedTotal: pokemonTCGPokemonSet.printedTotal,
                    pokemonTCGPokemonSetReleaseDate: pokemonTCGPokemonSet.releaseDate,
                    pokemonTCGPokemonSetSearchURI: pokemonTCGPokemonSetSearchURI,
                    pokemonTCGPokemonSetData: pokemonTCGPokemonSet,
                });

                this.pokemonTCGPokemonSetRepository.save(newPokemonTCGPokemonSet);
                
                pokemonTCGPokemonSetRecordCount++;
            }
        }

        return pokemonTCGPokemonSetRecordCount;
    }
}


