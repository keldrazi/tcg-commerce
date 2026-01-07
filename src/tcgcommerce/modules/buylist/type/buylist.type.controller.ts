import { Controller, Get, Post, Body, Put, Param, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateBuylistTypeDTO, UpdateBuylistTypeDTO } from './dto/buylist.type.dto';
import { BuylistTypeService } from './buylist.type.service';



@Controller('buylist/type')
export class BuylistTypeController {

    constructor(
        private buylistTypeService: BuylistTypeService,
    ) { }
    
    
    @Get('/id/:buylistTypeId')
    async getBuylistTypeById(@Param('buylistTypeId') buylistTypeId: string) {
        return await this.buylistTypeService.getBuylistTypeById(buylistTypeId);
    }

    @Get()
    async getBuylistTypes() {
        return await this.buylistTypeService.getBuylistTypes();
    }

    @Post('/create')
    @UsePipes(new ValidationPipe())
    async createBuylistType(@Body() createBuylistTypeDTO: CreateBuylistTypeDTO) {
        return await this.buylistTypeService.createBuylistType(createBuylistTypeDTO);
    }

    @Put('/update')
    @UsePipes(new ValidationPipe())
    async updateBuylistType(@Body() updateBuylistTypeDTO: UpdateBuylistTypeDTO) {
        return await this.buylistTypeService.updateBuylistType(updateBuylistTypeDTO);
    }

}