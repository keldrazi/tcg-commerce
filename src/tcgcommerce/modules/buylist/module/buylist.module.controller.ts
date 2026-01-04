import { Controller, Get, Post, Body, Put, Param, UsePipes, ValidationPipe } from '@nestjs/common';
import { BuylistModuleService } from './buylist.module.service';
import { CreateBuylistModuleDTO, UpdateBuylistModuleDTO } from './dto/buylist.module.dto';

@Controller('buylist/module')
export class BuylistModuleController {

    constructor(
        private buylistModuleService: BuylistModuleService,
    ) { }
    
    @Get()
    async getBuylistModules() {
        return await this.buylistModuleService.getBuylistModules();
    }

    @Get('/id/:buylistModuleId')
    async getBuylistModuleById(@Param('buylistModuleId') buylistModuleId: string) {
        return await this.buylistModuleService.getBuylistModuleById(buylistModuleId);
    }

    @Get('/caid/:commerceAccountId')
    async getBuylistModuleByCommerceAccountId(@Param('commerceAccountId') commerceAccountId: string) {
        return await this.buylistModuleService.getBuylistModuleByCommerceAccountId(commerceAccountId);
    }

    @Post('/create')
    @UsePipes(new ValidationPipe())
    async createBuylistModule(@Body() createBuylistModuleDTO: CreateBuylistModuleDTO) {
        return this.buylistModuleService.createBuylistModule(createBuylistModuleDTO);
    }

    @Put('/update')
    @UsePipes(new ValidationPipe())
    async updateBuylistModule(@Body() updateBuylistModuleDTO: UpdateBuylistModuleDTO) {
        return this.buylistModuleService.updateBuylistModule(updateBuylistModuleDTO);
    }

}