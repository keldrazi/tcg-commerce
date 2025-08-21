import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TCGPlayerPokemonSetService } from 'src/tcgdb/modules/tcgplayer/pokemon/set/tcgplayer.pokemon.set.service';
import { ScryfallPokemonSetService } from 'src/tcgdb/modules/scryfall/pokemon/set/scryfall.pokemon.set.service';
import { TCGdbPokemonSetDTO } from './dto/tcgdb.pokemon.set.dto';
import { TCGdbPokemonSet } from 'src/typeorm/entities/tcgdb/modules/tcgdb/pokemon/set/tcgdb.pokemon.set.entity';

@Injectable()
export class TCGdbPokemonSetService {

    constructor(
        @InjectRepository(TCGdbPokemonSet) private tcgdbPokemonSetRepository: Repository<TCGdbPokemonSet>, 
        private tcgPlayerPokemonSetService: TCGPlayerPokemonSetService,
        private scryfallPokemonSetService: ScryfallPokemonSetService,
    ) {}
    
    async getTCGdbPokemonSets() {
        
        let tcgdbPokemonSetDTOs: TCGdbPokemonSetDTO[] = [];

        //GET ALL TCGDB SETS;
        const tcgdbPokemonSets = await this.tcgdbPokemonSetRepository.find();

        for(let i=0; i < tcgdbPokemonSets.length; i++) {
            const tcgdbPokemonSet = tcgdbPokemonSets[i];
            
            let tcgdbPokemonSetDTO: TCGdbPokemonSetDTO = ({ ...tcgdbPokemonSet });

            tcgdbPokemonSetDTOs.push(tcgdbPokemonSetDTO);
        }

        return tcgdbPokemonSetDTOs;
    }

    async getTCGdbPokemonSetByTCGdbId(tcgdbId: string) {

        const tcgdbPokemonSet = await this.tcgdbPokemonSetRepository.findOne({
            where: {
                tcgdbPokemonSetId: tcgdbId,
            }
        })

        //TO DO: CREATE AN ERROR TO RETURN;
        if(tcgdbPokemonSet == null) {
            return null;
        }

        let tcgdbPokemonSetDTO: TCGdbPokemonSetDTO = ({ ...tcgdbPokemonSet });

        return tcgdbPokemonSetDTO;
    }
    
    async getTCGdbPokemonSetByTCGPlayerId(tcgPlayerId: number) {

        const tcgdbPokemonSet = await this.tcgdbPokemonSetRepository.findOne({
            where: {
                tcgdbPokemonSetTCGPlayerId: tcgPlayerId,
            }
        })

        if(tcgdbPokemonSet == null) {
            return null;
        }

        let tcgdbPokemonSetDTO: TCGdbPokemonSetDTO = ({ ...tcgdbPokemonSet });
        
        return tcgdbPokemonSetDTO;
    }

    
    async getTCGdbPokemonSetBySetCode(setCode: string) {

        const tcgdbPokemonSet = await this.tcgdbPokemonSetRepository.findOne({
            where: {
                tcgdbPokemonSetCode: setCode,
            }
        })

        //TO DO: CREATE AN ERROR TO RETURN;
        if(tcgdbPokemonSet == null) {
            return null;
        }

        let tcgdbPokemonSetDTO: TCGdbPokemonSetDTO = ({ ...tcgdbPokemonSet });

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

        let tcgdbPokemonSetDTO: TCGdbPokemonSetDTO = ({ ...tcgdbPokemonSet });

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
                const newTCGdgPokemonSet = this.tcgdbPokemonSetRepository.create({
                    tcgdbPokemonSetTCGPlayerId: tcgPlayerPokemonSet.tcgPlayerPokemonSetGroupId,
                    tcgdbPokemonSetCode: tcgPlayerPokemonSet.tcgPlayerPokemonSetCode,
                    tcgdbPokemonSetName: tcgPlayerPokemonSet.tcgPlayerPokemonSetName,
                    tcgdbPokemonSetPublishedOn: tcgPlayerPokemonSet.tcgPlayerPokemonSetPublishedOn,
                    tcgdbPokemonSetTotalCards: tcgPlayerPokemonSet.tcgPlayerPokemonSetTotalCards,
                });

                let scryfallPokemonSet = await this.scryfallPokemonSetService.getScryfallPokemonSetByTCGPlayerId(tcgPlayerPokemonSet.tcgPlayerPokemonSetGroupId);

                if(scryfallPokemonSet != null) {
                    newTCGdgPokemonSet.tcgdbPokemonSetScryfallId = scryfallPokemonSet.scryfallPokemonSetScryfallId;
                }

                await this.tcgdbPokemonSetRepository.save(newTCGdgPokemonSet);

                tcgdbPokemonSetRecordCount++;
            }
        }

        return tcgdbPokemonSetRecordCount;

    }
}


