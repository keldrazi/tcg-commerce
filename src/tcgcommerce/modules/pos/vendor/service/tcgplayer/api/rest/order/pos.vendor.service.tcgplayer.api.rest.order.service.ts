import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { map, catchError, lastValueFrom } from 'rxjs';
import { ForbiddenException } from '@nestjs/common';
import { POSVendorServiceTCGPlayerAPIRestUtilService } from '../util/pos.vendor.service.tcgplayer.api.rest.util.service';

@Injectable()
export class POSVendorServiceTCGPlayerAPIRestOrderService {

    constructor(
        private configService: ConfigService,
        private httpService: HttpService,
        private posVendorServiceTCGPlayerAPIRestUtilService: POSVendorServiceTCGPlayerAPIRestUtilService,
    ) {}


    private tcgPlayerAPIURL = this.configService.get('TCGPLAYER_API_URL');
    private tcgPlayerOrderSort = "OrderDate Desc";
    private tcgPlayerOrderLimit = "100";

    async getTCGPlayerStoreInfo(accessToken:string, sellerKey:string) {
        const url = this.tcgPlayerAPIURL + '/stores/' + sellerKey;
        const headers = { 'Authorization': 'Bearer ' + accessToken };
        const response = this.httpService.get(url, { headers }).pipe(
            map(response => response.data),
            catchError(error => {
                throw new ForbiddenException(error.response.data);
            })
        );

        let data = await lastValueFrom(response);

        return data;
    }

    async searchTCGPlayersOrders(accessToken:string, sellerKey:string) {
        const url = this.tcgPlayerAPIURL + '/stores/' + sellerKey + '/orders?sort=' + this.tcgPlayerOrderSort + '&limit=' + this.tcgPlayerOrderLimit;
        const headers = { 'Authorization': 'Bearer ' + accessToken };
        const response = this.httpService.get(url, { headers }).pipe(
            map(response => response.data),
            catchError(error => {
                throw new ForbiddenException(error.response.data);
            })
        );

        let data = await lastValueFrom(response);

        return data;
    }

    async getTCGPlayerOrders(accessToken:string, sellerKey:string, orderNumbers: string) {
        const url = this.tcgPlayerAPIURL + '/stores/' + sellerKey + '/orders/' + orderNumbers;
        const headers = { 'Authorization': 'Bearer ' + accessToken };
        const response = this.httpService.get(url, { headers }).pipe(
            map(response => response.data),
            catchError(error => {
                throw new ForbiddenException(error.response.data);
            })
        );

        let data = await lastValueFrom(response);

        return data;
    }

    async getTCGPlayerOrderItems(accessToken:string, sellerKey:string, orderNumber: string) {
        const url = this.tcgPlayerAPIURL + '/stores/' + sellerKey + '/orders/' + orderNumber + '/items';
        const headers = { 'Authorization': 'Bearer ' + accessToken };
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
    