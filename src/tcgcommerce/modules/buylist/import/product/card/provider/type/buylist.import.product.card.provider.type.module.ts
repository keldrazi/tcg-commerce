import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { BuylistImportProductCardProviderTypeService } from './buylist.import.product.card.provider.type.service';
import { BuylistImportProductCardProviderTypeController } from './buylist.import.product.card.provider.type.controller';
import { BuylistImportProductCardProviderType } from 'src/typeorm/entities/tcgcommerce/modules/buylist/import/product/card/provider/type/buylist.import.product.card.provider.type.entity';
import { ErrorMessageModule } from 'src/system/modules/error/message/error.message.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([BuylistImportProductCardProviderType]),
        ErrorMessageModule,
    ],
    controllers: [BuylistImportProductCardProviderTypeController],
    providers: [BuylistImportProductCardProviderTypeService],
    exports: [BuylistImportProductCardProviderTypeService]
})
export class BuylistImportProductCardProviderTypeModule {}