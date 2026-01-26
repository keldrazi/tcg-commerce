import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { ApplicationModuleService } from './application.module.service';
import { ApplicationModuleController } from './application.module.controller';
import { ApplicationModule } from 'src/typeorm/entities/tcgcommerce/modules/application/module/application.module.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([ApplicationModule])
    ],
    controllers: [ApplicationModuleController],
    providers: [ApplicationModuleService],
    exports: [ApplicationModuleService]
})
export class ApplicationModuleModule {}
