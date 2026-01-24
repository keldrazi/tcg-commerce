import { Controller, Get, Post, Body, Put, Param, UsePipes, ValidationPipe, InternalServerErrorException, NotFoundException, ConflictException } from '@nestjs/common';
import { CreateReportPriceCurrentDTO, UpdateReportPriceCurrentDTO } from './dto/report.price.current.dto';
import { ReportPriceCurrentService } from './report.price.current.service';
import { EntityNotFoundError } from 'typeorm';

@Controller('report/price/current')
export class ReportPriceCurrentController {

    constructor(
        private reportPriceCurrentService: ReportPriceCurrentService,
    ) { }
    
    @Get('/id/:reportPriceCurrentId')
    async getReportPriceCurrentById(@Param('reportPriceCurrentId') reportPriceCurrentId: string) {
        try {
            return await this.reportPriceCurrentService.getReportPriceCurrentById(reportPriceCurrentId);
        } catch (e) {
            if(e instanceof EntityNotFoundError) {
                throw new NotFoundException('Report price current not found');
            }
            throw new InternalServerErrorException('Failed to get report price current by ID');
        }
    }

    @Post('/create')
    @UsePipes(new ValidationPipe())
    async createReportPriceCurrent(@Body() createReportPriceCurrentDTO: CreateReportPriceCurrentDTO) {
        try {
            return await this.reportPriceCurrentService.createReportPriceCurrent(createReportPriceCurrentDTO);
        } catch (e) {
            if(e instanceof ConflictException) {
                throw e;
            }
            throw new InternalServerErrorException('Failed to create report price current');
        }
    }

    @Put('/update')
    @UsePipes(new ValidationPipe())
    async updateReportPriceCurrent(@Body() updateReportPriceCurrentDTO: UpdateReportPriceCurrentDTO) {
        try {
            return await this.reportPriceCurrentService.updateReportPriceCurrent(updateReportPriceCurrentDTO);
        } catch (e) {
            if(e instanceof EntityNotFoundError) {
                throw new NotFoundException('Report price current not found');
            }
            throw new InternalServerErrorException('Failed to update report price current');
        }
    }
}