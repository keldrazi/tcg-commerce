import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReportModule } from 'src/typeorm/entities/tcgcommerce/modules/report/module/report.module.entity';
import { CreateReportModuleDTO, UpdateReportModuleDTO, ReportModuleDTO } from './dto/report.module.dto';
import { ErrorMessageService } from 'src/system/modules/error/message/error.message.service';

@Injectable()
export class ReportModuleService {

    constructor(
        @InjectRepository(ReportModule) private reportModuleRepository: Repository<ReportModule>,
        private errorMessageService: ErrorMessageService
    ) { }

    async getReportModuleById(reportModuleId: string) {
        let reportModule = await this.reportModuleRepository.findOne({ 
            where: { 
                reportModuleId : reportModuleId
            } 
        });
        
        if (reportModule == null) {
            return this.errorMessageService.createErrorMessage('REPORT_MODULE_NOT_FOUND', 'Report module was not found');
        }

        let reportModuleDTO: ReportModuleDTO = ({ ...reportModule });

        return reportModuleDTO;

    }

    async getReportModuleByCommerceAccountId(commerceAccountId: string) {
        let reportModule = await this.reportModuleRepository.findOne({ 
            where: { 
                commerceAccountId : commerceAccountId
            } 
        });
        
        if (reportModule == null) {
            return this.errorMessageService.createErrorMessage('REPORT_MODULE_NOT_FOUND', 'Report module was not found');
        }

        let reportModuleDTO: ReportModuleDTO = ({ ...reportModule });

        return reportModuleDTO;
        
    }


    async getReportModules() {
        let reportModules = await this.reportModuleRepository.find();
        
        if (reportModules == null) {
            return [];
        }

        let reportModuleDTOs: ReportModuleDTO[] = [];

        for(let i = 0; i < reportModules.length; i++) {
            let reportModule = reportModules[i];
            let reportModuleDTO: ReportModuleDTO = ({ ...reportModule });

            reportModuleDTOs.push(reportModuleDTO);

        }

        return reportModuleDTOs;
        
    }

    async createReportModule(createReportModuleDTO: CreateReportModuleDTO) {
        let reportModule = await this.reportModuleRepository.findOne({
            where: {
                commerceAccountId: createReportModuleDTO.commerceAccountId
            }
        });

        if (reportModule != null) {
            return this.errorMessageService.createErrorMessage('REPORT_MODULE_EXISTS', 'Report module already exists');
        }


        reportModule = this.reportModuleRepository.create({ ...createReportModuleDTO });
        reportModule = await this.reportModuleRepository.save(reportModule);

        let reportModuleDTO = await this.getReportModuleById(reportModule.reportModuleId);

        return reportModuleDTO;
    }

    async updateReportModule(updateReportModuleDTO: UpdateReportModuleDTO) {
        
        let reportModule = await this.reportModuleRepository.findOne({ 
            where: { 
                commerceAccountId: updateReportModuleDTO.commerceAccountId
            } 
        });

        if (reportModule == null) {
            return this.errorMessageService.createErrorMessage('REPORT_MODULE_NOT_FOUND', 'Report module was not found');
        }

        reportModule.reportModuleSettings = updateReportModuleDTO.reportModuleSettings;
        reportModule.reportModuleRoles = updateReportModuleDTO.reportModuleRoles;
        reportModule.reportModuleIsActive = updateReportModuleDTO.reportModuleIsActive;
        reportModule.reportModuleUpdateDate = new Date();
        
        await this.reportModuleRepository.save(reportModule);

        let reportModuleDTO = await this.getReportModuleById(reportModule.reportModuleId);
        
        return reportModuleDTO;
    }
    
}