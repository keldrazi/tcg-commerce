import { Controller, Get, Post, Body, Put, Param, ParseIntPipe, Delete, UseGuards, UsePipes, ValidationPipe, NotFoundException, ConflictException, InternalServerErrorException } from '@nestjs/common';
import { EmailTemplateService } from './email.template.service';
import { CreateEmailTemplateDTO, UpdateEmailTemplateDTO } from './dto/email.template.dto';

@Controller('commerce/location')
export class EmailTemplateController {

    constructor(
        private emailTemplateService: EmailTemplateService,
    ) { }
    
    @Get('/all')
    async getEmailTemplates() {
        try {
            return await this.emailTemplateService.getEmailTemplates();
        } catch (e) {
            throw new InternalServerErrorException('Failed to get email templates');
        }
    }

    @Get('/:emailTemplateId')
    async getEmailTemplate(@Param('emailTemplateId') emailTemplateId: string) {
        try {
            return await this.emailTemplateService.getEmailTemplate(emailTemplateId);
        } catch (e) {
            if (e instanceof NotFoundException) {
                throw e;
            }
            throw new InternalServerErrorException('Failed to get email template');
        }
    }

    @Post('/create')
    @UsePipes(new ValidationPipe())
    async createEmailTemplate(@Body() createEmailTemplateDTO: CreateEmailTemplateDTO) {
        try {
            return await this.emailTemplateService.createEmailTemplate(createEmailTemplateDTO);
        } catch (e) {
            if (e instanceof ConflictException) {
                throw e;
            }
            throw new InternalServerErrorException('Failed to create email template');
        }
    }

    @Post('/update')
    @UsePipes(new ValidationPipe())
    async updateEmailTemplate(@Body() updateEmailTemplateDTO: UpdateEmailTemplateDTO) {
        try {
            return await this.emailTemplateService.updateEmailTemplate(updateEmailTemplateDTO);
        } catch (e) {
            if (e instanceof NotFoundException) {
                throw e;
            }
            throw new InternalServerErrorException('Failed to update email template');
        }
    }

}