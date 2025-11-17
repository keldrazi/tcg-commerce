import { Module } from '@nestjs/common';
import { ErrorMessageService } from './error.message.service';

@Module({
  imports: [
  ],
  providers: [ErrorMessageService],
})
export class ErrorMessageModule {}