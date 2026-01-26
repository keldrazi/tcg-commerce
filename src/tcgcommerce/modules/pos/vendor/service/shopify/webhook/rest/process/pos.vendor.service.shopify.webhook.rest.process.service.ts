import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InventoryProductCardDTO } from 'src/tcgcommerce/modules/inventory/product/card/dto/inventory.product.card.dto';

@Injectable()
export class POSVendorServiceShopifyWebhookRestProcessService {

    constructor(
        private configService: ConfigService,
    ) { }

    
        
}