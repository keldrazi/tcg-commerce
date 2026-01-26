import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CommerceAccountSettingsPOSVendorServiceManaPoolService } from 'src/tcgcommerce/modules/commerce/account/settings/pos/vendor/service/manapool/commerce.account.settings.pos.vendor.service.manapool.service';
import { POSVendorServiceManaPoolAPIRestV1WebhookService } from '../api/rest/v1/webhook/pos.vendor.service.manapool.api.rest.v1.webhook.service';
import { POSVendorServiceManaPoolWebhookProcessService } from './process/pos.vendor.service.manapool.webhook.process.service';

@Injectable()
export class POSVendorServiceManaPoolWebhookService {

    constructor(
        private configService: ConfigService,
        private commerceAccountSettingsPOSVendorServiceManaPoolService: CommerceAccountSettingsPOSVendorServiceManaPoolService,
        private posVendorServiceManaPoolAPIRestV1WebhookService: POSVendorServiceManaPoolAPIRestV1WebhookService,
        private posVendorServiceManaPoolWebhookProcessService: POSVendorServiceManaPoolWebhookProcessService,
    ) { }

    private manaPoolWebhookURL = this.configService.get('MANAPOOL_WEBHOOK_URL');

    async getManaPoolWebhooks(commerceAccountId: string) {
        let commerceAccountSettingsPOSVendorServiceManaPool = await this.getCommerceAccountSettingsPOSVendorServiceManaPoolByCommerceAccountId(commerceAccountId);

        if(commerceAccountSettingsPOSVendorServiceManaPool == null) {
            throw new NotFoundException('Commerce account settings POS vendor service Manapool was not found');
        }

        let email = commerceAccountSettingsPOSVendorServiceManaPool.commerceAccountSettingsPOSVendorServiceManaPoolEmail;
        let accessToken = commerceAccountSettingsPOSVendorServiceManaPool.commerceAccountSettingsPOSVendorServiceManaPoolAccessToken;

        return await this.posVendorServiceManaPoolAPIRestV1WebhookService.getManaPoolWebhooks(email, accessToken);

    }

    async getManaPoolWebhookById(commerceAccountId: string, webhookId: string) {
        let commerceAccountSettingsPOSVendorServiceManaPool = await this.getCommerceAccountSettingsPOSVendorServiceManaPoolByCommerceAccountId(commerceAccountId);

        if(commerceAccountSettingsPOSVendorServiceManaPool == null) {
            throw new NotFoundException('Commerce account settings POS vendor service Manapool was not found');
        }

        let email = commerceAccountSettingsPOSVendorServiceManaPool.commerceAccountSettingsPOSVendorServiceManaPoolEmail;
        let accessToken = commerceAccountSettingsPOSVendorServiceManaPool.commerceAccountSettingsPOSVendorServiceManaPoolAccessToken;
        
        return await this.posVendorServiceManaPoolAPIRestV1WebhookService.getManaPoolWebhookById(email, accessToken, webhookId);
    
    }

    async createManaPoolWebhook(commerceAccountId, webhookType: string) {
        let commerceAccountSettingsPOSVendorServiceManaPool = await this.getCommerceAccountSettingsPOSVendorServiceManaPoolByCommerceAccountId(commerceAccountId);

        if(commerceAccountSettingsPOSVendorServiceManaPool == null) {
            throw new NotFoundException('Commerce account settings POS vendor service Manapool was not found');
        }

        let email = commerceAccountSettingsPOSVendorServiceManaPool.commerceAccountSettingsPOSVendorServiceManaPoolEmail;
        let accessToken = commerceAccountSettingsPOSVendorServiceManaPool.commerceAccountSettingsPOSVendorServiceManaPoolAccessToken;
        let webhookTopic = '';
        let webhookCallbackURL = await this.createWebhookURL(commerceAccountId);

        switch(webhookType) {
            case 'order_created':
                webhookTopic = 'order_created';
                break;
        }

        return await this.posVendorServiceManaPoolAPIRestV1WebhookService.createManaPoolWebhook(email, accessToken, webhookTopic, webhookCallbackURL);

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