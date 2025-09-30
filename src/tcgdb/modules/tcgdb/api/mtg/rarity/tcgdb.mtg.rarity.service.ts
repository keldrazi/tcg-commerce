import { HttpService } from '@nestjs/axios';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { map, catchError, lastValueFrom } from 'rxjs';
import { TCGdbMTGRarityDTO } from './dto/tcgdb.mtg.rarity.dto';
import { TCGdbAPIUtilService } from 'src/tcgdb/modules/tcgdb/api/util/tcgdb.api.util.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TCGdbMTGRarityService {

    constructor(
        private tcgdbAPIUtilService: TCGdbAPIUtilService,
        private httpService: HttpService,
        private configService: ConfigService,
    ) {}

    private tcgdbAPIURL = this.configService.get('TCGDB_API_URL');
    
    async getTCGdbMTGRarities() {
        
        let tcgdbMTGRarityDTOs: TCGdbMTGRarityDTO[] = [];

        //GET ALL TCGDB RARITIES;
        const accessToken = await this.tcgdbAPIUtilService.getTCGdbAPIAccessToken();

        const url = this.tcgdbAPIURL + '/mtg/rarity/all';
        const headers = { 'Authorization': 'Bearer ' + accessToken };
        const response = this.httpService.get(url, { headers }).pipe(
            map(response => response.data),
            catchError(error => {
                throw new ForbiddenException(error.response.data);
            })
        );

        let data = await lastValueFrom(response);

        for(let i=0; i < data.length; i++) {
            const tcgdbMTGRarity = data[i];
            
            let tcgdbMTGRarityDTO: TCGdbMTGRarityDTO = ({ ...tcgdbMTGRarity });
                
            tcgdbMTGRarityDTOs.push(tcgdbMTGRarityDTO);
        }

        return tcgdbMTGRarityDTOs;
    }

    /*
    async getTCGdbMTGRarityByTCGPlayerId(tcgPlayerId: number) {
        let tcgdbMTGRarity = await this.tcgdbMTGRarityRepository.findOne({
            where: {
                tcgdbMTGRarityTCGPlayerId: tcgPlayerId,
            }
        });

        if(tcgdbMTGRarity == null) {
            return null;
        }

        let tcgdbMTGRarityDTO: TCGdbMTGRarityDTO = ({ ...tcgdbMTGRarity });

        return tcgdbMTGRarityDTO;
    }

    async createTCGdbMTGRarities() {
        
        let tcgdbMTGRarityRecordCount = 0;

        let tcgPlayerMTGRaritys = await this.tcgPlayerMTGRarityService.getTCGPlayerMTGRarities();

        for(let i=0; i < tcgPlayerMTGRaritys.length; i++) {
            let tcgPlayerMTGRarity = tcgPlayerMTGRaritys[i];

            //CHECK TO SEE IF THE SET EXISTS;
            let tcgdbMTGRarity = await this.getTCGdbMTGRarityByTCGPlayerId(tcgPlayerMTGRarity.tcgPlayerMTGRarityId);

            //SET DOESN'T EXIST - CREATE IT;
            if(tcgdbMTGRarity == null) {
                const newTCGdgMTGRarity = this.tcgdbMTGRarityRepository.create({
                    tcgdbMTGRarityTCGPlayerId: tcgPlayerMTGRarity.tcgPlayerMTGRarityId,
                    tcgdbMTGRarityName: tcgPlayerMTGRarity.tcgPlayerMTGRarityDisplayText,
                    tcgdbMTGRarityCode: tcgPlayerMTGRarity.tcgPlayerMTGRarityDBValue
                });

                await this.tcgdbMTGRarityRepository.save(newTCGdgMTGRarity);

                tcgdbMTGRarityRecordCount++;
            }
        }

        return tcgdbMTGRarityRecordCount;

    }
    */
}


