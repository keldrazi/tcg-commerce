import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { InventoryProductCardServiceImportJobController } from './inventory.product.card.service.import.job.controller';
import { InventoryProductCardServiceImportJobService } from './inventory.product.card.service.import.job.service';
import { InventoryProductCardServiceImportJob } from 'src/typeorm/entities/tcgcommerce/modules/inventory/product/card/service/import/job/inventory.product.card.service.import.job.entity';
import { InventoryProductCardServiceImportJobItemModule } from 'src/tcgcommerce/modules/inventory/product/card/service/import/job/item/inventory.product.card.service.import.job.item.module';
import { AwsS3Module } from 'src/system/modules/aws/s3/aws.s3.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([InventoryProductCardServiceImportJob]),
        InventoryProductCardServiceImportJobItemModule,
        AwsS3Module,
    ],
    controllers: [InventoryProductCardServiceImportJobController],
    providers: [InventoryProductCardServiceImportJobService],
    exports: [InventoryProductCardServiceImportJobService]
})
export class InventoryProductCardServiceImportJobModule {}
