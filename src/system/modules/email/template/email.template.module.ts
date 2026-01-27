import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { EmailTemplateService } from './email.template.service';
import { EmailTemplateController } from './email.template.controller';
import { EmailTemplate } from 'src/typeorm/entities/system/modules/email/template/email.template.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([EmailTemplate])
    ],
    controllers: [EmailTemplateController],
    providers: [EmailTemplateService],
    exports: [EmailTemplateService]
})
export class EmailTemplateModule {}
