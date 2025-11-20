import { Module } from '@nestjs/common';
import { BuylistImportProductCardProviderService } from "./buylist.import.product.card.provider.service";
import { UtilCSVModule } from 'src/system/modules/util/csv/util.csv.module';
import { BuylistImportProductCardProviderUtilModule } from 'src/tcgcommerce/modules/buylist/import/product/card/provider/util/buylist.import.product.card.provider.util.module';
import { BuylistImportProductCardProviderTypeModule } from 'src/tcgcommerce/modules/buylist/import/product/card/provider/type/buylist.import.product.card.provider.type.module';
import { ErrorMessageModule } from 'src/system/modules/error/message/error.message.module';

@Module({
  imports: [
    UtilCSVModule,
    BuylistImportProductCardProviderUtilModule,
    BuylistImportProductCardProviderTypeModule,
    ErrorMessageModule
  ], 
  providers: [BuylistImportProductCardProviderService],
  exports: [BuylistImportProductCardProviderService],
})
export class BuylistImportProductCardProviderModule {}