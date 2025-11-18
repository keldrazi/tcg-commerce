import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductCardConditionService } from './product.card.condition.service';
import { ProductCardConditionController } from './product.card.condition.controller';
import { ProductCardCondition } from 'src/typeorm/entities/tcgcommerce/modules/product/card/condition/product.card.condition.entity';
import { TCGdbMTGConditionModule } from 'src/tcgdb/modules/tcgdb/api/mtg/condition/tcgdb.mtg.condition.module';
import { ProductLineModule } from 'src/tcgcommerce/modules/product/line/product.line.module';
import { ErrorMessageModule } from 'src/system/modules/error/message/error.message.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([ProductCardCondition]),
        TCGdbMTGConditionModule,
        ProductLineModule,
        ErrorMessageModule
    ],
    controllers: [ProductCardConditionController],
    providers: [ProductCardConditionService],
    exports: [ProductCardConditionService]
})
export class ProductCardConditionModule {}
