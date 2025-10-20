import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PriceBatchUpdateProductCardDTO } from './dto/price.batch.update.product.card.dto';
import { PriceBatchUpdateProductCard } from 'src/typeorm/entities/tcgcommerce/modules/price/batch/update/product/card/price.batch.update.product.card.entity';

@Injectable()
export class PriceBatchUpdateProductCardService {

    constructor(
        @InjectRepository(PriceBatchUpdateProductCard) private priceBatchUpdateProductCardRepository: Repository<PriceBatchUpdateProductCard>,
    ) { }

    async createPriceBatchUpdateProductCardsBySetId(priceBatchUpdateJobProductCardDTO: PriceBatchUpdateProductCardDTO) {
        //TO DO: IMPLEMENT LOGIC TO CREATE PRICE BATCH UPDATE PRODUCT CARDS BY SET ID;
        console.log('Creating Price Batch Update Product Cards for Set Code: ' + priceBatchUpdateJobProductCardDTO.productSetCode);

        
    }
    
}