import { Module } from '@nestjs/common';
import { ImportSortPhyzbatchService } from "./import.sort.phyzbatch.service";
import { UtilCSVModule } from 'src/tcgcommerce/modules/util/csv/util.csv.module';



@Module({
  imports: [
    UtilCSVModule,
  ], 
  providers: [ImportSortPhyzbatchService],
  exports: [ImportSortPhyzbatchService],
})
export class ImportSortPhyzbatchModule {}