import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { PricingModuleService } from './pricing.module.service';
import { PricingModuleController } from './pricing.module.controller';
import { PricingModule } from 'src/typeorm/entities/tcgcommerce/modules/pricing/module/pricing.module.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([PricingModule])
    ],
    controllers: [PricingModuleController],
    providers: [PricingModuleService],
    exports: [PricingModuleService]
})
export class PricingModuleModule {}
