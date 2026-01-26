import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CommerceAccountSettingsPOSVendorServiceTCGPlayerService } from 'src/tcgcommerce/modules/commerce/account/settings/pos/vendor/service/tcgplayer/commerce.account.settings.pos.vendor.service.tcgplayer.service';
import { POSVendorServiceTCGPlayerAPIRestAdminService } from '../api/rest/admin/pos.vendor.service.tcgplayer.api.rest.admin.service';
import { InventoryProductCardDTO } from 'src/tcgcommerce/modules/inventory/product/card/dto/inventory.product.card.dto';

@Injectable()
export class POSVendorServiceTCGPlayerAdminService {

    constructor(
        private configService: ConfigService,
        private commerceAccountSettingsPOSVendorServiceTCGPlayerService: CommerceAccountSettingsPOSVendorServiceTCGPlayerService,
        private posVendorServiceTCGPlayerAPIRestAdminService: POSVendorServiceTCGPlayerAPIRestAdminService,
    ) { }

    private manaPoolWebhookURL = this.configService.get('MANAPOOL_WEBHOOK_URL');

    

    //UTILITY METHODS;
    async getCommerceAccountSettingsPOSVendorServiceTCGPlayerByCommerceAccountId(commerceAccountId: string) {
        return await this.commerceAccountSettingsPOSVendorServiceTCGPlayerService.getCommerceAccountSettingsPOSVendorServiceTCGPlayerByCommerceAccountId(commerceAccountId);
    }
        
}