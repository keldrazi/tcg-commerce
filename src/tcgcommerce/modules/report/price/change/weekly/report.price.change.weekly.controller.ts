import { Controller, Get, Post, Body, Put, Param, ParseIntPipe, Delete, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateReportPriceChangeWeeklyDTO, UpdateReportPriceChangeWeeklyDTO } from './dto/report.price.change.weekly.dto';
import { ReportPriceChangeWeeklyService } from './report.price.change.weekly.service';

@Controller('report/price/change/weekly')
export class ReportPriceChangeWeeklyController {

    constructor(
        private reportPriceChangeWeeklyService: ReportPriceChangeWeeklyService,
    ) { }
    
    @Get('/id/:reportPriceChangeWeeklyId')
    async getReportPriceChangeWeeklyById(@Param('reportPriceChangeWeeklyId') reportPriceChangeWeeklyId: string) {
        return await this.reportPriceChangeWeeklyService.getReportPriceChangeWeeklyById(reportPriceChangeWeeklyId);
    }

    @Post('/create')
    @UsePipes(new ValidationPipe())
    async createReportPriceChangeWeekly(@Body() createReportPriceChangeWeeklyDTO: CreateReportPriceChangeWeeklyDTO) {
        return await this.reportPriceChangeWeeklyService.createReportPriceChangeWeekly(createReportPriceChangeWeeklyDTO);
    }

    @Put('/update')
    @UsePipes(new ValidationPipe())
    async updateReportPriceChangeWeekly(@Body() updateReportPriceChangeWeeklyDTO: UpdateReportPriceChangeWeeklyDTO) {
        return await this.reportPriceChangeWeeklyService.updateReportPriceChangeWeekly(updateReportPriceChangeWeeklyDTO);
    }

}