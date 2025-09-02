import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PriceProductCardServiceUpdate } from 'src/typeorm/entities/tcgcommerce/modules/price/product/card/service/update/price.product.card.service.update.entity';
import { ProductCardService } from 'src/tcgcommerce/modules/product/card/product.card.service';
import { ProductSetService } from 'src/tcgcommerce/modules/product/set/product.set.service';
import { InventoryProductCardService } from 'src/tcgcommerce/modules/inventory/product/card/inventory.product.card.service';
import { TCGdbMTGPriceChangeDailyService } from 'src/tcgdb/modules/tcgdb/mtg/price/change/daily/tcgdb.mtg.price.change.daily.service';
import { TCGdbMTGPriceChangeDailyDTO } from 'src/tcgdb/modules/tcgdb/mtg/price/change/daily/dto/tcgdb.mtg.price.change.daily.dto';
import { PriceProductCardServiceUpdateData } from 'src/tcgcommerce/modules/price/product/card/service/update/interface/price.product.card.service.update.data.interface';

@Injectable()
export class PriceProductCardServiceLineMTGService {

    constructor(
       @InjectRepository(PriceProductCardServiceUpdate) private priceProductCardServiceUpdateRepository: Repository<PriceProductCardServiceUpdate>,
       private productCardService: ProductCardService,
       private productSetService: ProductSetService,
       private inventoryProductCardService: InventoryProductCardService,
       private tcgdbMTGPriceChangeDailyService: TCGdbMTGPriceChangeDailyService
    ) { }

    
    async updateMTGProductCardPrices(productVendorId: string, productLineId: string, productTypeId: string, productCardLanguageCode: string, commerceAccountId: string) {
        
        let productSets = await this.getProductSetsByProductLineId(productLineId);
        if (productSets == null) {
            return null;
        }

        for(let i=0; i < productSets.length; i++) {
            let productSet = productSets[i];
            let tcgdbMTGPriceChangesDaily = await this.tcgdbMTGPriceChangeDailyService.getTCGdbMTGPriceChangeDailyBySet(productSet.productSetCode);
        }

    }
    
    
    //UTILITY FUNCTIONS
    async getProductSetsByProductLineId(productLineId: string) {
        let productSets = await this.productSetService.getProductSetsByProductLineId(productLineId);
        if (productSets == null) {
            return null;
        }
        
        return productSets;
    }
    
}