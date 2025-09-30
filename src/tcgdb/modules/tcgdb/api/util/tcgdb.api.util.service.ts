
import { HttpService } from '@nestjs/axios';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { map, catchError, lastValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';
import { TCGdbAPIUtil } from 'src/typeorm/entities/tcgdb/modules/tcgdb/api/util/tcgdb.api.util.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TCGdbAPIUtilService {
    
    constructor(
        @InjectRepository(TCGdbAPIUtil) private tcgdbAPIUtilRepository: Repository<TCGdbAPIUtil>,
        private httpService: HttpService,
        private configService: ConfigService,
    ) {}

    private tcgdbAPIURL = this.configService.get('TCGDB_API_URL');
    private tcgdbAPIUsername = this.configService.get('TCGDB_API_USERNAME');
    private tcgdbAPIPassword = this.configService.get('TCGDB_API_PASSWORD');

    async getTCGdbAPIAccessToken() {

        let tcgdbAPIUtil = await this.getTCGdbAPIUtil();

        if (tcgdbAPIUtil) {
            const tcgdbAPIUtilAccessTokenExpires = new Date(tcgdbAPIUtil.tcgdbAPIUtilAccessTokenExpires);
            if (tcgdbAPIUtilAccessTokenExpires > new Date()) {
                return tcgdbAPIUtil.tcgdbAPIUtilAccessToken;
            }
        }

        const url = this.tcgdbAPIURL + '/auth/api/token/request';
        const body = {
            authUserEmail: this.tcgdbAPIUsername,
            authUserPassword: this.tcgdbAPIPassword,
        };

        const response = this.httpService.post(url, body).pipe(
            map(response => response.data),
            catchError(error => {
                throw new ForbiddenException(error.response.data);
            })
        );

        const access_token_data = await lastValueFrom(response);
        const access_token = access_token_data.access_token;
        const access_token_issued = access_token_data.access_token_issued;
        const access_token_expires = access_token_data.access_token_expires;

        if (tcgdbAPIUtil) {
            tcgdbAPIUtil.tcgdbAPIUtilAccessToken = access_token;
            tcgdbAPIUtil.tcgdbAPIUtilAccessTokenIssued = access_token_issued;
            tcgdbAPIUtil.tcgdbAPIUtilAccessTokenExpires = access_token_expires;
            await this.tcgdbAPIUtilRepository.save(tcgdbAPIUtil);
        }
        else {
            const newTCGdbAPIUtil = new TCGdbAPIUtil();
            newTCGdbAPIUtil.tcgdbAPIUtilAccessToken = access_token;
            newTCGdbAPIUtil.tcgdbAPIUtilAccessTokenIssued = access_token_issued;
            newTCGdbAPIUtil.tcgdbAPIUtilAccessTokenExpires = access_token_expires;
            await this.tcgdbAPIUtilRepository.save(newTCGdbAPIUtil);
        }

        return access_token;
    
    }

    async getTCGdbAPIUtil() {
        const tcgdbAPIUtils = await this.tcgdbAPIUtilRepository.find();
        const tcgdbAPIUtil = tcgdbAPIUtils[0];

        return tcgdbAPIUtil;
    }
}


