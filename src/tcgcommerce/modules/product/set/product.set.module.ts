import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductSetService } from './product.set.service';
import { ProductSetController } from './product.set.controller';
import { ProductSet } from 'src/typeorm/entities/tcgcommerce/modules/product/set/product.set.entity';
import { ProductVendorModule } from 'src/tcgcommerce/modules/product/vendor/product.vendor.module';
import { ProductLineModule } from 'src/tcgcommerce/modules/product/line/product.line.module';
import { TCGdbMTGSetModule } from 'src/tcgdb/modules/tcgdb/api/mtg/set/tcgdb.mtg.set.module';


@Module({
    imports: [
        TypeOrmModule.forFeature([ProductSet]),
        TCGdbMTGSetModule,
        ProductVendorModule,
        ProductLineModule,
    ],
    controllers: [ProductSetController],
    providers: [ProductSetService],
    exports: [ProductSetService]
})
export class ProductSetModule {}
