import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { map, catchError, lastValueFrom } from 'rxjs';
import { ForbiddenException } from '@nestjs/common';

@Injectable()
export class POSVendorServiceManaPoolAPIWebhookV1Service {

    constructor(
        private configService: ConfigService,
        private httpService: HttpService,
    ) {}


    private manaPoolAPIURL = this.configService.get('MANAPOOL_API_URL');
    private manaPoolEmailHeader = "X-ManaPool-Email";
    private manaPoolAccessTokenHeader = "X-ManaPool-Access-Token";

    
    async getManaPoolWebhooks(email: string, accessToken: string) {
        
        const url = this.manaPoolAPIURL + '/webhooks';
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

    async getManaPoolWebhookById(email: string, accessToken: string, webhookId: string) {
        
        const url = this.manaPoolAPIURL + '/webhooks/' + webhookId;
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

    async createManaPoolWebhook(email: string, accessToken: string, webhook: any) {
        const url = this.manaPoolAPIURL + '/webhooks/register';
        const headers = { [this.manaPoolEmailHeader]: email, [this.manaPoolAccessTokenHeader]: accessToken };
        const response = this.httpService.put(url, webhook, { headers }).pipe(
            map(response => response.data),
            catchError(error => {
                throw new ForbiddenException(error.response.data);
            })
        );

        let data = await lastValueFrom(response);

        return data;

    }

    async deleteManaPoolWebhookById(email: string, accessToken: string, webhookId: string) {
        
        const url = this.manaPoolAPIURL + '/webhooks/' + webhookId;
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

}
