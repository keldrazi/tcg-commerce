import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { POSVendorServiceManaPoolAPIRestV1AdminService } from './pos.vendor.service.manapool.api.rest.v1.admin.service';

@Module({
    imports: [
        ConfigModule,
        HttpModule,
    ], 
    controllers: [],
    providers: [POSVendorServiceManaPoolAPIRestV1AdminService],
    exports: [POSVendorServiceManaPoolAPIRestV1AdminService],
})

export class POSVendorServiceManaPoolAPIRestV1AdminModule {}