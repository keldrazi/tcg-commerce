import { HttpService } from '@nestjs/axios';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { map, catchError, lastValueFrom } from 'rxjs';
import { TCGdbMTGPrintingDTO } from './dto/tcgdb.mtg.printing.dto';
import { TCGdbAPIUtilService } from 'src/tcgdb/modules/tcgdb/api/util/tcgdb.api.util.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TCGdbMTGPrintingService {

    constructor(
        private tcgdbAPIUtilService: TCGdbAPIUtilService,
        private httpService: HttpService,
        private configService: ConfigService,
    ) {}

    private tcgdbAPIURL = this.configService.get('TCGDB_API_URL');
    
    async getTCGdbMTGPrintings() {
        
        let tcgdbMTGPrintingDTOs: TCGdbMTGPrintingDTO[] = [];

        //GET ALL TCGDB PRINTINGS;
        const accessToken = await this.tcgdbAPIUtilService.getTCGdbAPIAccessToken();

        const url = this.tcgdbAPIURL + '/mtg/printing/all';
        const headers = { 'Authorization': 'Bearer ' + accessToken };
        const response = this.httpService.get(url, { headers }).pipe(
            map(response => response.data),
            catchError(error => {
                throw new ForbiddenException(error.response.data);
            })
        );

        let data = await lastValueFrom(response);

        for(let i=0; i < data.length; i++) {
            const tcgdbMTGPrinting = data[i];
            
            let tcgdbMTGPrintingDTO: TCGdbMTGPrintingDTO = ({ ...tcgdbMTGPrinting });

            tcgdbMTGPrintingDTOs.push(tcgdbMTGPrintingDTO);
        }

        return tcgdbMTGPrintingDTOs;
    }

    /*
    async getTCGdbMTGPrintingByTCGPlayerId(tcgPlayerId: number) {
        let tcgdbMTGPrinting = await this.tcgdbMTGPrintingRepository.findOne({
            where: {
                tcgdbMTGPrintingTCGPlayerId: tcgPlayerId,
            }
        });

        if(tcgdbMTGPrinting == null) {
            return null;
        }   

        let tcgdbMTGPrintingDTO: TCGdbMTGPrintingDTO = ({ ...tcgdbMTGPrinting });

        return tcgdbMTGPrintingDTO;
    }

    async createTCGdbMTGPrintings() {
        
        let tcgdbMTGPrintingRecordCount = 0;

        let tcgPlayerMTGPrintings = await this.tcgPlayerMTGPrintingService.getTCGPlayerMTGPrintings();

        for(let i=0; i < tcgPlayerMTGPrintings.length; i++) {
            let tcgPlayerMTGPrinting = tcgPlayerMTGPrintings[i];

            //CHECK TO SEE IF THE SET EXISTS;
            let tcgdbMTGPrinting = await this.getTCGdbMTGPrintingByTCGPlayerId(tcgPlayerMTGPrinting.tcgPlayerMTGPrintingId);

            //SET DOESN'T EXIST - CREATE IT;
            if(tcgdbMTGPrinting == null) {
                const newTCGdgMTGPrinting = this.tcgdbMTGPrintingRepository.create({
                    tcgdbMTGPrintingTCGPlayerId: tcgPlayerMTGPrinting.tcgPlayerMTGPrintingId,
                    tcgdbMTGPrintingName: tcgPlayerMTGPrinting.tcgPlayerMTGPrintingName,
                    tcgdbMTGPrintingDisplayOrder: tcgPlayerMTGPrinting.tcgPlayerMTGPrintingDisplayOrder
                });

                await this.tcgdbMTGPrintingRepository.save(newTCGdgMTGPrinting);

                tcgdbMTGPrintingRecordCount++;
            }
        }

        return tcgdbMTGPrintingRecordCount;

    }
    */
}


