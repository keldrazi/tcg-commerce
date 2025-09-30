import { Module } from '@nestjs/common';
import { TCGdbAPIUtilService } from './tcgdb.api.util.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { TCGdbAPIUtil } from 'src/typeorm/entities/tcgdb/modules/tcgdb/api/util/tcgdb.api.util.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
      HttpModule,
      ConfigModule,
      TypeOrmModule.forFeature([TCGdbAPIUtil]),
  ], 
  providers: [TCGdbAPIUtilService],
  exports: [TCGdbAPIUtilService],
})
export class TCGdbAPIUtilModule {}