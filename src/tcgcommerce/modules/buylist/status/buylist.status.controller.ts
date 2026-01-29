import { Controller, Get, Post, Body, Put, Param, UsePipes, ValidationPipe, NotFoundException, InternalServerErrorException, ConflictException } from '@nestjs/common';
import { CreateBuylistStatusDTO, UpdateBuylistStatusDTO } from './dto/buylist.status.dto';
import { BuylistStatusService } from './buylist.status.service';
import { EntityNotFoundError } from 'typeorm/browser/error/index.js';

@Controller('buylist/status')
export class BuylistStatusController {

    constructor(
        private buylistStatusService: BuylistStatusService,
    ) { }
    
    @Get('/id/:buylistStatusId')
    async getBuylistStatusById(@Param('buylistStatusId') buylistStatusId: string) {
        try {
            return await this.buylistStatusService.getBuylistStatusById(buylistStatusId);
        } catch (e) {
            if(e instanceof EntityNotFoundError) {
                throw new NotFoundException('Buylist status was not found');
            }
            throw new InternalServerErrorException('Failed to get buylist status');
        }
    }

    @Get()
    async getBuylistStatuses() {
        try {
            return await this.buylistStatusService.getBuylistStatuses();
        } catch (e) {
            throw new InternalServerErrorException('Failed to get buylist statuses');
        }
    }

    @Post('/create')
    @UsePipes(new ValidationPipe())
    async createBuylistStatus(@Body() createBuylistStatusDTO: CreateBuylistStatusDTO) {
        try {
            return await this.buylistStatusService.createBuylistStatus(createBuylistStatusDTO);
        } catch (e) {
            if(e instanceof ConflictException) {
                throw e;
            }
            throw new InternalServerErrorException('Failed to create buylist status');
        }
    }

    @Put('/update')
    @UsePipes(new ValidationPipe())
    async updateBuylistStatus(@Body() updateBuylistStatusDTO: UpdateBuylistStatusDTO) {
        try {
            return await this.buylistStatusService.updateBuylistStatus(updateBuylistStatusDTO);
        } catch (e) {
            if(e instanceof EntityNotFoundError) {
                throw new NotFoundException('Buylist status was not found');
            }
            throw new InternalServerErrorException('Failed to update buylist status');
        }
    }
}