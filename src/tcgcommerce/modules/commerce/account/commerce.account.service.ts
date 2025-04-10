import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommerceAccount } from 'src/typeorm/entities/tcgcommerce/modules/commerce/account/commerce.account.entity';
import { CreateCommerceAccountDTO, UpdateCommerceAccountDTO, CommerceAccountDTO } from './dto/commerce.account.dto';

@Injectable()
export class CommerceAccountService {

    constructor(
        @InjectRepository(CommerceAccount) private commerceAccountRepository: Repository<CommerceAccount>,
    ) { }

    async getCommerceAccount(commerceAccountId: string) {
        let commerceAccount = await this.commerceAccountRepository.findOne({ where: { commerceAccountId } });
        
         //TO DO: CREATE AN ERROR TO RETURN IF COMNERCE ACCOUNT IS NULL;
        if (!commerceAccount) {
            return null;
        }

        let commerceAccountDTO = new CommerceAccountDTO();
        commerceAccountDTO.commerceAccountId = commerceAccount.commerceAccountId;
        commerceAccountDTO.commerceAccountName = commerceAccount.commerceAccountName;
        commerceAccountDTO.commerceAccountContactName = commerceAccount.commerceAccountContactName;
        commerceAccountDTO.commerceAccountContactEmail = commerceAccount.commerceAccountContactEmail;
        commerceAccountDTO.commerceAccountContactPhone = commerceAccount.commerceAccountContactPhone;
        commerceAccountDTO.commerceAccountHandle = commerceAccount.commerceAccountHandle;
        commerceAccountDTO.commerceAccountIsActive = commerceAccount.commerceAccountIsActive;
        commerceAccountDTO.commerceAccountCreateDate = commerceAccount.commerceAccountCreateDate;
        commerceAccountDTO.commerceAccountUpdateDate = commerceAccount.commerceAccountUpdateDate;

        return commerceAccountDTO;
        
    }

    async createCommerceAccount(commerceAccount: CreateCommerceAccountDTO) {

        //TO DO: ADD VALIDATION FOR UNIQUE CONSTRAINTS ON COMMERCE ACCOUNT NAME AND HANDLE;
        let newCommerceAccount = this.commerceAccountRepository.create({ ...commerceAccount });
        newCommerceAccount = await this.commerceAccountRepository.save(newCommerceAccount);

        let commerceAccountDTO = await this.getCommerceAccount(newCommerceAccount.commerceAccountId);

        return commerceAccountDTO;
    }

    async updateCommerceAccount(commerceAccount: UpdateCommerceAccountDTO) {
        let updateCommerceAccount = await this.commerceAccountRepository.findOne({ 
            where: { 
                commerceAccountId: commerceAccount.commerceAccountId 
            } 
        });

         //TO DO: CREATE AN ERROR TO RETURN IF COMNERCE ACCOUNT IS NULL;
        if (!updateCommerceAccount) {
            return null;
        }

        updateCommerceAccount.commerceAccountName = commerceAccount.commerceAccountName;
        updateCommerceAccount.commerceAccountContactName = commerceAccount.commerceAccountContactName;
        updateCommerceAccount.commerceAccountContactEmail = commerceAccount.commerceAccountContactEmail;
        updateCommerceAccount.commerceAccountContactPhone = commerceAccount.commerceAccountContactPhone;
        updateCommerceAccount.commerceAccountIsActive = commerceAccount.commerceAccountIsActive;
        updateCommerceAccount.commerceAccountUpdateDate = new Date();

        updateCommerceAccount = await this.commerceAccountRepository.save(updateCommerceAccount);

        let commerceAccountDTO = await this.getCommerceAccount(updateCommerceAccount.commerceAccountId);

        return commerceAccountDTO;
    }
    
}