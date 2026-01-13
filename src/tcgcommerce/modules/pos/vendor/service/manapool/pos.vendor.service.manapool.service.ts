import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CommerceAccountSettingsPOSVendorServiceManaPoolService } from 'src/tcgcommerce/modules/commerce/account/settings/pos/vendor/service/manapool/commerce.account.settings.pos.vendor.service.manapool.service';
import { POSVendorServiceManaPoolAPIRestV1Service } from './api/rest/v1/admin/pos.vendor.service.manapool.api.rest.v1.admin.service';
import { POSVendorServiceManaPoolAPIWebhookV1Service } from './api/rest/v1/webhook/pos.vendor.service.manapool.api.webhook.v1.service';
import { ErrorMessageService } from 'src/system/modules/error/message/error.message.service';
import { ErrorMessageDTO } from 'src/system/modules/error/message/dto/error.message.dto';
import { InventoryProductCardDTO } from 'src/tcgcommerce/modules/inventory/product/card/dto/inventory.product.card.dto';

@Injectable()
export class POSVendorServiceManaPoolService {

    constructor(
        private configService: ConfigService,
        private commerceAccountSettingsPOSVendorServiceManaPoolService: CommerceAccountSettingsPOSVendorServiceManaPoolService,
        private posVendorServiceManaPoolAPIRestV1Service: POSVendorServiceManaPoolAPIRestV1Service,
        private posVendorServiceManaPoolAPIWebhookV1Service: POSVendorServiceManaPoolAPIWebhookV1Service,
        private errorMessageService: ErrorMessageService,
    ) { }

    private manaPoolWebhookURL = this.configService.get('MANAPOOL_WEBHOOK_URL');

    //REST API METHODS;
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

        return await this.posVendorServiceManaPoolAPIRestV1Service.getManaPoolSellerOrders(email, accessToken);
    }

    async getManaPoolSellerOrderById(commerceAccountId: string, orderId: string) {
        let commerceAccountSettingsPOSVendorServiceManaPool = await this.getCommerceAccountSettingsPOSVendorServiceManaPoolByCommerceAccountId(commerceAccountId);

        if(commerceAccountSettingsPOSVendorServiceManaPool == null || commerceAccountSettingsPOSVendorServiceManaPool instanceof ErrorMessageDTO) {
            return this.errorMessageService.createErrorMessage('COMMERCE_ACCOUNT_SETTINGS_POS_VENDOR_SERVICE_MANAPOOL_NOT_FOUND', 'Commerce account settings POS vendor service Manapool was not found');
        }

        let email = commerceAccountSettingsPOSVendorServiceManaPool.commerceAccountSettingsPOSVendorServiceManaPoolEmail;
        let accessToken = commerceAccountSettingsPOSVendorServiceManaPool.commerceAccountSettingsPOSVendorServiceManaPoolAccessToken;

        return await this.posVendorServiceManaPoolAPIRestV1Service.getManaPoolSellerOrderById(email, accessToken, orderId);
    }




    //WEBHOOK API METHODS;
    async getManaPoolWebhooks(commerceAccountId: string) {
        let commerceAccountSettingsPOSVendorServiceManaPool = await this.getCommerceAccountSettingsPOSVendorServiceManaPoolByCommerceAccountId(commerceAccountId);

        if(commerceAccountSettingsPOSVendorServiceManaPool == null || commerceAccountSettingsPOSVendorServiceManaPool instanceof ErrorMessageDTO) {
            return this.errorMessageService.createErrorMessage('COMMERCE_ACCOUNT_SETTINGS_POS_VENDOR_SERVICE_MANAPOOL_NOT_FOUND', 'Commerce account settings POS vendor service Manapool was not found');
        }

        let email = commerceAccountSettingsPOSVendorServiceManaPool.commerceAccountSettingsPOSVendorServiceManaPoolEmail;
        let accessToken = commerceAccountSettingsPOSVendorServiceManaPool.commerceAccountSettingsPOSVendorServiceManaPoolAccessToken;

        return await this.posVendorServiceManaPoolAPIWebhookV1Service.getManaPoolWebhooks(email, accessToken);

    }

    async getManaPoolWebhookById(commerceAccountId: string, webhookId: string) {
        let commerceAccountSettingsPOSVendorServiceManaPool = await this.getCommerceAccountSettingsPOSVendorServiceManaPoolByCommerceAccountId(commerceAccountId);

        if(commerceAccountSettingsPOSVendorServiceManaPool == null || commerceAccountSettingsPOSVendorServiceManaPool instanceof ErrorMessageDTO) {
            return this.errorMessageService.createErrorMessage('COMMERCE_ACCOUNT_SETTINGS_POS_VENDOR_SERVICE_MANAPOOL_NOT_FOUND', 'Commerce account settings POS vendor service Manapool was not found');
        }

        let email = commerceAccountSettingsPOSVendorServiceManaPool.commerceAccountSettingsPOSVendorServiceManaPoolEmail;
        let accessToken = commerceAccountSettingsPOSVendorServiceManaPool.commerceAccountSettingsPOSVendorServiceManaPoolAccessToken;
        
        return await this.posVendorServiceManaPoolAPIWebhookV1Service.getManaPoolWebhookById(email, accessToken, webhookId);
    
    }

    async createManaPoolWebhook(commerceAccountId, webhookType: string) {
        let commerceAccountSettingsPOSVendorServiceManaPool = await this.getCommerceAccountSettingsPOSVendorServiceManaPoolByCommerceAccountId(commerceAccountId);

        if(commerceAccountSettingsPOSVendorServiceManaPool == null || commerceAccountSettingsPOSVendorServiceManaPool instanceof ErrorMessageDTO) {
            return this.errorMessageService.createErrorMessage('COMMERCE_ACCOUNT_SETTINGS_POS_VENDOR_SERVICE_MANAPOOL_NOT_FOUND', 'Commerce account settings POS vendor service Manapool was not found');
        }

        let email = commerceAccountSettingsPOSVendorServiceManaPool.commerceAccountSettingsPOSVendorServiceManaPoolEmail;
        let accessToken = commerceAccountSettingsPOSVendorServiceManaPool.commerceAccountSettingsPOSVendorServiceManaPoolAccessToken;
        let topic = '';
        let webhookURL = await this.createWebhookURL(commerceAccountId);

        switch(webhookType) {
            case 'order_created':
                topic = 'order_created';
                break;
        }

        let webhook = {
            topic: topic,
            url: webhookURL
        };

        return await this.posVendorServiceManaPoolAPIWebhookV1Service.createManaPoolWebhook(email, accessToken, webhook);

    }

    //WEBHOOK CALLBACK METHODS;
    async processManaPoolWebhookCallback(commerceAccountId:string, webhookData: any) {
        //Process webhook data here as needed
        return true;
    }

    //UTILITY METHODS;
    async getCommerceAccountSettingsPOSVendorServiceManaPoolByCommerceAccountId(commerceAccountId: string) {
        return await this.commerceAccountSettingsPOSVendorServiceManaPoolService.getCommerceAccountSettingsPOSVendorServiceManaPoolByCommerceAccountId(commerceAccountId);
    }

    async createWebhookURL(commerceAccountId) {
        return this.manaPoolWebhookURL + '/' + commerceAccountId;
    }
        
}