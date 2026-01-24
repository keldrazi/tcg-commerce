import { Controller, Get, Post, Body, Put, Param, ParseIntPipe, Delete, UseGuards, UsePipes, ValidationPipe, NotFoundException, InternalServerErrorException, ConflictException } from '@nestjs/common';
import { CreateReportPriceChangeWeeklyDTO, UpdateReportPriceChangeWeeklyDTO } from './dto/report.price.change.weekly.dto';
import { ReportPriceChangeWeeklyService } from './report.price.change.weekly.service';
import { EntityNotFoundError } from 'typeorm';

@Controller('report/price/change/weekly')
export class ReportPriceChangeWeeklyController {

    constructor(
        private reportPriceChangeWeeklyService: ReportPriceChangeWeeklyService,
    ) { }
    
    @Get('/id/:reportPriceChangeWeeklyId')
    async getReportPriceChangeWeeklyById(@Param('reportPriceChangeWeeklyId') reportPriceChangeWeeklyId: string) {
        try {
            return await this.reportPriceChangeWeeklyService.getReportPriceChangeWeeklyById(reportPriceChangeWeeklyId);
        } catch (e) {
            if(e instanceof EntityNotFoundError) {
                throw new NotFoundException('Report price weekly not found');
            }
            throw new InternalServerErrorException('Failed to get report price weekly by ID');
        }
    }

    @Post('/create')
    @UsePipes(new ValidationPipe())
    async createReportPriceChangeWeekly(@Body() createReportPriceChangeWeeklyDTO: CreateReportPriceChangeWeeklyDTO) {
        try {
            return await this.reportPriceChangeWeeklyService.createReportPriceChangeWeekly(createReportPriceChangeWeeklyDTO);
        } catch (e) {
            if(e instanceof ConflictException) {
                throw e;
            }
            throw new InternalServerErrorException('Failed to create report price weekly');
        }
    }

    @Put('/update')
    @UsePipes(new ValidationPipe())
    async updateReportPriceChangeWeekly(@Body() updateReportPriceChangeWeeklyDTO: UpdateReportPriceChangeWeeklyDTO) {
        try {
            return await this.reportPriceChangeWeeklyService.updateReportPriceChangeWeekly(updateReportPriceChangeWeeklyDTO);
        } catch (e) {
            if(e instanceof EntityNotFoundError) {
                throw new NotFoundException('Report price weekly not found');
            }
            throw new InternalServerErrorException('Failed to update report price weekly');
        }
    }

}