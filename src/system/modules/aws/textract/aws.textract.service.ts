import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TextractClient, AnalyzeDocumentCommand, FeatureType } from '@aws-sdk/client-textract';
 
@Injectable()
export class AwsTextractService {
  private client: TextractClient;
  private bucketName = this.configService.get('S3_BUCKET_NAME');
 
  constructor(
    private readonly configService: ConfigService,
  ){
    const s3_region = this.configService.get('S3_REGION');
    const accessKeyId = this.configService.get('S3_ACCESS_KEY') || '';
    const secretAccessKey = this.configService.get('S3_SECRET_KEY') || '';

    this.client = new TextractClient({
      region: s3_region,
      credentials: {
        accessKeyId: accessKeyId,
        secretAccessKey: secretAccessKey,
      },
    });
 
  }

  async analyzeDocument(document: Buffer) {
    
    const input = {
      Document: {
        Bytes: document,
      },
      FeatureTypes: [FeatureType.TABLES],
    };

    const command = new AnalyzeDocumentCommand(input);
    const response = await this.client.send(command);

    return response;

  }

  

}