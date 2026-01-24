import { Controller, Get, Post, Body, Put, Param, ParseIntPipe, Delete, UseGuards, UsePipes, ValidationPipe, NotFoundException, InternalServerErrorException, ConflictException } from '@nestjs/common';
import { CreateReportPriceChangeMonthlyDTO, UpdateReportPriceChangeMonthlyDTO } from './dto/report.price.change.monthly.dto';
import { ReportPriceChangeMonthlyService } from './report.price.change.monthly.service';
import { EntityNotFoundError } from 'typeorm';

@Controller('report/price/change/monthly')
export class ReportPriceChangeMonthlyController {

    constructor(
        private reportPriceChangeMonthlyService: ReportPriceChangeMonthlyService,
    ) { }
    
    @Get('/id/:reportPriceChangeMonthlyId')
    async getReportPriceChangeMonthlyById(@Param('reportPriceChangeMonthlyId') reportPriceChangeMonthlyId: string) {
        try {
            return await this.reportPriceChangeMonthlyService.getReportPriceChangeMonthlyById(reportPriceChangeMonthlyId);
        } catch (e) {
            if(e instanceof EntityNotFoundError) {
                throw new NotFoundException('Report price monthly not found');
            }
            throw new InternalServerErrorException('Failed to get report price monthly by ID');
        }
    }

    @Post('/create')
    @UsePipes(new ValidationPipe())
    async createReportPriceChangeMonthly(@Body() createReportPriceChangeMonthlyDTO: CreateReportPriceChangeMonthlyDTO) {
        try {
            return await this.reportPriceChangeMonthlyService.createReportPriceChangeMonthly(createReportPriceChangeMonthlyDTO);
        } catch (e) {
            if(e instanceof ConflictException) {
                throw e;
            }
            throw new InternalServerErrorException('Failed to create report price monthly');
        }
    }

    @Put('/update')
    @UsePipes(new ValidationPipe())
    async updateReportPriceChangeMonthly(@Body() updateReportPriceChangeMonthlyDTO: UpdateReportPriceChangeMonthlyDTO) {
        try {
            return await this.reportPriceChangeMonthlyService.updateReportPriceChangeMonthly(updateReportPriceChangeMonthlyDTO);
        } catch (e) {
            if(e instanceof EntityNotFoundError) {
                throw new NotFoundException('Report price monthly not found');
            }
            throw new InternalServerErrorException('Failed to update report price monthly');
        }
    }

}