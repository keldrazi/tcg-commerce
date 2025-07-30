import { Module } from '@nestjs/common';
import { ImportServiceTCGPlayerService } from './import.service.card.tcgplayer.service';
import { UtilPDFModule } from 'src/system/modules/util/pdf/util.pdf.module';


@Module({
  imports: [
    UtilPDFModule,
  ], 
  providers: [ImportServiceTCGPlayerService],
  exports: [
    ImportServiceTCGPlayerService,
  ],
})
export class ImportServiceTCGPlayerModule {}