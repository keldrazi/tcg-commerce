
import { HttpService } from '@nestjs/axios';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { map, catchError, lastValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TCGPlayerAPIUtilService {

    constructor(
        private httpService: HttpService,  
        private configService: ConfigService,
    ) {}

    private tcgPlayerClientId = this.configService.get('TCGPLAYER_CLIENT_ID')
    private tcgPlayerClientSecret = this.configService.get('TCGPLAYER_CLIENT_SECRET');
    private tcgPlayerClientAccessToken = this.configService.get('TCGPLAYER_CLIENT_ACCESS_TOKEN');

    async getTCGPlayerAPIAccessToken() {
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

        const { access_token } = await lastValueFrom(response);
        
        return access_token;
    
    }
}


