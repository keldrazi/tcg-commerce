import { Module } from '@nestjs/common';
import { AwsUtilTextractService } from './aws.util.textract.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule,
  ],
  providers: [AwsUtilTextractService],
  exports: [AwsUtilTextractService],
})
export class AwsUtilTextractModule {}
