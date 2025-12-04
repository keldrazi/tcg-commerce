import { Controller, Get, Post, Body, Put, Param, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateBuylistImportProductCardProviderTypeDTO, UpdateBuylistImportProductCardProviderTypeDTO } from './dto/buylist.import.product.card.provider.type.dto';
import { BuylistImportProductCardProviderTypeService } from './buylist.import.product.card.provider.type.service';

@Controller('buylist/import/product/card/provider/type')
export class BuylistImportProductCardProviderTypeController {

    constructor(
        private buylistImportProductCardProviderTypeService: BuylistImportProductCardProviderTypeService,
    ) { }
    

    @Get('/id/:buylistImportProductCardProviderTypeId')
    async getBuylistImportProductCardProviderType(@Param('buylistImportProductCardProviderTypeId') buylistImportProductCardProviderTypeId: string) {
        return await this.buylistImportProductCardProviderTypeService.getBuylistImportProductCardProviderTypeById(buylistImportProductCardProviderTypeId);
    }

    @Get('/all')
    async getBuylistImportProductCardProviderTypes() {
        return await this.buylistImportProductCardProviderTypeService.getBuylistImportProductCardProviderTypes();
    }

    @Post('/create')
    @UsePipes(new ValidationPipe())
    async createBuylistImportProductCardProviderType(@Body() createBuylistImportProductCardProviderTypeDTO: CreateBuylistImportProductCardProviderTypeDTO) {
        return await this.buylistImportProductCardProviderTypeService.createBuylistImportProductCardProviderType(createBuylistImportProductCardProviderTypeDTO);
    }

    @Put('/update')
    @UsePipes(new ValidationPipe())
    async updateBuylistImportProductCardProviderType(@Body() updateBuylistImportProductCardProviderTypeDTO: UpdateBuylistImportProductCardProviderTypeDTO) {
        return await this.buylistImportProductCardProviderTypeService.updateBuylistImportProductCardProviderType(updateBuylistImportProductCardProviderTypeDTO);
    }

} 