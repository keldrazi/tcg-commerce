import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TCGPlayerMTGLanguageService } from 'src/tcgdb/modules/tcgplayer/mtg/language/tcgplayer.mtg.language.service';
import { TCGdbMTGLanguageDTO } from './dto/tcgdb.mtg.language.dto';
import { TCGdbMTGLanguage } from 'src/typeorm/entities/tcgdb/modules/tcgdb/mtg/language/tcgdb.mtg.language.entity';

@Injectable()
export class TCGdbMTGLanguageService {

    constructor(
        @InjectRepository(TCGdbMTGLanguage) private tcgdbMTGLanguageRepository: Repository<TCGdbMTGLanguage>, 
        private tcgPlayerMTGLanguageService: TCGPlayerMTGLanguageService,
    ) {}
    
    async getTCGdbMTGLanguages() {
        
        let tcgdbMTGLanguageDTOs: TCGdbMTGLanguageDTO[] = [];

        //GET ALL TCGDB SETS;
        const tcgdbMTGLanguages = await this.tcgdbMTGLanguageRepository.find();

        for(let i=0; i < tcgdbMTGLanguages.length; i++) {
            const tcgdbMTGLanguage = tcgdbMTGLanguages[i];
            
            let tcgdbMTGLanguageDTO: TCGdbMTGLanguageDTO = ({ ...tcgdbMTGLanguage });
            
            tcgdbMTGLanguageDTOs.push(tcgdbMTGLanguageDTO);
        }

        return tcgdbMTGLanguageDTOs;
    }

    async getTCGdbMTGLanguageByTCGPlayerId(tcgPlayerId: number) {
        let tcgdbMTGLanguage = await this.tcgdbMTGLanguageRepository.findOne({
            where: {
                tcgdbMTGLanguageTCGPlayerId: tcgPlayerId,
            }
        });

        if(tcgdbMTGLanguage == null) {
            return null;
        }
        
        let tcgdbMTGLanguageDTO: TCGdbMTGLanguageDTO = ({ ...tcgdbMTGLanguage });

        return tcgdbMTGLanguageDTO;
    }

    async createTCGdbMTGLanguages() {
        
        let tcgdbMTGLanguageRecordCount = 0;

        let tcgPlayerMTGLanguages = await this.tcgPlayerMTGLanguageService.getTCGPlayerMTGLanguages();

        for(let i=0; i < tcgPlayerMTGLanguages.length; i++) {
            let tcgPlayerMTGLanguage = tcgPlayerMTGLanguages[i];

            //CHECK TO SEE IF THE SET EXISTS;
            let tcgdbMTGLanguage = await this.getTCGdbMTGLanguageByTCGPlayerId(tcgPlayerMTGLanguage.tcgPlayerMTGLanguageId);

            //SET DOESN'T EXIST - CREATE IT;
            if(tcgdbMTGLanguage == null) {
                const newTCGdgMTGLanguage = this.tcgdbMTGLanguageRepository.create({
                    tcgdbMTGLanguageTCGPlayerId: tcgPlayerMTGLanguage.tcgPlayerMTGLanguageId,
                    tcgdbMTGLanguageName: tcgPlayerMTGLanguage.tcgPlayerMTGLanguageName,
                    tcgdbMTGLanguageCode: tcgPlayerMTGLanguage.tcgPlayerMTGLanguageCode
                });

                await this.tcgdbMTGLanguageRepository.save(newTCGdgMTGLanguage);

                tcgdbMTGLanguageRecordCount++;
            }
        }

        return tcgdbMTGLanguageRecordCount;

    }
}


