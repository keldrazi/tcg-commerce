import { Module } from '@nestjs/common';
import { ImportSortRocaService } from "./import.sort.roca.service";
import { UtilCSVModule } from 'src/tcgcommerce/modules/util/csv/util.csv.module';



@Module({
  imports: [
    UtilCSVModule,
  ], 
  providers: [ImportSortRocaService],
  exports: [ImportSortRocaService],
})
export class ImportSortRocaModule {}