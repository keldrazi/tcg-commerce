import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { map, catchError, lastValueFrom } from 'rxjs';
import { ForbiddenException } from '@nestjs/common';
import { POSVendorServiceTCGPlayerAPIRestUtilService } from '../util/pos.vendor.service.tcgplayer.api.rest.util.service';
import { TCGPlayerSKUInventory,TCGPlayerSKUInventoryPrice } from './types/pos.vendor.service.tcgplayer.api.rest.admin.types';

@Injectable()
export class POSVendorServiceTCGPlayerAPIRestAdminService {

    constructor(
        private configService: ConfigService,
        private httpService: HttpService,
        private posVendorServiceTCGPlayerAPIRestUtilService: POSVendorServiceTCGPlayerAPIRestUtilService,
    ) {}


    private tcgPlayerAPIURL = this.configService.get('TCGPLAYER_API_URL');
    
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

    async updateTCGPlayerSKUInventory(accessToken:string, sellerKey:string, tcgPlayerSku: string,tcgPlayerSkuInventory: TCGPlayerSKUInventory) {
        const url = this.tcgPlayerAPIURL + '/stores/' + sellerKey + '/inventory/skus/' + tcgPlayerSku;
        const headers = { 'Authorization': 'Bearer ' + accessToken };
        const response = this.httpService.put(url, tcgPlayerSkuInventory, { headers }).pipe(
            map(response => response.data),
            catchError(error => {
                throw new ForbiddenException(error.response.data);
            })
        );

        let data = await lastValueFrom(response);

        return data;
    }

    async updateTCGPlayerSKUInventoryPrice(accessToken:string, sellerKey:string, tcgPlayerSku: string,tcgPlayerSkuInventoryPrice: TCGPlayerSKUInventoryPrice) {
        const url = this.tcgPlayerAPIURL + '/stores/' + sellerKey + '/inventory/skus/' + tcgPlayerSku + '/price';
        const headers = { 'Authorization': 'Bearer ' + accessToken };
        const response = this.httpService.put(url, tcgPlayerSkuInventoryPrice, { headers }).pipe(
            map(response => response.data),
            catchError(error => {
                throw new ForbiddenException(error.response.data);
            })
        );

        let data = await lastValueFrom(response);

        return data;
    }

    async updateTCGPlayerSKUInventoryPrices(accessToken:string, sellerKey:string, tcgPlayerSku: string,tcgPlayerSkuInventoryPrices: TCGPlayerSKUInventoryPrice[]) {
        const url = this.tcgPlayerAPIURL + '/stores/' + sellerKey + '/inventory/skus/batch';
        const headers = { 'Authorization': 'Bearer ' + accessToken };
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