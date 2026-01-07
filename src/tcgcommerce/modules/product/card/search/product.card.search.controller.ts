import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ProductCardSearchService } from './product.card.search.service';

@Controller('product/card/search')
export class ProductCardSearchController {

    constructor(
        private productCardSearchService: ProductCardSearchService,
    ) { }
    
    
    @Get('/name/plc/:productLineCode/query:query')
    async searchProductCardsByName(@Param('productLineCode') productLineCode: string, @Param('query') query: string) {
        return await this.productCardSearchService.searchProductCardsByName(productLineCode, query);
    }

    @Post('/image')
    async searchProductCardByImage(@Body() cardImageSearchData: any) {
        let productLineCode = cardImageSearchData.productLineCode;
        let productCardImageBase64 = cardImageSearchData.cardImageBase64;
        let productCardPrintingType = cardImageSearchData.cardPrintingType;
        
        return this.productCardSearchService.searchProductCardByImage(productLineCode, productCardImageBase64, productCardPrintingType);
    }

}   