import { Injectable, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommerceAccountSettingsPOSVendorServiceManaPool } from 'src/typeorm/entities/tcgcommerce/modules/commerce/account/settings/pos/vendor/service/manapool/commerce.account.settings.pos.vendor.service.manapool.entity';
import { CreateCommerceAccountSettingsPOSVendorServiceManaPoolDTO, CommerceAccountSettingsPOSVendorServiceManaPoolDTO, UpdateCommerceAccountSettingsPOSVendorServiceManaPoolDTO } from './dto/commerce.account.settings.pos.vendor.service.manapool.dto';
import { POSVendorServiceManaPoolAdminService } from 'src/tcgcommerce/modules/pos/vendor/service/manapool/admin/pos.vendor.service.manapool.admin.service';
import { ErrorMessageService } from 'src/system/modules/error/message/error.message.service';

@Injectable()
export class CommerceAccountSettingsPOSVendorServiceManaPoolService {

    constructor(
        @InjectRepository(CommerceAccountSettingsPOSVendorServiceManaPool) private commerceAccountSettingsPOSVendorServiceManaPoolRepository: Repository<CommerceAccountSettingsPOSVendorServiceManaPool>,
        private POSVendorServiceManaPoolAdminService: POSVendorServiceManaPoolAdminService,
        private errorMessageService: ErrorMessageService,
    ) { }

    async getCommerceAccountSettingsPOSVendorServiceManaPoolById(commerceAccountSettingsPOSVendorServiceManaPoolId: string) {
        let commerceAccountSettingsPOSVendorServiceManaPool = await this.commerceAccountSettingsPOSVendorServiceManaPoolRepository.findOne({ 
            where: { 
                commerceAccountSettingsPOSVendorServiceManaPoolId : commerceAccountSettingsPOSVendorServiceManaPoolId
            } 
        });

        if (commerceAccountSettingsPOSVendorServiceManaPool == null) {
            return this.errorMessageService.createErrorMessage('COMMERCE_ACCOUNT_SETTINGS_POS_VENDOR_SERVICE_MANAPOOL_NOT_FOUND', 'Commerce account settings POS vendor service Manapool was not found');
        }

        let commerceAccountSettingsPOSVendorServiceManaPoolDTO: CommerceAccountSettingsPOSVendorServiceManaPoolDTO = ({ ...commerceAccountSettingsPOSVendorServiceManaPool });  
        
        return commerceAccountSettingsPOSVendorServiceManaPoolDTO;
        
    }

    async getCommerceAccountSettingsPOSVendorServiceManaPoolByCommerceAccountId(commerceAccountId: string) {
        let commerceAccountSettingsPOSVendorServiceManaPool = await this.commerceAccountSettingsPOSVendorServiceManaPoolRepository.findOne({ 
            where: { 
                commerceAccountId : commerceAccountId
            } 
        });
        
        if (commerceAccountSettingsPOSVendorServiceManaPool == null) {
            return this.errorMessageService.createErrorMessage('COMMERCE_ACCOUNT_SETTINGS_POS_VENDOR_SERVICE_MANAPOOL_NOT_FOUND', 'Commerce account settings POS vendor service Manapool was not found');
        }

        let commerceAccountSettingsPOSVendorServiceManaPoolDTO: CommerceAccountSettingsPOSVendorServiceManaPoolDTO = ({ ...commerceAccountSettingsPOSVendorServiceManaPool });

        return commerceAccountSettingsPOSVendorServiceManaPoolDTO;
        
    }

    async createCommerceAccountSettingsPOSVendorServiceManaPool(createCommerceAccountSettingsPOSVendorServiceManaPoolDTO: CreateCommerceAccountSettingsPOSVendorServiceManaPoolDTO) {   
        let commerceAccountSettingsPOSVendorServiceManaPool = await this.commerceAccountSettingsPOSVendorServiceManaPoolRepository.findOne({ 
            where: {
                commerceAccountId : createCommerceAccountSettingsPOSVendorServiceManaPoolDTO.commerceAccountId, 
            } 
        });

        if(commerceAccountSettingsPOSVendorServiceManaPool != null) {
            return this.errorMessageService.createErrorMessage('COMMERCE_ACCOUNT_SETTINGS_POS_VENDOR_SERVICE_MANAPOOL_EXISTS', 'Commerce account settings POS vendor service Manapool already exists');
        }

        commerceAccountSettingsPOSVendorServiceManaPool = this.commerceAccountSettingsPOSVendorServiceManaPoolRepository.create({ ...createCommerceAccountSettingsPOSVendorServiceManaPoolDTO });
        commerceAccountSettingsPOSVendorServiceManaPool = await this.commerceAccountSettingsPOSVendorServiceManaPoolRepository.save(commerceAccountSettingsPOSVendorServiceManaPool);

        let commerceAccountSettingsPOSVendorServiceManaPoolDTO = await this.getCommerceAccountSettingsPOSVendorServiceManaPoolById(commerceAccountSettingsPOSVendorServiceManaPool.commerceAccountSettingsPOSVendorServiceManaPoolId);

        return commerceAccountSettingsPOSVendorServiceManaPoolDTO;
    }

    async updateCommerceAccountSettingsPOSVendorServiceManaPool(updateCommerceAccountSettingsPOSVendorServiceManaPoolDTO: UpdateCommerceAccountSettingsPOSVendorServiceManaPoolDTO) {
        let commerceAccountSettingsPOSVendorServiceManaPool = await this.commerceAccountSettingsPOSVendorServiceManaPoolRepository.findOne({
            where: {
                commerceAccountSettingsPOSVendorServiceManaPoolId: updateCommerceAccountSettingsPOSVendorServiceManaPoolDTO.commerceAccountSettingsPOSVendorServiceManaPoolId
            }
        });

        if(commerceAccountSettingsPOSVendorServiceManaPool == null) {
            return this.errorMessageService.createErrorMessage('COMMERCE_ACCOUNT_SETTINGS_POS_VENDOR_SERVICE_MANAPOOL_NOT_FOUND', 'Commerce account settings POS vendor service Manapool was not found');
        }


        commerceAccountSettingsPOSVendorServiceManaPool.commerceAccountSettingsPOSVendorServiceManaPoolEmail = updateCommerceAccountSettingsPOSVendorServiceManaPoolDTO.commerceAccountSettingsPOSVendorServiceManaPoolEmail;
        commerceAccountSettingsPOSVendorServiceManaPool.commerceAccountSettingsPOSVendorServiceManaPoolAccessToken = updateCommerceAccountSettingsPOSVendorServiceManaPoolDTO.commerceAccountSettingsPOSVendorServiceManaPoolAccessToken;
        commerceAccountSettingsPOSVendorServiceManaPool.commerceAccountSettingsPOSVendorServiceManaPoolIsVerified = updateCommerceAccountSettingsPOSVendorServiceManaPoolDTO.commerceAccountSettingsPOSVendorServiceManaPoolIsVerified;
        commerceAccountSettingsPOSVendorServiceManaPool.commerceAccountSettingsPOSVendorServiceManaPoolUpdateDate = new Date();

        commerceAccountSettingsPOSVendorServiceManaPool = await this.commerceAccountSettingsPOSVendorServiceManaPoolRepository.save(commerceAccountSettingsPOSVendorServiceManaPool);

        let commerceAccountSettingsPOSVendorServiceManaPoolDTO = await this.getCommerceAccountSettingsPOSVendorServiceManaPoolById(commerceAccountSettingsPOSVendorServiceManaPool.commerceAccountSettingsPOSVendorServiceManaPoolId);
        
        return commerceAccountSettingsPOSVendorServiceManaPoolDTO;
    }

    async verifyCommerceAccountSettingsPOSVendorServiceManaPoolById(commerceAccountId: string) {

        let commerceAccountSettingsPOSVendorServiceManaPool = await this.commerceAccountSettingsPOSVendorServiceManaPoolRepository.findOne({
            where: {
                commerceAccountId: commerceAccountId
            }
        });

        if(commerceAccountSettingsPOSVendorServiceManaPool == null) {
            return this.errorMessageService.createErrorMessage('COMMERCE_ACCOUNT_SETTINGS_POS_VENDOR_SERVICE_MANAPOOL_NOT_FOUND', 'Commerce account settings POS vendor service Manapool was not found');
        }
        
        try {
            let manaPoolAccount = await this.POSVendorServiceManaPoolAdminService.getManaPoolAccount(commerceAccountId);

            commerceAccountSettingsPOSVendorServiceManaPool.commerceAccountSettingsPOSVendorServiceManaPoolIsVerified = true;
            commerceAccountSettingsPOSVendorServiceManaPool.commerceAccountSettingsPOSVendorServiceManaPoolUpdateDate = new Date();
            commerceAccountSettingsPOSVendorServiceManaPool = await this.commerceAccountSettingsPOSVendorServiceManaPoolRepository.save(commerceAccountSettingsPOSVendorServiceManaPool);

            let commerceAccountSettingsPOSVendorServiceManaPoolDTO = await this.getCommerceAccountSettingsPOSVendorServiceManaPoolById(commerceAccountSettingsPOSVendorServiceManaPool.commerceAccountSettingsPOSVendorServiceManaPoolId);
            
            return commerceAccountSettingsPOSVendorServiceManaPoolDTO;

        } catch (error) {
            return this.errorMessageService.createErrorMessage('COMMERCE_ACCOUNT_SETTINGS_POS_VENDOR_SERVICE_MANAPOOL_VERIFICATION_FAILED', error.message);
        }
    }
}