import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { TCGPlayerPokemonCondition } from 'src/typeorm/entities/tcgdb/modules/tcgplayer/pokemon/condition/tcgplayer.pokemon.condition.entity';
import { Repository } from 'typeorm';
import { TCGPlayerAPIConditionService } from 'src/tcgdb/modules/tcgplayer/api/condition/tcgplayer.api.condition.service';

@Injectable()
export class TCGPlayerPokemonConditionService {

    constructor(
        @InjectRepository(TCGPlayerPokemonCondition) private tcgPlayerPokemonConditionRepository: Repository<TCGPlayerPokemonCondition>, 
        private tcgPlayerAPIConditionService: TCGPlayerAPIConditionService,
    ) {}

    private tcgPlayerPokemonCategoryId = '1';

    async getTCGPlayerPokemonConditions() {
        return await this.tcgPlayerPokemonConditionRepository.find();
    }

    async getTCGPlayerPokemonConditionByConditionCode(conditionCode: string) {
        let tcgPlayerPokemonCondition = await this.tcgPlayerPokemonConditionRepository.findOne({
            where: {
                tcgPlayerPokemonConditionCode: conditionCode,
            }
        });

        return tcgPlayerPokemonCondition;
    }

    async getTCGPlayerPokemonConditionByConditionName(conditionName: string) {
        let tcgPlayerCondition = await this.tcgPlayerPokemonConditionRepository.findOne({
            where: {
                tcgPlayerPokemonConditionName: conditionName,
            }
        });

        return tcgPlayerCondition;
    }

    async createTCGPlayerPokemonConditions() {

        let tcgPlayerPokemonConditionRecordCount = 0;
        let tcgPlayerPokemonConditions = await this.tcgPlayerAPIConditionService.getTCGPlayerAPIConditionsByCategoryId(this.tcgPlayerPokemonCategoryId);
        for(let i = 0; i < tcgPlayerPokemonConditions.length; i++) {
            let tcgPlayerPokemonCondition = tcgPlayerPokemonConditions[i];
            
            //CHECK TO SEE IF THE CONDITION EXISTS;
            let tcgPlayerPokemonConditionCheck = await this.getTCGPlayerPokemonConditionByConditionName(tcgPlayerPokemonCondition.name);
            
            //CONDITION DOESN'T EXIST - CREATE CONDITION;
            if(tcgPlayerPokemonConditionCheck == null) {
                
                let newTCGPlayerPokemonCondition = this.tcgPlayerPokemonConditionRepository.create({
                    tcgPlayerPokemonConditionId: tcgPlayerPokemonCondition.conditionId,
                    tcgPlayerPokemonConditionName: tcgPlayerPokemonCondition.name,
                    tcgPlayerPokemonConditionCode: tcgPlayerPokemonCondition.abbreviation,
                    tcgPlayerPokemonConditionDisplayOrder: tcgPlayerPokemonCondition.displayOrder,
                });

                await this.tcgPlayerPokemonConditionRepository.save(newTCGPlayerPokemonCondition);

                tcgPlayerPokemonConditionRecordCount++;
            }
        }
        
        return tcgPlayerPokemonConditionRecordCount;
    }
}


