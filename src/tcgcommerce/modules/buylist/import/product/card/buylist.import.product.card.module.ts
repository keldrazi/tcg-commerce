import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { BuylistImportProductCardController } from './buylist.import.product.card.controller';
import { BuylistImportProductCardService } from './buylist.import.product.card.service';
import { BuylistImportProductCard } from 'src/typeorm/entities/tcgcommerce/modules/buylist/import/product/card/buylist.import.product.card.entity';
import { BuylistImportProductCardItemModule } from 'src/tcgcommerce/modules/buylist/import/product/card/item/buylist.import.product.card.item.module';
import { AwsS3Module } from 'src/system/modules/aws/s3/aws.s3.module';
import { BuylistImportProductCardProviderTypeModule } from 'src/tcgcommerce/modules/buylist/import/product/card/provider/type/buylist.import.product.card.provider.type.module';
import { ErrorMessageModule } from 'src/system/modules/error/message/error.message.module';
import { BuylistProductCardModule } from 'src/tcgcommerce/modules/buylist/product/card/buylist.product.card.module';
import { ProductLineModule } from 'src/tcgcommerce/modules/product/line/product.line.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([BuylistImportProductCard]),
        BuylistImportProductCardItemModule,
        AwsS3Module,
        BuylistImportProductCardProviderTypeModule,
        ErrorMessageModule,
        BuylistProductCardModule,
        ProductLineModule
    ],
    controllers: [BuylistImportProductCardController],
    providers: [BuylistImportProductCardService],
    exports: [BuylistImportProductCardService]
})
export class BuylistImportProductCardModule {}
