import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { CommerceAccountSettingsPOSVendorServiceShopifyService } from './commerce.account.settings.pos.vendor.service.shopify.service';
import { CommerceAccountSettingsPOSVendorServiceShopifyController } from './commerce.account.settings.pos.vendor.service.shopify.controller';
import { CommerceAccountSettingsPOSVendorServiceShopify } from 'src/typeorm/entities/tcgcommerce/modules/commerce/account/settings/pos/vendor/service/shopify/commerce.account.settings.pos.vendor.service.shopify.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([CommerceAccountSettingsPOSVendorServiceShopify])
    ],
    controllers: [CommerceAccountSettingsPOSVendorServiceShopifyController],
    providers: [CommerceAccountSettingsPOSVendorServiceShopifyService],
    exports: [CommerceAccountSettingsPOSVendorServiceShopifyService]
})
export class CommerceAccountSettingsPOSVendorServiceShopifyModule {}
