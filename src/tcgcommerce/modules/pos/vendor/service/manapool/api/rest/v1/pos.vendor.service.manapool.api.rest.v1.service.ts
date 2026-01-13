import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { map, catchError, lastValueFrom } from 'rxjs';
import { ForbiddenException } from '@nestjs/common';

@Injectable()
export class POSVendorServiceManaPoolAPIRestV1Service {

    constructor(
        private configService: ConfigService,
        private httpService: HttpService,
    ) {}


    private manaPoolAPIURL = this.configService.get('MANAPOOL_API_URL');
    private manaPoolEmailHeader = "X-ManaPool-Email";
    private manaPoolAccessTokenHeader = "X-ManaPool-Access-Token";

    
    async getManaPoolAccount(email: string, accessToken: string) {
        
        const url = this.manaPoolAPIURL + '/account';
        const headers = { [this.manaPoolEmailHeader]: email, [this.manaPoolAccessTokenHeader]: accessToken };
        const response = this.httpService.get(url, { headers }).pipe(
            map(response => response.data),
            catchError(error => {
                throw new ForbiddenException(error.response.data);
            })
        );

        let data = await lastValueFrom(response);

        return data;

    }

    async getManaPoolSellerInventoryByTCGPlayerSku(email: string, accessToken: string, tcgPlayerSku: number) {
        
        const url = this.manaPoolAPIURL + '/seller/inventory/tcgsku/' + tcgPlayerSku;
        const headers = { [this.manaPoolEmailHeader]: email, [this.manaPoolAccessTokenHeader]: accessToken };
        const response = this.httpService.get(url, { headers }).pipe(
            map(response => response.data),
            catchError(error => {
                throw new ForbiddenException(error.response.data);
            })
        );

        let data = await lastValueFrom(response);

        return data;
    }

    async updateManaPoolSellerInventoriesByTCGPlayerSku(email: string, accessToken: string, inventory: any[]) {
        const url = this.manaPoolAPIURL + '/seller/inventory/tcgsku';
        const headers = { [this.manaPoolEmailHeader]: email, [this.manaPoolAccessTokenHeader]: accessToken };
        const response = this.httpService.post(url, inventory, { headers }).pipe(
            map(response => response.data),
            catchError(error => {
                throw new ForbiddenException(error.response.data);
            })
        );

        let data = await lastValueFrom(response);

        return data;

    }

    async updateManaPoolSellerInventoryByTCGPlayerSku(email: string, accessToken: string, tcgPlayerSku: number, inventory: any) {
        
        const url = this.manaPoolAPIURL + '/seller/inventory/tcgsku/' + tcgPlayerSku;
        const headers = { [this.manaPoolEmailHeader]: email, [this.manaPoolAccessTokenHeader]: accessToken };
        const response = this.httpService.put(url, inventory, { headers }).pipe(
            map(response => response.data),
            catchError(error => {
                throw new ForbiddenException(error.response.data);
            })
        );

        let data = await lastValueFrom(response);

        return data;
    }

    async deleteManaPoolSellerInventoryByTCGPlayerSku(email: string, accessToken: string, tcgPlayerSku: number) {
        
        const url = this.manaPoolAPIURL + '/seller/inventory/tcgsku/' + tcgPlayerSku;
        const headers = { [this.manaPoolEmailHeader]: email, [this.manaPoolAccessTokenHeader]: accessToken };
        const response = this.httpService.delete(url, { headers }).pipe(
            map(response => response.data),
            catchError(error => {
                throw new ForbiddenException(error.response.data);
            })
        );

        let data = await lastValueFrom(response);
        
        return data;
    }

    async getManaPoolSellerOrders(email: string, accessToken: string) {
        
        const url = this.manaPoolAPIURL + '/seller/orders';
        const headers = { [this.manaPoolEmailHeader]: email, [this.manaPoolAccessTokenHeader]: accessToken };
        const response = this.httpService.get(url, { headers }).pipe(
            map(response => response.data),
            catchError(error => {
                throw new ForbiddenException(error.response.data);
            })
        );

        let data = await lastValueFrom(response);

        return data;
    }

    async getManaPoolSellerOrderById(email: string, accessToken: string, orderId: string) {
        
        const url = this.manaPoolAPIURL + '/seller/orders/' + orderId ;
        const headers = { [this.manaPoolEmailHeader]: email, [this.manaPoolAccessTokenHeader]: accessToken };
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
