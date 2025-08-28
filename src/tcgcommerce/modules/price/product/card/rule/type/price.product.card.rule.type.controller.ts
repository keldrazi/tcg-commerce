import { Controller, Get, Post, Body, Put, Param, ParseIntPipe, Delete, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreatePriceProductCardRuleTypeDTO, UpdatePriceProductCardRuleTypeDTO, PriceProductCardRuleTypeDTO } from './dto/price.product.card.rule.type.dto';
import { PriceProductCardRuleTypeService } from './price.product.card.rule.type.service';



@Controller('price/product/card/rule/type')
export class PriceProductCardRuleTypeController {

    constructor(
        private priceProductCardRuleTypeService: PriceProductCardRuleTypeService,
    ) { }
    
    
    @Get(':priceProductCardRuleTypeId')
    async getPriceProductCardRuleType(@Param('priceProductCardRuleTypeId') priceProductCardRuleTypeId: string) {
        return await this.priceProductCardRuleTypeService.getPriceProductCardRuleType(priceProductCardRuleTypeId);
    }
    @Get('priceProductCardType/:priceProductCardTypeId')
    async getPriceProductCardRuleTypesByPriceProductCardTypeId(@Param('priceProductCardTypeId') priceProductCardTypeId: string) {
        return await this.priceProductCardRuleTypeService.getPriceProductCardRuleTypesByPriceProductCardTypeId(priceProductCardTypeId);
    }

    @Get()
    async getPriceProductCardRuleTypes() {
        return await this.priceProductCardRuleTypeService.getPriceProductCardRuleTypes();
    }

    @Post()
    @UsePipes(new ValidationPipe())
    async createPriceProductCardRuleType(@Body() createPriceProductCardRuleTypeDTO: CreatePriceProductCardRuleTypeDTO) {
        return await this.priceProductCardRuleTypeService.createPriceProductCardRuleType(createPriceProductCardRuleTypeDTO);
    }

    @Put()
    @UsePipes(new ValidationPipe())
    async updatePriceProductCardRuleType(@Body() updatePriceProductCardRuleTypeDTO: UpdatePriceProductCardRuleTypeDTO) {
        return await this.priceProductCardRuleTypeService.updatePriceProductCardRuleType(updatePriceProductCardRuleTypeDTO);
    }

}