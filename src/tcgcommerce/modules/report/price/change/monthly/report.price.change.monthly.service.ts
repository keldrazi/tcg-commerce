import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateReportPriceChangeMonthlyDTO, UpdateReportPriceChangeMonthlyDTO, ReportPriceChangeMonthlyDTO } from './dto/report.price.change.monthly.dto';
import { ReportPriceChangeMonthlyDefaultSettings, ReportPriceChangeMonthlyCategory } from './interface/report.price.change.monthly.interface';
import { ReportPriceChangeMonthly } from 'src/typeorm/entities/tcgcommerce/modules/report/price/change/monthly/report.price.change.monthly.entity';
import { ErrorMessageService } from 'src/system/modules/error/message/error.message.service';

@Injectable()
export class ReportPriceChangeMonthlyService {

    constructor(
        @InjectRepository(ReportPriceChangeMonthly) private reportPriceChangeMonthlyRepository: Repository<ReportPriceChangeMonthly>,
        private errorMessageService: ErrorMessageService,
    ) { }

    async getReportPriceChangeMonthly(reportPriceChangeMonthlyId: string) {
        let reportPriceChangeMonthly = await this.reportPriceChangeMonthlyRepository.findOne({ 
            where: { 
                reportPriceChangeMonthlyId: reportPriceChangeMonthlyId
            } 
        });

        if (reportPriceChangeMonthly == null) {
            return this.errorMessageService.createErrorMessage('REPORT_PRICE_CHANGE_MONTHLY_NOT_FOUND', 'Report price change monthly was not found');
        }

        let reportPriceChangeMonthlyDTO: ReportPriceChangeMonthlyDTO = new ReportPriceChangeMonthlyDTO();
        reportPriceChangeMonthlyDTO.productLineId = reportPriceChangeMonthly.productLineId;
        reportPriceChangeMonthlyDTO.productTypeId = reportPriceChangeMonthly.productTypeId;
        reportPriceChangeMonthlyDTO.productVendorId = reportPriceChangeMonthly.productVendorId;
        reportPriceChangeMonthlyDTO.reportPriceChangeMonthlyId = reportPriceChangeMonthly.reportPriceChangeMonthlyId;
        reportPriceChangeMonthlyDTO.reportTypeId = reportPriceChangeMonthly.reportTypeId;
        reportPriceChangeMonthlyDTO.reportPriceChangeMonthlyName = reportPriceChangeMonthly.reportPriceChangeMonthlyName;
        reportPriceChangeMonthlyDTO.reportPriceChangeMonthlyDescription = reportPriceChangeMonthly.reportPriceChangeMonthlyDescription;
        reportPriceChangeMonthlyDTO.reportPriceChangeMonthlyCategories = JSON.parse(reportPriceChangeMonthly.reportPriceChangeMonthlyCategories) as ReportPriceChangeMonthlyCategory[];
        reportPriceChangeMonthlyDTO.reportPriceChangeMonthlyDefaultSettings = JSON.parse(reportPriceChangeMonthly.reportPriceChangeMonthlyDefaultSettings) as ReportPriceChangeMonthlyDefaultSettings;
        
        return reportPriceChangeMonthlyDTO;
    }
    
    async createReportPriceChangeMonthly(createReportPriceChangeMonthlyDTO: CreateReportPriceChangeMonthlyDTO) {
    
        //CHECK TO SEE IF THE PRODUCT CARD TYPE ALREADY EXISTS;
        let reportPriceChangeMonthly = await this.reportPriceChangeMonthlyRepository.findOne({ 
            where: { 
                productVendorId: createReportPriceChangeMonthlyDTO.productVendorId,
                productLineId: createReportPriceChangeMonthlyDTO.productLineId,
                productTypeId: createReportPriceChangeMonthlyDTO.productTypeId, 
                reportPriceChangeMonthlyName: createReportPriceChangeMonthlyDTO.reportPriceChangeMonthlyName, 
            } 
        });
        
        if (reportPriceChangeMonthly != null) {
            return this.errorMessageService.createErrorMessage('REPORT_PRICE_CHANGE_MONTHLY_ALREADY_EXISTS', 'Report price change monthly already exists');
        }
        
        reportPriceChangeMonthly = this.reportPriceChangeMonthlyRepository.create({ ...createReportPriceChangeMonthlyDTO });
        reportPriceChangeMonthly.reportPriceChangeMonthlyCategories = JSON.stringify(reportPriceChangeMonthly.reportPriceChangeMonthlyCategories);
        reportPriceChangeMonthly.reportPriceChangeMonthlyDefaultSettings = JSON.stringify(reportPriceChangeMonthly.reportPriceChangeMonthlyDefaultSettings);
        reportPriceChangeMonthly = await this.reportPriceChangeMonthlyRepository.save(reportPriceChangeMonthly);

        let reportPriceChangeMonthlyDTO = await this.getReportPriceChangeMonthly(reportPriceChangeMonthly.reportPriceChangeMonthlyId);
        
        return reportPriceChangeMonthlyDTO;
        
    }

    async updateReportPriceChangeMonthly(updateReportPriceChangeMonthlyDTO: UpdateReportPriceChangeMonthlyDTO) {
                    
        let reportPriceChangeMonthly = await this.reportPriceChangeMonthlyRepository.findOne({ 
            where: { 
                reportPriceChangeMonthlyId: updateReportPriceChangeMonthlyDTO.reportPriceChangeMonthlyId
            } 
        });

        if (!reportPriceChangeMonthly) {
            return this.errorMessageService.createErrorMessage('REPORT_PRICE_CHANGE_MONTHLY_NOT_FOUND', 'Report price change monthly was not found'); 
        }

        reportPriceChangeMonthly.reportPriceChangeMonthlyName = updateReportPriceChangeMonthlyDTO.reportPriceChangeMonthlyName;
        reportPriceChangeMonthly.reportPriceChangeMonthlyDescription = updateReportPriceChangeMonthlyDTO.reportPriceChangeMonthlyDescription;
        reportPriceChangeMonthly.reportPriceChangeMonthlyCategories = JSON.stringify(updateReportPriceChangeMonthlyDTO.reportPriceChangeMonthlyCategories);
        reportPriceChangeMonthly.reportPriceChangeMonthlyDefaultSettings = JSON.stringify(updateReportPriceChangeMonthlyDTO.reportPriceChangeMonthlyDefaultSettings);

        reportPriceChangeMonthly.reportPriceChangeMonthlyUpdateDate = new Date();
        
        await this.reportPriceChangeMonthlyRepository.save(reportPriceChangeMonthly);
        let reportPriceChangeMonthlyDTO = await this.getReportPriceChangeMonthly(reportPriceChangeMonthly.reportPriceChangeMonthlyId);

        return reportPriceChangeMonthlyDTO;
    
    }
    
}