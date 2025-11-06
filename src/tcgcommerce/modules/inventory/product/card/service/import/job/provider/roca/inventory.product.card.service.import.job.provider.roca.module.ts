import { Module } from '@nestjs/common';
import { InventoryProductCardServiceImportJobProviderRocaService } from "./inventory.product.card.service.import.job.provider.roca.service";
import { UtilCSVModule } from 'src/system/modules/util/csv/util.csv.module';
import { InventoryProductCardServiceImportJobProviderUtilModule } from 'src/tcgcommerce/modules/inventory/product/card/service/import/job/provider/util/inventory.product.card.service.import.job.provider.util.module';



@Module({
  imports: [
    UtilCSVModule,
    InventoryProductCardServiceImportJobProviderUtilModule
  ], 
  providers: [InventoryProductCardServiceImportJobProviderRocaService],
  exports: [InventoryProductCardServiceImportJobProviderRocaService],
})
export class InventoryProductCardServiceImportJobProviderRocaModule {}