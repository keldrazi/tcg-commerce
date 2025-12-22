import { HttpService } from '@nestjs/axios';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { map, catchError, lastValueFrom } from 'rxjs';
import { TCGdbPokemonPrintingDTO } from './dto/tcgdb.pokemon.printing.dto';
import { TCGdbAPIUtilService } from 'src/tcgdb/modules/tcgdb/api/util/tcgdb.api.util.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TCGdbPokemonPrintingService {

    constructor(
        private tcgdbAPIUtilService: TCGdbAPIUtilService,
        private httpService: HttpService,
        private configService: ConfigService,
    ) {}

    private tcgdbAPIURL = this.configService.get('TCGDB_API_URL');
    
    async getTCGdbPokemonPrintings() {
        
        let tcgdbPokemonPrintingDTOs: TCGdbPokemonPrintingDTO[] = [];

        //GET ALL TCGDB PRINTINGS;
        const accessToken = await this.tcgdbAPIUtilService.getTCGdbAPIAccessToken();

        const url = this.tcgdbAPIURL + '/tcgdb/pokemon/printing/all';
        const headers = { 'Authorization': 'Bearer ' + accessToken };
        const response = this.httpService.get(url, { headers }).pipe(
            map(response => response.data),
            catchError(error => {
                throw new ForbiddenException(error.response.data);
            })
        );

        let data = await lastValueFrom(response);

        for(let i=0; i < data.length; i++) {
            const tcgdbPokemonPrinting = data[i];
            
            let tcgdbPokemonPrintingDTO: TCGdbPokemonPrintingDTO = ({ ...tcgdbPokemonPrinting });

            tcgdbPokemonPrintingDTOs.push(tcgdbPokemonPrintingDTO);
        }

        return tcgdbPokemonPrintingDTOs;
    }

}


