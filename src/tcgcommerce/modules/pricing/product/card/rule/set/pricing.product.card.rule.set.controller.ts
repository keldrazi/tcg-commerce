import { Controller, Get, Post, Body, Put, Param, ParseIntPipe, Delete, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreatePricingProductCardRuleSetDTO, UpdatePricingProductCardRuleSetDTO, PricingProductCardRuleSetDTO } from './dto/pricing.product.card.rule.set.dto';
import { PricingProductCardRuleSetService } from './pricing.product.card.rule.set.service';



@Controller('pricing/product/card/rule/set')
export class PricingProductCardRuleSetController {

    constructor(
        private pricingProductCardRuleSetService: PricingProductCardRuleSetService,
    ) { }
    
    
    @Get(':pricingProductCardRuleSetId')
    async getPricingProductCardRuleSet(@Param('pricingProductCardRuleSetId') pricingProductCardRuleSetId: string) {
        return await this.pricingProductCardRuleSetService.getPricingProductCardRuleSet(pricingProductCardRuleSetId);
    }

    @Get('commerceAccount/:commerceAccountId/pricingProductCardTypeId/:pricingProductCardTypeId')
    async getPricingProductCardRuleSets(@Param('commerceAccountId') commerceAccountId: string, @Param('pricingProductCardTypeId') pricingProductCardTypeId: string) {
        return await this.pricingProductCardRuleSetService.getPricingProductCardRuleSets(commerceAccountId, pricingProductCardTypeId);
    }

    @Post()
    @UsePipes(new ValidationPipe())
    async createPricingProductCardRuleSet(@Body() createPricingProductCardRuleSetDTO: CreatePricingProductCardRuleSetDTO) {
        return await this.pricingProductCardRuleSetService.createPricingProductCardRuleSet(createPricingProductCardRuleSetDTO);
    }

    @Put()
    @UsePipes(new ValidationPipe())
    async updatePricingProductCardRuleSet(@Body() updatePricingProductCardRuleSetDTO: UpdatePricingProductCardRuleSetDTO) {
        return await this.pricingProductCardRuleSetService.updatePricingProductCardRuleSet(updatePricingProductCardRuleSetDTO);
    }

    @Put('process')
    async processPricingProductCardRuleSet(@Body() pricingProductCardRuleSetDTOs: PricingProductCardRuleSetDTO[]) {
        return await this.pricingProductCardRuleSetService.processPricingProductCardRuleSet(pricingProductCardRuleSetDTOs);
    }

    

}