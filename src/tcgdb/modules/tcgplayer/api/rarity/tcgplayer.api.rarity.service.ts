
import { HttpService } from '@nestjs/axios';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { map, catchError, lastValueFrom } from 'rxjs';
import { TCGPlayerAPIUtilService } from 'src/tcgdb/modules/tcgplayer/api/util/tcgplayer.api.util.service';

@Injectable()
export class TCGPlayerAPIRarityService {

    constructor(
        private httpService: HttpService,  
        private tcgPlayerAPIUtilService: TCGPlayerAPIUtilService,
    ) {}

    async getTCGPlayerAPIRaritysByCategoryId(categoryId: string) {
        
        const accessToken = await this.tcgPlayerAPIUtilService.getTCGPlayerAPIAccessToken();

        let rarityDataResult: any[] = [];

        const url = 'https://api.tcgplayer.com/catalog/categories/' + categoryId + '/raritys';
        const headers = { 'Authorization': 'Bearer ' + accessToken };
        const response = this.httpService.get(url, { headers }).pipe(
            map(response => response.data),
                catchError(error => {
                    throw new ForbiddenException(error.response.data);
                })
            );

        let data = await lastValueFrom(response);
        rarityDataResult.push(data.results);
            
        
        let rarityData = rarityDataResult;

        return rarityData;
    }
}


