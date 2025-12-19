import { Injectable, Inject } from '@nestjs/common';
import { ErrorMessageDTO } from './dto/error.message.dto';
import { plainToInstance } from 'class-transformer';
import { error } from 'console';

@Injectable()
export class ErrorMessageService {
    async createErrorMessage(errorMessageCode, errorMessageText) {
        let errorMessageDTO: ErrorMessageDTO = {
            errorMessageCode: errorMessageCode,
            errorMessageText: errorMessageText,
            errorMessageDate: new Date(),
        };
        errorMessageDTO = plainToInstance(ErrorMessageDTO, errorMessageDTO);
        return errorMessageDTO;
    }
}