import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CommerceAccountSettingsPOSVendorServiceManaPoolService } from 'src/tcgcommerce/modules/commerce/account/settings/pos/vendor/service/manapool/commerce.account.settings.pos.vendor.service.manapool.service';
import { POSVendorServiceManaPoolAPIRestV1AdminService } from '../api/rest/v1/admin/pos.vendor.service.manapool.api.rest.v1.admin.service';
import { ErrorMessageService } from 'src/system/modules/error/message/error.message.service';
import { ErrorMessageDTO } from 'src/system/modules/error/message/dto/error.message.dto';
import { InventoryProductCardDTO } from 'src/tcgcommerce/modules/inventory/product/card/dto/inventory.product.card.dto';

@Injectable()
export class POSVendorServiceManaPoolAdminService {

    constructor(
        private configService: ConfigService,
        private commerceAccountSettingsPOSVendorServiceManaPoolService: CommerceAccountSettingsPOSVendorServiceManaPoolService,
        private posVendorServiceManaPoolAPIRestV1AdminService: POSVendorServiceManaPoolAPIRestV1AdminService,
        private errorMessageService: ErrorMessageService,
    ) { }


    async getManaPoolAccount(commerceAccountId: string) {
        let commerceAccountSettingsPOSVendorServiceManaPool = await this.getCommerceAccountSettingsPOSVendorServiceManaPoolByCommerceAccountId(commerceAccountId);
        
        if(commerceAccountSettingsPOSVendorServiceManaPool == null || commerceAccountSettingsPOSVendorServiceManaPool instanceof ErrorMessageDTO) {
            return this.errorMessageService.createErrorMessage('COMMERCE_ACCOUNT_SETTINGS_POS_VENDOR_SERVICE_MANAPOOL_NOT_FOUND', 'Commerce account settings POS vendor service Manapool was not found');
        }

        let email = commerceAccountSettingsPOSVendorServiceManaPool.commerceAccountSettingsPOSVendorServiceManaPoolEmail;
        let accessToken = commerceAccountSettingsPOSVendorServiceManaPool.commerceAccountSettingsPOSVendorServiceManaPoolAccessToken;

        return await this.posVendorServiceManaPoolAPIRestV1AdminService.getManaPoolAccount(email, accessToken);
    }

    async updateManaPoolSellerInventoriesByTCGPlayerSku(commerceAccountId: string, inventoryProductCardDTOs: InventoryProductCardDTO[]) {

    }

    async updateManaPoolSellerInventoryByTCGPlayerSku(commerceAccountId: string, inventoryProductCardDTOs: InventoryProductCardDTO) {
        
    }

    async getManaPoolSellerOrders(commerceAccountId: string) {
        let commerceAccountSettingsPOSVendorServiceManaPool = await this.getCommerceAccountSettingsPOSVendorServiceManaPoolByCommerceAccountId(commerceAccountId);

        if(commerceAccountSettingsPOSVendorServiceManaPool == null || commerceAccountSettingsPOSVendorServiceManaPool instanceof ErrorMessageDTO) {
            return this.errorMessageService.createErrorMessage('COMMERCE_ACCOUNT_SETTINGS_POS_VENDOR_SERVICE_MANAPOOL_NOT_FOUND', 'Commerce account settings POS vendor service Manapool was not found');
        }

        let email = commerceAccountSettingsPOSVendorServiceManaPool.commerceAccountSettingsPOSVendorServiceManaPoolEmail;
        let accessToken = commerceAccountSettingsPOSVendorServiceManaPool.commerceAccountSettingsPOSVendorServiceManaPoolAccessToken;

        return await this.posVendorServiceManaPoolAPIRestV1AdminService.getManaPoolSellerOrders(email, accessToken);
    }

    async getManaPoolSellerOrderById(commerceAccountId: string, orderId: string) {
        let commerceAccountSettingsPOSVendorServiceManaPool = await this.getCommerceAccountSettingsPOSVendorServiceManaPoolByCommerceAccountId(commerceAccountId);

        if(commerceAccountSettingsPOSVendorServiceManaPool == null || commerceAccountSettingsPOSVendorServiceManaPool instanceof ErrorMessageDTO) {
            return this.errorMessageService.createErrorMessage('COMMERCE_ACCOUNT_SETTINGS_POS_VENDOR_SERVICE_MANAPOOL_NOT_FOUND', 'Commerce account settings POS vendor service Manapool was not found');
        }

        let email = commerceAccountSettingsPOSVendorServiceManaPool.commerceAccountSettingsPOSVendorServiceManaPoolEmail;
        let accessToken = commerceAccountSettingsPOSVendorServiceManaPool.commerceAccountSettingsPOSVendorServiceManaPoolAccessToken;

        return await this.posVendorServiceManaPoolAPIRestV1AdminService.getManaPoolSellerOrderById(email, accessToken, orderId);
    }

    //UTILITY METHODS;
    async getCommerceAccountSettingsPOSVendorServiceManaPoolByCommerceAccountId(commerceAccountId: string) {
        return await this.commerceAccountSettingsPOSVendorServiceManaPoolService.getCommerceAccountSettingsPOSVendorServiceManaPoolByCommerceAccountId(commerceAccountId);
    }
        
}