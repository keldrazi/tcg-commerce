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
                commerceAccountIsAdmin: commerceAccount.commerceAccountIsAdmin,
                commerceAccountCreateDate: commerceAccount.commerceAccountCreateDate,
                commerceAccountUpdateDate: commerceAccount.commerceAccountUpdateDate,
            }

            commerceAccountDTOs.push(commerceAccountDTO);
        }
        
        return commerceAccountDTOs;
    }

    async getCommerceAccountById(commerceAccountId: string) {
        let commerceAccount = await this.commerceAccountRepository.findOne({ 
            where: { 
                commerceAccountId: commerceAccountId 
            } 
        });
        
        if (commerceAccount == null) {
            return this.errorMessageService.createErrorMessage('COMMERCE_ACCOUNT_NOT_FOUND', 'Commerce account was not found');
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
            commerceAccountIsAdmin: commerceAccount.commerceAccountIsAdmin,
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

        let commerceAccount = await this.commerceAccountRepository.findOne({ 
            where: { 
                commerceAccountHandle: createCommerceAccountDTO.commerceAccountHandle 
            } 
        });

        if (commerceAccount != null) {
            return this.errorMessageService.createErrorMessage('COMMERCE_ACCOUNT_EXISTS', 'Commerce account with already exists');
        }

        let commerceAccountAPIHandle = await this.createCommerceAccountAPIHandle(createCommerceAccountDTO.commerceAccountHandle);
        let commerceAccountAPIClientId = 'client_' + commerceAccountAPIHandle + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        let commerceAccountAPIClientToken = 'token_' + commerceAccountAPIHandle +  Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

        commerceAccount = this.commerceAccountRepository.create({ ...createCommerceAccountDTO, commerceAccountAPIClientId, commerceAccountAPIClientToken });
        commerceAccount.commerceAccountAPIClientId = commerceAccountAPIClientId;
        commerceAccount.commerceAccountAPIClientToken = commerceAccountAPIClientToken;
        commerceAccount = await this.commerceAccountRepository.save(commerceAccount);

        let commerceAccountDTO = await this.getCommerceAccountById(commerceAccount.commerceAccountId);

        return commerceAccountDTO;
    }

    async updateCommerceAccount(updateCommerceAccountDTO: UpdateCommerceAccountDTO) {
        let commerceAccount = await this.commerceAccountRepository.findOne({ 
            where: { 
                commerceAccountId: updateCommerceAccountDTO.commerceAccountId 
            } 
        });

        if (commerceAccount == null) {
            return this.errorMessageService.createErrorMessage('COMMERCE_ACCOUNT_NOT_FOUND', 'Commerce account was not found');
        }

        commerceAccount.commerceAccountName = updateCommerceAccountDTO.commerceAccountName;
        commerceAccount.commerceAccountContactName = updateCommerceAccountDTO.commerceAccountContactName;
        commerceAccount.commerceAccountContactEmail = updateCommerceAccountDTO.commerceAccountContactEmail;
        commerceAccount.commerceAccountContactPhone = updateCommerceAccountDTO.commerceAccountContactPhone;
        commerceAccount.commerceAccountApplicationModules = updateCommerceAccountDTO.commerceAccountApplicationModules;
        commerceAccount.commerceAccountIsActive = updateCommerceAccountDTO.commerceAccountIsActive;
        commerceAccount.commerceAccountUpdateDate = new Date();

        commerceAccount = await this.commerceAccountRepository.save(commerceAccount);

        let commerceAccountDTO = await this.getCommerceAccountById(commerceAccount.commerceAccountId);

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