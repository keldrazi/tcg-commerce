import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { POSVendorServiceTCGPlayerOrderService } from './pos.vendor.service.tcgplayer.order.service';
import { POSVendorServiceTCGPlayerOrderController } from './pos.vendor.service.tcgplayer.order.controller';
import { CommerceAccountSettingsPOSVendorServiceTCGPlayerService } from 'src/tcgcommerce/modules/commerce/account/settings/pos/vendor/service/tcgplayer/commerce.account.settings.pos.vendor.service.tcgplayer.service';

@Module({
    imports: [
        ConfigModule,
        CommerceAccountSettingsPOSVendorServiceTCGPlayerService,
    ],
    controllers: [POSVendorServiceTCGPlayerOrderController],
    providers: [POSVendorServiceTCGPlayerOrderService],
    exports: [POSVendorServiceTCGPlayerOrderService]
})
export class POSVendorServiceTCGPlayerOrderModule {}
