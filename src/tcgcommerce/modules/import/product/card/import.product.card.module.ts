import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { ImportProductCardController } from './import.product.card.controller';
import { ImportProductCardService } from './import.product.card.service';
import { ImportProductCard } from 'src/typeorm/entities/tcgcommerce/modules/import/product/card/import.product.card.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([ImportProductCard])
    ],
    controllers: [ImportProductCardController],
    providers: [ImportProductCardService],
    exports: [ImportProductCardService]
})
export class ImportProductCardModule {}
