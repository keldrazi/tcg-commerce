import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReportModule } from 'src/typeorm/entities/tcgcommerce/modules/report/module/report.module.entity';
import { CreateReportModuleDTO, UpdateReportModuleDTO, ReportModuleDTO } from './dto/report.module.dto';

@Injectable()
export class ReportModuleService {

    constructor(
        @InjectRepository(ReportModule) private reportModuleRepository: Repository<ReportModule>,
    ) { }

    async getReportModuleById(reportModuleId: string): Promise<ReportModuleDTO> {
        let reportModule = await this.reportModuleRepository.findOneOrFail({ 
            where: { 
                reportModuleId : reportModuleId
            } 
        });
        
        let reportModuleDTO: ReportModuleDTO = ({ ...reportModule });

        return reportModuleDTO;

    }

    async getReportModuleByCommerceAccountId(commerceAccountId: string): Promise<ReportModuleDTO> {
        let reportModule = await this.reportModuleRepository.findOneOrFail({ 
            where: { 
                commerceAccountId : commerceAccountId
            } 
        });
        
        let reportModuleDTO: ReportModuleDTO = ({ ...reportModule });

        return reportModuleDTO;
        
    }


    async getReportModules(): Promise<ReportModuleDTO[]> {
        let reportModules = await this.reportModuleRepository.find();
        
        let reportModuleDTOs: ReportModuleDTO[] = [];

        if(reportModules == null) {
            return reportModuleDTOs;
        }

        for(let i = 0; i < reportModules.length; i++) {
            let reportModule = reportModules[i];
            let reportModuleDTO: ReportModuleDTO = ({ ...reportModule });

            reportModuleDTOs.push(reportModuleDTO);

        }

        return reportModuleDTOs;
        
    }

    async createReportModule(createReportModuleDTO: CreateReportModuleDTO): Promise<ReportModuleDTO> {
        let reportModule = await this.reportModuleRepository.findOne({
            where: {
                commerceAccountId: createReportModuleDTO.commerceAccountId
            }
        });
        
        if(reportModule != null) {
           throw new ConflictException('Report module with this commerce account ID already exists');
        }


        reportModule = this.reportModuleRepository.create({ ...createReportModuleDTO });
        reportModule = await this.reportModuleRepository.save(reportModule);

        let reportModuleDTO = await this.getReportModuleById(reportModule.reportModuleId);

        return reportModuleDTO;
    }

    async updateReportModule(updateReportModuleDTO: UpdateReportModuleDTO): Promise<ReportModuleDTO> {
        
        let reportModule = await this.reportModuleRepository.findOneOrFail({ 
            where: { 
                commerceAccountId: updateReportModuleDTO.commerceAccountId
            } 
        });

        reportModule.reportModuleSettings = updateReportModuleDTO.reportModuleSettings;
        reportModule.reportModuleRoles = updateReportModuleDTO.reportModuleRoles;
        reportModule.reportModuleIsActive = updateReportModuleDTO.reportModuleIsActive;
        reportModule.reportModuleUpdateDate = new Date();
        
        await this.reportModuleRepository.save(reportModule);

        let reportModuleDTO = await this.getReportModuleById(reportModule.reportModuleId);
        
        return reportModuleDTO;
    }
    
}