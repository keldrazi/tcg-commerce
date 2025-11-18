import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { CommerceModuleService } from './commerce.module.service';
import { CommerceModuleController } from './commerce.module.controller';
import { CommerceModule } from 'src/typeorm/entities/tcgcommerce/modules/commerce/module/commerce.module.entity';
import { ErrorMessageModule } from 'src/system/modules/error/message/error.message.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([CommerceModule]),
        ErrorMessageModule
    ],
    controllers: [CommerceModuleController],
    providers: [CommerceModuleService],
    exports: [CommerceModuleService]
})
export class CommerceModuleModule {}
