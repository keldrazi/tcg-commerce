import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductCardType } from 'src/typeorm/entities/modules/product/card/type/product.card.type.entity';

@Injectable()
export class ProductCardTypeService {

    constructor(
        @InjectRepository(ProductCardType) private productCardTypeRepository: Repository<ProductCardType>,
    ) { }

    
    
}