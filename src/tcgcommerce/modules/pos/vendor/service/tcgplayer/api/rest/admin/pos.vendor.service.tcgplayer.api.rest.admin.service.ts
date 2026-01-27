import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { map, catchError, lastValueFrom } from 'rxjs';
import { ForbiddenException } from '@nestjs/common';
import { TCGPlayerSKUInventory,TCGPlayerSKUInventoryPrice } from './types/pos.vendor.service.tcgplayer.api.rest.admin.types';

@Injectable()
export class POSVendorServiceTCGPlayerAPIRestAdminService {

    constructor(
        private configService: ConfigService,
        private httpService: HttpService,
    ) {}


    private tcgPlayerAPIURL = this.configService.get('TCGPLAYER_API_URL');
    
    async getTCGPlayerStoreSelfInfo(bearerToken:string, storeKey:string): Promise<any> {
        const url = this.tcgPlayerAPIURL + '/stores/self';
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

    async updateTCGPlayerSKUInventory(bearerToken:string, storeKey:string, tcgPlayerSku: string,tcgPlayerSkuInventory: TCGPlayerSKUInventory): Promise<any> {
        const url = this.tcgPlayerAPIURL + '/stores/' + storeKey + '/inventory/skus/' + tcgPlayerSku;
        const headers = { 'Authorization': 'Bearer ' + bearerToken };
        const response = this.httpService.put(url, tcgPlayerSkuInventory, { headers }).pipe(
            map(response => response.data),
            catchError(error => {
                throw new ForbiddenException(error.response.data);
            })
        );

        let data = await lastValueFrom(response);

        return data;
    }

    async updateTCGPlayerSKUInventoryPrice(bearerToken:string, storeKey:string, tcgPlayerSku: string,tcgPlayerSkuInventoryPrice: TCGPlayerSKUInventoryPrice): Promise<any> {
        const url = this.tcgPlayerAPIURL + '/stores/' + storeKey + '/inventory/skus/' + tcgPlayerSku + '/price';
        const headers = { 'Authorization': 'Bearer ' + bearerToken };
        const response = this.httpService.put(url, tcgPlayerSkuInventoryPrice, { headers }).pipe(
            map(response => response.data),
            catchError(error => {
                throw new ForbiddenException(error.response.data);
            })
        );

        let data = await lastValueFrom(response);

        return data;
    }

    async updateTCGPlayerSKUInventoryPrices(bearerToken:string, storeKey:string, tcgPlayerSku: string,tcgPlayerSkuInventoryPrices: TCGPlayerSKUInventoryPrice[]): Promise<any> {
        const url = this.tcgPlayerAPIURL + '/stores/' + storeKey + '/inventory/skus/batch';
        const headers = { 'Authorization': 'Bearer ' + bearerToken };
        const response = this.httpService.post(url, tcgPlayerSkuInventoryPrices, { headers }).pipe(
            map(response => response.data),
            catchError(error => {
                throw new ForbiddenException(error.response.data);
            })
        );

        let data = await lastValueFrom(response);

        return data;
    }



}