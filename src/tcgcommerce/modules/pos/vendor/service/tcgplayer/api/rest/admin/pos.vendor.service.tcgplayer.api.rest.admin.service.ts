import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { map, catchError, lastValueFrom } from 'rxjs';
import { ForbiddenException } from '@nestjs/common';

@Injectable()
export class POSVendorServiceTCGPlayerAPIRestAdminService {

    constructor(
        private configService: ConfigService,
        private httpService: HttpService,
    ) {}


    private manaPoolAPIURL = this.configService.get('MANAPOOL_API_URL');
    private manaPoolEmailHeader = "X-TCGPlayer-Email";
    private manaPoolAccessTokenHeader = "X-TCGPlayer-Access-Token";

    

}
    