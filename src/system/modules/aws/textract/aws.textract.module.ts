import { Module } from '@nestjs/common';
import { AwsTextractService } from './aws.textract.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule,
  ],
  providers: [AwsTextractService],
  exports: [AwsTextractService],
})
export class AwsTextractModule {}
