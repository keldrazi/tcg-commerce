import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { map, catchError, lastValueFrom } from 'rxjs';
import { ForbiddenException } from '@nestjs/common';

@Injectable()
export class POSVendorServiceTCGPlayerAPIRestOrderService {

    constructor(
        private configService: ConfigService,
        private httpService: HttpService,
    ) {}


    private tcgPlayerAPIURL = this.configService.get('TCGPLAYER_API_URL');
    private tcgPlayerOrderSort = "OrderDate Desc";
    private tcgPlayerOrderLimit = "100";

    async getTCGPlayerStoreInfo(bearerToken:string, storeKey:string): Promise<any> {
        const url = this.tcgPlayerAPIURL + '/stores/' + storeKey;
        const headers = { 'Authorization': 'Bearer ' + bearerToken };
        const response = this.httpService.get(url, { headers }).pipe(
            map(response => response.data),
            catchError(error => {
                throw new ForbiddenException(error.response.data);
            })
        );

        let data = await lastValueFrom(response);

        return data;
    }

    async searchTCGPlayersOrders(bearerToken:string, storeKey:string): Promise<any> {
        const url = this.tcgPlayerAPIURL + '/stores/' + storeKey + '/orders?sort=' + this.tcgPlayerOrderSort + '&limit=' + this.tcgPlayerOrderLimit;
        const headers = { 'Authorization': 'Bearer ' + bearerToken };
        const response = this.httpService.get(url, { headers }).pipe(
            map(response => response.data),
            catchError(error => {
                throw new ForbiddenException(error.response.data);
            })
        );

        let data = await lastValueFrom(response);

        return data;
    }

    async getTCGPlayerOrders(bearerToken:string, storeKey:string, orderNumbers: string): Promise<any> {
        const url = this.tcgPlayerAPIURL + '/stores/' + storeKey + '/orders/' + orderNumbers;
        const headers = { 'Authorization': 'Bearer ' + bearerToken };
        const response = this.httpService.get(url, { headers }).pipe(
            map(response => response.data),
            catchError(error => {
                throw new ForbiddenException(error.response.data);
            })
        );

        let data = await lastValueFrom(response);

        return data;
    }

    async getTCGPlayerOrderItems(bearerToken:string, storeKey:string, orderNumber: string): Promise<any> {
        const url = this.tcgPlayerAPIURL + '/stores/' + storeKey + '/orders/' + orderNumber + '/items';
        const headers = { 'Authorization': 'Bearer ' + bearerToken };
        const response = this.httpService.get(url, { headers }).pipe(
            map(response => response.data),
            catchError(error => {
                throw new ForbiddenException(error.response.data);
            })
        );

        let data = await lastValueFrom(response);

        return data;
    }
}
    