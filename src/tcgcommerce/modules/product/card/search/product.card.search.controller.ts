import { Controller, Get, Param } from '@nestjs/common';
import { ProductCardSearchService } from './product.card.search.service';

@Controller('product/card/search')
export class ProductCardSearchController {

    constructor(
        private productCardSearchService: ProductCardSearchService,
    ) { }
    
    
    @Get('/name/:productLineCode/:query')
    async searchProductCardsByName(@Param('productLineCode') productLineCode: string, @Param('query') query: string) {
        return await this.productCardSearchService.searchProductCardsByName(productLineCode, query);
    }

}   