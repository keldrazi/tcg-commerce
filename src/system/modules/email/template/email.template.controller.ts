import { Controller, Get, Post, Body, Put, Param, ParseIntPipe, Delete, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { EmailTemplateService } from './email.template.service';
import { CreateEmailTemplateDTO, UpdateEmailTemplateDTO } from './dto/email.template.dto';



@Controller('commerce/location')
export class EmailTemplateController {

    constructor(
        private emailTemplateService: EmailTemplateService,
    ) { }
    
    @Get('/all')
    async getEmailTemplates() {
        return await this.emailTemplateService.getEmailTemplates();
    }

    @Get('/:emailTemplateId')
    async getEmailTemplate(@Param('emailTemplateId') emailTemplateId: string) {
        return await this.emailTemplateService.getEmailTemplate(emailTemplateId);
    }

    @Post('/create')
    @UsePipes(new ValidationPipe())
    async createEmailTemplate(@Body() createEmailTemplateDTO: CreateEmailTemplateDTO) {
        return this.emailTemplateService.createEmailTemplate(createEmailTemplateDTO);
    }

    @Post('/update')
    @UsePipes(new ValidationPipe())
    async updateEmailTemplate(@Body() updateEmailTemplateDTO: UpdateEmailTemplateDTO) {
        return this.emailTemplateService.updateEmailTemplate(updateEmailTemplateDTO);
    }


}