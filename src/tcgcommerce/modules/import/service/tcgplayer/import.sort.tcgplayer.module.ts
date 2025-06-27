import { Module } from '@nestjs/common';
import { ImportSortTCGPlayerService } from './import.sort.tcgplayer.service';
import { UtilPDFModule } from 'src/system/modules/util/pdf/util.pdf.module';


@Module({
  imports: [
    UtilPDFModule,
  ], 
  providers: [ImportSortTCGPlayerService],
  exports: [
    ImportSortTCGPlayerService,
  ],
})
export class ImportSortTCGPlayerModule {}