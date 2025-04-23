import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TCGPlayerMTGConditionService } from 'src/tcgdb/modules/tcgplayer/mtg/condition/tcgplayer.mtg.condition.service';
import { TCGdbMTGConditionDTO } from './dto/tcgdb.mtg.condition.dto';
import { TCGdbMTGCondition } from 'src/typeorm/entities/tcgdb/modules/tcgdb/mtg/condition/tcgdb.mtg.condition.entity';

@Injectable()
export class TCGdbMTGConditionService {

    constructor(
        @InjectRepository(TCGdbMTGCondition) private tcgdbMTGConditionRepository: Repository<TCGdbMTGCondition>, 
        private tcgPlayerMTGConditionService: TCGPlayerMTGConditionService,
    ) {}
    
    async getTCGdbMTGConditions() {
        
        let tcgdbMTGConditionDTOs: TCGdbMTGConditionDTO[] = [];

        //GET ALL TCGDB SETS;
        const tcgdbMTGConditions = await this.tcgdbMTGConditionRepository.find();

        for(let i=0; i < tcgdbMTGConditions.length; i++) {
            const tcgdbMTGCondition = tcgdbMTGConditions[i];
            
            let tcgdbMTGConditionDTO: TCGdbMTGConditionDTO = {
                tcgdbMTGConditionId: tcgdbMTGCondition.tcgdbMTGConditionId,
                tcgdbMTGConditionTCGPlayerId: tcgdbMTGCondition.tcgdbMTGConditionTCGPlayerId,
                tcgdbMTGConditionName: tcgdbMTGCondition.tcgdbMTGConditionName,
                tcgdbMTGConditionAbbreviation: tcgdbMTGCondition.tcgdbMTGConditionAbbreviation,
                tcgdbMTGConditionDisplayOrder: tcgdbMTGCondition.tcgdbMTGConditionDisplayOrder,
                tcgdbMTGConditionCreateDate: tcgdbMTGCondition.tcgdbMTGConditionCreateDate,
                tcgdbMTGConditionUpdateDate: tcgdbMTGCondition.tcgdbMTGConditionUpdateDate,
            }

            tcgdbMTGConditionDTOs.push(tcgdbMTGConditionDTO);
        }

        return tcgdbMTGConditionDTOs;
    }

    async getTCGdbMTGConditionByTCGPlayerId(tcgPlayerId: number) {
        let tcgdbMTGCondition = await this.tcgdbMTGConditionRepository.findOne({
            where: {
                tcgdbMTGConditionTCGPlayerId: tcgPlayerId,
            }
        });

        return tcgdbMTGCondition;
    }

    async createTCGdbMTGConditions() {
        
        let tcgdbMTGConditionRecordCount = 0;

        let tcgPlayerMTGConditions = await this.tcgPlayerMTGConditionService.getTCGPlayerMTGConditions();

        for(let i=0; i < tcgPlayerMTGConditions.length; i++) {
            let tcgPlayerMTGCondition = tcgPlayerMTGConditions[i];

            //CHECK TO SEE IF THE SET EXISTS;
            let tcgdbMTGCondition = await this.getTCGdbMTGConditionByTCGPlayerId(tcgPlayerMTGCondition.tcgPlayerMTGConditionId);

            //SET DOESN'T EXIST - CREATE IT;
            if(tcgdbMTGCondition == null) {
                const newTCGdgMTGCondition = this.tcgdbMTGConditionRepository.create({
                    tcgdbMTGConditionTCGPlayerId: tcgPlayerMTGCondition.tcgPlayerMTGConditionId,
                    tcgdbMTGConditionName: tcgPlayerMTGCondition.tcgPlayerMTGConditionName,
                    tcgdbMTGConditionAbbreviation: tcgPlayerMTGCondition.tcgPlayerMTGConditionAbbreviation,
                    tcgdbMTGConditionDisplayOrder: tcgPlayerMTGCondition.tcgPlayerMTGConditionDisplayOrder,
                });

                await this.tcgdbMTGConditionRepository.save(newTCGdgMTGCondition);

                tcgdbMTGConditionRecordCount++;
            }
        }

        return tcgdbMTGConditionRecordCount;

    }
}


