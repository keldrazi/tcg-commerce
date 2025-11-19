import { Module } from '@nestjs/common';
import { ErrorMessageService } from './error.message.service';

@Module({
  imports: [
  ],
  providers: [ErrorMessageService],
      exports: [ErrorMessageService]
})
export class ErrorMessageModule {}