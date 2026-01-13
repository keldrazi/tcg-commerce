import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { POSVendorServiceManaPoolAPIWebhookV1Service } from './pos.vendor.service.manapool.api.webhook.v1.service';

@Module({
    imports: [
        ConfigModule,
        HttpModule,
    ], 
    controllers: [],
    providers: [POSVendorServiceManaPoolAPIWebhookV1Service],
    exports: [POSVendorServiceManaPoolAPIWebhookV1Service],
})

export class POSVendorServiceManaPoolAPIWebhookV1Module {}