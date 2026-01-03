import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateReportTypeDTO, UpdateReportTypeDTO, ReportTypeDTO } from './dto/report.type.dto';
import { ReportType } from 'src/typeorm/entities/tcgcommerce/modules/report/type/report.type.entity';
import { ErrorMessageService } from 'src/system/modules/error/message/error.message.service';

@Injectable()
export class ReportTypeService {

    constructor(
        @InjectRepository(ReportType) private reportTypeRepository: Repository<ReportType>,
        private errorMessageService: ErrorMessageService,
    ) { }

    async getReportType(reportTypeId: string) {
        let reportType = await this.reportTypeRepository.findOne({ 
            where: { 
                reportTypeId: reportTypeId 
            } 
        });
        
        if (reportType == null) {
            return this.errorMessageService.createErrorMessage('PRODUCT_TYPE_NOT_FOUND', 'Report type was not found');
        }

        let reportTypeDTO: ReportTypeDTO = ({ ...reportType });

        return reportTypeDTO;
        
    }

    

    async getReportTypes() {
        let reportTypes = await this.reportTypeRepository.find();
        
        let reportTypeDTOs: ReportTypeDTO[] = [];

        if(reportTypes == null) {
            return reportTypeDTOs;
        }
        
        for(let i = 0; i < reportTypes.length; i++) {
            let reportType = reportTypes[i];
            let reportTypeDTO: ReportTypeDTO = ({ ...reportType });

            reportTypeDTOs.push(reportTypeDTO);
        }

        return reportTypeDTOs;
    }
    
    async getReportTypeByName(name: string) {
        let reportType = await this.reportTypeRepository.findOne({ 
            where: { 
                reportTypeName: name 
            } 
        });
        
        if (reportType == null) {
            return this.errorMessageService.createErrorMessage('REPORT_TYPE_NOT_FOUND', 'Report type was not found');
        }

        let reportTypeDTO: ReportTypeDTO = ({ ...reportType });

        return reportTypeDTO;
        
    }

    async getReportTypeByCode(code: string) {
        let reportType = await this.reportTypeRepository.findOne({ 
            where: { 
                reportTypeCode: code 
            } 
        });
        
        if (reportType == null) {
            return this.errorMessageService.createErrorMessage('REPORT_TYPE_NOT_FOUND', 'Report type was not found');
        }

        let reportTypeDTO: ReportTypeDTO = ({ ...reportType });

        return reportTypeDTO;
        
    }
    
    async createReportType(createReportTypeDTO: CreateReportTypeDTO) {
    
        //CHECK TO SEE IF THE PRODUCT CARD TYPE ALREADY EXISTS;
        let reportType = await this.reportTypeRepository.findOne({ 
            where: { 
                reportTypeName: createReportTypeDTO.reportTypeName
            } 
        });
        
        //TO DO: RETURN AN ERROR FOR DUPLICATE CARD VARIANT;
        if (reportType != null) {
            return this.errorMessageService.createErrorMessage('REPORT_TYPE_ALREADY_EXISTS', 'Report type already exists');
        }
        
        reportType = this.reportTypeRepository.create({ ...createReportTypeDTO });
        reportType = await this.reportTypeRepository.save(reportType);

        let reportTypeDTO = this.getReportType(reportType.reportTypeId);
        
        return reportTypeDTO;
        
    }

    async updateReportType(updateReportTypeDTO: UpdateReportTypeDTO) {
                    
        let reportType = await this.reportTypeRepository.findOne({ 
            where: { 
                reportTypeId: updateReportTypeDTO.reportTypeId
            } 
        });

        if (!reportType) {
            return this.errorMessageService.createErrorMessage('REPORT_TYPE_NOT_FOUND', 'Report type was not found'); 
        }

        reportType.reportTypeName = updateReportTypeDTO.reportTypeName;
        reportType.reportTypeCode = updateReportTypeDTO.reportTypeCode;
        reportType.reportTypeIsActive = updateReportTypeDTO.reportTypeIsActive;
        reportType.reportTypeUpdateDate = new Date();
        
        await this.reportTypeRepository.save(reportType);

        let reportTypeDTO = this.getReportType(reportType.reportTypeId);
        
        return reportTypeDTO;
    
    }
    
}