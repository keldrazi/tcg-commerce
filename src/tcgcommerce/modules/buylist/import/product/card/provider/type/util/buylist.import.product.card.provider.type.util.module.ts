import { Module } from '@nestjs/common';
import { BuylistImportProductCardProviderTypeUtilService } from './buylist.import.product.card.provider.type.util.service';


@Module({
  imports: [
    
  ], 
  providers: [BuylistImportProductCardProviderTypeUtilService],
  exports: [BuylistImportProductCardProviderTypeUtilService],
})
export class BuylistImportProductCardProviderTypeUtilModule {}