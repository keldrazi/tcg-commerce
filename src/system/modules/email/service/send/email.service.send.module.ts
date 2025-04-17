import { Module } from '@nestjs/common';
import { EmailServiceSend } from './email.service.send.service';

@Module({
  providers: [EmailServiceSend],
})
export class EmailServiceSendModule {}
