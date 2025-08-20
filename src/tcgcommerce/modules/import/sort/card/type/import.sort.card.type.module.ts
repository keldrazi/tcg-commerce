import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { ImportSortCardTypeService } from './import.sort.card.type.service';
import { ImportSortCardTypeController } from './import.sort.card.type.controller';
import { ImportSortCardType } from 'src/typeorm/entities/tcgcommerce/modules/import/sort/card/type/import.sort.card.type.entity';


@Module({
    imports: [
        TypeOrmModule.forFeature([ImportSortCardType])
    ],
    controllers: [ImportSortCardTypeController],
    providers: [ImportSortCardTypeService],
    exports: [ImportSortCardTypeService]
})
export class ImportSortCardTypeModule {}