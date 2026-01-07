import { Controller, Get, Post, Body, Put, Param, ParseIntPipe, Delete, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ReportModuleService } from './report.module.service';
import { CreateReportModuleDTO, UpdateReportModuleDTO } from './dto/report.module.dto';



@Controller('report/module')
export class ReportModuleController {

    constructor(
        private reportModuleService: ReportModuleService,
    ) { }
    
    @Get()
    async getReportModules() {
        return await this.reportModuleService.getReportModules();
    }

    @Get('/id/:reportModuleId')
    async getReportModuleById(@Param('reportModuleId') reportModuleId: string) {
        return await this.reportModuleService.getReportModuleById(reportModuleId);
    }

    @Get('/caid/:commerceAccountId')
    async getReportModuleByCommerceAccountId(@Param('commerceAccountId') commerceAccountId: string) {
        return await this.reportModuleService.getReportModuleByCommerceAccountId(commerceAccountId);
    }

    @Post('/create')
    @UsePipes(new ValidationPipe())
    async createReportModule(@Body() createReportModuleDTO: CreateReportModuleDTO) {
        return this.reportModuleService.createReportModule(createReportModuleDTO);
    }

    @Put('/update')
    @UsePipes(new ValidationPipe())
    async updateReportModule(@Body() updateReportModuleDTO: UpdateReportModuleDTO) {
        return this.reportModuleService.updateReportModule(updateReportModuleDTO);
    }

}