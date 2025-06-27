import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3Client, PutObjectCommand, DeleteObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { v4 as uuidv4 } from 'uuid';
 
@Injectable()
export class AwsS3Service {
  private client: S3Client;
  private bucketName = this.configService.get('S3_BUCKET_NAME');
 
  constructor(
    private readonly configService: ConfigService,
  ){
    const s3_region = this.configService.get('S3_REGION');
    const accessKeyId = this.configService.get('S3_ACCESS_KEY') || '';
    const secretAccessKey = this.configService.get('S3_SECRET_KEY') || '';

    this.client = new S3Client({
      region: s3_region,
      credentials: {
        accessKeyId: accessKeyId,
        secretAccessKey: secretAccessKey,
      },
      forcePathStyle: true,
    });
 
  }

  async uploadImage(imageBuffer: Buffer, bucketPath: String, imageExtension: string){
    const key = bucketPath + uuidv4() + imageExtension;
    
    const command = new PutObjectCommand({
      Bucket: this.bucketName,
      Key: key,
      Body: imageBuffer,
      ACL: 'public-read',
    });
    
    const result = await this.client.send(command);
    const imageURL = 'https://' + this.bucketName + '.s3.us-east-2.amazonaws.com/' + key;
    
    return imageURL;
    

  }

  async uploadPDF(imageBuffer: Buffer, bucketPath: String, fileName: string){
    const key = bucketPath + fileName + '.pdf';
    
    const command = new PutObjectCommand({
      Bucket: this.bucketName,
      Key: key,
      Body: imageBuffer,
      ACL: 'public-read',
    });
    
    const result = await this.client.send(command);
    const pdfURL = 'https://' + this.bucketName + '.s3.us-east-2.amazonaws.com/' + key;
    
    return pdfURL;
    

  }

  async uploadCSV(imageBuffer: Buffer, bucketPath: String, fileName: string){
    const key = bucketPath + fileName + '.csv';
    
    const command = new PutObjectCommand({
      Bucket: this.bucketName,
      Key: key,
      Body: imageBuffer,
      ACL: 'public-read',
    });
    
    const result = await this.client.send(command);
    const csvURL = 'https://' + this.bucketName + '.s3.us-east-2.amazonaws.com/' + key;
    
    return csvURL;
    

  }

}