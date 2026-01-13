import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { POSVendorServiceManaPoolService } from './pos.vendor.service.manapool.service';
import { POSVendorServiceManaPoolController } from './pos.vendor.service.manapool.controller';
import { CommerceAccountSettingsPOSVendorServiceManaPoolService } from 'src/tcgcommerce/modules/commerce/account/settings/pos/vendor/service/manapool/commerce.account.settings.pos.vendor.service.manapool.service';
import { POSVendorServiceManaPoolAPIRestV1Module } from './api/rest/v1/pos.vendor.service.manapool.api.rest.v1.module';
import { POSVendorServiceManaPoolAPIWebhookV1Module } from './api/webhook/v1/pos.vendor.service.manapool.api.webhook.v1.module';
import { ErrorMessageModule } from 'src/system/modules/error/message/error.message.module';

@Module({
    imports: [
        CommerceAccountSettingsPOSVendorServiceManaPoolService,
        POSVendorServiceManaPoolAPIRestV1Module,
        POSVendorServiceManaPoolAPIWebhookV1Module,
        ErrorMessageModule
    ],
    controllers: [POSVendorServiceManaPoolController],
    providers: [POSVendorServiceManaPoolService],
    exports: [POSVendorServiceManaPoolService]
})
export class POSVendorServiceManaPoolModule {}
