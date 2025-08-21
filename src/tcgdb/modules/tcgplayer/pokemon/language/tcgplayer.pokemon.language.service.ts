import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { TCGPlayerPokemonLanguage } from 'src/typeorm/entities/tcgdb/modules/tcgplayer/pokemon/language/tcgplayer.pokemon.language.entity';
import { Repository } from 'typeorm';
import { TCGPlayerAPILanguageService } from 'src/tcgdb/modules/tcgplayer/api/language/tcgplayer.api.language.service';

@Injectable()
export class TCGPlayerPokemonLanguageService {

    constructor(
        @InjectRepository(TCGPlayerPokemonLanguage) private tcgPlayerPokemonLanguageRepository: Repository<TCGPlayerPokemonLanguage>, 
        private tcgPlayerAPILanguageService: TCGPlayerAPILanguageService,
    ) {}

    private tcgPlayerPokemonCategoryId = '3';

    async getTCGPlayerPokemonLanguages() {
        return await this.tcgPlayerPokemonLanguageRepository.find();
    }

    async getTCGPlayerPokemonLanguageByLanguageCode(languageCode: string) {
        let tcgPlayerPokemonLanguage = await this.tcgPlayerPokemonLanguageRepository.findOne({
            where: {
                tcgPlayerPokemonLanguageCode: languageCode,
            }
        });

        return tcgPlayerPokemonLanguage;
    }

    async getTCGPlayerPokemonLanguageByLanguageName(languageName: string) {
        let tcgPlayerLanguage = await this.tcgPlayerPokemonLanguageRepository.findOne({
            where: {
                tcgPlayerPokemonLanguageName: languageName,
            }
        });

        return tcgPlayerLanguage;
    }

    async createTCGPlayerPokemonLanguages() {

        let tcgPlayerPokemonLanguageRecordCount = 0;
        let tcgPlayerPokemonLanguages = await this.tcgPlayerAPILanguageService.getTCGPlayerAPILanguagesByCategoryId(this.tcgPlayerPokemonCategoryId);
        
        for(let i = 0; i < tcgPlayerPokemonLanguages.length; i++) {
            const tcgPlayerPokemonLanguage: any = tcgPlayerPokemonLanguages[i];
            
            //CHECK TO SEE IF THE SET EXISTS;
            const tcgPlayerPokemonLanguageCheck = await this.getTCGPlayerPokemonLanguageByLanguageName(tcgPlayerPokemonLanguage.languageName);

            //SET DOESN'T EXIST - CREATE SET;
            if(tcgPlayerPokemonLanguageCheck == null) {
            
                const newTCGPlayerPokemonLanguage = this.tcgPlayerPokemonLanguageRepository.create({
                    tcgPlayerPokemonLanguageId: tcgPlayerPokemonLanguage.languageId,
                    tcgPlayerPokemonLanguageName: tcgPlayerPokemonLanguage.name,
                    tcgPlayerPokemonLanguageCode: tcgPlayerPokemonLanguage.abbr,
                });

                await this.tcgPlayerPokemonLanguageRepository.save(newTCGPlayerPokemonLanguage);

                tcgPlayerPokemonLanguageRecordCount++;
            }
        }
        
        return tcgPlayerPokemonLanguageRecordCount;
    }
}


