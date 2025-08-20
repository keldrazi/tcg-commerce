import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { TCGPlayerMTGCondition } from 'src/typeorm/entities/tcgdb/modules/tcgplayer/mtg/condition/tcgplayer.mtg.condition.entity';
import { Repository } from 'typeorm';
import { TCGPlayerAPIConditionService } from 'src/tcgdb/modules/tcgplayer/api/condition/tcgplayer.api.condition.service';

@Injectable()
export class TCGPlayerMTGConditionService {

    constructor(
        @InjectRepository(TCGPlayerMTGCondition) private tcgPlayerMTGConditionRepository: Repository<TCGPlayerMTGCondition>, 
        private tcgPlayerAPIConditionService: TCGPlayerAPIConditionService,
    ) {}

    private tcgPlayerMTGCategoryId = '1';

    async getTCGPlayerMTGConditions() {
        return await this.tcgPlayerMTGConditionRepository.find();
    }

    async getTCGPlayerMTGConditionByConditionCode(conditionCode: string) {
        let tcgPlayerMTGCondition = await this.tcgPlayerMTGConditionRepository.findOne({
            where: {
                tcgPlayerMTGConditionCode: conditionCode,
            }
        });

        return tcgPlayerMTGCondition;
    }

    async getTCGPlayerMTGConditionByConditionName(conditionName: string) {
        let tcgPlayerCondition = await this.tcgPlayerMTGConditionRepository.findOne({
            where: {
                tcgPlayerMTGConditionName: conditionName,
            }
        });

        return tcgPlayerCondition;
    }

    async createTCGPlayerMTGConditions() {

        let tcgPlayerMTGConditionRecordCount = 0;
        let tcgPlayerMTGConditions = await this.tcgPlayerAPIConditionService.getTCGPlayerAPIConditionsByCategoryId(this.tcgPlayerMTGCategoryId);
        for(let i = 0; i < tcgPlayerMTGConditions.length; i++) {
            let tcgPlayerMTGCondition = tcgPlayerMTGConditions[i];
            
            //CHECK TO SEE IF THE CONDITION EXISTS;
            let tcgPlayerMTGConditionCheck = await this.getTCGPlayerMTGConditionByConditionName(tcgPlayerMTGCondition.name);
            
            //CONDITION DOESN'T EXIST - CREATE CONDITION;
            if(tcgPlayerMTGConditionCheck == null) {
                
                let newTCGPlayerMTGCondition = this.tcgPlayerMTGConditionRepository.create({
                    tcgPlayerMTGConditionId: tcgPlayerMTGCondition.conditionId,
                    tcgPlayerMTGConditionName: tcgPlayerMTGCondition.name,
                    tcgPlayerMTGConditionCode: tcgPlayerMTGCondition.abbreviation,
                    tcgPlayerMTGConditionDisplayOrder: tcgPlayerMTGCondition.displayOrder,
                });

                await this.tcgPlayerMTGConditionRepository.save(newTCGPlayerMTGCondition);

                tcgPlayerMTGConditionRecordCount++;
            }
        }
        
        return tcgPlayerMTGConditionRecordCount;
    }
}


