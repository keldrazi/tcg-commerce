import { Module } from '@nestjs/common';
import { BuylistImportProductCardProviderService } from "./buylist.import.product.card.provider.service";
import { UtilCSVModule } from 'src/system/modules/util/csv/util.csv.module';
import { BuylistImportProductCardProviderTypeModule } from 'src/tcgcommerce/modules/buylist/import/product/card/provider/type/buylist.import.product.card.provider.type.module';
import { BuylistImportProductCardProviderTypeUtilModule } from 'src/tcgcommerce/modules/buylist/import/product/card/provider/type/util/buylist.import.product.card.provider.type.util.module';

@Module({
  imports: [
    UtilCSVModule,
    BuylistImportProductCardProviderTypeModule,
    BuylistImportProductCardProviderTypeUtilModule,
  ], 
  providers: [BuylistImportProductCardProviderService],
  exports: [BuylistImportProductCardProviderService],
})
export class BuylistImportProductCardProviderModule {}