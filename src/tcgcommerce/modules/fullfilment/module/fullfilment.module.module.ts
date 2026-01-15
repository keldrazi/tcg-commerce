import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { FullfilmentModuleService } from './fullfilment.module.service';
import { FullfilmentModuleController } from './fullfilment.module.controller';
import { FullfilmentModule } from 'src/typeorm/entities/tcgcommerce/modules/fullfilment/module/fullfilment.module.entity';
import { ErrorMessageModule } from 'src/system/modules/error/message/error.message.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([FullfilmentModule]),
        ErrorMessageModule
    ],
    controllers: [FullfilmentModuleController],
    providers: [FullfilmentModuleService],
    exports: [FullfilmentModuleService]
})
export class FullfilmentModuleModule {}
