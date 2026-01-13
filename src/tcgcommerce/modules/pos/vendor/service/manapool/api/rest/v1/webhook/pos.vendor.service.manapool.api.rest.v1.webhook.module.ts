import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { POSVendorServiceManaPoolAPIRestV1WebhookService } from './pos.vendor.service.manapool.api.rest.v1.webhook.service';

@Module({
    imports: [
        ConfigModule,
        HttpModule,
    ], 
    controllers: [],
    providers: [POSVendorServiceManaPoolAPIRestV1WebhookService],
    exports: [POSVendorServiceManaPoolAPIRestV1WebhookService],
})

export class POSVendorServiceManaPoolAPIRestV1WebhookModule {}