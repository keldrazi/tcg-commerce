import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductCardVariant } from 'src/typeorm/entities/modules/product/card/variant/product.card.variant.entity';

@Injectable()
export class ProductCardVariantService {

    constructor(
        @InjectRepository(ProductCardVariant) private productCardVariantRepository: Repository<ProductCardVariant>,
    ) { }

    
    
}