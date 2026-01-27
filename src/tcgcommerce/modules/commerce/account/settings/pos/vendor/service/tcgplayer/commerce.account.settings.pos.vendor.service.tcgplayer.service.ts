import { Injectable, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { map, catchError, lastValueFrom } from 'rxjs';
import { CommerceAccountSettingsPOSVendorServiceTCGPlayer } from 'src/typeorm/entities/tcgcommerce/modules/commerce/account/settings/pos/vendor/service/tcgplayer/commerce.account.settings.pos.vendor.service.tcgplayer.entity';
import { CommerceAccountSettingsPOSVendorServiceTCGPlayerDTO } from './dto/commerce.account.settings.pos.vendor.service.tcgplayer.dto';

@Injectable()
export class CommerceAccountSettingsPOSVendorServiceTCGPlayerService {

    constructor(
        @InjectRepository(CommerceAccountSettingsPOSVendorServiceTCGPlayer) private commerceAccountSettingsPOSVendorServiceTCGPlayerRepository: Repository<CommerceAccountSettingsPOSVendorServiceTCGPlayer>,
        private configService: ConfigService,
        private httpService: HttpService,
    ) { }

    private tcgPlayerStoreAuthorizationURL = this.configService.get('TCGPLAYER_STORE_AUTHORIZATION_URL');
    private tcgPlayerAppAuthorizationURL = this.configService.get('TCGPLAYER_APP_AUTHORIZATION_URL');
    private tcgPlayerAPIURL = this.configService.get('TCGPLAYER_API_URL');
    private tcgPlayerClientId = this.configService.get('TCGPLAYER_CLIENT_ID')
    private tcgPlayerClientSecret = this.configService.get('TCGPLAYER_CLIENT_SECRET');

    async getCommerceAccountSettingsPOSVendorServiceTCGPlayerById(commerceAccountSettingsPOSVendorServiceTCGPlayerId: string): Promise<CommerceAccountSettingsPOSVendorServiceTCGPlayerDTO> {
        let commerceAccountSettingsPOSVendorServiceTCGPlayer = await this.commerceAccountSettingsPOSVendorServiceTCGPlayerRepository.findOneOrFail({ 
            where: { 
                commerceAccountSettingsPOSVendorServiceTCGPlayerId : commerceAccountSettingsPOSVendorServiceTCGPlayerId
            } 
        });

        let commerceAccountSettingsPOSVendorServiceTCGPlayerDTO: CommerceAccountSettingsPOSVendorServiceTCGPlayerDTO = ({ ...commerceAccountSettingsPOSVendorServiceTCGPlayer });  
        
        return commerceAccountSettingsPOSVendorServiceTCGPlayerDTO;
        
    }

    async getCommerceAccountSettingsPOSVendorServiceTCGPlayerByCommerceAccountId(commerceAccountId: string): Promise<CommerceAccountSettingsPOSVendorServiceTCGPlayerDTO> {
        let commerceAccountSettingsPOSVendorServiceTCGPlayer = await this.commerceAccountSettingsPOSVendorServiceTCGPlayerRepository.findOneOrFail({ 
            where: { 
                commerceAccountId : commerceAccountId
            } 
        });

        let commerceAccountSettingsPOSVendorServiceTCGPlayerDTO: CommerceAccountSettingsPOSVendorServiceTCGPlayerDTO = ({ ...commerceAccountSettingsPOSVendorServiceTCGPlayer });

        return commerceAccountSettingsPOSVendorServiceTCGPlayerDTO;
        
    }

    async getCommerceAccountSettingsPOSVendorServiceTCGPlayerAuthorizationURL(): Promise<string> {
        return this.tcgPlayerStoreAuthorizationURL + '/' + this.tcgPlayerClientSecret;
    }

    async authorizeCommerceAccountSettingsPOSVendorServiceTCGPlayer(commerceAccountId: string, authorizationCode: string): Promise<CommerceAccountSettingsPOSVendorServiceTCGPlayerDTO> {
        
        const url = this.tcgPlayerAppAuthorizationURL + '/' + authorizationCode;

        const headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
        }

        const response = this.httpService.post(url, { headers }).pipe(
            map(response => response.data),
            catchError(error => {
                throw new ForbiddenException(error.response.data);
            })
        );

        const access_token_data = await lastValueFrom(response);
        const authorization_access_token = access_token_data.results[0].authorizationKey;

        let commerceAccountSettingsPOSVendorServiceTCGPlayer = await this.commerceAccountSettingsPOSVendorServiceTCGPlayerRepository.create({
            commerceAccountId: commerceAccountId,
            commerceAccountSettingsPOSVendorServiceTCGPlayerAuthorizationCode: authorizationCode,
            commerceAccountSettingsPOSVendorServiceTCGPlayerAccessToken: authorization_access_token,
        });

        commerceAccountSettingsPOSVendorServiceTCGPlayer = await this.commerceAccountSettingsPOSVendorServiceTCGPlayerRepository.save(commerceAccountSettingsPOSVendorServiceTCGPlayer);

        try{
            let commerceAccountSettingsPOSVendorServiceTCGPlayerBearerToken = await this.getCommerceAccountSettingsPOSVendorServiceTCGPlayerAPIBearerToken(commerceAccountId);
        } catch(error){
            throw new ForbiddenException(error.response.data);
        }

        let newCommerceAccountSettingsPOSVendorServiceTCGPlayer = await this.commerceAccountSettingsPOSVendorServiceTCGPlayerRepository.findOneOrFail({ 
            where: { 
                commerceAccountId : commerceAccountId
            } 
        });

        let commerceAccountSettingsPOSVendorServiceTCGPlayerDTO: CommerceAccountSettingsPOSVendorServiceTCGPlayerDTO = ({ ...newCommerceAccountSettingsPOSVendorServiceTCGPlayer });

        return commerceAccountSettingsPOSVendorServiceTCGPlayerDTO;

    }

    async updateCommerceAccountSettingsPOSVendorServiceTCGPlayerStoreInfo(commerceAccountId:string): Promise<CommerceAccountSettingsPOSVendorServiceTCGPlayerDTO> {
        let commerceAccountSettingsPOSVendorServiceTCGPlayer = await this.commerceAccountSettingsPOSVendorServiceTCGPlayerRepository.findOneOrFail({ 
            where: { 
                commerceAccountId : commerceAccountId
            } 
        });

        let bearerToken = await this.getCommerceAccountSettingsPOSVendorServiceTCGPlayerAPIBearerToken(commerceAccountId);

        const url = this.tcgPlayerAPIURL + '/stores/self';
        const headers = { 'Authorization': 'Bearer ' + bearerToken };
        const response = this.httpService.get(url, { headers }).pipe(
            map(response => response.data),
            catchError(error => {
                throw new ForbiddenException(error.response.data);
            })
        );

        let data = await lastValueFrom(response);

        commerceAccountSettingsPOSVendorServiceTCGPlayer.commerceAccountSettingsPOSVendorServiceTCGPlayerName = data.results[0].name;
        commerceAccountSettingsPOSVendorServiceTCGPlayer.commerceAccountSettingsPOSVendorServiceTCGPlayerStoreKey = data.results[0].storeKey;
        commerceAccountSettingsPOSVendorServiceTCGPlayer.commerceAccountSettingsPOSVendorServiceTCGPlayerIsVerified = true;

        await this.commerceAccountSettingsPOSVendorServiceTCGPlayerRepository.save(commerceAccountSettingsPOSVendorServiceTCGPlayer);

        let commerceAccountSettingsPOSVendorServiceTCGPlayerDTO: CommerceAccountSettingsPOSVendorServiceTCGPlayerDTO = ({ ...commerceAccountSettingsPOSVendorServiceTCGPlayer });

        return commerceAccountSettingsPOSVendorServiceTCGPlayerDTO;
    }

    async getCommerceAccountSettingsPOSVendorServiceTCGPlayerAPIBearerToken(commerceAccountId: string): Promise<string> {
            
        let commerceAccountSettingsPOSVendorServiceTCGPlayer = await this.commerceAccountSettingsPOSVendorServiceTCGPlayerRepository.findOneOrFail({ 
            where: { 
                commerceAccountId : commerceAccountId
            } 
        });

        if(commerceAccountSettingsPOSVendorServiceTCGPlayer.commerceAccountSettingsPOSVendorServiceTCGPlayerBearerToken != null) {
        const commerceAccountSettingsPOSVendorServiceTCGPlayerBearerTokenExpires = new Date(commerceAccountSettingsPOSVendorServiceTCGPlayer.commerceAccountSettingsPOSVendorServiceTCGPlayerBearerTokenExpires);
            if (commerceAccountSettingsPOSVendorServiceTCGPlayerBearerTokenExpires > new Date()) {
                return commerceAccountSettingsPOSVendorServiceTCGPlayer.commerceAccountSettingsPOSVendorServiceTCGPlayerBearerToken;
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
            'X-Tcg-Access-Token': commerceAccountSettingsPOSVendorServiceTCGPlayer.commerceAccountSettingsPOSVendorServiceTCGPlayerAccessToken,
        }

        const response = this.httpService.post(url, body, { headers }).pipe(
            map(response => response.data),
            catchError(error => {
                throw new ForbiddenException(error.response.data);
            })
        );

        const bearer_token_data = await lastValueFrom(response);
        const bearer_token = bearer_token_data.access_token;
        const bearer_token_issued = bearer_token_data[".issued"];
        const bearer_token_expires = bearer_token_data[".expires"];

        
        commerceAccountSettingsPOSVendorServiceTCGPlayer.commerceAccountSettingsPOSVendorServiceTCGPlayerBearerToken = bearer_token;
        commerceAccountSettingsPOSVendorServiceTCGPlayer.commerceAccountSettingsPOSVendorServiceTCGPlayerBearerTokenIssued = bearer_token_issued;
        commerceAccountSettingsPOSVendorServiceTCGPlayer.commerceAccountSettingsPOSVendorServiceTCGPlayerBearerTokenExpires = bearer_token_expires;
        
        await this.commerceAccountSettingsPOSVendorServiceTCGPlayerRepository.save(commerceAccountSettingsPOSVendorServiceTCGPlayer);

        return bearer_token;
    
    }
}