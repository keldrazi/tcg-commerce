import { Controller, Get, Post, Body, Put, Param, ParseIntPipe, Delete, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateReportPriceChangeMonthlyDTO, UpdateReportPriceChangeMonthlyDTO } from './dto/report.price.change.monthly.dto';
import { ReportPriceChangeMonthlyService } from './report.price.change.monthly.service';

@Controller('report/price/change/monthly')
export class ReportPriceChangeMonthlyController {

    constructor(
        private reportPriceChangeMonthlyService: ReportPriceChangeMonthlyService,
    ) { }
    

    @Post('/create')
    @UsePipes(new ValidationPipe())
    async createReportPriceChangeMonthly(@Body() createReportPriceChangeMonthlyDTO: CreateReportPriceChangeMonthlyDTO) {
        return await this.reportPriceChangeMonthlyService.createReportPriceChangeMonthly(createReportPriceChangeMonthlyDTO);
    }

    @Put('/update')
    @UsePipes(new ValidationPipe())
    async updateReportPriceChangeMonthly(@Body() updateReportPriceChangeMonthlyDTO: UpdateReportPriceChangeMonthlyDTO) {
        return await this.reportPriceChangeMonthlyService.updateReportPriceChangeMonthly(updateReportPriceChangeMonthlyDTO);
    }

}