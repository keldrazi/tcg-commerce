import { Controller, Get, Post, Body, Put, Param, ParseIntPipe, Delete, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { InventoryProductCardDTO } from './dto/inventory.product.card.dto';
import { InventoryProductCardService } from './inventory.product.card.service';



@Controller('inventory/product/card')
export class InventoryProductCardController {

    constructor(
        private inventoryProductCardService: InventoryProductCardService,
    ) { }
    
    
    /*@Get('/:commerceAccountId')
    async getCommerceAccount(@Param('commerceAccountId') commerceAccountId: string) {
        return await this.commerceAccountService.getCommerceAccount(commerceAccountId);
    }

    @Post()
    @UsePipes(new ValidationPipe())
    async createCommerceAccount(@Body() createCommerceAcountDTO: CreateCommerceAccountDTO) {
        return await this.commerceAccountService.createCommerceAccount(createCommerceAcountDTO);
    }

    /*
    @Put(':id')
    async updateUser(@Param('tcgDatabaseUserId') tcgDatabaseUserId: string, @Body() tcgDatabaseUserUpdateDTO: TCGDatabaseUserUpdateDTO) {
        await this.tcgDatabaseUserService.updateTCGDatabaseUser(tcgDatabaseUserId, tcgDatabaseUserUpdateDTO);
    }
    */

}