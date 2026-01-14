import { Injectable, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommerceAccountSettingsPOSVendorServiceShopify } from 'src/typeorm/entities/tcgcommerce/modules/commerce/account/settings/pos/vendor/service/shopify/commerce.account.settings.pos.vendor.service.shopify.entity';
import { CreateCommerceAccountSettingsPOSVendorServiceShopifyDTO, CommerceAccountSettingsPOSVendorServiceShopifyDTO, UpdateCommerceAccountSettingsPOSVendorServiceShopifyDTO } from './dto/commerce.account.settings.pos.vendor.service.shopify.dto';
import { CommerceAccountSettingsPOSVendorServiceShopifyLocation } from './interface/commerce.account.settings.pos.vendor.service.shopify.interface';
import { ErrorMessageService } from 'src/system/modules/error/message/error.message.service';

@Injectable()
export class CommerceAccountSettingsPOSVendorServiceShopifyService {

    constructor(
        @InjectRepository(CommerceAccountSettingsPOSVendorServiceShopify) private commerceAccountSettingsPOSVendorServiceShopifyRepository: Repository<CommerceAccountSettingsPOSVendorServiceShopify>,
        private errorMessageService: ErrorMessageService,
    ) { }

    async getCommerceAccountSettingsPOSVendorServiceShopifyById(commerceAccountSettingsPOSVendorServiceShopifyId: string) {
        let commerceAccountSettingsPOSVendorServiceShopify = await this.commerceAccountSettingsPOSVendorServiceShopifyRepository.findOne({ 
            where: { 
                commerceAccountSettingsPOSVendorServiceShopifyId : commerceAccountSettingsPOSVendorServiceShopifyId
            } 
        });

        if (commerceAccountSettingsPOSVendorServiceShopify == null) {
            return this.errorMessageService.createErrorMessage('COMMERCE_ACCOUNT_SETTINGS_POS_VENDOR_SERVICE_SHOPIFY_NOT_FOUND', 'Commerce account settings POS vendor service Shopify was not found');
        }

        let commerceAccountSettingsPOSVendorServiceShopifyDTO: CommerceAccountSettingsPOSVendorServiceShopifyDTO = ({ ...commerceAccountSettingsPOSVendorServiceShopify });  
        
        return commerceAccountSettingsPOSVendorServiceShopifyDTO;
        
    }

    async getCommerceAccountSettingsPOSVendorServiceShopifyByCommerceAccountId(commerceAccountId: string) {
        let commerceAccountSettingsPOSVendorServiceShopify = await this.commerceAccountSettingsPOSVendorServiceShopifyRepository.findOne({ 
            where: { 
                commerceAccountId : commerceAccountId
            } 
        });
        
        if (commerceAccountSettingsPOSVendorServiceShopify == null) {
            return this.errorMessageService.createErrorMessage('COMMERCE_ACCOUNT_SETTINGS_POS_VENDOR_SERVICE_SHOPIFY_NOT_FOUND', 'Commerce account settings POS vendor service Shopify was not found');
        }

        let commerceAccountSettingsPOSVendorServiceShopifyDTO: CommerceAccountSettingsPOSVendorServiceShopifyDTO = ({ ...commerceAccountSettingsPOSVendorServiceShopify });

        return commerceAccountSettingsPOSVendorServiceShopifyDTO;
        
    }

    async createCommerceAccountSettingsPOSVendorServiceShopify(createCommerceAccountSettingsPOSVendorServiceShopifyDTO: CreateCommerceAccountSettingsPOSVendorServiceShopifyDTO) {   
        let commerceAccountSettingsPOSVendorServiceShopify = await this.commerceAccountSettingsPOSVendorServiceShopifyRepository.findOne({ 
            where: {
                commerceAccountId : createCommerceAccountSettingsPOSVendorServiceShopifyDTO.commerceAccountId, 
            } 
        });

        if(commerceAccountSettingsPOSVendorServiceShopify != null) {
            return this.errorMessageService.createErrorMessage('COMMERCE_ACCOUNT_SETTINGS_POS_VENDOR_SERVICE_SHOPIFY_EXISTS', 'Commerce account settings POS vendor service Shopify already exists');
        }

        commerceAccountSettingsPOSVendorServiceShopify = this.commerceAccountSettingsPOSVendorServiceShopifyRepository.create({ ...createCommerceAccountSettingsPOSVendorServiceShopifyDTO });
        commerceAccountSettingsPOSVendorServiceShopify = await this.commerceAccountSettingsPOSVendorServiceShopifyRepository.save(commerceAccountSettingsPOSVendorServiceShopify);

        let commerceAccountSettingsPOSVendorServiceShopifyDTO = await this.getCommerceAccountSettingsPOSVendorServiceShopifyById(commerceAccountSettingsPOSVendorServiceShopify.commerceAccountSettingsPOSVendorServiceShopifyId);

        return commerceAccountSettingsPOSVendorServiceShopifyDTO;
    }

    async updateCommerceAccountSettingsPOSVendorServiceShopify(updateCommerceAccountSettingsPOSVendorServiceShopifyDTO: UpdateCommerceAccountSettingsPOSVendorServiceShopifyDTO) {
        let commerceAccountSettingsPOSVendorServiceShopify = await this.commerceAccountSettingsPOSVendorServiceShopifyRepository.findOne({
            where: {
                commerceAccountSettingsPOSVendorServiceShopifyId: updateCommerceAccountSettingsPOSVendorServiceShopifyDTO.commerceAccountSettingsPOSVendorServiceShopifyId
            }
        });

        if(commerceAccountSettingsPOSVendorServiceShopify == null) {
            return this.errorMessageService.createErrorMessage('COMMERCE_ACCOUNT_SETTINGS_POS_VENDOR_SERVICE_SHOPIFY_NOT_FOUND', 'Commerce account settings POS vendor service Shopify was not found');
        }


        commerceAccountSettingsPOSVendorServiceShopify.commerceAccountSettingsPOSVendorServiceShopifyStoreName = updateCommerceAccountSettingsPOSVendorServiceShopifyDTO.commerceAccountSettingsPOSVendorServiceShopifyStoreName;
        commerceAccountSettingsPOSVendorServiceShopify.commerceAccountSettingsPOSVendorServiceShopifyAccessToken = updateCommerceAccountSettingsPOSVendorServiceShopifyDTO.commerceAccountSettingsPOSVendorServiceShopifyAccessToken;
        commerceAccountSettingsPOSVendorServiceShopify.commerceAccountSettingsPOSVendorServiceShopifyIsVerified = updateCommerceAccountSettingsPOSVendorServiceShopifyDTO.commerceAccountSettingsPOSVendorServiceShopifyIsVerified;
        commerceAccountSettingsPOSVendorServiceShopify.commerceAccountSettingsPOSVendorServiceShopifyUpdateDate = new Date();

        commerceAccountSettingsPOSVendorServiceShopify = await this.commerceAccountSettingsPOSVendorServiceShopifyRepository.save(commerceAccountSettingsPOSVendorServiceShopify);

        let commerceAccountSettingsPOSVendorServiceShopifyDTO = await this.getCommerceAccountSettingsPOSVendorServiceShopifyById(commerceAccountSettingsPOSVendorServiceShopify.commerceAccountSettingsPOSVendorServiceShopifyId);
        
        return commerceAccountSettingsPOSVendorServiceShopifyDTO;
    }

    async updateCommerceAccountSettingsPOSVendorServiceShopifyLocation(commerceAccountSettingsPOSVendorServiceShopifyId: string, location: any) {
        let commerceAccountSettingsPOSVendorServiceShopify = await this.commerceAccountSettingsPOSVendorServiceShopifyRepository.findOne({
            where: {
                commerceAccountSettingsPOSVendorServiceShopifyId: commerceAccountSettingsPOSVendorServiceShopifyId
            }
        });

        if(commerceAccountSettingsPOSVendorServiceShopify == null) {
            return this.errorMessageService.createErrorMessage('COMMERCE_ACCOUNT_SETTINGS_POS_VENDOR_SERVICE_SHOPIFY_NOT_FOUND', 'Commerce account settings POS vendor service Shopify was not found');
        }

        //UPDATE LOCATION;

    }

    async verifyCommerceAccountSettingsPOSVendorServiceShopifyById(commerceAccountSettingsPOSVendorServiceShopifyId: string) {
        let commerceAccountSettingsPOSVendorServiceShopify = await this.commerceAccountSettingsPOSVendorServiceShopifyRepository.findOne({
            where: {
                commerceAccountSettingsPOSVendorServiceShopifyId: commerceAccountSettingsPOSVendorServiceShopifyId
            }
        });

        if(commerceAccountSettingsPOSVendorServiceShopify == null) {
            return this.errorMessageService.createErrorMessage('COMMERCE_ACCOUNT_SETTINGS_POS_VENDOR_SERVICE_SHOPIFY_NOT_FOUND', 'Commerce account settings POS vendor service Shopify was not found');
        }

        /*try {
            let manaPoolAccount = await this.posVendorServiceShopifyAPIRestV1Service.getShopifyAccount(
                commerceAccountSettingsPOSVendorServiceShopify.commerceAccountSettingsPOSVendorServiceShopifyStoreName, 
                commerceAccountSettingsPOSVendorServiceShopify.commerceAccountSettingsPOSVendorServiceShopifyAccessToken
            );

            commerceAccountSettingsPOSVendorServiceShopify.commerceAccountSettingsPOSVendorServiceShopifyIsVerified = true;
            commerceAccountSettingsPOSVendorServiceShopify.commerceAccountSettingsPOSVendorServiceShopifyUpdateDate = new Date();
            commerceAccountSettingsPOSVendorServiceShopify = await this.commerceAccountSettingsPOSVendorServiceShopifyRepository.save(commerceAccountSettingsPOSVendorServiceShopify);

            let commerceAccountSettingsPOSVendorServiceShopifyDTO = await this.getCommerceAccountSettingsPOSVendorServiceShopifyById(commerceAccountSettingsPOSVendorServiceShopify.commerceAccountSettingsPOSVendorServiceShopifyId);
            
            return commerceAccountSettingsPOSVendorServiceShopifyDTO;

        } catch (error) {
            return this.errorMessageService.createErrorMessage('COMMERCE_ACCOUNT_SETTINGS_POS_VENDOR_SERVICE_MANAPOOL_VERIFICATION_FAILED', error.message);
        }
            */
    }
}