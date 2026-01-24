import { Controller, Get, Post, Body, Put, Param, UsePipes, ValidationPipe, InternalServerErrorException, NotFoundException, ConflictException } from '@nestjs/common';
import { ReportModuleService } from './report.module.service';
import { CreateReportModuleDTO, UpdateReportModuleDTO } from './dto/report.module.dto';
import { EntityNotFoundError } from 'typeorm';



@Controller('report/module')
export class ReportModuleController {

    constructor(
        private reportModuleService: ReportModuleService,
    ) { }
    
    @Get()
    async getReportModules() {
        try {
            return await this.reportModuleService.getReportModules();
        } catch (e) {
           throw new InternalServerErrorException('Failed to get report modules');
        }
    }

    @Get('/id/:reportModuleId')
    async getReportModuleById(@Param('reportModuleId') reportModuleId: string) {
        try {
            return await this.reportModuleService.getReportModuleById(reportModuleId);
        } catch (e) {
            if(e instanceof EntityNotFoundError) {
                throw new NotFoundException('Report module not found');
            }
            throw new InternalServerErrorException('Failed to get report module by ID');
        }
    }

    @Get('/caid/:commerceAccountId')
    async getReportModuleByCommerceAccountId(@Param('commerceAccountId') commerceAccountId: string) {
        try {
            return await this.reportModuleService.getReportModuleByCommerceAccountId(commerceAccountId);
        } catch (e) {
            if(e instanceof EntityNotFoundError) {
                throw new NotFoundException('Report module not found');
            }
            throw new InternalServerErrorException('Failed to get report module by ID');
        }  
    }

    @Post('/create')
    @UsePipes(new ValidationPipe())
    async createReportModule(@Body() createReportModuleDTO: CreateReportModuleDTO) {
        try{
            return await this.reportModuleService.createReportModule(createReportModuleDTO);
        } catch (e) {
            if(e instanceof ConflictException) {
                throw e;
            }
            throw new InternalServerErrorException('Failed to create report module');
        }
    }

    @Put('/update')
    @UsePipes(new ValidationPipe())
    async updateReportModule(@Body() updateReportModuleDTO: UpdateReportModuleDTO) {
        try {
            return await this.reportModuleService.updateReportModule(updateReportModuleDTO);
        } catch (e) {
            if(e instanceof EntityNotFoundError) {
                throw new NotFoundException('Report module not found');
            }
            throw new InternalServerErrorException('Failed to update report module');
        }
    }

}