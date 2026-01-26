import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { POSVendorServiceManaPoolWebhookProcessService } from './pos.vendor.service.manapool.webhook.process.service';

@Module({
    imports: [
        ConfigModule,
    ],
    controllers: [],
    providers: [POSVendorServiceManaPoolWebhookProcessService],
    exports: [POSVendorServiceManaPoolWebhookProcessService]
})
export class POSVendorServiceManaPoolWebhookProcessModule {}
