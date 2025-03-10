import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommerceAccount } from 'src/typeorm/entities/modules/commerce/account/commerce.account.entity';
import { CreateCommerceAccountDTO, CommerceAccountDTO } from './dto/commerce.account.dto';

@Injectable()
export class CommerceAccountService {

    constructor(
        @InjectRepository(CommerceAccount) private commerceAccountRepository: Repository<CommerceAccount>,
    ) { }

    async getCommerceAccount(commerceAccountId: string) {
        let commerceAccount = await this.commerceAccountRepository.findOne({ where: { commerceAccountId } });
        
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
        commerceAccountDTO.commerceAccountModules = commerceAccount.commerceAccountModules;
        commerceAccountDTO.commerceAccountIsActive = commerceAccount.commerceAccountIsActive;
        commerceAccountDTO.commerceAccountCreateDate = commerceAccount.commerceAccountCreateDate;
        commerceAccountDTO.commerceAccountUpdateDate = commerceAccount.commerceAccountUpdateDate;

        return commerceAccountDTO;
        
    }

    async createCommerceAccount(commerceAccount: CreateCommerceAccountDTO) {
        let newCommerceAccount = this.commerceAccountRepository.create({ ...commerceAccount });
        newCommerceAccount = await this.commerceAccountRepository.save(newCommerceAccount);

        let commerceAccountDTO = new CommerceAccountDTO();

        commerceAccountDTO.commerceAccountName = commerceAccount.commerceAccountName;
        commerceAccountDTO.commerceAccountContactName = commerceAccount.commerceAccountContactName;
        commerceAccountDTO.commerceAccountContactEmail = commerceAccount.commerceAccountContactEmail;
        commerceAccountDTO.commerceAccountContactPhone = commerceAccount.commerceAccountContactPhone;
        commerceAccountDTO.commerceAccountHandle = commerceAccount.commerceAccountHandle;
        commerceAccountDTO.commerceAccountModules = commerceAccount.commerceAccountModules;
        commerceAccountDTO.commerceAccountIsActive = commerceAccount.commerceAccountIsActive;

        return commerceAccountDTO;
    }
    
}