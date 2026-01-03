import { Controller, Get, Post, Body, Put, Param, ParseIntPipe, Delete, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateReportPriceChangeDailyDTO, UpdateReportPriceChangeDailyDTO } from './dto/report.price.change.daily.dto';
import { ReportPriceChangeDailyService } from './report.price.change.daily.service';

@Controller('report/price/change/daily')
export class ReportPriceChangeDailyController {

    constructor(
        private reportPriceChangeDailyService: ReportPriceChangeDailyService,
    ) { }
    

    @Post('/create')
    @UsePipes(new ValidationPipe())
    async createReportPriceChangeDaily(@Body() createReportPriceChangeDailyDTO: CreateReportPriceChangeDailyDTO) {
        return await this.reportPriceChangeDailyService.createReportPriceChangeDaily(createReportPriceChangeDailyDTO);
    }

    @Put('/update')
    @UsePipes(new ValidationPipe())
    async updateReportPriceChangeDaily(@Body() updateReportPriceChangeDailyDTO: UpdateReportPriceChangeDailyDTO) {
        return await this.reportPriceChangeDailyService.updateReportPriceChangeDaily(updateReportPriceChangeDailyDTO);
    }

}