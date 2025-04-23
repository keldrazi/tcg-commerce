import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductCardRarityService } from './product.card.rarity.service';
import { ProductCardRarityController } from './product.card.rarity.controller';
import { ProductCardRarity } from 'src/typeorm/entities/tcgcommerce/modules/product/card/rarity/product.card.rarity.entity';


@Module({
    imports: [
        TypeOrmModule.forFeature([ProductCardRarity])
    ],
    controllers: [ProductCardRarityController],
    providers: [ProductCardRarityService],
    exports: [ProductCardRarityService]
})
export class ProductCardRarityModule {}
