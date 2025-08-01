import { Module } from '@nestjs/common';
import { ImportServiceCardPhyzbatchService } from './import.service.card.phyzbatch.service';
import { UtilCSVModule } from 'src/system/modules/util/csv/util.csv.module';
import { ImportServiceCardUtilModule } from 'src/tcgcommerce/modules/import/service/card/util/import.service.card.util.module';

@Module({
  imports: [
    UtilCSVModule,
    ImportServiceCardUtilModule
  ], 
  providers: [ImportServiceCardPhyzbatchService],
  exports: [ImportServiceCardPhyzbatchService],
})
export class ImportServiceCardPhyzbatchModule {}