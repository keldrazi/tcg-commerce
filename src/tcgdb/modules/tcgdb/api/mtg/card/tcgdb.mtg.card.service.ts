import { HttpService } from '@nestjs/axios';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { map, catchError, lastValueFrom } from 'rxjs';
import { TCGdbMTGSetCardDTO, TCGdbMTGCardDTO } from './dto/tcgdb.mtg.card.dto';
import { TCGdbMTGSetDTO } from 'src/tcgdb/modules/tcgdb/api/mtg/set/dto/tcgdb.mtg.set.dto';
import { TCGdbMTGSetService } from 'src/tcgdb/modules/tcgdb/api/mtg/set/tcgdb.mtg.set.service';
import { TCGdbAPIUtilService } from 'src/tcgdb/modules/tcgdb/api/util/tcgdb.api.util.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TCGdbMTGCardService {

    constructor(
        private tcgdbAPIUtilService: TCGdbAPIUtilService,
        private httpService: HttpService,
        private configService: ConfigService,
        private tcgdbMTGSetService: TCGdbMTGSetService,
    ) {}

    private tcgdbAPIURL = this.configService.get('TCGDB_API_URL');
    
    async getTCGdbMTGCardsBySetCode(setCode: string) {
        
        let tcgdbMTGCardDTOs: TCGdbMTGCardDTO[] = [];
        
        //GET TCGDB SET BY SET CODE;
        let tcgdbMTGSetDTO: TCGdbMTGSetDTO = await this.tcgdbMTGSetService.getTCGdbMTGSetBySetCode(setCode);

        //GET ALL TCGDB CARDS BY SET CODE;
        const accessToken = await this.tcgdbAPIUtilService.getTCGdbAPIAccessToken();
        const url = this.tcgdbAPIURL + '/tcgdb/mtg/card/set/code/' + setCode;
        const headers = { 'Authorization': 'Bearer ' + accessToken };
        const response = this.httpService.get(url, { headers }).pipe(
            map(response => response.data),
            catchError(error => {
                throw new ForbiddenException(error.response.data);
            })
        );

        let data = await lastValueFrom(response);

        for(let i = 0; i < data.length; i++) {
            let tcgdbMTGCard = data[i];

            let tcgdbMTGCardDTO: TCGdbMTGCardDTO = ({ ...tcgdbMTGCard });

            tcgdbMTGCardDTOs.push(tcgdbMTGCardDTO);
        }
        
        let tcgdbMTGSetCardDTO: TCGdbMTGSetCardDTO = {
            tcgdbMTGSet: tcgdbMTGSetDTO,
            tcgdbMTGCards: tcgdbMTGCardDTOs,
        }
        
        return tcgdbMTGSetCardDTO;
    }

}


