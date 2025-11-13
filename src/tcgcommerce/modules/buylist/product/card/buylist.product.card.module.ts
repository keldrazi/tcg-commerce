import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { BuylistTypeService } from './buylist.type.service';
import { BuylistTypeController } from './buylist.type.controller';
import { BuylistType } from 'src/typeorm/entities/tcgcommerce/modules/buylist/type/buylist.type.entity';


@Module({
    imports: [
        TypeOrmModule.forFeature([BuylistType])
    ],
    controllers: [BuylistTypeController],
    providers: [BuylistTypeService],
    exports: [BuylistTypeService]
})
export class BuylistTypeModule {}
