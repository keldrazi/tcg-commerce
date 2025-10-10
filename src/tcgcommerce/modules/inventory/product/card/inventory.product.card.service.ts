import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
//import { InventoryProductCardsDTO, InventoryProductCardDTO, CreateInventoryProductCardsDTO, CreateInventoryProductCardDTO, UpdateInventoryProductCardsDTO, UpdateInventoryProductCardDTO } from 'src/tcgcommerce/modules/inventory/product/card/dto/inventory.product.card.dto';
import { InventoryProductCard } from 'src/typeorm/entities/tcgcommerce/modules/inventory/product/card/inventory.product.card.entity';

@Injectable()
export class InventoryProductCardService {

    //VENDOR DATA;
    private MTG_SET_VENDOR_ID = "67d0735c-da47-480d-b3e2-651b9fc5a2d8"; //WoTC;
    private MTG_SET_LINE_ID = "1258359b-bb37-4323-8749-cd4fa40037f9"; //Magic: The Gathering;

    constructor(
        @InjectRepository(InventoryProductCard) private inventoryProductCardRepository: Repository<InventoryProductCard>,
    ) { }

    
}