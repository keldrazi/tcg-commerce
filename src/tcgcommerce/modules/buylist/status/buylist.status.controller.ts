import { Controller, Get, Post, Body, Put, Param, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateBuylistStatusDTO, UpdateBuylistStatusDTO } from './dto/buylist.status.dto';
import { BuylistStatusService } from './buylist.status.service';



@Controller('buylist/status')
export class BuylistStatusController {

    constructor(
        private buylistStatusService: BuylistStatusService,
    ) { }
    
    
    @Get('/id/:buylistStatusId')
    async getBuylistStatusById(@Param('buylistStatusId') buylistStatusId: string) {
        return await this.buylistStatusService.getBuylistStatusById(buylistStatusId);
    }

    @Get()
    async getBuylistStatuses() {
        return await this.buylistStatusService.getBuylistStatuses();
    }

    @Post('/create')
    @UsePipes(new ValidationPipe())
    async createBuylistStatus(@Body() createBuylistStatusDTO: CreateBuylistStatusDTO) {
        return await this.buylistStatusService.createBuylistStatus(createBuylistStatusDTO);
    }

    @Put('/update')
    @UsePipes(new ValidationPipe())
    async updateBuylistStatus(@Body() updateBuylistStatusDTO: UpdateBuylistStatusDTO) {
        return await this.buylistStatusService.updateBuylistStatus(updateBuylistStatusDTO);
    }

}