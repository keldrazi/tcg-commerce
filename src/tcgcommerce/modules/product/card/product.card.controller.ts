import { Controller, Get, Post, Body, Put, Param, ParseIntPipe, Delete, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ProductCardService } from './product.card.service';



@Controller('product/card')
export class ProductCardController {

    constructor(
        private productCardService: ProductCardService,
    ) { }
    
    
    @Post('/create/plc/:productLineCode')
    async createProductCards(@Param('productLineCode') productLineCode: string) {
        return await this.productCardService.createProductCardsByProductLineCode(productLineCode.toUpperCase());
    }

    //WILL EVENTUALLY NEED THIS FOR PRERELEASE SETS;
    /*@Get('/create/productSetCode/:productSetCode/vendorCode/:productVendorCode/lineCode/:productLineCode/typeCode/:productTypeCode')
    async createProductCardsBySet(@Param('productSetCode') productSetCode: string, @Param('productVendorCode') productVendorCode: string, @Param('productLineCode') productLineCode: string, @Param('productTypeCode') productTypeCode: string) {
        return await this.productCardService.createProductCardsBySet(productSetCode.toUpperCase(), productVendorCode.toUpperCase(), productLineCode.toUpperCase(), productTypeCode.toUpperCase());
    }
    */

    @Put('update/mtg/scryfall/data')
    async updateTCGdbMTGProductCardsWithScryfallData() {
        return await this.productCardService.updateTCGdbMTGProductCardsWithScryfallData();
    }

    @Get('/set/id/:productSetId')
    async getProductCardsByProductSetId(@Param('productSetId') productSetId: string) {
        return await this.productCardService.getProductCardsByProductSetId(productSetId);
    }
}   