import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { CommerceAccountSettingsPOSVendorServiceShopifyService } from './commerce.account.settings.pos.vendor.service.shopify.service';
import { CommerceAccountSettingsPOSVendorServiceShopifyController } from './commerce.account.settings.pos.vendor.service.shopify.controller';
import { CommerceAccountSettingsPOSVendorServiceShopify } from 'src/typeorm/entities/tcgcommerce/modules/commerce/account/settings/pos/vendor/service/shopify/commerce.account.settings.pos.vendor.service.manapool.entity';
import { ErrorMessageModule } from 'src/system/modules/error/message/error.message.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([CommerceAccountSettingsPOSVendorServiceShopify]),
        ErrorMessageModule
    ],
    controllers: [CommerceAccountSettingsPOSVendorServiceShopifyController],
    providers: [CommerceAccountSettingsPOSVendorServiceShopifyService],
    exports: [CommerceAccountSettingsPOSVendorServiceShopifyService]
})
export class CommerceAccountSettingsPOSVendorServiceShopifyModule {}
