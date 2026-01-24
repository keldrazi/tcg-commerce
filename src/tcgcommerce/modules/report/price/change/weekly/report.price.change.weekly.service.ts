import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateReportPriceChangeWeeklyDTO, UpdateReportPriceChangeWeeklyDTO, ReportPriceChangeWeeklyDTO } from './dto/report.price.change.weekly.dto';
import { ReportPriceChangeWeeklyDefaultSettings, ReportPriceChangeWeeklyCategory } from './interface/report.price.change.weekly.interface';
import { ReportPriceChangeWeekly } from 'src/typeorm/entities/tcgcommerce/modules/report/price/change/weekly/report.price.change.weekly.entity';

@Injectable()
export class ReportPriceChangeWeeklyService {

    constructor(
        @InjectRepository(ReportPriceChangeWeekly) private reportPriceChangeWeeklyRepository: Repository<ReportPriceChangeWeekly>,
    ) { }

    async getReportPriceChangeWeeklyById(reportPriceChangeWeeklyId: string): Promise<ReportPriceChangeWeeklyDTO> {
        let reportPriceChangeWeekly = await this.reportPriceChangeWeeklyRepository.findOneOrFail({ 
            where: { 
                reportPriceChangeWeeklyId: reportPriceChangeWeeklyId
            } 
        });

        let reportPriceChangeWeeklyDTO: ReportPriceChangeWeeklyDTO = new ReportPriceChangeWeeklyDTO();
        reportPriceChangeWeeklyDTO.productLineId = reportPriceChangeWeekly.productLineId;
        reportPriceChangeWeeklyDTO.productTypeId = reportPriceChangeWeekly.productTypeId;
        reportPriceChangeWeeklyDTO.productVendorId = reportPriceChangeWeekly.productVendorId;
        reportPriceChangeWeeklyDTO.reportPriceChangeWeeklyId = reportPriceChangeWeekly.reportPriceChangeWeeklyId;
        reportPriceChangeWeeklyDTO.reportTypeId = reportPriceChangeWeekly.reportTypeId;
        reportPriceChangeWeeklyDTO.reportPriceChangeWeeklyName = reportPriceChangeWeekly.reportPriceChangeWeeklyName;
        reportPriceChangeWeeklyDTO.reportPriceChangeWeeklyDescription = reportPriceChangeWeekly.reportPriceChangeWeeklyDescription;
        reportPriceChangeWeeklyDTO.reportPriceChangeWeeklyCategories = JSON.parse(reportPriceChangeWeekly.reportPriceChangeWeeklyCategories) as ReportPriceChangeWeeklyCategory[];
        reportPriceChangeWeeklyDTO.reportPriceChangeWeeklyDefaultSettings = JSON.parse(reportPriceChangeWeekly.reportPriceChangeWeeklyDefaultSettings) as ReportPriceChangeWeeklyDefaultSettings;
        
        return reportPriceChangeWeeklyDTO;
    }
    
    async createReportPriceChangeWeekly(createReportPriceChangeWeeklyDTO: CreateReportPriceChangeWeeklyDTO): Promise<ReportPriceChangeWeeklyDTO> {
    
        let reportPriceChangeWeekly = await this.reportPriceChangeWeeklyRepository.findOne({ 
            where: { 
                productVendorId: createReportPriceChangeWeeklyDTO.productVendorId,
                productLineId: createReportPriceChangeWeeklyDTO.productLineId,
                productTypeId: createReportPriceChangeWeeklyDTO.productTypeId, 
                reportPriceChangeWeeklyName: createReportPriceChangeWeeklyDTO.reportPriceChangeWeeklyName, 
            } 
        });
        
        if (reportPriceChangeWeekly) {
            throw new ConflictException('Report price change weekly already exists');
        }
        
        reportPriceChangeWeekly = this.reportPriceChangeWeeklyRepository.create({ ...createReportPriceChangeWeeklyDTO });
        reportPriceChangeWeekly.reportPriceChangeWeeklyCategories = JSON.stringify(reportPriceChangeWeekly.reportPriceChangeWeeklyCategories);
        reportPriceChangeWeekly.reportPriceChangeWeeklyDefaultSettings = JSON.stringify(reportPriceChangeWeekly.reportPriceChangeWeeklyDefaultSettings);
        reportPriceChangeWeekly = await this.reportPriceChangeWeeklyRepository.save(reportPriceChangeWeekly);

        let reportPriceChangeWeeklyDTO = await this.getReportPriceChangeWeeklyById(reportPriceChangeWeekly.reportPriceChangeWeeklyId);
        
        return reportPriceChangeWeeklyDTO;
        
    }

    async updateReportPriceChangeWeekly(updateReportPriceChangeWeeklyDTO: UpdateReportPriceChangeWeeklyDTO): Promise<ReportPriceChangeWeeklyDTO> {
                    
        let reportPriceChangeWeekly = await this.reportPriceChangeWeeklyRepository.findOneOrFail({ 
            where: { 
                reportPriceChangeWeeklyId: updateReportPriceChangeWeeklyDTO.reportPriceChangeWeeklyId
            } 
        });

        reportPriceChangeWeekly.reportTypeId = updateReportPriceChangeWeeklyDTO.reportTypeId;
        reportPriceChangeWeekly.reportPriceChangeWeeklyName = updateReportPriceChangeWeeklyDTO.reportPriceChangeWeeklyName;
        reportPriceChangeWeekly.reportPriceChangeWeeklyDescription = updateReportPriceChangeWeeklyDTO.reportPriceChangeWeeklyDescription;
        reportPriceChangeWeekly.reportPriceChangeWeeklyCategories = JSON.stringify(updateReportPriceChangeWeeklyDTO.reportPriceChangeWeeklyCategories);
        reportPriceChangeWeekly.reportPriceChangeWeeklyDefaultSettings = JSON.stringify(updateReportPriceChangeWeeklyDTO.reportPriceChangeWeeklyDefaultSettings);

        reportPriceChangeWeekly.reportPriceChangeWeeklyUpdateDate = new Date();
        
        await this.reportPriceChangeWeeklyRepository.save(reportPriceChangeWeekly);
        let reportPriceChangeWeeklyDTO = await this.getReportPriceChangeWeeklyById(reportPriceChangeWeekly.reportPriceChangeWeeklyId);

        return reportPriceChangeWeeklyDTO;
    
    }
    
}