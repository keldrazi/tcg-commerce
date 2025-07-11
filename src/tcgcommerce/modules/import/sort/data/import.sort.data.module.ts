import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { ImportCardService } from './import.sort.data.service';
import { ImportCard } from 'src/typeorm/entities/tcgcommerce/modules/import/card/import.card.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([ImportCard])
    ],
    controllers: [],
    providers: [ImportCardService],
    exports: [ImportCardService]
})
export class ImportCardModule {}
