import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { POSVendorServiceManaPoolAPIRestV1Service } from '../pos.vendor.service.manapool.api.rest.v1.service';

@Module({
    imports: [
        ConfigModule,
        HttpModule,
    ], 
    controllers: [],
    providers: [POSVendorServiceManaPoolAPIRestV1Service],
    exports: [POSVendorServiceManaPoolAPIRestV1Service],
})

export class POSVendorServiceManaPoolAPIRestV1Module {}