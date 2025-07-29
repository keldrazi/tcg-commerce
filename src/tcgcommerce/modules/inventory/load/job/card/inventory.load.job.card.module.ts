import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { InventoryLoadJobCardController } from './inventory.load.job.card.controller';
import { InventoryLoadJobCardService } from './inventory.load.job.card.service';
import { InventoryLoadJobCard } from 'src/typeorm/entities/tcgcommerce/modules/inventory/load/job/card/inventory.load.job.card.entity';


@Module({
    imports: [
        TypeOrmModule.forFeature([InventoryLoadJobCard]),
    ],
    controllers: [InventoryLoadJobCardController],
    providers: [InventoryLoadJobCardService],
    exports: [InventoryLoadJobCardService]
})
export class InventoryLoadJobCardModule {}
