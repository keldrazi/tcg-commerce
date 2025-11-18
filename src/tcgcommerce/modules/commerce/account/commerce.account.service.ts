import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommerceAccount } from 'src/typeorm/entities/tcgcommerce/modules/commerce/account/commerce.account.entity';
import { CreateCommerceAccountDTO, UpdateCommerceAccountDTO, CommerceAccountDTO } from './dto/commerce.account.dto';
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

        let commerceAccountDTOs: CommerceAccountDTO[] = commerceAccounts.map(commerceAccount => ({ ...commerceAccount }));
        
        return commerceAccountDTOs;
    }

    async getCommerceAccount(commerceAccountId: string) {
        let commerceAccount = await this.commerceAccountRepository.findOne({ where: { commerceAccountId } });
        
        if (commerceAccount == null) {
            return this.errorMessageService.createErrorMessage('COMMERCE_ACCOUNT_NOT_FOUND', 'Commerce account was not found for commerceAccountId: ' + commerceAccountId);
        }

        let commerceAccountDTO: CommerceAccountDTO = ({ ...commerceAccount});
        
        return commerceAccountDTO;
        
    }

    async createCommerceAccount(createCommerceAccountDTO: CreateCommerceAccountDTO) {

        let existingCommerceAccount = await this.commerceAccountRepository.findOne({ where: { commerceAccountHandle: createCommerceAccountDTO.commerceAccountHandle } });

        if (existingCommerceAccount != null) {
            return this.errorMessageService.createErrorMessage('COMMERCE_ACCOUNT_EXISTS', 'Commerce account with handle already exists: ' + createCommerceAccountDTO.commerceAccountHandle);
        }

        let newCommerceAccount = this.commerceAccountRepository.create({ ...createCommerceAccountDTO });
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
        updateCommerceAccount.commerceAccountIsActive = updateCommerceAccountDTO.commerceAccountIsActive;
        updateCommerceAccount.commerceAccountUpdateDate = new Date();

        updateCommerceAccount = await this.commerceAccountRepository.save(updateCommerceAccount);

        let commerceAccountDTO = await this.getCommerceAccount(updateCommerceAccount.commerceAccountId);

        return commerceAccountDTO;
    }
    
}