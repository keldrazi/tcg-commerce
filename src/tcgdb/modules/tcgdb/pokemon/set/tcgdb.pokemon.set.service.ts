import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TCGPlayerPokemonSetService } from 'src/tcgdb/modules/tcgplayer/pokemon/set/tcgplayer.pokemon.set.service';
import { PokemonTCGPokemonSetService } from 'src/tcgdb/modules/pokemontcg/pokemon/set/pokemontcg.pokemon.set.service';
import { TCGdbPokemonSetsDTO,TCGdbPokemonSetDTO } from './dto/tcgdb.pokemon.set.dto';
import { TCGdbPokemonSet } from 'src/typeorm/entities/tcgdb/modules/tcgdb/pokemontcg/set/tcgdb.pokemon.set.entity';

@Injectable()
export class TCGdbPokemonSetService {

    constructor(
        @InjectRepository(TCGdbPokemonSet) private tcgdbPokemonSetRepository: Repository<TCGdbPokemonSet>, 
        private tcgPlayerPokemonSetService: TCGPlayerPokemonSetService,
        private pokemonTCGPokemonSetService: PokemonTCGPokemonSetService,
    ) {}

    async getTCGdbPokemonSets() {
        
        let tcgdbPokemonSetDTOs: TCGdbPokemonSetDTO[] = [];

        //GET ALL TCGPLAYER SETS;
        const tcgdbPokemonSets = await this.tcgdbPokemonSetRepository.find();

        for(let i=0; i < tcgdbPokemonSets.length; i++) {
            const tcgdbPokemonSet = tcgdbPokemonSets[i];
            
            let tcgdbPokemonSetDTO: TCGdbPokemonSetDTO = {
                tcgdbPokemonSetId: tcgdbPokemonSet.tcgdbPokemonSetId,
                tcgdbPokemonSetTCGPlayerId: tcgdbPokemonSet.tcgdbPokemonSetTCGPlayerId,
                tcgdbPokemonSetPokemonTCGId: tcgdbPokemonSet.tcgdbPokemonSetPokemonTCGId,
                tcgdbPokemonSetAbbreviation: tcgdbPokemonSet.tcgdbPokemonSetAbbreviation,
                tcgdbPokemonSetName: tcgdbPokemonSet.tcgdbPokemonSetName,
                tcgdbPokemonSetPublishedOn: tcgdbPokemonSet.tcgdbPokemonSetPublishedOn,
                tcgdbPokemonSetTotalCards: tcgdbPokemonSet.tcgdbPokemonSetTotalCards,
            }

            let pokemonTCGPokemonSet = await this.pokemonTCGPokemonSetService.getPokemonTCGPokemonSetByTCGPlayerId(tcgdbPokemonSet.tcgdbPokemonSetTCGPlayerId);

            if(pokemonTCGPokemonSet != null) {
                tcgdbPokemonSetDTO.tcgdbPokemonSetPokemonTCGId = pokemonTCGPokemonSet.pokemonTCGPokemonSetPokemonTCGId;
            }

            tcgdbPokemonSetDTOs.push(tcgdbPokemonSetDTO);
        }

        let tcgdbPokemonSetsDTO: TCGdbPokemonSetsDTO = {
            tcgdbPokemonSets: tcgdbPokemonSetDTOs,
        }

        return tcgdbPokemonSetsDTO;
    }

    async getTCGdbPokemonSetByTCGPlayerId(tcgPlayerId: number) {

        const tcgdbPokemonSet = this.tcgdbPokemonSetRepository.findOne({
            where: {
                tcgdbPokemonSetTCGPlayerId: tcgPlayerId,
            }
        })

        return tcgdbPokemonSet;
    }

    async getTCGdbPokemonSetBySetAbbreviation(setAbbreviation: string) {


        const tcgdbPokemonSet = await this.tcgdbPokemonSetRepository.findOne({
            where: {
                tcgdbPokemonSetAbbreviation: setAbbreviation,
            }
        })

        //TO DO: CREATE AN ERROR TO RETURN;
        if(tcgdbPokemonSet == null) {
            return null;
        }

        let tcgdbPokemonSetDTO: TCGdbPokemonSetDTO = {
            tcgdbPokemonSetId: tcgdbPokemonSet.tcgdbPokemonSetId,
            tcgdbPokemonSetTCGPlayerId: tcgdbPokemonSet.tcgdbPokemonSetTCGPlayerId,
            tcgdbPokemonSetPokemonTCGId: tcgdbPokemonSet.tcgdbPokemonSetPokemonTCGId,
            tcgdbPokemonSetAbbreviation: tcgdbPokemonSet.tcgdbPokemonSetAbbreviation,
            tcgdbPokemonSetName: tcgdbPokemonSet.tcgdbPokemonSetName,
            tcgdbPokemonSetPublishedOn: tcgdbPokemonSet.tcgdbPokemonSetPublishedOn,
            tcgdbPokemonSetTotalCards: tcgdbPokemonSet.tcgdbPokemonSetTotalCards,
        }

        return tcgdbPokemonSetDTO;
        
    }

    async getTCGdbPokemonSetBySetName(setName: string) {
        
        const tcgdbPokemonSet = await this.tcgdbPokemonSetRepository.findOne({
            where: {
                tcgdbPokemonSetName: setName,
            }
        })

        //TO DO: CREATE AN ERROR TO RETURN;
        if(tcgdbPokemonSet == null) {
            return null;
        }

        let tcgdbPokemonSetDTO: TCGdbPokemonSetDTO = {
            tcgdbPokemonSetId: tcgdbPokemonSet.tcgdbPokemonSetId,
            tcgdbPokemonSetTCGPlayerId: tcgdbPokemonSet.tcgdbPokemonSetTCGPlayerId,
            tcgdbPokemonSetPokemonTCGId: tcgdbPokemonSet.tcgdbPokemonSetPokemonTCGId,
            tcgdbPokemonSetAbbreviation: tcgdbPokemonSet.tcgdbPokemonSetAbbreviation,
            tcgdbPokemonSetName: tcgdbPokemonSet.tcgdbPokemonSetName,
            tcgdbPokemonSetPublishedOn: tcgdbPokemonSet.tcgdbPokemonSetPublishedOn,
            tcgdbPokemonSetTotalCards: tcgdbPokemonSet.tcgdbPokemonSetTotalCards,
        }

        return tcgdbPokemonSetDTO;
    }

    async createTCGdbPokemonSets() {
        let tcgdbPokemonSetRecordCount = 0;

        let tcgPlayerPokemonSets = await this.tcgPlayerPokemonSetService.getTCGPlayerPokemonSets();

        for(let i=0; i < tcgPlayerPokemonSets.length; i++) {
            let tcgPlayerPokemonSet = tcgPlayerPokemonSets[i];

            //CHECK TO SEE IF THE SET EXISTS;
            let tcgdbPokemonSet = await this.getTCGdbPokemonSetByTCGPlayerId(tcgPlayerPokemonSet.tcgPlayerPokemonSetGroupId);

            //SET DOESN'T EXIST - CREATE IT;
            if(tcgdbPokemonSet == null) {
                const newTCGdbPokemonSet = this.tcgdbPokemonSetRepository.create({
                    tcgdbPokemonSetTCGPlayerId: tcgPlayerPokemonSet.tcgPlayerPokemonSetGroupId,
                    tcgdbPokemonSetAbbreviation: tcgPlayerPokemonSet.tcgPlayerPokemonSetAbbreviation,
                    tcgdbPokemonSetName: tcgPlayerPokemonSet.tcgPlayerPokemonSetName,
                    tcgdbPokemonSetPublishedOn: tcgPlayerPokemonSet.tcgPlayerPokemonSetPublishedOn,
                    tcgdbPokemonSetTotalCards: tcgPlayerPokemonSet.tcgPlayerPokemonSetTotalCards,
                });

                let pokemonTCGPokemonSet = await this.pokemonTCGPokemonSetService.getPokemonTCGPokemonSetByTCGPlayerId(tcgPlayerPokemonSet.tcgPlayerPokemonSetGroupId);

                if(pokemonTCGPokemonSet != null) {
                    newTCGdbPokemonSet.tcgdbPokemonSetPokemonTCGId = pokemonTCGPokemonSet.pokemonTCGPokemonSetPokemonTCGId;
                }

                await this.tcgdbPokemonSetRepository.save(newTCGdbPokemonSet);
                
                tcgdbPokemonSetRecordCount++;
            }
        }

        return tcgdbPokemonSetRecordCount;

    }
}


