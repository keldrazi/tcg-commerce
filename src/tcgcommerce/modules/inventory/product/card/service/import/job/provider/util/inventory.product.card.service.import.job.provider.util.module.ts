import { Module } from '@nestjs/common';
import { InventoryProductCardServiceImportJobProviderUtilService } from './inventory.product.card.service.import.job.provider.util.service';


@Module({
  imports: [
    
  ], 
  providers: [InventoryProductCardServiceImportJobProviderUtilService],
  exports: [InventoryProductCardServiceImportJobProviderUtilService],
})
export class InventoryProductCardServiceImportJobProviderUtilModule {}