import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { ImportSortTypeService } from './import.sort.card.type.service';
import { ImportSortTypeController } from './import.sort.card.type.controller';
import { ImportSortType } from 'src/typeorm/entities/tcgcommerce/modules/import/sort/type/import.sort.type.entity';


@Module({
    imports: [
        TypeOrmModule.forFeature([ImportSortType])
    ],
    controllers: [ImportSortTypeController],
    providers: [ImportSortTypeService],
    exports: [ImportSortTypeService]
})
export class ImportSortTypeModule {}
