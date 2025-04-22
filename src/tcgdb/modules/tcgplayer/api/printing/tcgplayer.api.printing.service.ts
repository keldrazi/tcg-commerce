
import { HttpService } from '@nestjs/axios';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { map, catchError, lastValueFrom } from 'rxjs';
import { TCGPlayerAPIUtilService } from 'src/tcgdb/modules/tcgplayer/api/util/tcgplayer.api.util.service';

@Injectable()
export class TCGPlayerAPIPrintingService {

    constructor(
        private httpService: HttpService,  
        private tcgPlayerAPIUtilService: TCGPlayerAPIUtilService,
    ) {}

    async getTCGPlayerAPIPrintingsByCategoryId(categoryId: string) {
        
        const accessToken = await this.tcgPlayerAPIUtilService.getTCGPlayerAPIAccessToken();

        let printingDataResult: any[] = [];

        const url = 'https://api.tcgplayer.com/catalog/categories/' + categoryId + '/printings';
        const headers = { 'Authorization': 'Bearer ' + accessToken };
        const response = this.httpService.get(url, { headers }).pipe(
            map(response => response.data),
                catchError(error => {
                    throw new ForbiddenException(error.response.data);
                })
            );

        let data = await lastValueFrom(response);
        printingDataResult.push(data.results);
            
        
        let printingData = printingDataResult;

        return printingData;
    }
}


