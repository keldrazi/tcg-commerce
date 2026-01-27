import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { BuylistImportProductCardProviderTypeService } from './buylist.import.product.card.provider.type.service';
import { BuylistImportProductCardProviderTypeController } from './buylist.import.product.card.provider.type.controller';
import { BuylistImportProductCardProviderType } from 'src/typeorm/entities/tcgcommerce/modules/buylist/import/product/card/provider/type/buylist.import.product.card.provider.type.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([BuylistImportProductCardProviderType]),
    ],
    controllers: [BuylistImportProductCardProviderTypeController],
    providers: [BuylistImportProductCardProviderTypeService],
    exports: [BuylistImportProductCardProviderTypeService]
})
export class BuylistImportProductCardProviderTypeModule {}