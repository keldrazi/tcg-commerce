import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductCardOption } from 'src/typeorm/entities/modules/product/card/option/product.card.option.entity';

@Injectable()
export class ProductCardOptionService {

    constructor(
        @InjectRepository(ProductCardOption) private productCardOptionRepository: Repository<ProductCardOption>,
    ) { }

    
    
}