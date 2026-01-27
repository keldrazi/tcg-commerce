import { Module } from '@nestjs/common';
import { EmailServiceSendService } from './email.service.send.service';
import { EmailTemplateModule } from 'src/system/modules/email/template/email.template.module';

@Module({
  imports: [
    EmailTemplateModule
  ],
  exports: [EmailServiceSendService],
  providers: [EmailServiceSendService],
})
export class EmailServiceSendModule {}
