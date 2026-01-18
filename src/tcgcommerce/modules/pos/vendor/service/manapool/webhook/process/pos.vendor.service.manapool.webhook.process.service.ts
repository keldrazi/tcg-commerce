import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ErrorMessageService } from 'src/system/modules/error/message/error.message.service';
import { ErrorMessageDTO } from 'src/system/modules/error/message/dto/error.message.dto';

@Injectable()
export class POSVendorServiceManaPoolWebhookProcessService {

    constructor(
        private configService: ConfigService,
        private errorMessageService: ErrorMessageService,
    ) { }

    
        
}