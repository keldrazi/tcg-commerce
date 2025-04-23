import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { TCGPlayerMTGLanguage } from 'src/typeorm/entities/tcgdb/modules/tcgplayer/mtg/language/tcgplayer.mtg.language.entity';
import { Repository } from 'typeorm';
import { TCGPlayerAPILanguageService } from 'src/tcgdb/modules/tcgplayer/api/language/tcgplayer.api.language.service';

@Injectable()
export class TCGPlayerMTGLanguageService {

    constructor(
        @InjectRepository(TCGPlayerMTGLanguage) private tcgPlayerMTGLanguageRepository: Repository<TCGPlayerMTGLanguage>, 
        private tcgPlayerAPILanguageService: TCGPlayerAPILanguageService,
    ) {}

    private tcgPlayerMTGCategoryId = '1';

    async getTCGPlayerMTGLanguages() {
        return await this.tcgPlayerMTGLanguageRepository.find();
    }

    async getTCGPlayerMTGLanguageByLanguageAbbreviation(languageAbbreviation: string) {
        let tcgPlayerMTGLanguage = await this.tcgPlayerMTGLanguageRepository.findOne({
            where: {
                tcgPlayerMTGLanguageAbbreviation: languageAbbreviation,
            }
        });

        return tcgPlayerMTGLanguage;
    }

    async getTCGPlayerMTGLanguageByLanguageName(languageName: string) {
        let tcgPlayerLanguage = await this.tcgPlayerMTGLanguageRepository.findOne({
            where: {
                tcgPlayerMTGLanguageName: languageName,
            }
        });

        return tcgPlayerLanguage;
    }

    async createTCGPlayerMTGLanguages() {

        let tcgPlayerMTGLanguageRecordCount = 0;
        let tcgPlayerMTGLanguages = await this.tcgPlayerAPILanguageService.getTCGPlayerAPILanguagesByCategoryId(this.tcgPlayerMTGCategoryId);
        
        for(let i = 0; i < tcgPlayerMTGLanguages.length; i++) {
            const tcgPlayerMTGLanguage: any = tcgPlayerMTGLanguages[i];
            
            //CHECK TO SEE IF THE SET EXISTS;
            const tcgPlayerMTGLanguageCheck = await this.getTCGPlayerMTGLanguageByLanguageName(tcgPlayerMTGLanguage.name);

            //SET DOESN'T EXIST - CREATE SET;
            if(tcgPlayerMTGLanguageCheck == null) {
            
                const newTCGPlayerMTGLanguage = this.tcgPlayerMTGLanguageRepository.create({
                    tcgPlayerMTGLanguageId: tcgPlayerMTGLanguage.languageId,
                    tcgPlayerMTGLanguageName: tcgPlayerMTGLanguage.name,
                    tcgPlayerMTGLanguageAbbreviation: tcgPlayerMTGLanguage.abbr,
                });

                await this.tcgPlayerMTGLanguageRepository.save(newTCGPlayerMTGLanguage);

                tcgPlayerMTGLanguageRecordCount++;
            }
        }
        
        return tcgPlayerMTGLanguageRecordCount;
    }
}


