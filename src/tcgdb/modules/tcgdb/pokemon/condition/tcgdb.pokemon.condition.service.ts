import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TCGPlayerPokemonConditionService } from 'src/tcgdb/modules/tcgplayer/pokemon/condition/tcgplayer.pokemon.condition.service';
import { TCGdbPokemonConditionDTO } from './dto/tcgdb.pokemon.condition.dto';
import { TCGdbPokemonCondition } from 'src/typeorm/entities/tcgdb/modules/tcgdb/pokemon/condition/tcgdb.pokemon.condition.entity';

@Injectable()
export class TCGdbPokemonConditionService {

    constructor(
        @InjectRepository(TCGdbPokemonCondition) private tcgdbPokemonConditionRepository: Repository<TCGdbPokemonCondition>, 
        private tcgPlayerPokemonConditionService: TCGPlayerPokemonConditionService,
    ) {}
    
    async getTCGdbPokemonConditions() {
        
        let tcgdbPokemonConditionDTOs: TCGdbPokemonConditionDTO[] = [];

        //GET ALL TCGDB SETS;
        const tcgdbPokemonConditions = await this.tcgdbPokemonConditionRepository.find();

        for(let i=0; i < tcgdbPokemonConditions.length; i++) {
            const tcgdbPokemonCondition = tcgdbPokemonConditions[i];
            
            let tcgdbPokemonConditionDTO: TCGdbPokemonConditionDTO = ({ ...tcgdbPokemonCondition });

            tcgdbPokemonConditionDTOs.push(tcgdbPokemonConditionDTO);
        }

        return tcgdbPokemonConditionDTOs;
    }

    async getTCGdbPokemonConditionByTCGPlayerId(tcgPlayerId: number) {
        let tcgdbPokemonCondition = await this.tcgdbPokemonConditionRepository.findOne({
            where: {
                tcgdbPokemonConditionTCGPlayerId: tcgPlayerId,
            }
        });

        if(tcgdbPokemonCondition == null) {
            return null;
        }

        let tcgdbPokemonConditionDTO: TCGdbPokemonConditionDTO = ({ ...tcgdbPokemonCondition });

        return tcgdbPokemonConditionDTO;
    }

    async createTCGdbPokemonConditions() {
        
        let tcgdbPokemonConditionRecordCount = 0;

        let tcgPlayerPokemonConditions = await this.tcgPlayerPokemonConditionService.getTCGPlayerPokemonConditions();

        for(let i=0; i < tcgPlayerPokemonConditions.length; i++) {
            let tcgPlayerPokemonCondition = tcgPlayerPokemonConditions[i];

            //CHECK TO SEE IF THE SET EXISTS;
            let tcgdbPokemonCondition = await this.getTCGdbPokemonConditionByTCGPlayerId(tcgPlayerPokemonCondition.tcgPlayerPokemonConditionId);
            let tcgdbPokemonConditionPriceFactor = 1;

            switch(tcgPlayerPokemonCondition.tcgPlayerPokemonConditionCode) {
                case 'NM':
                    tcgdbPokemonConditionPriceFactor = 1;
                    break;
                case 'LP':
                    tcgdbPokemonConditionPriceFactor = 0.9;
                    break;
                case 'MP':
                    tcgdbPokemonConditionPriceFactor = 0.8;
                    break;
                case 'HP':
                    tcgdbPokemonConditionPriceFactor = 0.6;
                    break;
                case 'DM':
                    tcgdbPokemonConditionPriceFactor = 0.5;
                    break;

            }
            //SET DOESN'T EXIST - CREATE IT;
            if(tcgdbPokemonCondition == null) {
                const newTCGdgPokemonCondition = this.tcgdbPokemonConditionRepository.create({
                    tcgdbPokemonConditionTCGPlayerId: tcgPlayerPokemonCondition.tcgPlayerPokemonConditionId,
                    tcgdbPokemonConditionName: tcgPlayerPokemonCondition.tcgPlayerPokemonConditionName,
                    tcgdbPokemonConditionCode: tcgPlayerPokemonCondition.tcgPlayerPokemonConditionCode,
                    tcgdbPokemonConditionPriceFactor: tcgdbPokemonConditionPriceFactor,
                    tcgdbPokemonConditionDisplayOrder: tcgPlayerPokemonCondition.tcgPlayerPokemonConditionDisplayOrder,
                });

                await this.tcgdbPokemonConditionRepository.save(newTCGdgPokemonCondition);

                tcgdbPokemonConditionRecordCount++;
            }
        }

        return tcgdbPokemonConditionRecordCount;

    }
}


