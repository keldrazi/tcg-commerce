import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { InventoryProductCardServiceImportJobProviderTypeService } from './inventory.product.card.service.import.job.provider.type.service';
import { InventoryProductCardServiceImportJobProviderTypeController } from './inventory.product.card.service.import.job.provider.type.controller';
import { InventoryProductCardServiceImportJobProviderType } from 'src/typeorm/entities/tcgcommerce/modules/inventory/product/card/service/import/job/provider/type/inventory.product.card.service.import.job.provider.type.entity';
import { ErrorMessageModule } from 'src/system/modules/error/message/error.message.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([InventoryProductCardServiceImportJobProviderType]),
        ErrorMessageModule
    ],
    controllers: [InventoryProductCardServiceImportJobProviderTypeController],
    providers: [InventoryProductCardServiceImportJobProviderTypeService],
    exports: [InventoryProductCardServiceImportJobProviderTypeService]
})
export class InventoryProductCardServiceImportJobProviderTypeModule {}