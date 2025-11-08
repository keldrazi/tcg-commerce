import { Module } from '@nestjs/common';
import { InventoryProductCardServiceImportJobProviderService } from "./inventory.product.card.service.import.job.provider.service";
import { UtilCSVModule } from 'src/system/modules/util/csv/util.csv.module';
import { InventoryProductCardServiceImportJobProviderUtilModule } from 'src/tcgcommerce/modules/inventory/product/card/service/import/job/provider/util/inventory.product.card.service.import.job.provider.util.module';
import { InventoryProductCardServiceImportJobProviderTypeModule } from 'src/tcgcommerce/modules/inventory/product/card/service/import/job/provider/type/inventory.product.card.service.import.job.provider.type.module';


@Module({
  imports: [
    UtilCSVModule,
    InventoryProductCardServiceImportJobProviderUtilModule,
    InventoryProductCardServiceImportJobProviderTypeModule,
  ], 
  providers: [InventoryProductCardServiceImportJobProviderService],
  exports: [InventoryProductCardServiceImportJobProviderService],
})
export class InventoryProductCardServiceImportJobProviderModule {}