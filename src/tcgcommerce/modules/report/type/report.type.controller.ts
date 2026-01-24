import { Controller, Get, Post, Body, Put, Param, UsePipes, ValidationPipe, NotFoundException, InternalServerErrorException, ConflictException } from '@nestjs/common';
import { CreateReportTypeDTO, UpdateReportTypeDTO } from './dto/report.type.dto';
import { ReportTypeService } from './report.type.service';
import { EntityNotFoundError } from 'typeorm';

@Controller('report/type')
export class ReportTypeController {

    constructor(
        private reportTypeService: ReportTypeService,
    ) { }
    
    @Get('/id/:reportTypeId')
    async getReportType(@Param('reportTypeId') reportTypeId: string) {
        try {
            return await this.reportTypeService.getReportTypeById(reportTypeId);
        } catch (e) {
            if(e instanceof EntityNotFoundError) {
                throw new NotFoundException('Report type not found');
            }
            throw new InternalServerErrorException('Failed to get report type by ID');
        }
    }

    @Get()
    async getReportTypes() {
        try {
            return await this.reportTypeService.getReportTypes();
        } catch (e) {
            throw new InternalServerErrorException('Failed to get report types');
        }
    }

    @Post('/create')
    @UsePipes(new ValidationPipe())
    async createReportType(@Body() createReportTypeDTO: CreateReportTypeDTO) {
        try {
            return await this.reportTypeService.createReportType(createReportTypeDTO);
        } catch (e) {
            if(e instanceof ConflictException) {
                throw e;
            }
            throw new InternalServerErrorException('Failed to create report type');
        }
    }

    @Put('/update')
    @UsePipes(new ValidationPipe())
    async updateReportType(@Body() updateReportTypeDTO: UpdateReportTypeDTO) {
        try {
            return await this.reportTypeService.updateReportType(updateReportTypeDTO);
        } catch (e) {
            if(e instanceof EntityNotFoundError) {
                throw new NotFoundException('Report type not found');
            }
            throw new InternalServerErrorException('Failed to update report type');
        }
    }

}