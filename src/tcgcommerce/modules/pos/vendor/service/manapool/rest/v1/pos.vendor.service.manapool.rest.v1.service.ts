import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { map, catchError, lastValueFrom } from 'rxjs';
import { ForbiddenException } from '@nestjs/common';

@Injectable()
export class POSVendorServiceManaPoolRestV1Service {

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
}
