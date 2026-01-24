import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateReportPriceCurrentDTO, UpdateReportPriceCurrentDTO, ReportPriceCurrentDTO } from './dto/report.price.current.dto';
import { ReportPriceCurrentDefaultSettings, ReportPriceCurrentCategory } from './interface/report.price.current.interface';
import { ReportPriceCurrent } from 'src/typeorm/entities/tcgcommerce/modules/report/price/current/report.price.current.entity';


@Injectable()
export class ReportPriceCurrentService {

    constructor(
        @InjectRepository(ReportPriceCurrent) private reportPriceCurrentRepository: Repository<ReportPriceCurrent>,
    ) { }

    async getReportPriceCurrentById(reportPriceCurrentId: string): Promise<ReportPriceCurrentDTO> {
        let reportPriceCurrent = await this.reportPriceCurrentRepository.findOneOrFail({ 
            where: { 
                reportPriceCurrentId: reportPriceCurrentId
            } 
        });

        let reportPriceCurrentDTO: ReportPriceCurrentDTO = new ReportPriceCurrentDTO();
        reportPriceCurrentDTO.productLineId = reportPriceCurrent.productLineId;
        reportPriceCurrentDTO.productTypeId = reportPriceCurrent.productTypeId;
        reportPriceCurrentDTO.productVendorId = reportPriceCurrent.productVendorId;
        reportPriceCurrentDTO.reportPriceCurrentId = reportPriceCurrent.reportPriceCurrentId;
        reportPriceCurrentDTO.reportTypeId = reportPriceCurrent.reportTypeId;
        reportPriceCurrentDTO.reportPriceCurrentName = reportPriceCurrent.reportPriceCurrentName;
        reportPriceCurrentDTO.reportPriceCurrentDescription = reportPriceCurrent.reportPriceCurrentDescription;
        reportPriceCurrentDTO.reportPriceCurrentCategories = JSON.parse(reportPriceCurrent.reportPriceCurrentCategories) as ReportPriceCurrentCategory[];
        reportPriceCurrentDTO.reportPriceCurrentDefaultSettings = JSON.parse(reportPriceCurrent.reportPriceCurrentDefaultSettings) as ReportPriceCurrentDefaultSettings;
        
        return reportPriceCurrentDTO;
    }
    
    async createReportPriceCurrent(createReportPriceCurrentDTO: CreateReportPriceCurrentDTO): Promise<ReportPriceCurrentDTO> {
    
        //CHECK TO SEE IF THE PRODUCT CARD TYPE ALREADY EXISTS;
        let reportPriceCurrent = await this.reportPriceCurrentRepository.findOne({ 
            where: { 
                productVendorId: createReportPriceCurrentDTO.productVendorId,
                productLineId: createReportPriceCurrentDTO.productLineId,
                productTypeId: createReportPriceCurrentDTO.productTypeId, 
                reportPriceCurrentName: createReportPriceCurrentDTO.reportPriceCurrentName, 
            } 
        });

        if(reportPriceCurrent) {
            throw new ConflictException('Report price current already exists');
        }
        
        reportPriceCurrent = this.reportPriceCurrentRepository.create({ ...createReportPriceCurrentDTO });
        reportPriceCurrent.reportPriceCurrentCategories = JSON.stringify(reportPriceCurrent.reportPriceCurrentCategories);
        reportPriceCurrent.reportPriceCurrentDefaultSettings = JSON.stringify(reportPriceCurrent.reportPriceCurrentDefaultSettings);
        reportPriceCurrent = await this.reportPriceCurrentRepository.save(reportPriceCurrent);

        let reportPriceCurrentDTO = await this.getReportPriceCurrentById(reportPriceCurrent.reportPriceCurrentId);
        
        return reportPriceCurrentDTO;
        
    }

    async updateReportPriceCurrent(updateReportPriceCurrentDTO: UpdateReportPriceCurrentDTO): Promise<ReportPriceCurrentDTO> {
                    
        let reportPriceCurrent = await this.reportPriceCurrentRepository.findOneOrFail({ 
            where: { 
                reportPriceCurrentId: updateReportPriceCurrentDTO.reportPriceCurrentId
            } 
        });

        reportPriceCurrent.reportTypeId = updateReportPriceCurrentDTO.reportTypeId;
        reportPriceCurrent.reportPriceCurrentName = updateReportPriceCurrentDTO.reportPriceCurrentName;
        reportPriceCurrent.reportPriceCurrentDescription = updateReportPriceCurrentDTO.reportPriceCurrentDescription;
        reportPriceCurrent.reportPriceCurrentCategories = JSON.stringify(updateReportPriceCurrentDTO.reportPriceCurrentCategories);
        reportPriceCurrent.reportPriceCurrentDefaultSettings = JSON.stringify(updateReportPriceCurrentDTO.reportPriceCurrentDefaultSettings);

        reportPriceCurrent.reportPriceCurrentUpdateDate = new Date();
        
        await this.reportPriceCurrentRepository.save(reportPriceCurrent);
        
        let reportPriceCurrentDTO = await this.getReportPriceCurrentById(reportPriceCurrent.reportPriceCurrentId);

        return reportPriceCurrentDTO;
    
    }
    
}