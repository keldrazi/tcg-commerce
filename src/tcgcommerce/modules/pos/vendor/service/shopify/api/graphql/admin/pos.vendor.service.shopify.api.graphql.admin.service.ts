import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ForbiddenException } from '@nestjs/common';


@Injectable()
export class POSVendorServiceShopifyAPIGraphQlAdminService {

    constructor(
        private configService: ConfigService,
    ) {}


    private shopifyAPIVersion = this.configService.get('SHOPIFY_API_VERSION');
    
    

}
