import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { InventoryProductCardServiceImportJobItemService } from './inventory.product.card.service.import.job.item.service';
import { InventoryProductCardServiceImportJobItem } from 'src/typeorm/entities/tcgcommerce/modules/inventory/product/card/service/import/job/item/inventory.product.card.service.import.job.item.entity';
import { InventoryProductCardModule } from 'src/tcgcommerce/modules/inventory/product/card/inventory.product.card.module';
import { ProductCardModule } from 'src/tcgcommerce/modules/product/card/product.card.module';
import { ProductSetModule } from 'src/tcgcommerce/modules/product/set/product.set.module';
import { ProductCardConditionModule } from 'src/tcgcommerce/modules/product/card/condition/product.card.condition.module';
import { ProductLanguageModule } from 'src/tcgcommerce/modules/product/language/product.language.module';
import { ProductCardPrintingModule } from 'src/tcgcommerce/modules/product/card/printing/product.card.printing.module';
import { CommerceLocationModule } from 'src/tcgcommerce/modules/commerce/location/commerce.location.module';
import { InventoryProductCardServiceImportJobProviderModule } from '../provider/inventory.product.card.service.import.job.provider.module';
import { ErrorMessageModule } from 'src/system/modules/error/message/error.message.module';


@Module({
    imports: [
        TypeOrmModule.forFeature([InventoryProductCardServiceImportJobItem]),
        ProductCardModule,
        ProductSetModule,
        ProductCardConditionModule,
        ProductLanguageModule,
        ProductCardPrintingModule,
        CommerceLocationModule,
        InventoryProductCardModule,
        InventoryProductCardServiceImportJobProviderModule,
        ErrorMessageModule,
    ],
    controllers: [],
    providers: [InventoryProductCardServiceImportJobItemService],
    exports: [InventoryProductCardServiceImportJobItemService]
})
export class InventoryProductCardServiceImportJobItemModule {


}
