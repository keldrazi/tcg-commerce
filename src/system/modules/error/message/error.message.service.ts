import { Injectable, Inject } from '@nestjs/common';
import { ErrorMessageDTO } from './dto/error.message.dto';

@Injectable()
export class ErrorMessageService {
    async createErrorMessage(errorMessageCode, errorMessageText) {
        const errorMessageDTO: ErrorMessageDTO = {
            errorMessageCode: errorMessageCode,
            errorMessageText: errorMessageText,
            errorMessageDate: new Date(),
        };
    
        return errorMessageDTO;
    }
}