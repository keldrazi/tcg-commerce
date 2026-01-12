import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { POSVendorServiceManaPoolRestV1Service } from './pos.vendor.service.manapool.rest.v1.service';

@Module({
    imports: [
        ConfigModule,
        HttpModule,
    ], 
    controllers: [],
    providers: [POSVendorServiceManaPoolRestV1Service],
    exports: [POSVendorServiceManaPoolRestV1Service],
})

export class POSVendorServiceManaPoolRestV1Module {}