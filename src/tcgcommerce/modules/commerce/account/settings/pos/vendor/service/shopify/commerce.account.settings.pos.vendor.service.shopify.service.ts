import { Injectable, ForbiddenException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommerceAccountSettingsPOSVendorServiceShopify } from 'src/typeorm/entities/tcgcommerce/modules/commerce/account/settings/pos/vendor/service/shopify/commerce.account.settings.pos.vendor.service.shopify.entity';
import { CreateCommerceAccountSettingsPOSVendorServiceShopifyDTO, CommerceAccountSettingsPOSVendorServiceShopifyDTO, UpdateCommerceAccountSettingsPOSVendorServiceShopifyDTO } from './dto/commerce.account.settings.pos.vendor.service.shopify.dto';
import { CommerceAccountSettingsPOSVendorServiceShopifyLocation } from './interface/commerce.account.settings.pos.vendor.service.shopify.interface';

@Injectable()
export class CommerceAccountSettingsPOSVendorServiceShopifyService {

    constructor(
        @InjectRepository(CommerceAccountSettingsPOSVendorServiceShopify) private commerceAccountSettingsPOSVendorServiceShopifyRepository: Repository<CommerceAccountSettingsPOSVendorServiceShopify>,
    ) { }

    async getCommerceAccountSettingsPOSVendorServiceShopifyById(commerceAccountSettingsPOSVendorServiceShopifyId: string) {
        let commerceAccountSettingsPOSVendorServiceShopify = await this.commerceAccountSettingsPOSVendorServiceShopifyRepository.findOneOrFail({ 
            where: { 
                commerceAccountSettingsPOSVendorServiceShopifyId : commerceAccountSettingsPOSVendorServiceShopifyId
            } 
        });

        let commerceAccountSettingsPOSVendorServiceShopifyDTO: CommerceAccountSettingsPOSVendorServiceShopifyDTO = ({ ...commerceAccountSettingsPOSVendorServiceShopify });  
        
        return commerceAccountSettingsPOSVendorServiceShopifyDTO;
        
    }

    async getCommerceAccountSettingsPOSVendorServiceShopifyByCommerceAccountId(commerceAccountId: string) {
        let commerceAccountSettingsPOSVendorServiceShopify = await this.commerceAccountSettingsPOSVendorServiceShopifyRepository.findOneOrFail({ 
            where: { 
                commerceAccountId : commerceAccountId
            } 
        });

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
            throw new ConflictException('Commerce account settings POS vendor service Shopify already exists');
        }

        commerceAccountSettingsPOSVendorServiceShopify = this.commerceAccountSettingsPOSVendorServiceShopifyRepository.create({ ...createCommerceAccountSettingsPOSVendorServiceShopifyDTO });
        commerceAccountSettingsPOSVendorServiceShopify = await this.commerceAccountSettingsPOSVendorServiceShopifyRepository.save(commerceAccountSettingsPOSVendorServiceShopify);

        let commerceAccountSettingsPOSVendorServiceShopifyDTO = await this.getCommerceAccountSettingsPOSVendorServiceShopifyById(commerceAccountSettingsPOSVendorServiceShopify.commerceAccountSettingsPOSVendorServiceShopifyId);

        return commerceAccountSettingsPOSVendorServiceShopifyDTO;
    }

    async updateCommerceAccountSettingsPOSVendorServiceShopify(updateCommerceAccountSettingsPOSVendorServiceShopifyDTO: UpdateCommerceAccountSettingsPOSVendorServiceShopifyDTO) {
        let commerceAccountSettingsPOSVendorServiceShopify = await this.commerceAccountSettingsPOSVendorServiceShopifyRepository.findOneOrFail({
            where: {
                commerceAccountSettingsPOSVendorServiceShopifyId: updateCommerceAccountSettingsPOSVendorServiceShopifyDTO.commerceAccountSettingsPOSVendorServiceShopifyId
            }
        });


        commerceAccountSettingsPOSVendorServiceShopify.commerceAccountSettingsPOSVendorServiceShopifyStoreName = updateCommerceAccountSettingsPOSVendorServiceShopifyDTO.commerceAccountSettingsPOSVendorServiceShopifyStoreName;
        commerceAccountSettingsPOSVendorServiceShopify.commerceAccountSettingsPOSVendorServiceShopifyAccessToken = updateCommerceAccountSettingsPOSVendorServiceShopifyDTO.commerceAccountSettingsPOSVendorServiceShopifyAccessToken;
        commerceAccountSettingsPOSVendorServiceShopify.commerceAccountSettingsPOSVendorServiceShopifyIsVerified = updateCommerceAccountSettingsPOSVendorServiceShopifyDTO.commerceAccountSettingsPOSVendorServiceShopifyIsVerified;
        commerceAccountSettingsPOSVendorServiceShopify.commerceAccountSettingsPOSVendorServiceShopifyUpdateDate = new Date();

        commerceAccountSettingsPOSVendorServiceShopify = await this.commerceAccountSettingsPOSVendorServiceShopifyRepository.save(commerceAccountSettingsPOSVendorServiceShopify);

        let commerceAccountSettingsPOSVendorServiceShopifyDTO = await this.getCommerceAccountSettingsPOSVendorServiceShopifyById(commerceAccountSettingsPOSVendorServiceShopify.commerceAccountSettingsPOSVendorServiceShopifyId);
        
        return commerceAccountSettingsPOSVendorServiceShopifyDTO;
    }

    async updateCommerceAccountSettingsPOSVendorServiceShopifyLocation(commerceAccountSettingsPOSVendorServiceShopifyId: string, location: any) {
        let commerceAccountSettingsPOSVendorServiceShopify = await this.commerceAccountSettingsPOSVendorServiceShopifyRepository.findOneOrFail({
            where: {
                commerceAccountSettingsPOSVendorServiceShopifyId: commerceAccountSettingsPOSVendorServiceShopifyId
            }
        });

        //UPDATE LOCATION;

    }

    async verifyCommerceAccountSettingsPOSVendorServiceShopifyById(commerceAccountId: string) {
        
    }
}