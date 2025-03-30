
import { HttpService } from '@nestjs/axios';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { map, catchError, lastValueFrom } from 'rxjs';
import { TCGPlayerAPISetService } from 'src/tcgdb/modules/tcgplayer/api/set/tcgplayer.api.set.service';
import { TCGPlayerAPIUtilService } from 'src/tcgdb/modules/tcgplayer/api/util/tcgplayer.api.util.service';

@Injectable()
export class TCGPlayerAPICardService {

    constructor(
        private httpService: HttpService,  
        private tcgPlayerAPISetService: TCGPlayerAPISetService,
        private tcgPlayerAPIUtilService: TCGPlayerAPIUtilService,
    ) {}

    async getTCGPlayerAPICardNameByProductId(productId: string) {
        
        const accessToken = await this.tcgPlayerAPIUtilService.getTCGPlayerAPIAccessToken();

        const url = 'https://api.tcgplayer.com/catalog/products/' + productId;
        const headers = { 'Authorization': 'Bearer ' + accessToken };
        const response = this.httpService.get(url, { headers }).pipe(
            map(response => response.data),
            catchError(error => {
                throw new ForbiddenException(error.response.data);
            })
        );

        let data = await lastValueFrom(response);
        data = JSON.parse(data);

        return data.results[0].name;
        
    } 

    async getTCGPlayerAPICardsByGroupId(groupId: string) {

        const accessToken = await this.tcgPlayerAPIUtilService.getTCGPlayerAPIAccessToken();
        
        const cardSetTotal = await this.tcgPlayerAPISetService.getTCGPlayerAPISetCardCountByGroupId(groupId);
        const totalCalls = Math.ceil(cardSetTotal / 100);
        
        let cardDataResult: any[] = [];
        let offset = 0;

        //LOOP THROUGH THE CALLS TO GET ALL THE CARDS IN THE SET;
        for(let i = 0; i < totalCalls; i++) {
        
            const url = 'https://api.tcgplayer.com/catalog/products?groupId='  + groupId + '&getExtendedFields=true&productTypes=Cards&limit=100&offset=' + offset;
            const headers = { 'Authorization': 'Bearer ' + accessToken };
            const response = this.httpService.get(url, { headers }).pipe(
                map(response => response.data),
                catchError(error => {
                    throw new ForbiddenException(error.response.data);
                })
            );

            let data = await lastValueFrom(response);
            //ADD THE RESULTS TO THE ARRAY;
            cardDataResult.push(data.results);
            //UPDATE THE OFFSET;
            offset = offset + 100;
        }

        let cardData = []
        
        //COMBINE THE RESULTS INTO A SINGLE ARRAY;
        for(let i=0; i < cardDataResult.length; i++) {
            cardData = cardData.concat(cardDataResult[i]);
        }
       
        return cardData;
        
    }
}


