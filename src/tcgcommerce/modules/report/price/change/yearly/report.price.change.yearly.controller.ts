import { Controller, Get, Post, Body, Put, Param, UsePipes, ValidationPipe, NotFoundException, InternalServerErrorException, ConflictException } from '@nestjs/common';
import { CreateReportPriceChangeYearlyDTO, UpdateReportPriceChangeYearlyDTO } from './dto/report.price.change.yearly.dto';
import { ReportPriceChangeYearlyService } from './report.price.change.yearly.service';
import { EntityNotFoundError } from 'typeorm';

@Controller('report/price/change/yearly')
export class ReportPriceChangeYearlyController {

    constructor(
        private reportPriceChangeYearlyService: ReportPriceChangeYearlyService,
    ) { }
    
    @Get('/id/:reportPriceChangeYearlyId')
    async getReportPriceChangeYearlyById(@Param('reportPriceChangeYearlyId') reportPriceChangeYearlyId: string) {
        try {
            return await this.reportPriceChangeYearlyService.getReportPriceChangeYearlyById(reportPriceChangeYearlyId);
        } catch (e) {
            if(e instanceof EntityNotFoundError) {
                throw new NotFoundException('Report price yearly not found');
            }
            throw new InternalServerErrorException('Failed to get report price yearly by ID');
        }
    }

    @Post('/create')
    @UsePipes(new ValidationPipe())
    async createReportPriceChangeYearly(@Body() createReportPriceChangeYearlyDTO: CreateReportPriceChangeYearlyDTO) {
        try {
            return await this.reportPriceChangeYearlyService.createReportPriceChangeYearly(createReportPriceChangeYearlyDTO);
            } catch (e) {
            if(e instanceof ConflictException) {
                throw e;
            }
            throw new InternalServerErrorException('Failed to create report price yearly');
        }
    }

    @Put('/update')
    @UsePipes(new ValidationPipe())
    async updateReportPriceChangeYearly(@Body() updateReportPriceChangeYearlyDTO: UpdateReportPriceChangeYearlyDTO) {
        try {
            return await this.reportPriceChangeYearlyService.updateReportPriceChangeYearly(updateReportPriceChangeYearlyDTO);
        } catch (e) {
            if(e instanceof EntityNotFoundError) {
                throw new NotFoundException('Report price yearly not found');
            }
            throw new InternalServerErrorException('Failed to update report price yearly');
        }
    }

}