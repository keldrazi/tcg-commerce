
import { HttpService } from '@nestjs/axios';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { map, catchError, lastValueFrom } from 'rxjs';
//import { TCGPlayerAPIUtilService } from 'src/tcgdb/modules/tcgplayer/api/util/tcgplayer.api.util.service';

@Injectable()
export class TCGPlayerAPISkuService {

    constructor(
        private httpService: HttpService,  
        //private tcgPlayerAPIUtilService: TCGPlayerAPIUtilService,
    ) {}

    async getTCGPlayerAPISkusByProductId(productId: string, accessToken: string) {

        //PASS IN THE ACCESS TOKEN FROM THE CALLING FUNCTION
        //const accessToken = await this.tcgPlayerAPIUtilService.getTCGPlayerAPIAccessToken();
        
        const url = 'https://api.tcgplayer.com/catalog/products/' + productId + '/skus'; 
        const headers = { 'Authorization': 'Bearer ' + accessToken };
        const response = this.httpService.get(url, { headers }).pipe(
            map(response => response.data),
            catchError(error => {
                throw new ForbiddenException(error.response.data);
            })
        );

        let data = await lastValueFrom(response);
        
        let productSkus = data.results;
       
        return productSkus;
        
    }
}


