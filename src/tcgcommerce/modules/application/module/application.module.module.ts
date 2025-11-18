import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { ApplicationModuleService } from './application.module.service';
import { ApplicationModuleController } from './application.module.controller';
import { ApplicationModule } from 'src/typeorm/entities/tcgcommerce/modules/application/module/application.module.entity';
import { ErrorMessageModule } from 'src/system/modules/error/message/error.message.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([ApplicationModule]),
        ErrorMessageModule
    ],
    controllers: [ApplicationModuleController],
    providers: [ApplicationModuleService],
    exports: [ApplicationModuleService]
})
export class ApplicationModuleModule {}
