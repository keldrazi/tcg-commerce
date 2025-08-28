import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { PriceProductCardServiceUpdateService } from './price.product.card.service.update.service';
import { PriceProductCardServiceUpdateController } from './price.product.card.service.update.controller';
import { PriceProductCardServiceUpdate } from 'src/typeorm/entities/tcgcommerce/modules/price/product/card/service/update/price.product.card.service.update.entity';
import { ProductCardModule } from 'src/tcgcommerce/modules/product/card/product.card.module';
import { InventoryProductCardModule } from 'src/tcgcommerce/modules/inventory/product/card/inventory.product.card.module';
import { TCGdbMTGPriceChangeDailyModule } from 'src/tcgdb/modules/tcgdb/mtg/price/change/daily/tcgdb.mtg.price.change.daily.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([PriceProductCardServiceUpdate]),
        TCGdbMTGPriceChangeDailyModule,
        ProductCardModule,
        InventoryProductCardModule
    ],
    controllers: [PriceProductCardServiceUpdateController],
    providers: [PriceProductCardServiceUpdateService],
    exports: [PriceProductCardServiceUpdateService]
})
export class PriceProductCardServiceUpdateModule {}
