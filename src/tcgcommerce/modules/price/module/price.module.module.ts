import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { PriceModuleService } from './price.module.service';
import { PriceModuleController } from './price.module.controller';
import { PriceModule } from 'src/typeorm/entities/tcgcommerce/modules/price/module/price.module.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([PriceModule])
    ],
    controllers: [PriceModuleController],
    providers: [PriceModuleService],
    exports: [PriceModuleService]
})
export class PriceModuleModule {}
