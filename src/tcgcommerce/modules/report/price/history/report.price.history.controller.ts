import { Controller, Get, Post, Body, Put, Param, UsePipes, ValidationPipe, NotFoundException, InternalServerErrorException, ConflictException } from '@nestjs/common';
import { CreateReportPriceHistoryDTO, UpdateReportPriceHistoryDTO } from './dto/report.price.history.dto';
import { ReportPriceHistoryService } from './report.price.history.service';
import { EntityNotFoundError } from 'typeorm';

@Controller('report/price/history')
export class ReportPriceHistoryController {

    constructor(
        private reportPriceHistoryService: ReportPriceHistoryService,
    ) { }
    
    @Get('/id/:reportPriceHistoryId')
    async getReportPriceHistory(@Param('reportPriceHistoryId') reportPriceHistoryId: string) {
        try {
            return await this.reportPriceHistoryService.getReportPriceHistoryById(reportPriceHistoryId);
        } catch (e) {
            if(e instanceof EntityNotFoundError) {
                throw new NotFoundException('Report price history not found');
            }
            throw new InternalServerErrorException('Failed to get report price history by ID');
        }
    }

    @Post('/create')
    @UsePipes(new ValidationPipe())
    async createReportPriceHistory(@Body() createReportPriceHistoryDTO: CreateReportPriceHistoryDTO) {
        try {
            return await this.reportPriceHistoryService.createReportPriceHistory(createReportPriceHistoryDTO);
        } catch (e) {
            if(e instanceof ConflictException) {
                throw e;
            }
            throw new InternalServerErrorException('Failed to create report price history');
        }
    }

    @Put('/update')
    @UsePipes(new ValidationPipe())
    async updateReportPriceHistory(@Body() updateReportPriceHistoryDTO: UpdateReportPriceHistoryDTO) {
        try {
            return await this.reportPriceHistoryService.updateReportPriceHistory(updateReportPriceHistoryDTO);
        } catch (e) {
            if(e instanceof EntityNotFoundError) {
                throw new NotFoundException('Report price history not found');
            }
            throw new InternalServerErrorException('Failed to update report price history');
        }
    }

}