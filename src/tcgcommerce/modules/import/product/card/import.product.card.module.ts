import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { ImportCardController } from './import.product.card.controller';
import { ImportCardService } from './import.product.card.service';
import { ImportCard } from 'src/typeorm/entities/tcgcommerce/modules/import/product/card/import.product.card.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([ImportCard])
    ],
    controllers: [ImportCardController],
    providers: [ImportCardService],
    exports: [ImportCardService]
})
export class ImportCardModule {}
