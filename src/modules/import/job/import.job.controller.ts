import { Controller, Get, Post, Body, Put, Param, ParseIntPipe, Delete, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ImportJobService } from './import.job.service';

@Controller('import/job')
export class ImportJobController {

    constructor(
        private importJobService: ImportJobService,
    ) { }
    
    
    /*
    @Get('/:commerceAccountId')
    async getCommerceAccount(@Param('commerceAccountId') commerceAccountId: string) {
        return await this.commerceAccountService.getCommerceAccount(commerceAccountId);
    }

    @Post()
    @UsePipes(new ValidationPipe())
    async createCommerceAccount(@Body() createCommerceAcountDTO: CreateCommerceAccountDTO) {
        return await this.commerceAccountService.createCommerceAccount(createCommerceAcountDTO);
    }

    /*
    @Put(':id')
    async updateUser(@Param('tcgDatabaseUserId') tcgDatabaseUserId: string, @Body() tcgDatabaseUserUpdateDTO: TCGDatabaseUserUpdateDTO) {
        await this.tcgDatabaseUserService.updateTCGDatabaseUser(tcgDatabaseUserId, tcgDatabaseUserUpdateDTO);
    }
    */

}