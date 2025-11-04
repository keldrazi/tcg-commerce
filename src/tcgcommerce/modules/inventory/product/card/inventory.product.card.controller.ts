import { Controller, Get, Post, Body, Put, Param, ParseIntPipe, Delete, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { InventoryProductCardDTO } from './dto/inventory.product.card.dto';
import { InventoryProductCardService } from './inventory.product.card.service';



@Controller('inventory/product/card')
export class InventoryProductCardController {

    constructor(
        private inventoryProductCardService: InventoryProductCardService,
    ) { }
    
    
    @Get('/:commerceAccountId')
    async getInventoryProductCardsByCommerceAccountId(@Param('commerceAccountId') commerceAccountId: string) {
        return await this.inventoryProductCardService.getInventoryProductCardsByCommerceAccountId(commerceAccountId);
    }

    
    @Put()
    async updateInventoryProductCards(@Body() inventoryProductCards: InventoryProductCardDTO[]) {
        let inventoryProductCardUpdateRecordCount = await this.inventoryProductCardService.updateInventoryProductCards(inventoryProductCards);

        return inventoryProductCardUpdateRecordCount;
    }
   

}