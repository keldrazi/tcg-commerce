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


    async getCommerceAccountToken(commerceAccountId: string) {
        let commerceAccountToken = await this.commerceAccountTokenRepository.findOne({ 
            where: { 
                commerceAccountId: commerceAccountId 
            } 
        });
        
        if (commerceAccountToken == null) {
            return this.errorMessageService.createErrorMessage('COMMERCE_ACCOUNT_TOKEN_NOT_FOUND', 'Commerce account token was not found for commerceAccountId: ' + commerceAccountId);
        }

         let commerceAccountTokenDTO: CommerceAccountTokenDTO = ({ ...commerceAccountToken });
         
        
        return commerceAccountTokenDTO;
        
    }

    async createCommerceAccountToken(createCommerceAccountTokenDTO: CreateCommerceAccountTokenDTO) {

        let existingCommerceAccountToken = await this.commerceAccountTokenRepository.findOne({ 
            where: { 
                commerceAccountId: createCommerceAccountTokenDTO.commerceAccountId 
            } 
        });

        if (existingCommerceAccountToken != null) {
            return this.errorMessageService.createErrorMessage('COMMERCE_ACCOUNT_TOKEN_EXISTS', 'Commerce account token already exists: ' + createCommerceAccountTokenDTO.commerceAccountId);
        }

        let newCommerceAccountToken = this.commerceAccountTokenRepository.create({
            commerceAccountId: createCommerceAccountTokenDTO.commerceAccountId,
            commerceAccountToken: createCommerceAccountTokenDTO.commerceAccountToken,
            commerceAccountTokenIssued: createCommerceAccountTokenDTO.commerceAccountTokenIssued,
            commerceAccountTokenExpires: createCommerceAccountTokenDTO.commerceAccountTokenExpires,
        });

        newCommerceAccountToken =  await this.commerceAccountTokenRepository.save(newCommerceAccountToken);

        let commerceAccountTokenDTO = await this.getCommerceAccountToken(newCommerceAccountToken.commerceAccountId);

        return commerceAccountTokenDTO;
    }

    async updateCommerceAccountToken(updateCommerceAccountTokenDTO: UpdateCommerceAccountTokenDTO) {
        let updateCommerceAccountToken = await this.commerceAccountTokenRepository.findOne({ 
            where: { 
                commerceAccountId: updateCommerceAccountTokenDTO.commerceAccountId 
            } 
        });

        if (updateCommerceAccountToken == null) {
            return this.errorMessageService.createErrorMessage('COMMERCE_ACCOUNT_TOKEN_NOT_FOUND', 'Commerce account token was not found for commerceAccountId: ' + updateCommerceAccountTokenDTO.commerceAccountId);
        }

        updateCommerceAccountToken.commerceAccountTokenId = updateCommerceAccountTokenDTO.commerceAccountTokenId;
        updateCommerceAccountToken.commerceAccountId = updateCommerceAccountTokenDTO.commerceAccountId;
        updateCommerceAccountToken.commerceAccountToken = updateCommerceAccountTokenDTO.commerceAccountToken;
        updateCommerceAccountToken.commerceAccountTokenIssued = updateCommerceAccountTokenDTO.commerceAccountTokenIssued;
        updateCommerceAccountToken.commerceAccountTokenExpires = updateCommerceAccountTokenDTO.commerceAccountTokenExpires;
        updateCommerceAccountToken.commerceAccountTokenUpdateDate = new Date();

        updateCommerceAccountToken = await this.commerceAccountTokenRepository.save(updateCommerceAccountToken);

        let commerceAccountTokenDTO = await this.getCommerceAccountToken(updateCommerceAccountToken.commerceAccountId);

        return commerceAccountTokenDTO;
    }
}