import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { PriceProductCardServiceUpdateService } from './price.product.card.service.update.service';
import { PriceProductCardServiceUpdateController } from './price.product.card.service.update.controller';
import { PriceProductCardServiceUpdate } from 'src/typeorm/entities/tcgcommerce/modules/price/product/card/service/update/price.product.card.service.update.entity';
import { ProductLineModule } from 'src/tcgcommerce/modules/product/line/product.line.module';
//MTG Module;
import { PriceProductCardServiceLineMTGModule } from 'src/tcgcommerce/modules/price/product/card/service/update/line/mtg/price.product.card.service.update.line.mtg.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([PriceProductCardServiceUpdate]),
        ProductLineModule,
        //MTG Module;
        PriceProductCardServiceLineMTGModule,
    ],
    controllers: [PriceProductCardServiceUpdateController],
    providers: [PriceProductCardServiceUpdateService],
    exports: [PriceProductCardServiceUpdateService]
})
export class PriceProductCardServiceUpdateModule {}
