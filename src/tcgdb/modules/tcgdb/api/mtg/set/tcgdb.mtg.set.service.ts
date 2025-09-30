
import { HttpService } from '@nestjs/axios';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { map, catchError, lastValueFrom } from 'rxjs';
import { TCGdbMTGSetDTO } from './dto/tcgdb.mtg.set.dto';
import { TCGdbAPIUtilService } from 'src/tcgdb/modules/tcgdb/api/util/tcgdb.api.util.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TCGdbMTGSetService {

    constructor(
        private tcgdbAPIUtilService: TCGdbAPIUtilService,
        private httpService: HttpService,
        private configService: ConfigService,
    ) {}

    private tcgdbAPIURL = this.configService.get('TCGDB_API_URL');
    
    async getTCGdbMTGSets() {
        
        let tcgdbMTGSetDTOs: TCGdbMTGSetDTO[] = [];

        //GET ALL TCGDB SETS;
        const accessToken = await this.tcgdbAPIUtilService.getTCGdbAPIAccessToken();

        const url = this.tcgdbAPIURL + '/mtg/set/all';
        const headers = { 'Authorization': 'Bearer ' + accessToken };
        const response = this.httpService.get(url, { headers }).pipe(
            map(response => response.data),
            catchError(error => {
                throw new ForbiddenException(error.response.data);
            })
        );

        let data = await lastValueFrom(response);

        for(let i=0; i < data.length; i++) {
            const tcgdbMTGSet = data[i];
            
            let tcgdbMTGSetDTO: TCGdbMTGSetDTO = ({ ...tcgdbMTGSet });

            tcgdbMTGSetDTOs.push(tcgdbMTGSetDTO);
        }

        return tcgdbMTGSetDTOs;

    }
    /*
    async getTCGdbMTGSetByTCGdbId(tcgdbId: string) {

        const tcgdbMTGSet = await this.tcgdbMTGSetRepository.findOne({
            where: {
                tcgdbMTGSetId: tcgdbId,
            }
        })

        //TO DO: CREATE AN ERROR TO RETURN;
        if(tcgdbMTGSet == null) {
            return null;
        }

        let tcgdbMTGSetDTO: TCGdbMTGSetDTO = ({ ...tcgdbMTGSet });

        return tcgdbMTGSetDTO;
    }
    
    async getTCGdbMTGSetByTCGPlayerId(tcgPlayerId: number) {

        const tcgdbMTGSet = await this.tcgdbMTGSetRepository.findOne({
            where: {
                tcgdbMTGSetTCGPlayerId: tcgPlayerId,
            }
        })

        if(tcgdbMTGSet == null) {
            return null;
        }

        let tcgdbMTGSetDTO: TCGdbMTGSetDTO = ({ ...tcgdbMTGSet });
        
        return tcgdbMTGSetDTO;
    }

    
    async getTCGdbMTGSetBySetCode(setCode: string) {

        const tcgdbMTGSet = await this.tcgdbMTGSetRepository.findOne({
            where: {
                tcgdbMTGSetCode: setCode,
            }
        })

        //TO DO: CREATE AN ERROR TO RETURN;
        if(tcgdbMTGSet == null) {
            return null;
        }

        let tcgdbMTGSetDTO: TCGdbMTGSetDTO = ({ ...tcgdbMTGSet });

        return tcgdbMTGSetDTO;
        
    }

    async getTCGdbMTGSetBySetName(setName: string) {
        
        const tcgdbMTGSet = await this.tcgdbMTGSetRepository.findOne({
            where: {
                tcgdbMTGSetName: setName,
            }
        })

        //TO DO: CREATE AN ERROR TO RETURN;
        if(tcgdbMTGSet == null) {
            return null;
        }

        let tcgdbMTGSetDTO: TCGdbMTGSetDTO = ({ ...tcgdbMTGSet });

        return tcgdbMTGSetDTO;
    }
    */

}


