import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateReportPriceChangeDailyDTO, UpdateReportPriceChangeDailyDTO, ReportPriceChangeDailyDTO } from './dto/report.price.change.daily.dto';
import { ReportPriceChangeDailyDefaultSettings, ReportPriceChangeDailyCategory } from './interface/report.price.change.daily.interface';
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
        reportPriceChangeDailyDTO.reportTypeId = reportPriceChangeDaily.reportTypeId;
        reportPriceChangeDailyDTO.reportPriceChangeDailyName = reportPriceChangeDaily.reportPriceChangeDailyName;
        reportPriceChangeDailyDTO.reportPriceChangeDailyDescription = reportPriceChangeDaily.reportPriceChangeDailyDescription;
        reportPriceChangeDailyDTO.reportPriceChangeDailyCategories = JSON.parse(reportPriceChangeDaily.reportPriceChangeDailyCategories) as ReportPriceChangeDailyCategory[];
        reportPriceChangeDailyDTO.reportPriceChangeDailyDefaultSettings = JSON.parse(reportPriceChangeDaily.reportPriceChangeDailyDefaultSettings) as ReportPriceChangeDailyDefaultSettings;
        
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
        reportPriceChangeDaily.reportPriceChangeDailyDefaultSettings = JSON.stringify(reportPriceChangeDaily.reportPriceChangeDailyDefaultSettings);
        reportPriceChangeDaily = await this.reportPriceChangeDailyRepository.save(reportPriceChangeDaily);

        let reportPriceChangeDailyDTO = await this.getReportPriceChangeDaily(reportPriceChangeDaily.reportPriceChangeDailyId);
        
        return reportPriceChangeDailyDTO;
        
    }

    async updateReportPriceChangeDaily(updateReportPriceChangeDailyDTO: UpdateReportPriceChangeDailyDTO) {
                    
        let reportPriceChangeDaily = await this.reportPriceChangeDailyRepository.findOne({ 
            where: { 
                reportPriceChangeDailyId: updateReportPriceChangeDailyDTO.reportPriceChangeDailyId
            } 
        });

        if (!reportPriceChangeDaily) {
            return this.errorMessageService.createErrorMessage('REPORT_PRICE_CHANGE_DAILY_NOT_FOUND', 'Report price change daily was not found'); 
        }
        reportPriceChangeDaily.reportTypeId = updateReportPriceChangeDailyDTO.reportTypeId;
        reportPriceChangeDaily.reportPriceChangeDailyName = updateReportPriceChangeDailyDTO.reportPriceChangeDailyName;
        reportPriceChangeDaily.reportPriceChangeDailyDescription = updateReportPriceChangeDailyDTO.reportPriceChangeDailyDescription;
        reportPriceChangeDaily.reportPriceChangeDailyCategories = JSON.stringify(updateReportPriceChangeDailyDTO.reportPriceChangeDailyCategories);
        reportPriceChangeDaily.reportPriceChangeDailyDefaultSettings = JSON.stringify(updateReportPriceChangeDailyDTO.reportPriceChangeDailyDefaultSettings);

        reportPriceChangeDaily.reportPriceChangeDailyUpdateDate = new Date();
        
        await this.reportPriceChangeDailyRepository.save(reportPriceChangeDaily);
        let reportPriceChangeDailyDTO = await this.getReportPriceChangeDaily(reportPriceChangeDaily.reportPriceChangeDailyId);

        return reportPriceChangeDailyDTO;
    
    }
    
}