import { Controller, Get, Post, Body, Put, Param, ParseIntPipe, Delete, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { EmailModuleService } from './email.module.service';
import { CreateEmailModuleDTO, UpdateEmailModuleDTO } from './dto/email.module.dto';



@Controller('email/module')
export class EmailModuleController {

    constructor(
        private emailModuleService: EmailModuleService,
    ) { }
    
    @Get('/all')
    async getEmailModules() {
        return await this.emailModuleService.getEmailModules();
    }

    @Get('/:emailModuleId')
    async getEmailModule(@Param('emailModuleId') emailModuleId: string) {
        return await this.emailModuleService.getEmailModule(emailModuleId);
    }

    @Get('/commerceAccount/:commerceAccountId')
    async getEmailModuleByCommerceAccountId(@Param('commerceAccountId') commerceAccountId: string) {
        return await this.emailModuleService.getEmailModuleByCommerceAccountId(commerceAccountId);
    }

    @Post()
    @UsePipes(new ValidationPipe())
    async createEmailModule(@Body() createEmailModuleDTO: CreateEmailModuleDTO) {
        return this.emailModuleService.createEmailModule(createEmailModuleDTO);
    }

    @Put()
    @UsePipes(new ValidationPipe())
    async updateEmailModule(@Body() updateEmailModuleDTO: UpdateEmailModuleDTO) {
        return this.emailModuleService.updateEmailModule(updateEmailModuleDTO);
    }

}