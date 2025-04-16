import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { ImportCardController } from './import.sort.controller';
import { ImportCardService } from './import.sort.service';
import { ImportCard } from 'src/typeorm/entities/tcgcommerce/modules/import/card/import.card.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([ImportCard])
    ],
    controllers: [ImportCardController],
    providers: [ImportCardService],
    exports: [ImportCardService]
})
export class ImportCardModule {}
