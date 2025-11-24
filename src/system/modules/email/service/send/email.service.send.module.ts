import { Module } from '@nestjs/common';
import { EmailServiceSendService } from './email.service.send.service';
import { EmailTemplateModule } from 'src/system/modules/email/template/email.template.module';
import { ErrorMessageModule } from 'src/system/modules/error/message/error.message.module';

@Module({
  imports: [
    EmailTemplateModule, 
    ErrorMessageModule
  ],
  exports: [EmailServiceSendService],
  providers: [EmailServiceSendService],
})
export class EmailServiceSendModule {}
