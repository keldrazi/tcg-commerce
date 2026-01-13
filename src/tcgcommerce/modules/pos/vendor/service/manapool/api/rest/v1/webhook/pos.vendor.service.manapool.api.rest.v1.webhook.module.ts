import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { POSVendorServiceManaPoolAPIWebhookV1Service } from './pos.vendor.service.manapool.api.rest.v1.webhook.service';

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