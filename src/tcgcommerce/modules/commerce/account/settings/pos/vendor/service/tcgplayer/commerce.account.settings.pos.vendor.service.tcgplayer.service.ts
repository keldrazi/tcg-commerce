import { Injectable, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommerceAccountSettingsPOSVendorServiceTCGPlayer } from 'src/typeorm/entities/tcgcommerce/modules/commerce/account/settings/pos/vendor/service/tcgplayer/commerce.account.settings.pos.vendor.service.tcgplayer.entity';
import { CommerceAccountSettingsPOSVendorServiceTCGPlayerDTO } from './dto/commerce.account.settings.pos.vendor.service.tcgplayer.dto';
import { ErrorMessageService } from 'src/system/modules/error/message/error.message.service';

@Injectable()
export class CommerceAccountSettingsPOSVendorServiceTCGPlayerService {

    constructor(
        @InjectRepository(CommerceAccountSettingsPOSVendorServiceTCGPlayer) private commerceAccountSettingsPOSVendorServiceTCGPlayerRepository: Repository<CommerceAccountSettingsPOSVendorServiceTCGPlayer>,
        private errorMessageService: ErrorMessageService,
    ) { }

    async getCommerceAccountSettingsPOSVendorServiceTCGPlayerById(commerceAccountSettingsPOSVendorServiceTCGPlayerId: string) {
        let commerceAccountSettingsPOSVendorServiceTCGPlayer = await this.commerceAccountSettingsPOSVendorServiceTCGPlayerRepository.findOne({ 
            where: { 
                commerceAccountSettingsPOSVendorServiceTCGPlayerId : commerceAccountSettingsPOSVendorServiceTCGPlayerId
            } 
        });

        if (commerceAccountSettingsPOSVendorServiceTCGPlayer == null) {
            return this.errorMessageService.createErrorMessage('COMMERCE_ACCOUNT_SETTINGS_POS_VENDOR_SERVICE_SHOPIFY_NOT_FOUND', 'Commerce account settings POS vendor service TCGPlayer was not found');
        }

        let commerceAccountSettingsPOSVendorServiceTCGPlayerDTO: CommerceAccountSettingsPOSVendorServiceTCGPlayerDTO = ({ ...commerceAccountSettingsPOSVendorServiceTCGPlayer });  
        
        return commerceAccountSettingsPOSVendorServiceTCGPlayerDTO;
        
    }

    async getCommerceAccountSettingsPOSVendorServiceTCGPlayerByCommerceAccountId(commerceAccountId: string) {
        let commerceAccountSettingsPOSVendorServiceTCGPlayer = await this.commerceAccountSettingsPOSVendorServiceTCGPlayerRepository.findOne({ 
            where: { 
                commerceAccountId : commerceAccountId
            } 
        });
        
        if (commerceAccountSettingsPOSVendorServiceTCGPlayer == null) {
            return this.errorMessageService.createErrorMessage('COMMERCE_ACCOUNT_SETTINGS_POS_VENDOR_SERVICE_SHOPIFY_NOT_FOUND', 'Commerce account settings POS vendor service TCGPlayer was not found');
        }

        let commerceAccountSettingsPOSVendorServiceTCGPlayerDTO: CommerceAccountSettingsPOSVendorServiceTCGPlayerDTO = ({ ...commerceAccountSettingsPOSVendorServiceTCGPlayer });

        return commerceAccountSettingsPOSVendorServiceTCGPlayerDTO;
        
    }

    /*async createCommerceAccountSettingsPOSVendorServiceTCGPlayer(createCommerceAccountSettingsPOSVendorServiceTCGPlayerDTO: CreateCommerceAccountSettingsPOSVendorServiceTCGPlayerDTO) {   
        let commerceAccountSettingsPOSVendorServiceTCGPlayer = await this.commerceAccountSettingsPOSVendorServiceTCGPlayerRepository.findOne({ 
            where: {
                commerceAccountId : createCommerceAccountSettingsPOSVendorServiceTCGPlayerDTO.commerceAccountId, 
            } 
        });

        if(commerceAccountSettingsPOSVendorServiceTCGPlayer != null) {
            return this.errorMessageService.createErrorMessage('COMMERCE_ACCOUNT_SETTINGS_POS_VENDOR_SERVICE_SHOPIFY_EXISTS', 'Commerce account settings POS vendor service TCGPlayer already exists');
        }

        commerceAccountSettingsPOSVendorServiceTCGPlayer = this.commerceAccountSettingsPOSVendorServiceTCGPlayerRepository.create({ ...createCommerceAccountSettingsPOSVendorServiceTCGPlayerDTO });
        commerceAccountSettingsPOSVendorServiceTCGPlayer = await this.commerceAccountSettingsPOSVendorServiceTCGPlayerRepository.save(commerceAccountSettingsPOSVendorServiceTCGPlayer);

        let commerceAccountSettingsPOSVendorServiceTCGPlayerDTO = await this.getCommerceAccountSettingsPOSVendorServiceTCGPlayerById(commerceAccountSettingsPOSVendorServiceTCGPlayer.commerceAccountSettingsPOSVendorServiceTCGPlayerId);

        return commerceAccountSettingsPOSVendorServiceTCGPlayerDTO;
    }

    async updateCommerceAccountSettingsPOSVendorServiceTCGPlayer(updateCommerceAccountSettingsPOSVendorServiceTCGPlayerDTO: UpdateCommerceAccountSettingsPOSVendorServiceTCGPlayerDTO) {
        let commerceAccountSettingsPOSVendorServiceTCGPlayer = await this.commerceAccountSettingsPOSVendorServiceTCGPlayerRepository.findOne({
            where: {
                commerceAccountSettingsPOSVendorServiceTCGPlayerId: updateCommerceAccountSettingsPOSVendorServiceTCGPlayerDTO.commerceAccountSettingsPOSVendorServiceTCGPlayerId
            }
        });

        if(commerceAccountSettingsPOSVendorServiceTCGPlayer == null) {
            return this.errorMessageService.createErrorMessage('COMMERCE_ACCOUNT_SETTINGS_POS_VENDOR_SERVICE_SHOPIFY_NOT_FOUND', 'Commerce account settings POS vendor service TCGPlayer was not found');
        }


        commerceAccountSettingsPOSVendorServiceTCGPlayer.commerceAccountSettingsPOSVendorServiceTCGPlayerDisplayName = updateCommerceAccountSettingsPOSVendorServiceTCGPlayerDTO.commerceAccountSettingsPOSVendorServiceTCGPlayerDisplayName;
        commerceAccountSettingsPOSVendorServiceTCGPlayer.commerceAccountSettingsPOSVendorServiceTCGPlayerSellerKey = updateCommerceAccountSettingsPOSVendorServiceTCGPlayerDTO.commerceAccountSettingsPOSVendorServiceTCGPlayerSellerKey;
        commerceAccountSettingsPOSVendorServiceTCGPlayer.commerceAccountSettingsPOSVendorServiceTCGPlayerIsVerified = updateCommerceAccountSettingsPOSVendorServiceTCGPlayerDTO.commerceAccountSettingsPOSVendorServiceTCGPlayerIsVerified;
        commerceAccountSettingsPOSVendorServiceTCGPlayer.commerceAccountSettingsPOSVendorServiceTCGPlayerUpdateDate = new Date();

        commerceAccountSettingsPOSVendorServiceTCGPlayer = await this.commerceAccountSettingsPOSVendorServiceTCGPlayerRepository.save(commerceAccountSettingsPOSVendorServiceTCGPlayer);

        let commerceAccountSettingsPOSVendorServiceTCGPlayerDTO = await this.getCommerceAccountSettingsPOSVendorServiceTCGPlayerById(commerceAccountSettingsPOSVendorServiceTCGPlayer.commerceAccountSettingsPOSVendorServiceTCGPlayerId);
        
        return commerceAccountSettingsPOSVendorServiceTCGPlayerDTO;
    }

    async verifyCommerceAccountSettingsPOSVendorServiceTCGPlayerById(commerceAccountId: string) {
        
    }
    */
}