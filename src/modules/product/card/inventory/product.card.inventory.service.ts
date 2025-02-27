import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductCardInventory } from 'src/typeorm/entities/modules/product/card/inventory/product.card.inventory.entity';

@Injectable()
export class ProductCardInventoryService {

    constructor(
        @InjectRepository(ProductCardInventory) private productCardInventoryRepository: Repository<ProductCardInventory>,
    ) { }

    
    
}