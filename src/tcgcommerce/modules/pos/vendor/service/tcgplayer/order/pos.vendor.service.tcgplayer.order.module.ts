import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { POSVendorServiceTCGPlayerOrderService } from './pos.vendor.service.tcgplayer.order.service';
import { POSVendorServiceTCGPlayerOrderController } from './pos.vendor.service.tcgplayer.order.controller';
import { CommerceAccountSettingsPOSVendorServiceTCGPlayerService } from 'src/tcgcommerce/modules/commerce/account/settings/pos/vendor/service/tcgplayer/commerce.account.settings.pos.vendor.service.tcgplayer.service';
import { POSVendorServiceTCGPlayerAPIRestOrderModule } from 'src/tcgcommerce/modules/pos/vendor/service/tcgplayer/api/rest/order/pos.vendor.service.tcgplayer.api.rest.order.module';
import { ErrorMessageModule } from 'src/system/modules/error/message/error.message.module';

@Module({
    imports: [
        ConfigModule,
        CommerceAccountSettingsPOSVendorServiceTCGPlayerService,
        POSVendorServiceTCGPlayerAPIRestOrderModule,
        ErrorMessageModule
    ],
    controllers: [POSVendorServiceTCGPlayerOrderController],
    providers: [POSVendorServiceTCGPlayerOrderService],
    exports: [POSVendorServiceTCGPlayerOrderService]
})
export class POSVendorServiceTCGPlayerOrderModule {}
