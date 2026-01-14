import { Module } from '@nestjs/common';
import { POSVendorServiceTCGPlayerAPIRestUtilService } from './pos.vendor.service.tcgplayer.api.rest.util.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { POSVendorServiceTCGPlayerAPIRestUtil } from 'src/typeorm/entities/tcgcommerce/modules/pos/vendor/service/tcgplayer/api/rest/util/pos.vendor.service.tcgplayer.api.rest.util.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
      HttpModule,
      ConfigModule,
      TypeOrmModule.forFeature([POSVendorServiceTCGPlayerAPIRestUtil]),
  ], 
  providers: [POSVendorServiceTCGPlayerAPIRestUtilService],
  exports: [POSVendorServiceTCGPlayerAPIRestUtilService],
})
export class POSVendorServiceTCGPlayerAPIRestUtilModule {}