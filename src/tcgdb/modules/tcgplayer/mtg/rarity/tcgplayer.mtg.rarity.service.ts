import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { TCGPlayerMTGRarity } from 'src/typeorm/entities/tcgdb/modules/tcgplayer/mtg/rarity/tcgplayer.mtg.rarity.entity';
import { Repository } from 'typeorm';
import { TCGPlayerAPIRarityService } from 'src/tcgdb/modules/tcgplayer/api/rarity/tcgplayer.api.rarity.service';

@Injectable()
export class TCGPlayerMTGRarityService {

    constructor(
        @InjectRepository(TCGPlayerMTGRarity) private tcgPlayerMTGRarityRepository: Repository<TCGPlayerMTGRarity>, 
        private tcgPlayerAPIRarityService: TCGPlayerAPIRarityService,
    ) {}

    private tcgPlayerMTGCategoryId = '1';

    async getTCGPlayerMTGRarities() {
        return await this.tcgPlayerMTGRarityRepository.find();
    }

    async getTCGPlayerMTGRarityByRarityDBValue(rarityDBValue: string) {
        let tcgPlayerMTGRarity = await this.tcgPlayerMTGRarityRepository.findOne({
            where: {
                tcgPlayerMTGRarityDBValue: rarityDBValue,
            }
        });

        return tcgPlayerMTGRarity;
    }

    async createTCGPlayerMTGRarities() {

        let tcgPlayerMTGRarityRecordCount = 0;
        let tcgPlayerMTGRarities = await this.tcgPlayerAPIRarityService.getTCGPlayerAPIRaritysByCategoryId(this.tcgPlayerMTGCategoryId);
        
        for(let i = 0; i < tcgPlayerMTGRarities.length; i++) {
            const tcgPlayerMTGRarity: any = tcgPlayerMTGRarities[i];
            
            //CHECK TO SEE IF THE SET EXISTS;
            const tcgPlayerMTGRarityCheck = await this.getTCGPlayerMTGRarityByRarityDBValue(tcgPlayerMTGRarity.rarityDBValue);

            //SET DOESN'T EXIST - CREATE SET;
            if(tcgPlayerMTGRarityCheck == null) {
            
                const newTCGPlayerMTGRarity = this.tcgPlayerMTGRarityRepository.create({
                    tcgPlayerMTGRarityId: tcgPlayerMTGRarity.rarityId,
                    tcgPlayerMTGRarityDisplayText: tcgPlayerMTGRarity.displayText,
                    tcgPlayerMTGRarityDBValue: tcgPlayerMTGRarity.dbValue,
                });

                await this.tcgPlayerMTGRarityRepository.save(newTCGPlayerMTGRarity);

                tcgPlayerMTGRarityRecordCount++;
            }
        }
        
        return tcgPlayerMTGRarityRecordCount;
    }
}


