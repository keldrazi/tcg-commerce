import { Controller, Get, Post, Body, Put, Param, ParseIntPipe, Delete, UseGuards, UsePipes, ValidationPipe, NotFoundException, ConflictException, InternalServerErrorException } from '@nestjs/common';
import { EmailModuleService } from './email.module.service';
import { CreateEmailModuleDTO, UpdateEmailModuleDTO } from './dto/email.module.dto';

@Controller('email/module')
export class EmailModuleController {

    constructor(
        private emailModuleService: EmailModuleService,
    ) { }
    
    @Get('/all')
    async getEmailModules() {
        try {
            return await this.emailModuleService.getEmailModules();
        } catch (e) {
            throw new InternalServerErrorException('Failed to get email modules');
        }
    }

    @Get('/:emailModuleId')
    async getEmailModule(@Param('emailModuleId') emailModuleId: string) {
        try {
            return await this.emailModuleService.getEmailModule(emailModuleId);
        } catch (e) {
            if (e instanceof NotFoundException) {
                throw e;
            }
            throw new InternalServerErrorException('Failed to get email module');
        }
    }

    @Get('/commerceAccount/:commerceAccountId')
    async getEmailModuleByCommerceAccountId(@Param('commerceAccountId') commerceAccountId: string) {
        try {
            return await this.emailModuleService.getEmailModuleByCommerceAccountId(commerceAccountId);
        } catch (e) {
            if (e instanceof NotFoundException) {
                throw e;
            }
            throw new InternalServerErrorException('Failed to get email module by commerce account');
        }
    }

    @Post()
    @UsePipes(new ValidationPipe())
    async createEmailModule(@Body() createEmailModuleDTO: CreateEmailModuleDTO) {
        try {
            return await this.emailModuleService.createEmailModule(createEmailModuleDTO);
        } catch (e) {
            if (e instanceof ConflictException) {
                throw e;
            }
            throw new InternalServerErrorException('Failed to create email module');
        }
    }

    @Put()
    @UsePipes(new ValidationPipe())
    async updateEmailModule(@Body() updateEmailModuleDTO: UpdateEmailModuleDTO) {
        try {
            return await this.emailModuleService.updateEmailModule(updateEmailModuleDTO);
        } catch (e) {
            if (e instanceof NotFoundException) {
                throw e;
            }
            throw new InternalServerErrorException('Failed to update email module');
        }
    }

}