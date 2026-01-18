import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ErrorMessageService } from 'src/system/modules/error/message/error.message.service';
import { ErrorMessageDTO } from 'src/system/modules/error/message/dto/error.message.dto';
import { InventoryProductCardDTO } from 'src/tcgcommerce/modules/inventory/product/card/dto/inventory.product.card.dto';

@Injectable()
export class POSVendorServiceShopifyWebhookRestProcessService {

    constructor(
        private configService: ConfigService,
        private errorMessageService: ErrorMessageService,
    ) { }

    
        
}