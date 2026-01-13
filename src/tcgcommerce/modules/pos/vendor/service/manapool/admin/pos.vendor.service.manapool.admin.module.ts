import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { POSVendorServiceManaPoolAdminService } from './pos.vendor.service.manapool.admin.service';
import { POSVendorServiceManaPoolAdminController } from './pos.vendor.service.manapool.admin.controller';
import { CommerceAccountSettingsPOSVendorServiceManaPoolService } from 'src/tcgcommerce/modules/commerce/account/settings/pos/vendor/service/manapool/commerce.account.settings.pos.vendor.service.manapool.service';
import { POSVendorServiceManaPoolAPIRestV1AdminModule } from '../api/rest/v1/admin/pos.vendor.service.manapool.api.rest.v1.admin.module';
import { ErrorMessageModule } from 'src/system/modules/error/message/error.message.module';

@Module({
    imports: [
        ConfigModule,
        CommerceAccountSettingsPOSVendorServiceManaPoolService,
        POSVendorServiceManaPoolAPIRestV1AdminModule,
        ErrorMessageModule
    ],
    controllers: [POSVendorServiceManaPoolAdminController],
    providers: [POSVendorServiceManaPoolAdminService],
    exports: [POSVendorServiceManaPoolAdminService]
})
export class POSVendorServiceManaPoolAdminModule {}
