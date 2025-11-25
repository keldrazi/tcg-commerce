import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommerceAccount } from 'src/typeorm/entities/tcgcommerce/modules/commerce/account/commerce.account.entity';
import { CreateCommerceAccountDTO, UpdateCommerceAccountDTO, CommerceAccountDTO } from './dto/commerce.account.dto';
import { CommerceAccountApplicationModule } from './interface/commerce.account.interface';
import { ErrorMessageService } from 'src/system/modules/error/message/error.message.service';

@Injectable()
export class CommerceAccountService {

    constructor(
        @InjectRepository(CommerceAccount) private commerceAccountRepository: Repository<CommerceAccount>,
        private errorMessageService: ErrorMessageService,
    ) { }

    async getActiveCommerceAccounts() {
        let commerceAccounts = await this.commerceAccountRepository.find({
            where: {
                commerceAccountIsActive: true
            }
        });

        let commerceAccountDTOs: CommerceAccountDTO[] = [];

        for(let i = 0; i < commerceAccounts.length; i++) {
            let commerceAccount = commerceAccounts[i];
            let commerceAccountDTO: CommerceAccountDTO = {
                commerceAccountId: commerceAccount.commerceAccountId,
                commerceAccountName: commerceAccount.commerceAccountName,
                commerceAccountContactName: commerceAccount.commerceAccountContactName,
                commerceAccountContactEmail: commerceAccount.commerceAccountContactEmail,
                commerceAccountContactPhone: commerceAccount.commerceAccountContactPhone,
                commerceAccountHandle: commerceAccount.commerceAccountHandle,
                commerceAccountApplicationModules: JSON.parse(commerceAccount.commerceAccountApplicationModules) as CommerceAccountApplicationModule[],
                commerceAccountAPIClientId: commerceAccount.commerceAccountAPIClientId,
                commerceAccountAPIClientToken: commerceAccount.commerceAccountAPIClientToken,
                commerceAccountIsActive: commerceAccount.commerceAccountIsActive,
                commerceAccountCreateDate: commerceAccount.commerceAccountCreateDate,
                commerceAccountUpdateDate: commerceAccount.commerceAccountUpdateDate,
            }

            commerceAccountDTOs.push(commerceAccountDTO);
        }
        
        return commerceAccountDTOs;
    }

    async getCommerceAccount(commerceAccountId: string) {
        let commerceAccount = await this.commerceAccountRepository.findOne({ 
            where: { 
                commerceAccountId: commerceAccountId 
            } 
        });
        
        if (commerceAccount == null) {
            return this.errorMessageService.createErrorMessage('COMMERCE_ACCOUNT_NOT_FOUND', 'Commerce account was not found for commerceAccountId: ' + commerceAccountId);
        }

         let commerceAccountDTO: CommerceAccountDTO = {
            commerceAccountId: commerceAccount.commerceAccountId,
            commerceAccountName: commerceAccount.commerceAccountName,
            commerceAccountContactName: commerceAccount.commerceAccountContactName,
            commerceAccountContactEmail: commerceAccount.commerceAccountContactEmail,
            commerceAccountContactPhone: commerceAccount.commerceAccountContactPhone,
            commerceAccountHandle: commerceAccount.commerceAccountHandle,
            commerceAccountApplicationModules: JSON.parse(commerceAccount.commerceAccountApplicationModules) as CommerceAccountApplicationModule[],
            commerceAccountAPIClientId: commerceAccount.commerceAccountAPIClientId,
            commerceAccountAPIClientToken: commerceAccount.commerceAccountAPIClientToken,
            commerceAccountIsActive: commerceAccount.commerceAccountIsActive,
            commerceAccountCreateDate: commerceAccount.commerceAccountCreateDate,
            commerceAccountUpdateDate: commerceAccount.commerceAccountUpdateDate,
         };
        
        return commerceAccountDTO;
        
    }

    async getCommerceAccountByClientIdAndToken(commerceAccountAPIClientId: string, commerceAccountAPIClientToken: string) {
        let commerceAccount = await this.commerceAccountRepository.findOne({ 
            where: {
                commerceAccountAPIClientId: commerceAccountAPIClientId,
                commerceAccountAPIClientToken: commerceAccountAPIClientToken
            } 
        });

        return commerceAccount;

    }

    async createCommerceAccount(createCommerceAccountDTO: CreateCommerceAccountDTO) {

        let existingCommerceAccount = await this.commerceAccountRepository.findOne({ 
            where: { 
                commerceAccountHandle: createCommerceAccountDTO.commerceAccountHandle 
            } 
        });

        if (existingCommerceAccount != null) {
            return this.errorMessageService.createErrorMessage('COMMERCE_ACCOUNT_EXISTS', 'Commerce account with handle already exists: ' + createCommerceAccountDTO.commerceAccountHandle);
        }

        let commerceAccountAPIHandle = await this.createCommerceAccountAPIHandle(createCommerceAccountDTO.commerceAccountHandle);
        let commerceAccountAPIClientId = 'client_' + commerceAccountAPIHandle + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        let commerceAccountAPIClientToken = 'token_' + commerceAccountAPIHandle +  Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

        let newCommerceAccount = this.commerceAccountRepository.create({ ...createCommerceAccountDTO, commerceAccountAPIClientId, commerceAccountAPIClientToken });
        newCommerceAccount.commerceAccountAPIClientId = commerceAccountAPIClientId;
        newCommerceAccount.commerceAccountAPIClientToken = commerceAccountAPIClientToken;
        newCommerceAccount = await this.commerceAccountRepository.save(newCommerceAccount);

        let commerceAccountDTO = await this.getCommerceAccount(newCommerceAccount.commerceAccountId);

        return commerceAccountDTO;
    }

    async updateCommerceAccount(updateCommerceAccountDTO: UpdateCommerceAccountDTO) {
        let updateCommerceAccount = await this.commerceAccountRepository.findOne({ 
            where: { 
                commerceAccountId: updateCommerceAccountDTO.commerceAccountId 
            } 
        });

        if (updateCommerceAccount == null) {
            return this.errorMessageService.createErrorMessage('COMMERCE_ACCOUNT_NOT_FOUND', 'Commerce account was not found for commerceAccountId: ' + updateCommerceAccountDTO.commerceAccountId);
        }

        updateCommerceAccount.commerceAccountName = updateCommerceAccountDTO.commerceAccountName;
        updateCommerceAccount.commerceAccountContactName = updateCommerceAccountDTO.commerceAccountContactName;
        updateCommerceAccount.commerceAccountContactEmail = updateCommerceAccountDTO.commerceAccountContactEmail;
        updateCommerceAccount.commerceAccountContactPhone = updateCommerceAccountDTO.commerceAccountContactPhone;
        updateCommerceAccount.commerceAccountApplicationModules = updateCommerceAccountDTO.commerceAccountApplicationModules;
        updateCommerceAccount.commerceAccountIsActive = updateCommerceAccountDTO.commerceAccountIsActive;
        updateCommerceAccount.commerceAccountUpdateDate = new Date();

        updateCommerceAccount = await this.commerceAccountRepository.save(updateCommerceAccount);

        let commerceAccountDTO = await this.getCommerceAccount(updateCommerceAccount.commerceAccountId);

        return commerceAccountDTO;
    }

    async createCommerceAccountAPIHandle(commerceAccountHandle: string) {
        return commerceAccountHandle
            .toLowerCase() 
            .replace(/\s+/g, '-') 
            .replace(/[^a-z0-9-]/g, '') 
            .replace(/-+/g, '-') 
            .replace(/^-|-$/g, ''); 
    }
}