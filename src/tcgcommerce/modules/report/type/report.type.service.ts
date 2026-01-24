import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateReportTypeDTO, UpdateReportTypeDTO, ReportTypeDTO } from './dto/report.type.dto';
import { ReportType } from 'src/typeorm/entities/tcgcommerce/modules/report/type/report.type.entity';

@Injectable()
export class ReportTypeService {

    constructor(
        @InjectRepository(ReportType) private reportTypeRepository: Repository<ReportType>,
    ) { }

    async getReportTypeById(reportTypeId: string): Promise<ReportTypeDTO> {
        let reportType = await this.reportTypeRepository.findOneOrFail({ 
            where: { 
                reportTypeId: reportTypeId 
            } 
        });
        
        let reportTypeDTO: ReportTypeDTO = ({ ...reportType });

        return reportTypeDTO;
        
    }

    async getReportTypes(): Promise<ReportTypeDTO[]> {
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
    
    async getReportTypeByName(reportTypeName: string): Promise<ReportTypeDTO> {
        let reportType = await this.reportTypeRepository.findOneOrFail({ 
            where: { 
                reportTypeName: reportTypeName 
            } 
        });
        
        let reportTypeDTO: ReportTypeDTO = ({ ...reportType });

        return reportTypeDTO;
        
    }

    async getReportTypeByCode(reportTypeCode: string): Promise<ReportTypeDTO> {
        let reportType = await this.reportTypeRepository.findOneOrFail({ 
            where: { 
                reportTypeCode: reportTypeCode 
            } 
        });
        
        let reportTypeDTO: ReportTypeDTO = ({ ...reportType });

        return reportTypeDTO;
        
    }
    
    async createReportType(createReportTypeDTO: CreateReportTypeDTO): Promise<ReportTypeDTO> {
    
        //CHECK TO SEE IF THE PRODUCT CARD TYPE ALREADY EXISTS;
        let reportType = await this.reportTypeRepository.findOne({ 
            where: { 
                reportTypeName: createReportTypeDTO.reportTypeName
            } 
        });
        
        if (reportType) {
            throw new ConflictException('Report type with this name already exists');
        }
        
        reportType = this.reportTypeRepository.create({ ...createReportTypeDTO });
        reportType = await this.reportTypeRepository.save(reportType);

        let reportTypeDTO = await this.getReportTypeById(reportType.reportTypeId);
        
        return reportTypeDTO;
        
    }

    async updateReportType(updateReportTypeDTO: UpdateReportTypeDTO): Promise<ReportTypeDTO> {
                    
        let reportType = await this.reportTypeRepository.findOneOrFail({ 
            where: { 
                reportTypeId: updateReportTypeDTO.reportTypeId
            } 
        });

        reportType.reportTypeName = updateReportTypeDTO.reportTypeName;
        reportType.reportTypeCode = updateReportTypeDTO.reportTypeCode;
        reportType.reportTypeIsActive = updateReportTypeDTO.reportTypeIsActive;
        reportType.reportTypeUpdateDate = new Date();
        
        await this.reportTypeRepository.save(reportType);

        let reportTypeDTO = await this.getReportTypeById(reportType.reportTypeId);
        
        return reportTypeDTO;
    
    }
    
}