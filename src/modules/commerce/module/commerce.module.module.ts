import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { CommerceModuleService } from './commerce.module.service';
import { CommerceModuleController } from './commerce.module.controller';
import { CommerceModule } from 'src/typeorm/entities/modules/commerce/module/commerce.module.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([CommerceModule])
    ],
    controllers: [CommerceModuleController],
    providers: [CommerceModuleService],
    exports: [CommerceModuleService]
})
export class CommerceModuleModule {}
