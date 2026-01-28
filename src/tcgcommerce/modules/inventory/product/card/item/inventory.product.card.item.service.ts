import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InventoryProductCardItemDTO } from 'src/tcgcommerce/modules/inventory/product/card/item/dto/inventory.product.card.item.dto';
import { InventoryProductCardItem } from 'src/typeorm/entities/tcgcommerce/modules/inventory/product/card/item/inventory.product.card.item.entity';

@Injectable()
export class InventoryProductCardItemService {
    
    constructor(
        @InjectRepository(InventoryProductCardItem) private inventoryProductCardItemRepository: Repository<InventoryProductCardItem>,
    ) { }


    
}