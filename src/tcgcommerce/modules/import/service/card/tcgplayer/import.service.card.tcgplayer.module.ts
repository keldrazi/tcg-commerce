import { Module } from '@nestjs/common';
import { ImportServiceCardTCGPlayerService } from "./import.service.card.tcgplayer.service";
import { UtilCSVModule } from 'src/system/modules/util/csv/util.csv.module';
import { ImportServiceCardUtilModule } from 'src/tcgcommerce/modules/import/service/card/util/import.service.card.util.module';



@Module({
  imports: [
    UtilCSVModule,
    ImportServiceCardUtilModule
  ], 
  providers: [ImportServiceCardTCGPlayerService],
  exports: [ImportServiceCardTCGPlayerService],
})
export class ImportServiceCardTCGPlayerModule {}