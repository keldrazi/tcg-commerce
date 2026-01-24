import { Controller, Get, Post, Body, Put, Param, ParseIntPipe, Delete, UseGuards, UsePipes, ValidationPipe, NotFoundException, InternalServerErrorException, ConflictException } from '@nestjs/common';
import { CreateReportPriceChangeDailyDTO, UpdateReportPriceChangeDailyDTO } from './dto/report.price.change.daily.dto';
import { ReportPriceChangeDailyService } from './report.price.change.daily.service';
import { EntityNotFoundError } from 'typeorm';

@Controller('report/price/change/daily')
export class ReportPriceChangeDailyController {

    constructor(
        private reportPriceChangeDailyService: ReportPriceChangeDailyService,
    ) { }
    
    @Get('/id/:reportPriceChangeDailyId')
    async getReportPriceChangeDailyById(@Param('reportPriceChangeDailyId') reportPriceChangeDailyId: string) {
        try {
            return await this.reportPriceChangeDailyService.getReportPriceChangeDailyById(reportPriceChangeDailyId);
        } catch (e) {
            if(e instanceof EntityNotFoundError) {
                throw new NotFoundException('Report price daily not found');
            }
            throw new InternalServerErrorException('Failed to get report price daily by ID');
        }
    }

    @Post('/create')
    @UsePipes(new ValidationPipe())
    async createReportPriceChangeDaily(@Body() createReportPriceChangeDailyDTO: CreateReportPriceChangeDailyDTO) {
        try {
            return await this.reportPriceChangeDailyService.createReportPriceChangeDaily(createReportPriceChangeDailyDTO);
        } catch (e) {
            if(e instanceof ConflictException) {
                throw e;
            }
            throw new InternalServerErrorException('Failed to create report price daily');
        }
    }

    @Put('/update')
    @UsePipes(new ValidationPipe())
    async updateReportPriceChangeDaily(@Body() updateReportPriceChangeDailyDTO: UpdateReportPriceChangeDailyDTO) {
        try {
            return await this.reportPriceChangeDailyService.updateReportPriceChangeDaily(updateReportPriceChangeDailyDTO);
        } catch (e) {
            if(e instanceof EntityNotFoundError) {
                throw new NotFoundException('Report price daily not found');
            }
            throw new InternalServerErrorException('Failed to update report price daily');
        }
    }

}