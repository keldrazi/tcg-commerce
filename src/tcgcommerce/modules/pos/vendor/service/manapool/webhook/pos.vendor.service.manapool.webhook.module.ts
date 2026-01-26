import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { POSVendorServiceManaPoolWebhookService } from './pos.vendor.service.manapool.webhook.service';
import { POSVendorServiceManaPoolWebhookController } from './pos.vendor.service.manapool.webhook.controller';
import { CommerceAccountSettingsPOSVendorServiceManaPoolModule } from 'src/tcgcommerce/modules/commerce/account/settings/pos/vendor/service/manapool/commerce.account.settings.pos.vendor.service.manapool.module';
import { POSVendorServiceManaPoolAPIRestV1WebhookModule } from '../api/rest/v1/webhook/pos.vendor.service.manapool.api.rest.v1.webhook.module';
import { POSVendorServiceManaPoolWebhookProcessModule } from './process/pos.vendor.service.manapool.webhook.process.module';

@Module({
    imports: [
        ConfigModule,
        CommerceAccountSettingsPOSVendorServiceManaPoolModule,
        POSVendorServiceManaPoolAPIRestV1WebhookModule,
        POSVendorServiceManaPoolWebhookProcessModule,
    ],
    controllers: [POSVendorServiceManaPoolWebhookController],
    providers: [POSVendorServiceManaPoolWebhookService],
    exports: [POSVendorServiceManaPoolWebhookService]
})
export class POSVendorServiceManaPoolWebhookModule {}
