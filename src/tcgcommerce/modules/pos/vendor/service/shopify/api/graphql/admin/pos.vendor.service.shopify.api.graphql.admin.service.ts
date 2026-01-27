import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createAdminApiClient } from '@shopify/admin-api-client';
import { ForbiddenException } from '@nestjs/common';


@Injectable()
export class POSVendorServiceShopifyAPIGraphQLAdminService {

    constructor(
        private configService: ConfigService,
    ) {}


    private shopifyAPIVersion = this.configService.get('SHOPIFY_API_VERSION');
    
    

    //UTILITY METHODS;
    async createAdminAPIClient(storeDomain: string, accessToken: string): Promise<any> {
        let adminApiClient = createAdminApiClient({
            storeDomain: storeDomain,
            accessToken: accessToken,
            apiVersion: this.shopifyAPIVersion,
        });

        return adminApiClient;


    }

}
