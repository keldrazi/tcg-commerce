import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { BuylistProductCardItemService } from './buylist.product.card.item.service';
import { BuylistProductCardItemController } from './buylist.product.card.item.controller';
import { BuylistProductCardItem } from 'src/typeorm/entities/tcgcommerce/modules/buylist/product/card/item/buylist.product.card.item.entity';
import { ErrorMessageModule } from 'src/system/modules/error/message/error.message.module';
import { BuylistImportProductCardItemModule } from 'src/tcgcommerce/modules/buylist/import/product/card/item/buylist.import.product.card.item.module';
import { BuylistImportProductCardModule } from 'src/tcgcommerce/modules/buylist/import/product/card/buylist.import.product.card.module';


@Module({
    imports: [
        TypeOrmModule.forFeature([BuylistProductCardItem]),
        ErrorMessageModule,
        BuylistImportProductCardItemModule,
        BuylistImportProductCardModule,
    ],
    controllers: [BuylistProductCardItemController],
    providers: [BuylistProductCardItemService],
    exports: [BuylistProductCardItemService]
})
export class BuylistProductCardItemModule {}