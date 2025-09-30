
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

    async getTCGdbMTGSetBySetCode(setCode: string) {

        //GET TCGDB SET BY SET CODE;
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

        let tcgdbMTGSetDTO: TCGdbMTGSetDTO = ({ ...data });

        return tcgdbMTGSetDTO;
        
    }

}


