import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommerceAccountToken } from 'src/typeorm/entities/tcgcommerce/modules/commerce/account/token/commerce.account.token.entity';
import { CreateCommerceAccountTokenDTO, UpdateCommerceAccountTokenDTO, CommerceAccountTokenDTO } from './dto/commerce.account.token.dto';
import { ErrorMessageService } from 'src/system/modules/error/message/error.message.service';
import { UpdateCommerceAccountDTO } from '../dto/commerce.account.dto';

@Injectable()
export class CommerceAccountTokenService {
    constructor(
        @InjectRepository(CommerceAccountToken) private commerceAccountTokenRepository: Repository<CommerceAccountToken>,
        private errorMessageService: ErrorMessageService,
    ) { }


    async getCommerceAccountTokenByCommerceAccountId(commerceAccountId: string) {
        let commerceAccountToken = await this.commerceAccountTokenRepository.findOne({ 
            where: { 
                commerceAccountId: commerceAccountId 
            } 
        });
        
        if (commerceAccountToken == null) {
            return this.errorMessageService.createErrorMessage('COMMERCE_ACCOUNT_TOKEN_NOT_FOUND', 'Commerce account token was not found');
        }

        let commerceAccountTokenDTO: CommerceAccountTokenDTO = ({ ...commerceAccountToken });
        
        return commerceAccountTokenDTO;
        
    }

    async createCommerceAccountToken(createCommerceAccountTokenDTO: CreateCommerceAccountTokenDTO) {

        let commerceAccountToken = await this.commerceAccountTokenRepository.findOne({ 
            where: { 
                commerceAccountId: createCommerceAccountTokenDTO.commerceAccountId 
            } 
        });

        if (commerceAccountToken != null) {
            return this.errorMessageService.createErrorMessage('COMMERCE_ACCOUNT_TOKEN_EXISTS', 'Commerce account token already exists');
        }

        commerceAccountToken = this.commerceAccountTokenRepository.create({
            commerceAccountId: createCommerceAccountTokenDTO.commerceAccountId,
            commerceAccountToken: createCommerceAccountTokenDTO.commerceAccountToken,
            commerceAccountTokenIssued: createCommerceAccountTokenDTO.commerceAccountTokenIssued,
            commerceAccountTokenExpires: createCommerceAccountTokenDTO.commerceAccountTokenExpires,
        });

        commerceAccountToken =  await this.commerceAccountTokenRepository.save(commerceAccountToken);

        let commerceAccountTokenDTO = await this.getCommerceAccountTokenByCommerceAccountId(commerceAccountToken.commerceAccountId);

        return commerceAccountTokenDTO;
    }

    async updateCommerceAccountToken(updateCommerceAccountTokenDTO: UpdateCommerceAccountTokenDTO) {
        let commerceAccountToken = await this.commerceAccountTokenRepository.findOne({ 
            where: { 
                commerceAccountId: updateCommerceAccountTokenDTO.commerceAccountId 
            } 
        });

        if (commerceAccountToken == null) {
            return this.errorMessageService.createErrorMessage('COMMERCE_ACCOUNT_TOKEN_NOT_FOUND', 'Commerce account token was not found');
        }

        commerceAccountToken.commerceAccountTokenId = updateCommerceAccountTokenDTO.commerceAccountTokenId;
        commerceAccountToken.commerceAccountId = updateCommerceAccountTokenDTO.commerceAccountId;
        commerceAccountToken.commerceAccountToken = updateCommerceAccountTokenDTO.commerceAccountToken;
        commerceAccountToken.commerceAccountTokenIssued = updateCommerceAccountTokenDTO.commerceAccountTokenIssued;
        commerceAccountToken.commerceAccountTokenExpires = updateCommerceAccountTokenDTO.commerceAccountTokenExpires;
        commerceAccountToken.commerceAccountTokenUpdateDate = new Date();

        commerceAccountToken = await this.commerceAccountTokenRepository.save(commerceAccountToken);

        let commerceAccountTokenDTO = await this.getCommerceAccountTokenByCommerceAccountId(commerceAccountToken.commerceAccountId);
        
        return commerceAccountTokenDTO;
    }
}