import { Module } from '@nestjs/common';
import { ImportServicePhyzbatchService } from './import.service.card.phyzbatch.service';
import { UtilCSVModule } from 'src/system/modules/util/csv/util.csv.module';
import { ImportServiceUtilModule } from 'src/tcgcommerce/modules/import/service/card/util/import.service.card.util.module';

@Module({
  imports: [
    UtilCSVModule,
    ImportServiceUtilModule
  ], 
  providers: [ImportServicePhyzbatchService],
  exports: [ImportServicePhyzbatchService],
})
export class ImportServicePhyzbatchModule {}