import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { PricingProductCardServiceUpdateService } from './pricing.product.card.service.update.service';
import { PricingProductCardServiceUpdateController } from './pricing.product.card.service.update.controller';
import { PricingProductCardServiceUpdate } from 'src/typeorm/entities/tcgcommerce/modules/pricing/product/card/service/update/pricing.product.card.service.update.entity';
import { ProductCardModule } from 'src/tcgcommerce/modules/product/card/product.card.module';
import { InventoryProductCardModule } from 'src/tcgcommerce/modules/inventory/product/card/inventory.product.card.module';
import { TCGdbMTGPriceChangeDailyModule } from 'src/tcgdb/modules/tcgdb/mtg/price/change/daily/tcgdb.mtg.price.change.daily.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([PricingProductCardServiceUpdate]),
        TCGdbMTGPriceChangeDailyModule,
        ProductCardModule,
        InventoryProductCardModule
    ],
    controllers: [PricingProductCardServiceUpdateController],
    providers: [PricingProductCardServiceUpdateService],
    exports: [PricingProductCardServiceUpdateService]
})
export class PricingProductCardServiceUpdateModule {}
