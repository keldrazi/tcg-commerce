import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { EmailTemplateService } from './email.template.service';
import { EmailTemplateController } from './email.template.controller';
import { EmailTemplate } from 'src/typeorm/entities/system/modules/email/template/email.template.entity';
import { ErrorMessageModule } from 'src/system/modules/error/message/error.message.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([EmailTemplate]),
        ErrorMessageModule
    ],
    controllers: [EmailTemplateController],
    providers: [EmailTemplateService],
    exports: [EmailTemplateService]
})
export class EmailTemplateModule {}
