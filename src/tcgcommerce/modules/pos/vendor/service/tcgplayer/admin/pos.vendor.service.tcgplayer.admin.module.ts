import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { POSVendorServiceTCGPlayerAdminService } from './pos.vendor.service.tcgplayer.admin.service';
import { POSVendorServiceTCGPlayerAdminController } from './pos.vendor.service.tcgplayer.admin.controller';
import { CommerceAccountSettingsPOSVendorServiceTCGPlayerModule } from 'src/tcgcommerce/modules/commerce/account/settings/pos/vendor/service/tcgplayer/commerce.account.settings.pos.vendor.service.tcgplayer.module';
import { POSVendorServiceTCGPlayerAPIRestAdminModule } from 'src/tcgcommerce/modules/pos/vendor/service/tcgplayer/api/rest/admin/pos.vendor.service.tcgplayer.api.rest.admin.module';
import { ErrorMessageModule } from 'src/system/modules/error/message/error.message.module';

@Module({
    imports: [
        ConfigModule,
        CommerceAccountSettingsPOSVendorServiceTCGPlayerModule,
        POSVendorServiceTCGPlayerAPIRestAdminModule,
        ErrorMessageModule
    ],
    controllers: [POSVendorServiceTCGPlayerAdminController],
    providers: [POSVendorServiceTCGPlayerAdminService],
    exports: [POSVendorServiceTCGPlayerAdminService]
})
export class POSVendorServiceTCGPlayerAdminModule {}
