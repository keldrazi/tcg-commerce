import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { BuylistImportProductCardItemService } from './buylist.import.product.card.item.service';
import { BuylistImportProductCardItem } from 'src/typeorm/entities/tcgcommerce/modules/buylist/import/product/card/item/buylist.import.product.card.item.entity';
import { InventoryProductCardModule } from 'src/tcgcommerce/modules/inventory/product/card/inventory.product.card.module';
import { ProductCardModule } from 'src/tcgcommerce/modules/product/card/product.card.module';
import { ProductSetModule } from 'src/tcgcommerce/modules/product/set/product.set.module';
import { ProductCardConditionModule } from 'src/tcgcommerce/modules/product/card/condition/product.card.condition.module';
import { ProductLanguageModule } from 'src/tcgcommerce/modules/product/language/product.language.module';
import { ProductCardPrintingModule } from 'src/tcgcommerce/modules/product/card/printing/product.card.printing.module';
import { CommerceLocationModule } from 'src/tcgcommerce/modules/commerce/location/commerce.location.module';
import { BuylistImportProductCardProviderModule } from '../provider/buylist.import.product.card.provider.module';
import { BuylistProductCardModule } from 'src/tcgcommerce/modules/buylist/product/card/buylist.product.card.module';


@Module({
    imports: [
        TypeOrmModule.forFeature([BuylistImportProductCardItem]),
        ProductCardModule,
        ProductSetModule,
        ProductCardConditionModule,
        ProductLanguageModule,
        ProductCardPrintingModule,
        CommerceLocationModule,
        InventoryProductCardModule,
        BuylistImportProductCardProviderModule,
        BuylistProductCardModule,
    ],
    controllers: [],
    providers: [BuylistImportProductCardItemService],
    exports: [BuylistImportProductCardItemService]
})
export class BuylistImportProductCardItemModule {


}
