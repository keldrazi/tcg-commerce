import { Controller, Get, Post, Body, Put, Param, ParseIntPipe, Delete, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreatePriceProductCardRuleSetDTO, UpdatePriceProductCardRuleSetDTO, PriceProductCardRuleSetDTO } from './dto/price.product.card.rule.set.dto';
import { PriceProductCardRuleSetService } from './price.product.card.rule.set.service';



@Controller('price/product/card/rule/set')
export class PriceProductCardRuleSetController {

    constructor(
        private priceProductCardRuleSetService: PriceProductCardRuleSetService,
    ) { }
    
    
    @Get(':priceProductCardRuleSetId')
    async getPriceProductCardRuleSet(@Param('priceProductCardRuleSetId') priceProductCardRuleSetId: string) {
        return await this.priceProductCardRuleSetService.getPriceProductCardRuleSet(priceProductCardRuleSetId);
    }

    @Get('commerceAccount/:commerceAccountId/priceProductCardTypeId/:priceProductCardTypeId')
    async getPriceProductCardRuleSets(@Param('commerceAccountId') commerceAccountId: string, @Param('priceProductCardTypeId') priceProductCardTypeId: string) {
        return await this.priceProductCardRuleSetService.getPriceProductCardRuleSets(commerceAccountId, priceProductCardTypeId);
    }

    @Post()
    @UsePipes(new ValidationPipe())
    async createPriceProductCardRuleSet(@Body() createPriceProductCardRuleSetDTO: CreatePriceProductCardRuleSetDTO) {
        return await this.priceProductCardRuleSetService.createPriceProductCardRuleSet(createPriceProductCardRuleSetDTO);
    }

    @Put()
    @UsePipes(new ValidationPipe())
    async updatePriceProductCardRuleSet(@Body() updatePriceProductCardRuleSetDTO: UpdatePriceProductCardRuleSetDTO) {
        return await this.priceProductCardRuleSetService.updatePriceProductCardRuleSet(updatePriceProductCardRuleSetDTO);
    }

    @Put('process')
    async processPriceProductCardRuleSet(@Body() priceProductCardRuleSetDTOs: PriceProductCardRuleSetDTO[]) {
        return await this.priceProductCardRuleSetService.processPriceProductCardRuleSet(priceProductCardRuleSetDTOs);
    }

    

}