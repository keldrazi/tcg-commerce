import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateReportPriceChangeYearlyDTO, UpdateReportPriceChangeYearlyDTO, ReportPriceChangeYearlyDTO } from './dto/report.price.change.yearly.dto';
import { ReportPriceChangeYearlyDefaultSettings, ReportPriceChangeYearlyCategory } from './interface/report.price.change.yearly.interface';
import { ReportPriceChangeYearly } from 'src/typeorm/entities/tcgcommerce/modules/report/price/change/yearly/report.price.change.yearly.entity';
import { ErrorMessageService } from 'src/system/modules/error/message/error.message.service';


@Injectable()
export class ReportPriceChangeYearlyService {

    constructor(
        @InjectRepository(ReportPriceChangeYearly) private reportPriceChangeYearlyRepository: Repository<ReportPriceChangeYearly>,
        private errorMessageService: ErrorMessageService,
    ) { }

    async getReportPriceChangeYearlyById(reportPriceChangeYearlyId: string) {
        let reportPriceChangeYearly = await this.reportPriceChangeYearlyRepository.findOne({ 
            where: { 
                reportPriceChangeYearlyId: reportPriceChangeYearlyId
            } 
        });

        if (reportPriceChangeYearly == null) {
            return this.errorMessageService.createErrorMessage('REPORT_PRICE_CHANGE_YEARLY_NOT_FOUND', 'Report price change yearly was not found');
        }

        let reportPriceChangeYearlyDTO: ReportPriceChangeYearlyDTO = new ReportPriceChangeYearlyDTO();
        reportPriceChangeYearlyDTO.productLineId = reportPriceChangeYearly.productLineId;
        reportPriceChangeYearlyDTO.productTypeId = reportPriceChangeYearly.productTypeId;
        reportPriceChangeYearlyDTO.productVendorId = reportPriceChangeYearly.productVendorId;
        reportPriceChangeYearlyDTO.reportPriceChangeYearlyId = reportPriceChangeYearly.reportPriceChangeYearlyId;
        reportPriceChangeYearlyDTO.reportTypeId = reportPriceChangeYearly.reportTypeId;
        reportPriceChangeYearlyDTO.reportPriceChangeYearlyName = reportPriceChangeYearly.reportPriceChangeYearlyName;
        reportPriceChangeYearlyDTO.reportPriceChangeYearlyDescription = reportPriceChangeYearly.reportPriceChangeYearlyDescription;
        reportPriceChangeYearlyDTO.reportPriceChangeYearlyCategories = JSON.parse(reportPriceChangeYearly.reportPriceChangeYearlyCategories) as ReportPriceChangeYearlyCategory[];
        reportPriceChangeYearlyDTO.reportPriceChangeYearlyDefaultSettings = JSON.parse(reportPriceChangeYearly.reportPriceChangeYearlyDefaultSettings) as ReportPriceChangeYearlyDefaultSettings;
        
        return reportPriceChangeYearlyDTO;
    }
    
    async createReportPriceChangeYearly(createReportPriceChangeYearlyDTO: CreateReportPriceChangeYearlyDTO) {
    
        let reportPriceChangeYearly = await this.reportPriceChangeYearlyRepository.findOne({ 
            where: { 
                productVendorId: createReportPriceChangeYearlyDTO.productVendorId,
                productLineId: createReportPriceChangeYearlyDTO.productLineId,
                productTypeId: createReportPriceChangeYearlyDTO.productTypeId, 
                reportPriceChangeYearlyName: createReportPriceChangeYearlyDTO.reportPriceChangeYearlyName, 
            } 
        });
        
        if (reportPriceChangeYearly != null) {
            return this.errorMessageService.createErrorMessage('REPORT_PRICE_CHANGE_YEARLY_ALREADY_EXISTS', 'Report price change yearly already exists');
        }
        
        reportPriceChangeYearly = this.reportPriceChangeYearlyRepository.create({ ...createReportPriceChangeYearlyDTO });
        reportPriceChangeYearly.reportPriceChangeYearlyCategories = JSON.stringify(reportPriceChangeYearly.reportPriceChangeYearlyCategories);
        reportPriceChangeYearly.reportPriceChangeYearlyDefaultSettings = JSON.stringify(reportPriceChangeYearly.reportPriceChangeYearlyDefaultSettings);
        reportPriceChangeYearly = await this.reportPriceChangeYearlyRepository.save(reportPriceChangeYearly);

        let reportPriceChangeYearlyDTO = await this.getReportPriceChangeYearlyById(reportPriceChangeYearly.reportPriceChangeYearlyId);
        
        return reportPriceChangeYearlyDTO;
        
    }

    async updateReportPriceChangeYearly(updateReportPriceChangeYearlyDTO: UpdateReportPriceChangeYearlyDTO) {
                    
        let reportPriceChangeYearly = await this.reportPriceChangeYearlyRepository.findOne({ 
            where: { 
                reportPriceChangeYearlyId: updateReportPriceChangeYearlyDTO.reportPriceChangeYearlyId
            } 
        });

        if (!reportPriceChangeYearly) {
            return this.errorMessageService.createErrorMessage('REPORT_PRICE_CHANGE_YEARLY_NOT_FOUND', 'Report price change yearly was not found'); 
        }

        reportPriceChangeYearly.reportTypeId = updateReportPriceChangeYearlyDTO.reportTypeId;
        reportPriceChangeYearly.reportPriceChangeYearlyName = updateReportPriceChangeYearlyDTO.reportPriceChangeYearlyName;
        reportPriceChangeYearly.reportPriceChangeYearlyDescription = updateReportPriceChangeYearlyDTO.reportPriceChangeYearlyDescription;
        reportPriceChangeYearly.reportPriceChangeYearlyCategories = JSON.stringify(updateReportPriceChangeYearlyDTO.reportPriceChangeYearlyCategories);
        reportPriceChangeYearly.reportPriceChangeYearlyDefaultSettings = JSON.stringify(updateReportPriceChangeYearlyDTO.reportPriceChangeYearlyDefaultSettings);

        reportPriceChangeYearly.reportPriceChangeYearlyUpdateDate = new Date();
        
        await this.reportPriceChangeYearlyRepository.save(reportPriceChangeYearly);
        
        let reportPriceChangeYearlyDTO = await this.getReportPriceChangeYearlyById(reportPriceChangeYearly.reportPriceChangeYearlyId);

        return reportPriceChangeYearlyDTO;
    
    }
    
}