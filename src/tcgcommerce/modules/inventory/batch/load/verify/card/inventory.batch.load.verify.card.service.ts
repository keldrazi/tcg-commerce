import { Injectable } from '@nestjs/common';
import { INVENTORY_BATCH_LOAD_JOB_PRODUCT_CARD_STATUS } from 'src/system/constants/tcgcommerce/inventory/batch/load/job/product/card/inventory.batch.load.job.product.card.contants';
import { InventoryBatchLoadJobProductCardDTO } from 'src/tcgcommerce/modules/inventory/batch/load/job/product/card/dto/inventory.batch.load.job.product.card.dto';
import { InventoryProductCardDTO } from 'src/tcgcommerce/modules/inventory/product/card/dto/inventory.product.card.dto';
import { InventoryProductCardItem } from 'src/tcgcommerce/modules/inventory/product/card/interface/inventory.product.card.item.interface';
import { InventoryProductCard } from 'src/typeorm/entities/tcgcommerce/modules/inventory/product/card/inventory.product.card.entity';
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

    
    async getInventoryBatchLoadJobProductCardsToVerify(inventoryBatchLoadJobProductCardDTO: InventoryBatchLoadJobProductCardDTO) {
        //GET THE PRODUCT CARDS FOR THE SET;
        let productCards = await this.productCardService.getProductCardsByProductSetId(inventoryBatchLoadJobProductCardDTO.productSetId);

        if(productCards == null) {
            //TO DO HANDLE ERROR FOR NON EXISTENT SET;
            return null;
        }

        let inventoryBatchLoadProductCardsToVerify: any[] = [];

        for(let i = 0; i < productCards.length; i++) {
            let productCard = productCards[i];
            let productCardDTO: ProductCardDTO = { ...productCard };

            //GET THE INVENTORY FOR THE THE PRODUCT CARD;
            let inventoryProductCardDTO = await this.inventoryBatchLoadProductCardService.getUnverifiedInventoryBatchProductCardByProductCardId(productCard.productCardId);

            if(inventoryProductCardDTO != null) {
                let inventoryBatchLoadProductCardToVerify = {
                    productCardDTO: productCardDTO,
                    inventoryProductCardDTO: inventoryProductCardDTO
                };

                inventoryBatchLoadProductCardsToVerify.push(inventoryBatchLoadProductCardToVerify);
            }
        }

        return inventoryBatchLoadProductCardsToVerify;

    }

}