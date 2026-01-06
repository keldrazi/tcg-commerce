import { Controller, Get, Post, Body, Put, Param, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateReportPriceChangeYearlyDTO, UpdateReportPriceChangeYearlyDTO } from './dto/report.price.change.yearly.dto';
import { ReportPriceChangeYearlyService } from './report.price.change.yearly.service';

@Controller('report/price/change/yearly')
export class ReportPriceChangeYearlyController {

    constructor(
        private reportPriceChangeYearlyService: ReportPriceChangeYearlyService,
    ) { }
    
    @Get('/id/:reportPriceChangeYearlyId')
    async getReportPriceChangeYearlyById(@Param('reportPriceChangeYearlyId') reportPriceChangeYearlyId: string) {
        return await this.reportPriceChangeYearlyService.getReportPriceChangeYearlyById(reportPriceChangeYearlyId);
    }

    @Post('/create')
    @UsePipes(new ValidationPipe())
    async createReportPriceChangeYearly(@Body() createReportPriceChangeYearlyDTO: CreateReportPriceChangeYearlyDTO) {
        return await this.reportPriceChangeYearlyService.createReportPriceChangeYearly(createReportPriceChangeYearlyDTO);
    }

    @Put('/update')
    @UsePipes(new ValidationPipe())
    async updateReportPriceChangeYearly(@Body() updateReportPriceChangeYearlyDTO: UpdateReportPriceChangeYearlyDTO) {
        return await this.reportPriceChangeYearlyService.updateReportPriceChangeYearly(updateReportPriceChangeYearlyDTO);
    }

}