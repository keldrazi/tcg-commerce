import { Controller, Get, Post, Body, Put, Param, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateReportPriceHistoryDTO, UpdateReportPriceHistoryDTO } from './dto/report.price.history.dto';
import { ReportPriceHistoryService } from './report.price.history.service';

@Controller('report/price/history')
export class ReportPriceHistoryController {

    constructor(
        private reportPriceHistoryService: ReportPriceHistoryService,
    ) { }
    
    @Get('/id/:reportPriceHistoryId')
    async getReportPriceHistory(@Param('reportPriceHistoryId') reportPriceHistoryId: string) {
        return await this.reportPriceHistoryService.getReportPriceHistoryById(reportPriceHistoryId);
    }

    @Post('/create')
    @UsePipes(new ValidationPipe())
    async createReportPriceHistory(@Body() createReportPriceHistoryDTO: CreateReportPriceHistoryDTO) {
        return await this.reportPriceHistoryService.createReportPriceHistory(createReportPriceHistoryDTO);
    }

    @Put('/update')
    @UsePipes(new ValidationPipe())
    async updateReportPriceHistory(@Body() updateReportPriceHistoryDTO: UpdateReportPriceHistoryDTO) {
        return await this.reportPriceHistoryService.updateReportPriceHistory(updateReportPriceHistoryDTO);
    }

}