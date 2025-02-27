import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductCardItem } from 'src/typeorm/entities/modules/product/card/item/product.card.item.entity';

@Injectable()
export class ProductCardItemService {

    constructor(
        @InjectRepository(ProductCardItem) private productCardItemRepository: Repository<ProductCardItem>,
    ) { }

    
    
}