import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductSetService } from './product.set.service';
import { ProductSetController } from './product.set.controller';
import { ProductSet } from 'src/typeorm/entities/tcgcommerce/modules/product/set/product.set.entity';
import { TCGdbMTGSetModule } from 'src/tcgdb/modules/tcgdb/api/mtg/set/tcgdb.mtg.set.module';


@Module({
    imports: [
        TypeOrmModule.forFeature([ProductSet]),
        TCGdbMTGSetModule
    ],
    controllers: [ProductSetController],
    providers: [ProductSetService],
    exports: [ProductSetService]
})
export class ProductSetModule {}
