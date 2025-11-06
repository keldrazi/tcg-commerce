import { Module } from '@nestjs/common';
import { InventoryProductCardServiceImportJobTypeUtilService } from './inventory.product.card.service.import.job.type.util.service';


@Module({
  imports: [
    
  ], 
  providers: [InventoryProductCardServiceImportJobTypeUtilService],
  exports: [InventoryProductCardServiceImportJobTypeUtilService],
})
export class InventoryProductCardServiceImportJobTypeUtilModule {}