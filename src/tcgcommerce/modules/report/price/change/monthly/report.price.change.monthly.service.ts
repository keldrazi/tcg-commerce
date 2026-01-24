import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateReportPriceChangeMonthlyDTO, UpdateReportPriceChangeMonthlyDTO, ReportPriceChangeMonthlyDTO } from './dto/report.price.change.monthly.dto';
import { ReportPriceChangeMonthlyDefaultSettings, ReportPriceChangeMonthlyCategory } from './interface/report.price.change.monthly.interface';
import { ReportPriceChangeMonthly } from 'src/typeorm/entities/tcgcommerce/modules/report/price/change/monthly/report.price.change.monthly.entity';

@Injectable()
export class ReportPriceChangeMonthlyService {

    constructor(
        @InjectRepository(ReportPriceChangeMonthly) private reportPriceChangeMonthlyRepository: Repository<ReportPriceChangeMonthly>,
    ) { }

    async getReportPriceChangeMonthlyById(reportPriceChangeMonthlyId: string): Promise<ReportPriceChangeMonthlyDTO> {
        let reportPriceChangeMonthly = await this.reportPriceChangeMonthlyRepository.findOneOrFail({ 
            where: { 
                reportPriceChangeMonthlyId: reportPriceChangeMonthlyId
            } 
        });

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
    
    async createReportPriceChangeMonthly(createReportPriceChangeMonthlyDTO: CreateReportPriceChangeMonthlyDTO): Promise<ReportPriceChangeMonthlyDTO> {
    
        let reportPriceChangeMonthly = await this.reportPriceChangeMonthlyRepository.findOne({ 
            where: { 
                productVendorId: createReportPriceChangeMonthlyDTO.productVendorId,
                productLineId: createReportPriceChangeMonthlyDTO.productLineId,
                productTypeId: createReportPriceChangeMonthlyDTO.productTypeId, 
                reportPriceChangeMonthlyName: createReportPriceChangeMonthlyDTO.reportPriceChangeMonthlyName, 
            } 
        });
        
        if (reportPriceChangeMonthly) {
            throw new ConflictException('Report price change monthly already exists');
        }
        
        reportPriceChangeMonthly = this.reportPriceChangeMonthlyRepository.create({ ...createReportPriceChangeMonthlyDTO });
        reportPriceChangeMonthly.reportPriceChangeMonthlyCategories = JSON.stringify(reportPriceChangeMonthly.reportPriceChangeMonthlyCategories);
        reportPriceChangeMonthly.reportPriceChangeMonthlyDefaultSettings = JSON.stringify(reportPriceChangeMonthly.reportPriceChangeMonthlyDefaultSettings);
        reportPriceChangeMonthly = await this.reportPriceChangeMonthlyRepository.save(reportPriceChangeMonthly);

        let reportPriceChangeMonthlyDTO = await this.getReportPriceChangeMonthlyById(reportPriceChangeMonthly.reportPriceChangeMonthlyId);
        
        return reportPriceChangeMonthlyDTO;
        
    }

    async updateReportPriceChangeMonthly(updateReportPriceChangeMonthlyDTO: UpdateReportPriceChangeMonthlyDTO): Promise<ReportPriceChangeMonthlyDTO> {
                    
        let reportPriceChangeMonthly = await this.reportPriceChangeMonthlyRepository.findOneOrFail({ 
            where: { 
                reportPriceChangeMonthlyId: updateReportPriceChangeMonthlyDTO.reportPriceChangeMonthlyId
            } 
        });

        reportPriceChangeMonthly.reportPriceChangeMonthlyName = updateReportPriceChangeMonthlyDTO.reportPriceChangeMonthlyName;
        reportPriceChangeMonthly.reportPriceChangeMonthlyDescription = updateReportPriceChangeMonthlyDTO.reportPriceChangeMonthlyDescription;
        reportPriceChangeMonthly.reportPriceChangeMonthlyCategories = JSON.stringify(updateReportPriceChangeMonthlyDTO.reportPriceChangeMonthlyCategories);
        reportPriceChangeMonthly.reportPriceChangeMonthlyDefaultSettings = JSON.stringify(updateReportPriceChangeMonthlyDTO.reportPriceChangeMonthlyDefaultSettings);
        reportPriceChangeMonthly.reportPriceChangeMonthlyUpdateDate = new Date();
        
        await this.reportPriceChangeMonthlyRepository.save(reportPriceChangeMonthly);

        let reportPriceChangeMonthlyDTO = await this.getReportPriceChangeMonthlyById(reportPriceChangeMonthly.reportPriceChangeMonthlyId);

        return reportPriceChangeMonthlyDTO;
    
    }
    
}