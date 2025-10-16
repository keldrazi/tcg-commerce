import { Injectable } from '@nestjs/common';
import { InventoryBatchLoadJobProductCardDTO } from 'src/tcgcommerce/modules/inventory/batch/load/job/product/card/dto/inventory.batch.load.job.product.card.dto';
import { InventoryBatchLoadProductCardService } from 'src/tcgcommerce/modules/inventory/batch/load/product/card/inventory.batch.load.product.card.service';
import { ProductCardService } from 'src/tcgcommerce/modules/product/card/product.card.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ProductCardDTO } from 'src/tcgcommerce/modules/product/card/dto/product.card.dto';

@Injectable()
export class InventoryBatchLoadProductVerifyCardService {

    constructor(
        private inventoryBatchLoadProductCardService: InventoryBatchLoadProductCardService,
        private productCardService: ProductCardService,
        private eventEmitter: EventEmitter2,
    ) { }

    
    

}