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
        commerceAccountDTO.commerceAccountEmail = commerceAccount.commerceAccountEmail;
        commerceAccountDTO.commerceAccountPhone = commerceAccount.commerceAccountPhone;
        commerceAccountDTO.commerceAccountHandle = commerceAccount.commerceAccountHandle;
        commerceAccountDTO.commerceAccountIsActive = commerceAccount.commerceAccountIsActive;
        commerceAccountDTO.commerceAccountCreateDate = commerceAccount.commerceAccountCreateDate;
        commerceAccountDTO.commerceAccountUpdateDate = commerceAccount.commerceAccountUpdateDate;

        return commerceAccountDTO;
        
    }

    async createCommerceAccount(commerceAccount: CreateCommerceAccountDTO) {
        let newCommerceAccount = this.commerceAccountRepository.create({ ...commerceAccount });
        newCommerceAccount = await this.commerceAccountRepository.save(newCommerceAccount);

        let commerceAccountDTO = new CommerceAccountDTO();
        commerceAccountDTO.commerceAccountId = newCommerceAccount.commerceAccountId;
        commerceAccountDTO.commerceAccountName = newCommerceAccount.commerceAccountName;
        commerceAccountDTO.commerceAccountEmail = newCommerceAccount.commerceAccountEmail;
        commerceAccountDTO.commerceAccountPhone = newCommerceAccount.commerceAccountPhone;
        commerceAccountDTO.commerceAccountHandle = newCommerceAccount.commerceAccountHandle;
        commerceAccountDTO.commerceAccountIsActive = newCommerceAccount.commerceAccountIsActive;
        commerceAccountDTO.commerceAccountCreateDate = newCommerceAccount.commerceAccountCreateDate;
        commerceAccountDTO.commerceAccountUpdateDate = newCommerceAccount.commerceAccountUpdateDate;

        return commerceAccountDTO;
    }
    
}