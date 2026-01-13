import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { POSVendorServiceManaPoolWebhookService } from './pos.vendor.service.manapool.webhook.service';
import { POSVendorServiceManaPoolWebhookController } from './pos.vendor.service.manapool.webhook.controller';
import { CommerceAccountSettingsPOSVendorServiceManaPoolService } from 'src/tcgcommerce/modules/commerce/account/settings/pos/vendor/service/manapool/commerce.account.settings.pos.vendor.service.manapool.service';
import { POSVendorServiceManaPoolAPIWebhookV1Module } from '../api/rest/v1/webhook/pos.vendor.service.manapool.api.rest.v1.webhook.module';
import { ErrorMessageModule } from 'src/system/modules/error/message/error.message.module';

@Module({
    imports: [
        CommerceAccountSettingsPOSVendorServiceManaPoolService,
        POSVendorServiceManaPoolAPIWebhookV1Module,
        ErrorMessageModule
    ],
    controllers: [POSVendorServiceManaPoolWebhookController],
    providers: [POSVendorServiceManaPoolWebhookService],
    exports: [POSVendorServiceManaPoolWebhookService]
})
export class POSVendorServiceManaPoolWebhookModule {}
