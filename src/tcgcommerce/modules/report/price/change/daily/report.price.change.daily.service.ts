import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateReportPriceChangeDailyDTO, UpdateReportPriceChangeDailyDTO, ReportPriceChangeDailyDTO } from './dto/report.price.change.daily.dto';
import { ReportPriceChangeDailyDefaultSettings, ReportPriceChangeDailyCategory } from './interface/report.price.change.daily.interface';
import { ReportPriceChangeDaily } from 'src/typeorm/entities/tcgcommerce/modules/report/price/change/daily/report.price.change.daily.entity';

@Injectable()
export class ReportPriceChangeDailyService {

    constructor(
        @InjectRepository(ReportPriceChangeDaily) private reportPriceChangeDailyRepository: Repository<ReportPriceChangeDaily>,
    ) { }

    async getReportPriceChangeDailyById(reportPriceChangeDailyId: string): Promise<ReportPriceChangeDailyDTO> {
        let reportPriceChangeDaily = await this.reportPriceChangeDailyRepository.findOneOrFail({ 
            where: { 
                reportPriceChangeDailyId: reportPriceChangeDailyId
            } 
        });

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
    
    async createReportPriceChangeDaily(createReportPriceChangeDailyDTO: CreateReportPriceChangeDailyDTO): Promise<ReportPriceChangeDailyDTO> {
    
        //CHECK TO SEE IF THE PRODUCT CARD TYPE ALREADY EXISTS;
        let reportPriceChangeDaily = await this.reportPriceChangeDailyRepository.findOne({ 
            where: { 
                productVendorId: createReportPriceChangeDailyDTO.productVendorId,
                productLineId: createReportPriceChangeDailyDTO.productLineId,
                productTypeId: createReportPriceChangeDailyDTO.productTypeId, 
                reportPriceChangeDailyName: createReportPriceChangeDailyDTO.reportPriceChangeDailyName, 
            } 
        });
        
        if (reportPriceChangeDaily) {
            throw new ConflictException('Report price change daily already exists');
        }
        
        reportPriceChangeDaily = this.reportPriceChangeDailyRepository.create({ ...createReportPriceChangeDailyDTO });
        reportPriceChangeDaily.reportPriceChangeDailyCategories = JSON.stringify(reportPriceChangeDaily.reportPriceChangeDailyCategories);
        reportPriceChangeDaily.reportPriceChangeDailyDefaultSettings = JSON.stringify(reportPriceChangeDaily.reportPriceChangeDailyDefaultSettings);
        reportPriceChangeDaily = await this.reportPriceChangeDailyRepository.save(reportPriceChangeDaily);

        let reportPriceChangeDailyDTO = await this.getReportPriceChangeDailyById(reportPriceChangeDaily.reportPriceChangeDailyId);
        
        return reportPriceChangeDailyDTO;
        
    }

    async updateReportPriceChangeDaily(updateReportPriceChangeDailyDTO: UpdateReportPriceChangeDailyDTO): Promise<ReportPriceChangeDailyDTO> {
                    
        let reportPriceChangeDaily = await this.reportPriceChangeDailyRepository.findOneOrFail({ 
            where: { 
                reportPriceChangeDailyId: updateReportPriceChangeDailyDTO.reportPriceChangeDailyId
            } 
        });
    
        reportPriceChangeDaily.reportTypeId = updateReportPriceChangeDailyDTO.reportTypeId;
        reportPriceChangeDaily.reportPriceChangeDailyName = updateReportPriceChangeDailyDTO.reportPriceChangeDailyName;
        reportPriceChangeDaily.reportPriceChangeDailyDescription = updateReportPriceChangeDailyDTO.reportPriceChangeDailyDescription;
        reportPriceChangeDaily.reportPriceChangeDailyCategories = JSON.stringify(updateReportPriceChangeDailyDTO.reportPriceChangeDailyCategories);
        reportPriceChangeDaily.reportPriceChangeDailyDefaultSettings = JSON.stringify(updateReportPriceChangeDailyDTO.reportPriceChangeDailyDefaultSettings);
        reportPriceChangeDaily.reportPriceChangeDailyUpdateDate = new Date();
        
        await this.reportPriceChangeDailyRepository.save(reportPriceChangeDaily);

        let reportPriceChangeDailyDTO = await this.getReportPriceChangeDailyById(reportPriceChangeDaily.reportPriceChangeDailyId);

        return reportPriceChangeDailyDTO;
    
    }
    
}