import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { EmailModuleService } from './email.module.service';
import { EmailModuleController } from './email.module.controller';
import { EmailModule } from 'src/typeorm/entities/system/modules/email/module/email.module.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([EmailModule])
    ],
    controllers: [EmailModuleController],
    providers: [EmailModuleService],
    exports: [EmailModuleService]
})
export class EmailModuleModule {}
