import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ProductCardSearchService } from './product.card.search.service';

@Controller('product/card/search')
export class ProductCardSearchController {

    constructor(
        private productCardSearchService: ProductCardSearchService,
    ) { }
    
    @Get('/name/plc/:productLineCode/query:query')
    async searchProductCardsByName(@Param('productLineCode') productLineCode: string, @Param('query') query: string) {
        try {
            return await this.productCardSearchService.searchProductCardsByName(productLineCode, query);
        } catch (e) {
            throw e;
        }
    }

    @Post('/image')
    async searchProductCardByImage(@Body() cardImageSearchData: any) {
        let productLineCode = cardImageSearchData.productLineCode;
        let productCardImageBase64 = cardImageSearchData.cardImageBase64;
        let productCardPrintingType = cardImageSearchData.cardPrintingType;
        try {
            return await this.productCardSearchService.searchProductCardByImage(productLineCode, productCardImageBase64, productCardPrintingType);
        } catch (e) {
            throw e;
        }
    }
}   