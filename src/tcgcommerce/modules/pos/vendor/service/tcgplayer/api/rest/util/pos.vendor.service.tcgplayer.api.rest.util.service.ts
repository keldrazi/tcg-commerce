
import { HttpService } from '@nestjs/axios';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { map, catchError, lastValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';
import { POSVendorServiceTCGPlayerAPIRestUtil } from 'src/typeorm/entities/tcgcommerce/modules/pos/vendor/service/tcgplayer/api/rest/util/pos.vendor.service.tcgplayer.api.rest.util.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';


@Injectable()
export class POSVendorServiceTCGPlayerAPIRestUtilService {
    //TO DO: STORE THE TOKEN SOMEWHERE AND CHECK IF IT'S EXPIRED BEFORE REQUESTING A NEW ONE;
    constructor(
        @InjectRepository(POSVendorServiceTCGPlayerAPIRestUtil) private tcgPlayerUtilRepository: Repository<POSVendorServiceTCGPlayerAPIRestUtil>,
        private httpService: HttpService,
        private configService: ConfigService,
    ) {}

    private tcgPlayerClientId = this.configService.get('TCGPLAYER_CLIENT_ID')
    private tcgPlayerClientSecret = this.configService.get('TCGPLAYER_CLIENT_SECRET');
    private tcgPlayerClientAccessToken = this.configService.get('TCGPLAYER_CLIENT_ACCESS_TOKEN');

    async getTCGPlayerAPIAccessToken() {
        
        let posVendorServiceTCGPlayerAPIRestUtil = await this.getPOSVendorServiceTCGPlayerAPIRestUtil();
        
        if(posVendorServiceTCGPlayerAPIRestUtil) {
            const posVendorServiceTCGPlayerAPIRestUtilAccessTokenExpires = new Date(posVendorServiceTCGPlayerAPIRestUtil.posVendorServiceTCGPlayerAPIRestUtilAccessTokenExpires);
            if (posVendorServiceTCGPlayerAPIRestUtilAccessTokenExpires > new Date()) {
                return posVendorServiceTCGPlayerAPIRestUtil.posVendorServiceTCGPlayerAPIRestUtilAccessToken;
            }
        }

        const url = 'https://api.tcgplayer.com/token';
        const body = {
            grant_type: 'client_credentials',
            client_id: this.tcgPlayerClientId,
            client_secret: this.tcgPlayerClientSecret,
        }

        const headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
            'X-Tcg-Access-Token': this.tcgPlayerClientAccessToken,
        }

        const response = this.httpService.post(url, body, { headers }).pipe(
            map(response => response.data),
            catchError(error => {
                throw new ForbiddenException(error.response.data);
            })
        );

        const access_token_data = await lastValueFrom(response);
        const access_token = access_token_data.access_token;
        const access_token_issued = access_token_data[".issued"];
        const access_token_expires = access_token_data[".expires"];

        if(posVendorServiceTCGPlayerAPIRestUtil) {
            posVendorServiceTCGPlayerAPIRestUtil.posVendorServiceTCGPlayerAPIRestUtilAccessToken = access_token;
            posVendorServiceTCGPlayerAPIRestUtil.posVendorServiceTCGPlayerAPIRestUtilAccessTokenIssued = access_token_issued;
            posVendorServiceTCGPlayerAPIRestUtil.posVendorServiceTCGPlayerAPIRestUtilAccessTokenExpires = access_token_expires;
            
            await this.tcgPlayerUtilRepository.save(posVendorServiceTCGPlayerAPIRestUtil);
        }
        else {
            posVendorServiceTCGPlayerAPIRestUtil = new POSVendorServiceTCGPlayerAPIRestUtil();
            posVendorServiceTCGPlayerAPIRestUtil.posVendorServiceTCGPlayerAPIRestUtilAccessToken = access_token;
            posVendorServiceTCGPlayerAPIRestUtil.posVendorServiceTCGPlayerAPIRestUtilAccessTokenIssued = access_token_issued;
            posVendorServiceTCGPlayerAPIRestUtil.posVendorServiceTCGPlayerAPIRestUtilAccessTokenExpires = access_token_expires;
            
            await this.tcgPlayerUtilRepository.save(posVendorServiceTCGPlayerAPIRestUtil);
        }

        return access_token;
    
    }

    async getPOSVendorServiceTCGPlayerAPIRestUtil() {
        const posVendorServiceTCGPlayerAPIRestUtils = await this.tcgPlayerUtilRepository.find();
        const posVendorServiceTCGPlayerAPIRestUtil = posVendorServiceTCGPlayerAPIRestUtils[0];

        return posVendorServiceTCGPlayerAPIRestUtil;
    }
}


