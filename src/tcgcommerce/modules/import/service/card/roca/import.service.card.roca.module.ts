import { Module } from '@nestjs/common';
import { ImportServiceCardRocaService } from "./import.service.card.roca.service";
import { UtilCSVModule } from 'src/system/modules/util/csv/util.csv.module';
import { ImportServiceCardUtilModule } from 'src/tcgcommerce/modules/import/service/card/util/import.service.card.util.module';



@Module({
  imports: [
    UtilCSVModule,
    ImportServiceCardUtilModule
  ], 
  providers: [ImportServiceCardRocaService],
  exports: [ImportServiceCardRocaService],
})
export class ImportServiceCardRocaModule {}