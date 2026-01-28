import { Controller, Get, Post, Body, Put, Param, InternalServerErrorException } from '@nestjs/common';
import { InventoryProductCardItemService } from './inventory.product.card.item.service';



@Controller('inventory/product/card/item')
export class InventoryProductCardItemController {

    constructor(
        private inventoryProductCardItemService: InventoryProductCardItemService,
    ) { }
    
    
    

}