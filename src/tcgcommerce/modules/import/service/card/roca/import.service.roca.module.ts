import { Module } from '@nestjs/common';
import { ImportServiceRocaService } from "./import.service.roca.service";
import { UtilCSVModule } from 'src/system/modules/util/csv/util.csv.module';
import { ImportServiceUtilModule } from 'src/tcgcommerce/modules/import/service/card/util/import.service.util.module';



@Module({
  imports: [
    UtilCSVModule,
    ImportServiceUtilModule
  ], 
  providers: [ImportServiceRocaService],
  exports: [ImportServiceRocaService],
})
export class ImportServiceRocaModule {}