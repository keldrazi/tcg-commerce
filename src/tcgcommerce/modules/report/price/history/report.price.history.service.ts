import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateReportPriceHistoryDTO, UpdateReportPriceHistoryDTO, ReportPriceHistoryDTO } from './dto/report.price.history.dto';
import { ReportPriceHistoryDefaultSettings, ReportPriceHistoryCategory } from './interface/report.price.history.interface';
import { ReportPriceHistory } from 'src/typeorm/entities/tcgcommerce/modules/report/price/history/report.price.history.entity';

@Injectable()
export class ReportPriceHistoryService {

    constructor(
        @InjectRepository(ReportPriceHistory) private reportPriceHistoryRepository: Repository<ReportPriceHistory>,
    ) { }

    async getReportPriceHistoryById(reportPriceHistoryId: string): Promise<ReportPriceHistoryDTO> {
        let reportPriceHistory = await this.reportPriceHistoryRepository.findOneOrFail({ 
            where: { 
                reportPriceHistoryId: reportPriceHistoryId
            } 
        });

        let reportPriceHistoryDTO: ReportPriceHistoryDTO = new ReportPriceHistoryDTO();
        reportPriceHistoryDTO.productLineId = reportPriceHistory.productLineId;
        reportPriceHistoryDTO.productTypeId = reportPriceHistory.productTypeId;
        reportPriceHistoryDTO.productVendorId = reportPriceHistory.productVendorId;
        reportPriceHistoryDTO.reportPriceHistoryId = reportPriceHistory.reportPriceHistoryId;
        reportPriceHistoryDTO.reportTypeId = reportPriceHistory.reportTypeId;
        reportPriceHistoryDTO.reportPriceHistoryName = reportPriceHistory.reportPriceHistoryName;
        reportPriceHistoryDTO.reportPriceHistoryDescription = reportPriceHistory.reportPriceHistoryDescription;
        reportPriceHistoryDTO.reportPriceHistoryCategories = JSON.parse(reportPriceHistory.reportPriceHistoryCategories) as ReportPriceHistoryCategory[];
        reportPriceHistoryDTO.reportPriceHistoryDefaultSettings = JSON.parse(reportPriceHistory.reportPriceHistoryDefaultSettings) as ReportPriceHistoryDefaultSettings;
        
        return reportPriceHistoryDTO;
    }
    
    async createReportPriceHistory(createReportPriceHistoryDTO: CreateReportPriceHistoryDTO): Promise<ReportPriceHistoryDTO> {
    
        let reportPriceHistory = await this.reportPriceHistoryRepository.findOne({ 
            where: { 
                productVendorId: createReportPriceHistoryDTO.productVendorId,
                productLineId: createReportPriceHistoryDTO.productLineId,
                productTypeId: createReportPriceHistoryDTO.productTypeId, 
                reportPriceHistoryName: createReportPriceHistoryDTO.reportPriceHistoryName, 
            } 
        });
        
        if (reportPriceHistory) {
            throw new ConflictException('Report price history already exists');
        }
        
        reportPriceHistory = this.reportPriceHistoryRepository.create({ ...createReportPriceHistoryDTO });
        reportPriceHistory.reportPriceHistoryCategories = JSON.stringify(reportPriceHistory.reportPriceHistoryCategories);
        reportPriceHistory.reportPriceHistoryDefaultSettings = JSON.stringify(reportPriceHistory.reportPriceHistoryDefaultSettings);
        reportPriceHistory = await this.reportPriceHistoryRepository.save(reportPriceHistory);

        let reportPriceHistoryDTO = await this.getReportPriceHistoryById(reportPriceHistory.reportPriceHistoryId);
        
        return reportPriceHistoryDTO;
        
    }

    async updateReportPriceHistory(updateReportPriceHistoryDTO: UpdateReportPriceHistoryDTO): Promise<ReportPriceHistoryDTO> {
                    
        let reportPriceHistory = await this.reportPriceHistoryRepository.findOneOrFail({ 
            where: { 
                reportPriceHistoryId: updateReportPriceHistoryDTO.reportPriceHistoryId
            } 
        });

        reportPriceHistory.reportTypeId = updateReportPriceHistoryDTO.reportTypeId;
        reportPriceHistory.reportPriceHistoryName = updateReportPriceHistoryDTO.reportPriceHistoryName;
        reportPriceHistory.reportPriceHistoryDescription = updateReportPriceHistoryDTO.reportPriceHistoryDescription;
        reportPriceHistory.reportPriceHistoryCategories = JSON.stringify(updateReportPriceHistoryDTO.reportPriceHistoryCategories);
        reportPriceHistory.reportPriceHistoryDefaultSettings = JSON.stringify(updateReportPriceHistoryDTO.reportPriceHistoryDefaultSettings);

        reportPriceHistory.reportPriceHistoryUpdateDate = new Date();
        
        await this.reportPriceHistoryRepository.save(reportPriceHistory);
        
        let reportPriceHistoryDTO = await this.getReportPriceHistoryById(reportPriceHistory.reportPriceHistoryId);

        return reportPriceHistoryDTO;
    
    }
    
}