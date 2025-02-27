import { Controller, Get, Post, Body, Put, Param, ParseIntPipe, Delete, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ProductCardTypeDTO } from './dto/product.card.type.dto';
import { ProductCardTypeService } from './product.card.type.service';



@Controller('product/card/type')
export class ProductCardTypeController {

    constructor(
        private productCardTypeService: ProductCardTypeService,
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