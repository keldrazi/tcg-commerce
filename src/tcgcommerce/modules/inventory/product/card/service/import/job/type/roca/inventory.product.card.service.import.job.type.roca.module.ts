import { Module } from '@nestjs/common';
import { InventoryProductCardServiceImportJobTypeRocaService } from "./inventory.product.card.service.import.job.type.roca.service";
import { UtilCSVModule } from 'src/system/modules/util/csv/util.csv.module';
import { InventoryProductCardServiceImportJobTypeUtilModule } from 'src/tcgcommerce/modules/inventory/product/card/service/import/job/type/util/inventory.product.card.service.import.job.type.util.module';



@Module({
  imports: [
    UtilCSVModule,
    InventoryProductCardServiceImportJobTypeUtilModule
  ], 
  providers: [InventoryProductCardServiceImportJobTypeRocaService],
  exports: [InventoryProductCardServiceImportJobTypeRocaService],
})
export class InventoryProductCardServiceImportJobTypeRocaModule {}