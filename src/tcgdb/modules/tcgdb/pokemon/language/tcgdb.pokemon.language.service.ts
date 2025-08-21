import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TCGPlayerPokemonLanguageService } from 'src/tcgdb/modules/tcgplayer/pokemon/language/tcgplayer.pokemon.language.service';
import { TCGdbPokemonLanguageDTO } from './dto/tcgdb.pokemon.language.dto';
import { TCGdbPokemonLanguage } from 'src/typeorm/entities/tcgdb/modules/tcgdb/pokemon/language/tcgdb.pokemon.language.entity';

@Injectable()
export class TCGdbPokemonLanguageService {

    constructor(
        @InjectRepository(TCGdbPokemonLanguage) private tcgdbPokemonLanguageRepository: Repository<TCGdbPokemonLanguage>, 
        private tcgPlayerPokemonLanguageService: TCGPlayerPokemonLanguageService,
    ) {}
    
    async getTCGdbPokemonLanguages() {
        
        let tcgdbPokemonLanguageDTOs: TCGdbPokemonLanguageDTO[] = [];

        //GET ALL TCGDB SETS;
        const tcgdbPokemonLanguages = await this.tcgdbPokemonLanguageRepository.find();

        for(let i=0; i < tcgdbPokemonLanguages.length; i++) {
            const tcgdbPokemonLanguage = tcgdbPokemonLanguages[i];
            
            let tcgdbPokemonLanguageDTO: TCGdbPokemonLanguageDTO = ({ ...tcgdbPokemonLanguage });
            
            tcgdbPokemonLanguageDTOs.push(tcgdbPokemonLanguageDTO);
        }

        return tcgdbPokemonLanguageDTOs;
    }

    async getTCGdbPokemonLanguageByTCGPlayerId(tcgPlayerId: number) {
        let tcgdbPokemonLanguage = await this.tcgdbPokemonLanguageRepository.findOne({
            where: {
                tcgdbPokemonLanguageTCGPlayerId: tcgPlayerId,
            }
        });

        if(tcgdbPokemonLanguage == null) {
            return null;
        }
        
        let tcgdbPokemonLanguageDTO: TCGdbPokemonLanguageDTO = ({ ...tcgdbPokemonLanguage });

        return tcgdbPokemonLanguageDTO;
    }

    async createTCGdbPokemonLanguages() {
        
        let tcgdbPokemonLanguageRecordCount = 0;

        let tcgPlayerPokemonLanguages = await this.tcgPlayerPokemonLanguageService.getTCGPlayerPokemonLanguages();

        for(let i=0; i < tcgPlayerPokemonLanguages.length; i++) {
            let tcgPlayerPokemonLanguage = tcgPlayerPokemonLanguages[i];

            //CHECK TO SEE IF THE SET EXISTS;
            let tcgdbPokemonLanguage = await this.getTCGdbPokemonLanguageByTCGPlayerId(tcgPlayerPokemonLanguage.tcgPlayerPokemonLanguageId);

            //SET DOESN'T EXIST - CREATE IT;
            if(tcgdbPokemonLanguage == null) {
                const newTCGdgPokemonLanguage = this.tcgdbPokemonLanguageRepository.create({
                    tcgdbPokemonLanguageTCGPlayerId: tcgPlayerPokemonLanguage.tcgPlayerPokemonLanguageId,
                    tcgdbPokemonLanguageName: tcgPlayerPokemonLanguage.tcgPlayerPokemonLanguageName,
                    tcgdbPokemonLanguageCode: tcgPlayerPokemonLanguage.tcgPlayerPokemonLanguageCode
                });

                await this.tcgdbPokemonLanguageRepository.save(newTCGdgPokemonLanguage);

                tcgdbPokemonLanguageRecordCount++;
            }
        }

        return tcgdbPokemonLanguageRecordCount;

    }
}


