import { Controller, Get, Post, Body, Put, Param, UsePipes, ValidationPipe, InternalServerErrorException, NotFoundException, ConflictException } from '@nestjs/common';
import { BuylistModuleService } from './buylist.module.service';
import { CreateBuylistModuleDTO, UpdateBuylistModuleDTO } from './dto/buylist.module.dto';
import { EntityNotFoundError } from 'typeorm';

@Controller('buylist/module')
export class BuylistModuleController {

    constructor(
        private buylistModuleService: BuylistModuleService,
    ) { }
    
    @Get()
    async getBuylistModules() {
        try {
            return await this.buylistModuleService.getBuylistModules();
        } catch (e) {
            throw new InternalServerErrorException('Failed to get buylist modules');
        }
    }

    @Get('/id/:buylistModuleId')
    async getBuylistModuleById(@Param('buylistModuleId') buylistModuleId: string) {
        try {
            return await this.buylistModuleService.getBuylistModuleById(buylistModuleId);
        } catch (e) {
            if(e instanceof EntityNotFoundError) {
                throw new NotFoundException('Buylist module was not found');
            }
            throw new InternalServerErrorException('Failed to get buylist module');
        }
    }

    @Get('/caid/:commerceAccountId')
    async getBuylistModuleByCommerceAccountId(@Param('commerceAccountId') commerceAccountId: string) {
        try {
            return await this.buylistModuleService.getBuylistModuleByCommerceAccountId(commerceAccountId);
        } catch (e) {
            if(e instanceof EntityNotFoundError) {
                throw new NotFoundException('Buylist module was not found');
            }
            throw new InternalServerErrorException('Failed to get buylist module');
        }
    }

    @Post('/create')
    @UsePipes(new ValidationPipe())
    async createBuylistModule(@Body() createBuylistModuleDTO: CreateBuylistModuleDTO) {
        try {
            return this.buylistModuleService.createBuylistModule(createBuylistModuleDTO);
        } catch (e) {
            if(e instanceof ConflictException) {
                throw e;
            }
            throw new InternalServerErrorException('Failed to create buylist module');
        }
    }

    @Put('/update')
    @UsePipes(new ValidationPipe())
    async updateBuylistModule(@Body() updateBuylistModuleDTO: UpdateBuylistModuleDTO) {
        try {
            return this.buylistModuleService.updateBuylistModule(updateBuylistModuleDTO);
        } catch (e) {
            if(e instanceof EntityNotFoundError) {
                throw new NotFoundException('Buylist module was not found');
            }
            throw new InternalServerErrorException('Failed to update buylist module');
        }
    }

}