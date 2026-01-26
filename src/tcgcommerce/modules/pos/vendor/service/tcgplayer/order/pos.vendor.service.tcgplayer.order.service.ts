import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CommerceAccountSettingsPOSVendorServiceTCGPlayerService } from 'src/tcgcommerce/modules/commerce/account/settings/pos/vendor/service/tcgplayer/commerce.account.settings.pos.vendor.service.tcgplayer.service';
import { POSVendorServiceTCGPlayerAPIRestOrderService } from 'src/tcgcommerce/modules/pos/vendor/service/tcgplayer/api/rest/order/pos.vendor.service.tcgplayer.api.rest.order.service';
import { InventoryProductCardDTO } from 'src/tcgcommerce/modules/inventory/product/card/dto/inventory.product.card.dto';

@Injectable()
export class POSVendorServiceTCGPlayerOrderService {

    constructor(
        private configService: ConfigService,
        private commerceAccountSettingsPOSVendorServiceTCGPlayerService: CommerceAccountSettingsPOSVendorServiceTCGPlayerService,
        private posVendorServiceTCGPlayerAPIRestOrderService: POSVendorServiceTCGPlayerAPIRestOrderService,
    ) { }

    //UTILITY METHODS;
    async getCommerceAccountSettingsPOSVendorServiceTCGPlayerByCommerceAccountId(commerceAccountId: string) {
        return await this.commerceAccountSettingsPOSVendorServiceTCGPlayerService.getCommerceAccountSettingsPOSVendorServiceTCGPlayerByCommerceAccountId(commerceAccountId);
    }
        
}