import { Module } from '@nestjs/common';
import { EmailServiceSendService } from './email.service.send.service';

@Module({
  providers: [EmailServiceSendService],
})
export class EmailServiceSendModule {}
