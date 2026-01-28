import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CommerceAccountSettingsPOSVendorServiceTCGPlayerService } from 'src/tcgcommerce/modules/commerce/account/settings/pos/vendor/service/tcgplayer/commerce.account.settings.pos.vendor.service.tcgplayer.service';
import { CommerceAccountSettingsPOSVendorServiceTCGPlayerDTO } from 'src/tcgcommerce/modules/commerce/account/settings/pos/vendor/service/tcgplayer/dto/commerce.account.settings.pos.vendor.service.tcgplayer.dto';

@Injectable()
export class POSVendorServiceTCGPlayerOrderService {

    constructor(
        private configService: ConfigService,
        private commerceAccountSettingsPOSVendorServiceTCGPlayerService: CommerceAccountSettingsPOSVendorServiceTCGPlayerService,
    ) { }

    //UTILITY METHODS;
    async getCommerceAccountSettingsPOSVendorServiceTCGPlayerByCommerceAccountId(commerceAccountId: string): Promise<CommerceAccountSettingsPOSVendorServiceTCGPlayerDTO> {
        return await this.commerceAccountSettingsPOSVendorServiceTCGPlayerService.getCommerceAccountSettingsPOSVendorServiceTCGPlayerByCommerceAccountId(commerceAccountId);
    }
        
}