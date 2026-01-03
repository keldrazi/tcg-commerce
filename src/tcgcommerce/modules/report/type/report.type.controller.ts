import { Controller, Get, Post, Body, Put, Param, ParseIntPipe, Delete, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateReportTypeDTO, UpdateReportTypeDTO } from './dto/report.type.dto';
import { ReportTypeService } from './report.type.service';

@Controller('report/type')
export class ReportTypeController {

    constructor(
        private reportTypeService: ReportTypeService,
    ) { }
    
    
    @Get('/id/:reportTypeId')
    async getReportType(@Param('reportTypeId') reportTypeId: string) {
        return await this.reportTypeService.getReportType(reportTypeId);
    }

    @Get('/all')
    async getReportTypes() {
        return await this.reportTypeService.getReportTypes();
    }

    @Post('/create')
    @UsePipes(new ValidationPipe())
    async createReportType(@Body() createReportTypeDTO: CreateReportTypeDTO) {
        return await this.reportTypeService.createReportType(createReportTypeDTO);
    }

    @Put('/update')
    @UsePipes(new ValidationPipe())
    async updateReportType(@Body() updateReportTypeDTO: UpdateReportTypeDTO) {
        return await this.reportTypeService.updateReportType(updateReportTypeDTO);
    }

}