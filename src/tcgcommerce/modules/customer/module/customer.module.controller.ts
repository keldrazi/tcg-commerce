import { Controller, Get, Post, Body, Put, Param, UsePipes, ValidationPipe, NotFoundException, InternalServerErrorException, ConflictException } from '@nestjs/common';
import { CustomerModuleService } from './customer.module.service';
import { CreateCustomerModuleDTO, UpdateCustomerModuleDTO } from './dto/customer.module.dto';
import { EntityNotFoundError } from 'typeorm';


@Controller('customer/module')
export class CustomerModuleController {

    constructor(
        private customerModuleService: CustomerModuleService,
    ) { }
    
    @Get()
    async getCustomerModules() {
        try {
            return await this.customerModuleService.getCustomerModules();
        } catch (e) {
            throw new InternalServerErrorException('Failed to get customer modules');
        }
    }

    @Get('/id/:customerModuleId')
    async getCustomerModuleById(@Param('customerModuleId') customerModuleId: string) {
        try {
            return await this.customerModuleService.getCustomerModuleById(customerModuleId);
        } catch (e) {
            if (e instanceof EntityNotFoundError) {
                throw new NotFoundException('Customer module not found');
            }
            throw new InternalServerErrorException('Failed to get customer module');
        }
    }

    @Get('/caid/:commerceAccountId')
    async getCustomerModulesByCommerceAccountId(@Param('commerceAccountId') commerceAccountId: string) {
        try {
            return await this.customerModuleService.getCustomerModulesByCommerceAccountId(commerceAccountId);
        } catch (e) {
            if (e instanceof EntityNotFoundError) {
                throw new NotFoundException('Customer modules not found');
            }
            throw new InternalServerErrorException('Failed to get customer modules');
        }
    }

    @Post('/create')
    @UsePipes(new ValidationPipe())
    async createCustomerModule(@Body() createCustomerModuleDTO: CreateCustomerModuleDTO) {
        try {
            return await this.customerModuleService.createCustomerModule(createCustomerModuleDTO);
        } catch (e) {
            if (e instanceof ConflictException) {
                throw e;
            }
            throw new InternalServerErrorException('Failed to create customer module');
        }
    }

    @Put('/update')
    @UsePipes(new ValidationPipe())
    async updateCustomerModule(@Body() updateCustomerModuleDTO: UpdateCustomerModuleDTO) {
        try {
            return await this.customerModuleService.updateCustomerModule(updateCustomerModuleDTO);
        } catch (e) {
            if (e instanceof EntityNotFoundError) {
                throw new NotFoundException('Customer module not found');
            }
            throw new InternalServerErrorException('Failed to update customer module');
        }
    }

}
