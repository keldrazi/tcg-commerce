import { Controller, Get, Post, Body, Put, Param, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateReportPriceCurrentDTO, UpdateReportPriceCurrentDTO } from './dto/report.price.current.dto';
import { ReportPriceCurrentService } from './report.price.current.service';

@Controller('report/price/current')
export class ReportPriceCurrentController {

    constructor(
        private reportPriceCurrentService: ReportPriceCurrentService,
    ) { }
    
    @Get('/id/:reportPriceCurrentId')
    async getReportPriceCurrentById(@Param('reportPriceCurrentId') reportPriceCurrentId: string) {
        return await this.reportPriceCurrentService.getReportPriceCurrentById(reportPriceCurrentId);
    }

    @Post('/create')
    @UsePipes(new ValidationPipe())
    async createReportPriceCurrent(@Body() createReportPriceCurrentDTO: CreateReportPriceCurrentDTO) {
        return await this.reportPriceCurrentService.createReportPriceCurrent(createReportPriceCurrentDTO);
    }

    @Put('/update')
    @UsePipes(new ValidationPipe())
    async updateReportPriceCurrent(@Body() updateReportPriceCurrentDTO: UpdateReportPriceCurrentDTO) {
        return await this.reportPriceCurrentService.updateReportPriceCurrent(updateReportPriceCurrentDTO);
    }

}