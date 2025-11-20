import { Module } from '@nestjs/common';
import { BuylistImportProductCardProviderUtilService } from './buylist.import.product.card.provider.util.service';


@Module({
  imports: [
    
  ], 
  providers: [BuylistImportProductCardProviderUtilService],
  exports: [BuylistImportProductCardProviderUtilService],
})
export class BuylistImportProductCardProviderUtilModule {}