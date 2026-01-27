import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommerceAccount } from 'src/typeorm/entities/tcgcommerce/modules/commerce/account/commerce.account.entity';
import { CreateCommerceAccountDTO, UpdateCommerceAccountDTO, CommerceAccountDTO } from './dto/commerce.account.dto';
import { CommerceAccountApplicationModule } from './interface/commerce.account.interface';

@Injectable()
export class CommerceAccountService {

    constructor(
        @InjectRepository(CommerceAccount) private commerceAccountRepository: Repository<CommerceAccount>,
    ) { }

    async getActiveCommerceAccounts(): Promise<CommerceAccountDTO[]> {
        let commerceAccounts = await this.commerceAccountRepository.find({
            where: {
                commerceAccountIsActive: true
            }
        });

        let commerceAccountDTOs: CommerceAccountDTO[] = [];

        if(!commerceAccounts) {
            return commerceAccountDTOs;
        }
    
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

    async getCommerceAccountById(commerceAccountId: string): Promise<CommerceAccountDTO> {
        let commerceAccount = await this.commerceAccountRepository.findOneOrFail({ 
            where: { 
                commerceAccountId: commerceAccountId 
            } 
        });

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

    async getCommerceAccountByClientIdAndToken(commerceAccountAPIClientId: string, commerceAccountAPIClientToken: string): Promise<CommerceAccountDTO> {
        let commerceAccount = await this.commerceAccountRepository.findOneOrFail({ 
            where: {
                commerceAccountAPIClientId: commerceAccountAPIClientId,
                commerceAccountAPIClientToken: commerceAccountAPIClientToken
            } 
        });

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

    async createCommerceAccount(createCommerceAccountDTO: CreateCommerceAccountDTO): Promise<CommerceAccountDTO> {

        let commerceAccount = await this.commerceAccountRepository.findOne({ 
            where: { 
                commerceAccountHandle: createCommerceAccountDTO.commerceAccountHandle 
            } 
        });

        if (commerceAccount) {
            throw new ConflictException('Commerce account already exists');
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

    async updateCommerceAccount(updateCommerceAccountDTO: UpdateCommerceAccountDTO): Promise<CommerceAccountDTO> {
        let commerceAccount = await this.commerceAccountRepository.findOneOrFail({ 
            where: { 
                commerceAccountId: updateCommerceAccountDTO.commerceAccountId 
            } 
        });

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

    async createCommerceAccountAPIHandle(commerceAccountHandle: string): Promise<string> {
        return commerceAccountHandle
            .toLowerCase() 
            .replace(/\s+/g, '-') 
            .replace(/[^a-z0-9-]/g, '') 
            .replace(/-+/g, '-') 
            .replace(/^-|-$/g, ''); 
    }
}