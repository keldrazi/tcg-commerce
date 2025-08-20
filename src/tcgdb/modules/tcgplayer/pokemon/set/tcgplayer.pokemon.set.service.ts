import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { TCGPlayerPokemonSet } from 'src/typeorm/entities/tcgdb/modules/tcgplayer/pokemon/set/tcgplayer.pokemon.set.entity';
import { Repository } from 'typeorm';
import { TCGPlayerAPISetService } from 'src/tcgdb/modules/tcgplayer/api/set/tcgplayer.api.set.service';

@Injectable()
export class TCGPlayerPokemonSetService {

    constructor(
        @InjectRepository(TCGPlayerPokemonSet) private tcgPlayerPokemonSetRepository: Repository<TCGPlayerPokemonSet>, 
        private tcgPlayerAPISetService: TCGPlayerAPISetService,
    ) {}

    private tcgPlayerPokemonCategoryId = '3';


    async getTCGPlayerPokemonSets() {
        return await this.tcgPlayerPokemonSetRepository.find();
    }

    async getTCGPlayerPokemonSetByGroupId(groupId: number) {
        return await this.tcgPlayerPokemonSetRepository.findOne({
            where: {
                tcgPlayerPokemonSetGroupId: groupId,
            }
        });
    }

    async getTCGPlayerPokemonSetBySetCode(setCode: string) {
        return await this.tcgPlayerPokemonSetRepository.findOne({
            where: {
                tcgPlayerPokemonSetCode: setCode,
            }
        });
    }

    async getTCGPlayerPokemonSetBySetName(setName: string) {
        return await this.tcgPlayerPokemonSetRepository.findOne({
            where: {
                tcgPlayerPokemonSetName: setName,
            }
        });
    }
    
    async createTCGPlayerPokemonSets() {

        let tcgPlayerPokemonSetRecordCount = 0;
        let tcgPlayerPokemonSets = await this.tcgPlayerAPISetService.getTCGPlayerAPISetsByCategoryId(this.tcgPlayerPokemonCategoryId);
        
        for(let i = 0; i < tcgPlayerPokemonSets.length; i++) {
            const tcgPlayerPokemonSet: any = tcgPlayerPokemonSets[i];

            //GET THE TOTAL CARD COUNT FOR THE SET;
            let totalCards = 0;
            try {
                totalCards = await this.tcgPlayerAPISetService.getTCGPlayerAPISetCardCountByGroupId(tcgPlayerPokemonSet.groupId);
            } catch(e) {
                totalCards = 0;
            }

            console.log(totalCards);

            const newTCGPlayerPokemonSet = this.tcgPlayerPokemonSetRepository.create({
                tcgPlayerPokemonSetGroupId: tcgPlayerPokemonSet.groupId,
                tcgPlayerPokemonSetName: tcgPlayerPokemonSet.name,
                tcgPlayerPokemonSetCode: tcgPlayerPokemonSet.abbreviation,
                tcgPlayerPokemonSetIsSupplemental: tcgPlayerPokemonSet.isSupplemental,
                tcgPlayerPokemonSetTotalCards: totalCards,
                tcgPlayerPokemonSetPublishedOn: tcgPlayerPokemonSet.publishedOn,
                tcgPlayerPokemonSetModifiedOn: tcgPlayerPokemonSet.modifiedOn
            });

            await this.tcgPlayerPokemonSetRepository.save(newTCGPlayerPokemonSet);

            tcgPlayerPokemonSetRecordCount++;
        }

        return tcgPlayerPokemonSetRecordCount;
        
    }
        
}


