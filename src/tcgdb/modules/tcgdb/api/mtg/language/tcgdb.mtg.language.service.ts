import { HttpService } from '@nestjs/axios';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { map, catchError, lastValueFrom } from 'rxjs';
import { TCGdbMTGLanguageDTO } from './dto/tcgdb.mtg.language.dto';
import { TCGdbAPIUtilService } from 'src/tcgdb/modules/tcgdb/api/util/tcgdb.api.util.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TCGdbMTGLanguageService {

    constructor(
        private tcgdbAPIUtilService: TCGdbAPIUtilService,
        private httpService: HttpService,
        private configService: ConfigService,
    ) {}

    private tcgdbAPIURL = this.configService.get('TCGDB_API_URL');
    
    async getTCGdbMTGLanguages() {
        
        let tcgdbMTGLanguageDTOs: TCGdbMTGLanguageDTO[] = [];

        //GET ALL TCGDB CONDITIONS;
        const accessToken = await this.tcgdbAPIUtilService.getTCGdbAPIAccessToken();

        const url = this.tcgdbAPIURL + '/tcgdb/mtg/language/all';
        const headers = { 'Authorization': 'Bearer ' + accessToken };
        const response = this.httpService.get(url, { headers }).pipe(
            map(response => response.data),
            catchError(error => {
                throw new ForbiddenException(error.response.data);
            })
        );

        let data = await lastValueFrom(response);

        for(let i=0; i < data.length; i++) {
            const tcgdbMTGLanguage = data[i];
            
            let tcgdbMTGLanguageDTO: TCGdbMTGLanguageDTO = ({ ...tcgdbMTGLanguage });
            
            tcgdbMTGLanguageDTOs.push(tcgdbMTGLanguageDTO);
        }

        return tcgdbMTGLanguageDTOs;
    }

    /*
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
    */
}


