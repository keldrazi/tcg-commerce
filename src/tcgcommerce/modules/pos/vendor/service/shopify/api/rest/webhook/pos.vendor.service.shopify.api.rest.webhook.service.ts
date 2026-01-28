import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { map, catchError, lastValueFrom } from 'rxjs';
import { ForbiddenException } from '@nestjs/common';
import { ShopifyWebhook, ShopifyWebhookObject } from './types/pos.vendor.service.shopify.api.rest.webhook.types';


@Injectable()
export class POSVendorServiceShopifyAPIRestWebhookService {

    constructor(
        private configService: ConfigService,
        private httpService: HttpService,
    ) {}


    private shopifyRestURLPrefix = this.configService.get('SHOPIFY_REST_URL_PREFIX') 
    private shopifyRestURL = this.configService.get('SHOPIFY_REST_URL')
    private shopifyAPIVersion = this.configService.get('SHOPIFY_API_VERSION');
    
    async createShopifyWebhook(storeName:string, accessToken:string, webhookTopic: string, webhookAddress: string): Promise<any> {

        let shopifyWebhook: ShopifyWebhook = {
            address: webhookAddress,
            topic: webhookTopic,
            format: 'json'
        };
        
        let shopifyWebhookObject: ShopifyWebhookObject = {
            webhook: shopifyWebhook
        };

        let shopifyRestURI = await this.getShopifyRestURIByStoreName(storeName);

        const shopifyShopURI = shopifyRestURI + 'webhooks.json';
        const headers = {
            'Content-Type': 'application/json',
            'X-Shopify-Access-Token': accessToken
        }

        const request = this.httpService.post(shopifyShopURI, shopifyWebhookObject, {headers: headers})
            .pipe(map((response) => response.data))
            .pipe(
                catchError(error => {
                    throw new InternalServerErrorException(error.response.data);
                }),
            );

        const data = await lastValueFrom(request);

        return data;
        
    }

    /*******************************************************************************/
    /* UTILITY METHODS
    /******************************************************************************/
    async getShopifyRestURIByStoreName(storeName:string): Promise<string> {
        return this.shopifyRestURLPrefix + storeName + this.shopifyRestURL + this.shopifyAPIVersion + '/';
    }


    

}
