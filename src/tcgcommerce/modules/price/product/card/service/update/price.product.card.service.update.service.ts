import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PriceProductCardServiceUpdate } from 'src/typeorm/entities/tcgcommerce/modules/price/product/card/service/update/price.product.card.service.update.entity';
import { PriceProductCardServiceUpdateDTO } from './dto/price.product.card.service.update.dto';
import { ProductLineService } from 'src/tcgcommerce/modules/product/line/product.line.service';
import { ProductSetService } from 'src/tcgcommerce/modules/product/set/product.set.service';
//MTG Service
import { PriceProductCardLineUpdateMTGService } from 'src/tcgcommerce/modules/price/product/card/line/update/mtg/price.product.card.line.update.mtg.service';
import { ProductSetDTO } from 'src/tcgcommerce/modules/product/set/dto/product.set.dto';

@Injectable()
export class PriceProductCardServiceUpdateService {

    constructor(
       @InjectRepository(PriceProductCardServiceUpdate) private priceProductCardServiceUpdateRepository: Repository<PriceProductCardServiceUpdate>,
       private productLineService: ProductLineService,
       private productSetService: ProductSetService,
       private priceProductCardLineUpdateMTGService: PriceProductCardLineUpdateMTGService,

    ) { }

    
    
    async updateProductCardPrices(productVendorId: string, productLineId: string, productTypeId: string, productCardLanguageCode: string, commerceAccountId: string) {

        let productLine = await this.getProductLine(productLineId);
        if (productLine == null) {
            return null;
        }

        let productSets = await this.getProductSetsByProductLineId(productLineId);
        if (productSets == null) {
            return null;
        }

        if(productLine.productLineCode === 'MTG') {
            await this.updateMTGProductCardPrices(productLineId, productCardLanguageCode, commerceAccountId);
        }

       


    }

    async updateMTGProductCardPrices(productLineId: string, productCardLanguageCode: string, commerceAccountId: string) {
        
    }
    
    
    
    //UTILITY FUNCTIONS
    async getProductSetsByProductLineId(productLineId: string) {
        let productSets = await this.productSetService.getProductSetsByProductLineId(productLineId);
        if (productSets == null) {
            return null;
        }
        
        return productSets;
    }

    async getProductLine(productLineId: string) {
        let productLine = await this.productLineService.getProductLine(productLineId);
        if (productLine == null) {
            return null;
        }
        
        return productLine;
    }

    
}