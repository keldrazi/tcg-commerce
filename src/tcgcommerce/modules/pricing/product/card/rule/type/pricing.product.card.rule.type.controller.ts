import { Controller, Get, Post, Body, Put, Param, ParseIntPipe, Delete, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreatePricingProductCardRuleTypeDTO, UpdatePricingProductCardRuleTypeDTO, PricingProductCardRuleTypeDTO } from './dto/pricing.product.card.rule.type.dto';
import { PricingProductCardRuleTypeService } from './pricing.product.card.rule.type.service';



@Controller('pricing/product/card/rule/type')
export class PricingProductCardRuleTypeController {

    constructor(
        private pricingProductCardRuleTypeService: PricingProductCardRuleTypeService,
    ) { }
    
    
    @Get(':pricingProductCardRuleTypeId')
    async getPricingProductCardRuleType(@Param('pricingProductCardRuleTypeId') pricingProductCardRuleTypeId: string) {
        return await this.pricingProductCardRuleTypeService.getPricingProductCardRuleType(pricingProductCardRuleTypeId);
    }
    @Get('pricingProductCardType/:pricingProductCardTypeId')
    async getPricingProductCardRuleTypesByPricingProductCardTypeId(@Param('pricingProductCardTypeId') pricingProductCardTypeId: string) {
        return await this.pricingProductCardRuleTypeService.getPricingProductCardRuleTypesByPricingProductCardTypeId(pricingProductCardTypeId);
    }

    @Get()
    async getPricingProductCardRuleTypes() {
        return await this.pricingProductCardRuleTypeService.getPricingProductCardRuleTypes();
    }

    @Post()
    @UsePipes(new ValidationPipe())
    async createPricingProductCardRuleType(@Body() createPricingProductCardRuleTypeDTO: CreatePricingProductCardRuleTypeDTO) {
        return await this.pricingProductCardRuleTypeService.createPricingProductCardRuleType(createPricingProductCardRuleTypeDTO);
    }

    @Put()
    @UsePipes(new ValidationPipe())
    async updatePricingProductCardRuleType(@Body() updatePricingProductCardRuleTypeDTO: UpdatePricingProductCardRuleTypeDTO) {
        return await this.pricingProductCardRuleTypeService.updatePricingProductCardRuleType(updatePricingProductCardRuleTypeDTO);
    }

}