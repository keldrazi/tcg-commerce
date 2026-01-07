import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { PriceModuleService } from './price.module.service';
import { PriceModuleController } from './price.module.controller';
import { PriceModule } from 'src/typeorm/entities/tcgcommerce/modules/price/module/price.module.entity';
import { ErrorMessageModule } from 'src/system/modules/error/message/error.message.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([PriceModule]),
        ErrorMessageModule
    ],
    controllers: [PriceModuleController],
    providers: [PriceModuleService],
    exports: [PriceModuleService]
})
export class PriceModuleModule {}
