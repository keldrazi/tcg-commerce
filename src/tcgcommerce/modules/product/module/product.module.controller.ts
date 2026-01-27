import { Controller, Get, Post, Body, Put, Param, ParseIntPipe, Delete, UseGuards, UsePipes, ValidationPipe, NotFoundException, ConflictException, InternalServerErrorException } from '@nestjs/common';
import { ProductModuleService } from './product.module.service';
import { CreateProductModuleDTO, UpdateProductModuleDTO } from './dto/product.module.dto';

@Controller('product/module')
export class ProductModuleController {

    constructor(
        private productModuleService: ProductModuleService,
    ) { }
    
    @Get()
    async getProductModules() {
        try {
            return await this.productModuleService.getProductModules();
        } catch (e) {
            throw new InternalServerErrorException('Failed to get product modules');
        }
    }

    @Get('/id/:productModuleId')
    async getProductModuleById(@Param('productModuleId') productModuleId: string) {
        try {
            return await this.productModuleService.getProductModuleById(productModuleId);
        } catch (e) {
            if (e instanceof NotFoundException) {
                throw e;
            }
            throw new InternalServerErrorException('Failed to get product module');
        }
    }

    @Get('/caid/:commerceAccountId')
    async getProductModuleByCommerceAccountId(@Param('commerceAccountId') commerceAccountId: string) {
        try {
            return await this.productModuleService.getProductModuleByCommerceAccountId(commerceAccountId);
        } catch (e) {
            if (e instanceof NotFoundException) {
                throw e;
            }
            throw new InternalServerErrorException('Failed to get product module by commerce account');
        }
    }

    @Post('/create')
    @UsePipes(new ValidationPipe())
    async createProductModule(@Body() createProductModuleDTO: CreateProductModuleDTO) {
        try {
            return await this.productModuleService.createProductModule(createProductModuleDTO);
        } catch (e) {
            if (e instanceof ConflictException) {
                throw e;
            }
            throw new InternalServerErrorException('Failed to create product module');
        }
    }

    @Put('/update')
    @UsePipes(new ValidationPipe())
    async updateProductModule(@Body() updateProductModuleDTO: UpdateProductModuleDTO) {
        try {
            return await this.productModuleService.updateProductModule(updateProductModuleDTO);
        } catch (e) {
            if (e instanceof NotFoundException) {
                throw e;
            }
            throw new InternalServerErrorException('Failed to update product module');
        }
    }

}