import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PriceProductCardServiceUpdate } from 'src/typeorm/entities/tcgcommerce/modules/price/product/card/service/update/price.product.card.service.update.entity';
import { PriceProductCardServiceUpdateDTO } from './dto/price.product.card.service.update.dto';
import { ProductCardService } from 'src/tcgcommerce/modules/product/card/product.card.service';
import { InventoryProductCardService } from 'src/tcgcommerce/modules/inventory/product/card/inventory.product.card.service';
import { TCGdbMTGPriceChangeDailyService } from 'src/tcgdb/modules/tcgdb/mtg/price/change/daily/tcgdb.mtg.price.change.daily.service';

@Injectable()
export class PriceProductCardServiceUpdateService {

    constructor(
       @InjectRepository(PriceProductCardServiceUpdate) private priceProductCardServiceUpdateRepository: Repository<PriceProductCardServiceUpdate>,
       private productCardService: ProductCardService,
       private inventoryProductCardService: InventoryProductCardService,
       private tcgdbMTGPriceChangeDailyService: TCGdbMTGPriceChangeDailyService
    ) { }

    
    /*
    async createBatchInventoryProductCards(productVendorId: string, productLineId: string, productTypeId: string, productCardLanguageCode: string, commerceAccountId: string, commerceLocationId: string) {

        let productSets = await this.getProductSetsByProductLineId(productLineId);
        if (productSets == null) {
            return null;
        }

        //LOOP OVER EACH PRODUCT SET AND CREATE THE INVENTORY PRODUCT CARDS;
        for (let i = 0; i < productSets.length; i++) {
            let productSet = productSets[i];
            await this.createLoadInventoryProductCardsBySet(productSet, productVendorId, productLineId, productTypeId, productCardLanguageCode, commerceAccountId, commerceLocationId);
        }

        return true;

    }
    */
    
}