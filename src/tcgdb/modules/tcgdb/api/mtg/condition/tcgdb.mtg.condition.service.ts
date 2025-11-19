import { HttpService } from '@nestjs/axios';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { map, catchError, lastValueFrom } from 'rxjs';
import { TCGdbMTGConditionDTO } from './dto/tcgdb.mtg.condition.dto';
import { TCGdbAPIUtilService } from 'src/tcgdb/modules/tcgdb/api/util/tcgdb.api.util.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TCGdbMTGConditionService {

    constructor(
        private tcgdbAPIUtilService: TCGdbAPIUtilService,
        private httpService: HttpService,
        private configService: ConfigService,
    ) {}

    private tcgdbAPIURL = this.configService.get('TCGDB_API_URL');
    
    async getTCGdbMTGConditions() {
        
        let tcgdbMTGConditionDTOs: TCGdbMTGConditionDTO[] = [];

        //GET ALL TCGDB CONDITIONS;
        const accessToken = await this.tcgdbAPIUtilService.getTCGdbAPIAccessToken();

        const url = this.tcgdbAPIURL + '/tcgdb/mtg/condition/all';
        const headers = { 'Authorization': 'Bearer ' + accessToken };
        const response = this.httpService.get(url, { headers }).pipe(
            map(response => response.data),
            catchError(error => {
                throw new ForbiddenException(error.response.data);
            })
        );

        let data = await lastValueFrom(response);

        for(let i=0; i < data.length; i++) {
            const tcgdbMTGCondition = data[i];
            
            let tcgdbMTGConditionDTO: TCGdbMTGConditionDTO = ({ ...tcgdbMTGCondition });

            tcgdbMTGConditionDTOs.push(tcgdbMTGConditionDTO);
        }

        return tcgdbMTGConditionDTOs;
    }

}


