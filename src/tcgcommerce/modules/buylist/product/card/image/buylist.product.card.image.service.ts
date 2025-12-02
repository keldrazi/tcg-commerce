import { Injectable } from '@nestjs/common';
import { BuylistProductCardImageDTO } from './dto/buylist.product.card.image.dto';
import { ProductCardService } from 'src/tcgcommerce/modules/product/card/product.card.service';
import { ErrorMessageService } from 'src/system/modules/error/message/error.message.service';
import { ErrorMessageDTO } from 'src/system/modules/error/message/dto/error.message.dto';

@Injectable()
export class BuylistProductCardImageService {

    constructor(
        private productCardService: ProductCardService,
        private errorMessageService: ErrorMessageService,
    ) { }

    
 
}