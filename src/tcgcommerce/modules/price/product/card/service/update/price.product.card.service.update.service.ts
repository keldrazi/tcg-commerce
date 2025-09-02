import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PriceProductCardServiceUpdate } from 'src/typeorm/entities/tcgcommerce/modules/price/product/card/service/update/price.product.card.service.update.entity';
import { PriceProductCardServiceUpdateDTO } from './dto/price.product.card.service.update.dto';
import { ProductLineService } from 'src/tcgcommerce/modules/product/line/product.line.service';
import { ProductSetService } from 'src/tcgcommerce/modules/product/set/product.set.service';
//MTG Service
import { PriceProductCardServiceLineMTGService } from 'src/tcgcommerce/modules/price/product/card/service/update/line/mtg/price.product.card.service.update.line.mtg.service';
import { ProductSetDTO } from 'src/tcgcommerce/modules/product/set/dto/product.set.dto';

@Injectable()
export class PriceProductCardServiceUpdateService {

    constructor(
       @InjectRepository(PriceProductCardServiceUpdate) private priceProductCardServiceUpdateRepository: Repository<PriceProductCardServiceUpdate>,
       private productLineService: ProductLineService,
       private productSetService: ProductSetService,
       private priceProductCardServiceLineMTGService: PriceProductCardServiceLineMTGService,

    ) { }

    
    
    async updateProductCardPrices(productVendorId: string, productLineId: string, productTypeId: string, productCardLanguageCode: string, commerceAccountId: string) {

        let productLine = await this.getProductLine(productLineId);
        if (productLine == null) {
            return null;
        }

        if(productLine.productLineCode === 'MTG') {
            await this.priceProductCardServiceLineMTGService.updateMTGProductCardPrices(productVendorId, productLineId, productTypeId, productCardLanguageCode, commerceAccountId);
        }

       


    }
    
    async getProductLine(productLineId: string) {
        let productLine = await this.productLineService.getProductLine(productLineId);
        if (productLine == null) {
            return null;
        }
        
        return productLine;
    }

    
}