import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { PriceProductCardLineUpdateMTGService } from './price.product.card.line.update.mtg.service';
import { PriceProductCardServiceUpdate } from 'src/typeorm/entities/tcgcommerce/modules/price/product/card/service/update/price.product.card.service.update.entity';
import { ProductCardModule } from 'src/tcgcommerce/modules/product/card/product.card.module';
import { InventoryProductCardModule } from 'src/tcgcommerce/modules/inventory/product/card/inventory.product.card.module';
//MTG Modules;
import { TCGdbMTGPriceChangeDailyModule } from 'src/tcgdb/modules/tcgdb/mtg/price/change/daily/tcgdb.mtg.price.change.daily.module';
import { TCGdbMTGSetModule } from 'src/tcgdb/modules/tcgdb/mtg/set/tcgdb.mtg.set.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([PriceProductCardServiceUpdate]),
        ProductCardModule,
        InventoryProductCardModule,
        //MTG Modules;
        TCGdbMTGSetModule,
        TCGdbMTGPriceChangeDailyModule
    ],
    controllers: [],
    providers: [PriceProductCardLineUpdateMTGService],
    exports: [PriceProductCardLineUpdateMTGService]
})
export class PriceProductCardLineUpdateMTGModule {}