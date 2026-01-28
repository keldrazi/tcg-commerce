import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { POSVendorServiceTCGPlayerAdminService } from './pos.vendor.service.tcgplayer.admin.service';
import { POSVendorServiceTCGPlayerAdminController } from './pos.vendor.service.tcgplayer.admin.controller';
import { InventoryProductCardModule } from 'src/tcgcommerce/modules/inventory/product/card/inventory.product.card.module';
import { CommerceAccountSettingsPOSVendorServiceTCGPlayerModule } from 'src/tcgcommerce/modules/commerce/account/settings/pos/vendor/service/tcgplayer/commerce.account.settings.pos.vendor.service.tcgplayer.module';
import { AwsS3Module } from 'src/system/modules/aws/s3/aws.s3.module';

@Module({
    imports: [
        ConfigModule,
        InventoryProductCardModule,
        CommerceAccountSettingsPOSVendorServiceTCGPlayerModule,
        AwsS3Module,
    ],
    controllers: [POSVendorServiceTCGPlayerAdminController],
    providers: [POSVendorServiceTCGPlayerAdminService],
    exports: [POSVendorServiceTCGPlayerAdminService]
})
export class POSVendorServiceTCGPlayerAdminModule {}
