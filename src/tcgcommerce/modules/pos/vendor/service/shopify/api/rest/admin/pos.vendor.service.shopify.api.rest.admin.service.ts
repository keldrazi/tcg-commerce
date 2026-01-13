import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { map, catchError, lastValueFrom } from 'rxjs';
import { ForbiddenException } from '@nestjs/common';


@Injectable()
export class POSVendorServiceShopifyAPIRestAdminService {

    constructor(
        private configService: ConfigService,
        private httpService: HttpService,
    ) {}


    private shopifyAPIVersion = this.configService.get('SHOPIFY_API_VERSION');
    
    

    

}
