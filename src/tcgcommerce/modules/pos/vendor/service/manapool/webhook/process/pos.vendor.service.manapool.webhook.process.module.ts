import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { POSVendorServiceManaPoolWebhookProcessService } from './pos.vendor.service.manapool.webhook.process.service';
import { ErrorMessageModule } from 'src/system/modules/error/message/error.message.module';

@Module({
    imports: [
        ConfigModule,
        ErrorMessageModule
    ],
    controllers: [],
    providers: [POSVendorServiceManaPoolWebhookProcessService],
    exports: [POSVendorServiceManaPoolWebhookProcessService]
})
export class POSVendorServiceManaPoolWebhookProcessModule {}
