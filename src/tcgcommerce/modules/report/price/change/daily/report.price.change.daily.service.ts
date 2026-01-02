import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateReportPriceChangeDailyDTO, UpdateReportPriceChangeDailyDTO, ReportPriceChangeDailyDTO } from './dto/report.price.change.daily.dto';
import { ReportPriceChangeDailySettings } from './interface/report.price.change.daily.interface';
import { ReportPriceChangeDaily } from 'src/typeorm/entities/tcgcommerce/modules/report/price/change/daily/report.price.change.daily.entity';
import { ErrorMessageService } from 'src/system/modules/error/message/error.message.service';

@Injectable()
export class ReportPriceChangeDailyService {

    constructor(
        @InjectRepository(ReportPriceChangeDaily) private reportPriceChangeDailyRepository: Repository<ReportPriceChangeDaily>,
        private errorMessageService: ErrorMessageService,
    ) { }

    async getReportPriceChangeDaily(reportPriceChangeDailyId: string) {
        let reportPriceChangeDaily = await this.reportPriceChangeDailyRepository.findOne({ 
            where: { 
                reportPriceChangeDailyId: reportPriceChangeDailyId
            } 
        });

        if (reportPriceChangeDaily == null) {
            return this.errorMessageService.createErrorMessage('REPORT_PRICE_CHANGE_DAILY_NOT_FOUND', 'Report price change daily was not found');
        }

        let reportPriceChangeDailyDTO: ReportPriceChangeDailyDTO = new ReportPriceChangeDailyDTO();
        reportPriceChangeDailyDTO.productLineId = reportPriceChangeDaily.productLineId;
        reportPriceChangeDailyDTO.productTypeId = reportPriceChangeDaily.productTypeId;
        reportPriceChangeDailyDTO.productVendorId = reportPriceChangeDaily.productVendorId;
        reportPriceChangeDailyDTO.reportPriceChangeDailyId = reportPriceChangeDaily.reportPriceChangeDailyId;
        reportPriceChangeDailyDTO.reportPriceTypeId = reportPriceChangeDaily.reportPriceTypeId;
        reportPriceChangeDailyDTO.reportPriceChangeDailyName = reportPriceChangeDaily.reportPriceChangeDailyName;
        reportPriceChangeDailyDTO.reportPriceChangeDailyDescription = reportPriceChangeDaily.reportPriceChangeDailyDescription;
        reportPriceChangeDailyDTO.reportPriceChangeDailyCategories = JSON.parse(reportPriceChangeDaily.reportPriceChangeDailyCategories);
        reportPriceChangeDailyDTO.reportPriceChangeDailySettings = JSON.parse(reportPriceChangeDaily.reportPriceChangeDailySettings) as ReportPriceChangeDailySettings;
        
        return reportPriceChangeDailyDTO;
    }
    
    async createReportPriceChangeDaily(createReportPriceChangeDailyDTO: CreateReportPriceChangeDailyDTO) {
    
        //CHECK TO SEE IF THE PRODUCT CARD TYPE ALREADY EXISTS;
        let reportPriceChangeDaily = await this.reportPriceChangeDailyRepository.findOne({ 
            where: { 
                productVendorId: createReportPriceChangeDailyDTO.productVendorId,
                productLineId: createReportPriceChangeDailyDTO.productLineId,
                productTypeId: createReportPriceChangeDailyDTO.productTypeId, 
                reportPriceChangeDailyName: createReportPriceChangeDailyDTO.reportPriceChangeDailyName, 
            } 
        });
        
        if (reportPriceChangeDaily != null) {
            return this.errorMessageService.createErrorMessage('REPORT_PRICE_CHANGE_DAILY_ALREADY_EXISTS', 'Report price change daily already exists');
        }
        
        reportPriceChangeDaily = this.reportPriceChangeDailyRepository.create({ ...createReportPriceChangeDailyDTO });
        reportPriceChangeDaily.reportPriceChangeDailyCategories = JSON.stringify(reportPriceChangeDaily.reportPriceChangeDailyCategories);
        reportPriceChangeDaily.reportPriceChangeDailySettings = JSON.stringify(reportPriceChangeDaily.reportPriceChangeDailySettings);
        reportPriceChangeDaily = await this.reportPriceChangeDailyRepository.save(reportPriceChangeDaily);

        let reportPriceChangeDailyDTO = await this.getReportPriceChangeDaily(reportPriceChangeDaily.reportPriceChangeDailyId);
        
        return reportPriceChangeDailyDTO;
        
    }

    async updateReportPriceChangeDaily(updateReportPriceChangeDailyDTO: UpdateReportPriceChangeDailyDTO) {
                    
        let existingReportPriceChangeDaily = await this.reportPriceChangeDailyRepository.findOne({ 
            where: { 
                reportPriceChangeDailyId: updateReportPriceChangeDailyDTO.reportPriceChangeDailyId
            } 
        });

        if (!existingReportPriceChangeDaily) {
            return this.errorMessageService.createErrorMessage('REPORT_PRICE_CHANGE_DAILY_NOT_FOUND', 'Report price change daily was not found'); 
        }

        existingReportPriceChangeDaily.reportPriceChangeDailyName = updateReportPriceChangeDailyDTO.reportPriceChangeDailyName;
        existingReportPriceChangeDaily.reportPriceChangeDailyDescription = updateReportPriceChangeDailyDTO.reportPriceChangeDailyDescription;
        existingReportPriceChangeDaily.reportPriceChangeDailyCategories = updateReportPriceChangeDailyDTO.reportPriceChangeDailyCategories;
        existingReportPriceChangeDaily.reportPriceChangeDailyUpdateDate = new Date();
        
        await this.reportPriceChangeDailyRepository.save(existingReportPriceChangeDaily);

        let reportPriceChangeDailyDTO = await this.getReportPriceChangeDaily(existingReportPriceChangeDaily.reportPriceChangeDailyId);

        return reportPriceChangeDailyDTO;
    
    }
    
}