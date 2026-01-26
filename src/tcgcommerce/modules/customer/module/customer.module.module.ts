import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { CustomerModuleService } from './customer.module.service';
import { CustomerModuleController } from './customer.module.controller';
import { CustomerModule } from 'src/typeorm/entities/tcgcommerce/modules/customer/module/customer.module.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([CustomerModule])
    ],
    controllers: [CustomerModuleController],
    providers: [CustomerModuleService],
    exports: [CustomerModuleService]
})
export class CustomerModuleModule {}
