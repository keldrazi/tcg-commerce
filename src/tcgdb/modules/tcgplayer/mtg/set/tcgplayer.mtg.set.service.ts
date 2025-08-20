import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { TCGPlayerMTGSet } from 'src/typeorm/entities/tcgdb/modules/tcgplayer/mtg/set/tcgplayer.mtg.set.entity';
import { Repository } from 'typeorm';
import { TCGPlayerAPISetService } from 'src/tcgdb/modules/tcgplayer/api/set/tcgplayer.api.set.service';

@Injectable()
export class TCGPlayerMTGSetService {

    constructor(
        @InjectRepository(TCGPlayerMTGSet) private tcgPlayerMTGSetRepository: Repository<TCGPlayerMTGSet>, 
        private tcgPlayerAPISetService: TCGPlayerAPISetService,
    ) {}

    private tcgPlayerMTGCategoryId = '1';


    async getTCGPlayerMTGSets() {
        return await this.tcgPlayerMTGSetRepository.find();
    }

    async getTCGPlayerMTGSetByGroupId(groupId: number) {
        let tcgPlayerMTGSet = await this.tcgPlayerMTGSetRepository.findOne({
            where: {
                tcgPlayerMTGSetGroupId: groupId,
            }
        });
        
        return tcgPlayerMTGSet;
    }

    async getTCGPlayerMTGSetBySetCode(setCode: string) {
        let tcgPlayerMTGSet = await this.tcgPlayerMTGSetRepository.findOne({
            where: {
                tcgPlayerMTGSetCode: setCode,
            }
        });

        return tcgPlayerMTGSet;
    }

    async getTCGPlayerMTGSetBySetName(setName: string) {
        let tcgPlayerSet = await this.tcgPlayerMTGSetRepository.findOne({
            where: {
                tcgPlayerMTGSetName: setName,
            }
        });

        return tcgPlayerSet;
    }

    async createTCGPlayerMTGSets() {

        let tcgPlayerMTGSetRecordCount = 0;
        let tcgPlayerMTGSets = await this.tcgPlayerAPISetService.getTCGPlayerAPISetsByCategoryId(this.tcgPlayerMTGCategoryId);
        
        for(let i = 0; i < tcgPlayerMTGSets.length; i++) {
            const tcgPlayerMTGSet: any = tcgPlayerMTGSets[i];
            
            //CHECK TO SEE IF THE SET EXISTS;
            const tcgPlayerMTGSetCheck = await this.getTCGPlayerMTGSetByGroupId(tcgPlayerMTGSet.groupId);

            //SET DOESN'T EXIST - CREATE SET;
            if(tcgPlayerMTGSetCheck == null) {
            
                //GET THE TOTAL CARD COUNT FOR THE SET;
                let totalCards = 0;
                try {
                    totalCards = await this.tcgPlayerAPISetService.getTCGPlayerAPISetCardCountByGroupId(tcgPlayerMTGSet.groupId);
                } catch(e) {
                    totalCards = 0;
                }

                    

                const newTCGPlayerMTGSet = this.tcgPlayerMTGSetRepository.create({
                    tcgPlayerMTGSetGroupId: tcgPlayerMTGSet.groupId,
                    tcgPlayerMTGSetName: tcgPlayerMTGSet.name,
                    tcgPlayerMTGSetCode: tcgPlayerMTGSet.abbreviation,
                    tcgPlayerMTGSetIsSupplemental: tcgPlayerMTGSet.isSupplemental,
                    tcgPlayerMTGSetTotalCards: totalCards,
                    tcgPlayerMTGSetPublishedOn: tcgPlayerMTGSet.publishedOn,
                    tcgPlayerMTGSetModifiedOn: tcgPlayerMTGSet.modifiedOn
                });

                await this.tcgPlayerMTGSetRepository.save(newTCGPlayerMTGSet);

                tcgPlayerMTGSetRecordCount++;
            }
        }
        
        return tcgPlayerMTGSetRecordCount;
    }
}


