import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EmailModule } from 'src/typeorm/entities/system/modules/email/module/email.module.entity';
import { CreateEmailModuleDTO, UpdateEmailModuleDTO, EmailModuleDTO } from './dto/email.module.dto';

@Injectable()
export class EmailModuleService {

    constructor(
        @InjectRepository(EmailModule) private emailModuleRepository: Repository<EmailModule>,
    ) { }

    async getEmailModule(emailModuleId: string): Promise<EmailModuleDTO> {
        let emailModule = await this.emailModuleRepository.findOne({ 
            where: { 
                emailModuleId : emailModuleId
            } 
        });
        
        if (!emailModule) {
            throw new NotFoundException('Email module not found');
        }

        let emailModuleDTO = new EmailModuleDTO();
        emailModuleDTO.emailModuleId = emailModule.emailModuleId;
        emailModuleDTO.applicationModuleId = emailModule.applicationModuleId;
        emailModuleDTO.commerceAccountId = emailModule.commerceAccountId;
        emailModuleDTO.emailModuleSettings = emailModule.emailModuleSettings;
        emailModuleDTO.emailModuleRoles = emailModule.emailModuleRoles;
        emailModuleDTO.emailModuleIsActive = emailModule.emailModuleIsActive;
        emailModuleDTO.emailModuleCreateDate = emailModule.emailModuleCreateDate;
        emailModuleDTO.emailModuleUpdateDate = emailModule.emailModuleUpdateDate;

        return emailModuleDTO;
        
    }

    async getEmailModuleByCommerceAccountId(commerceAccountId: string): Promise<EmailModuleDTO> {
        let emailModule = await this.emailModuleRepository.findOne({ 
            where: { 
                commerceAccountId : commerceAccountId
            } 
        });
        
        if (!emailModule) {
            throw new NotFoundException('Email module not found for this commerce account');
        }

        let emailModuleDTO = new EmailModuleDTO();
        emailModuleDTO.emailModuleId = emailModule.emailModuleId;
        emailModuleDTO.applicationModuleId = emailModule.applicationModuleId;
        emailModuleDTO.commerceAccountId = emailModule.commerceAccountId;
        emailModuleDTO.emailModuleSettings = emailModule.emailModuleSettings;
        emailModuleDTO.emailModuleRoles = emailModule.emailModuleRoles;
        emailModuleDTO.emailModuleIsActive = emailModule.emailModuleIsActive;
        emailModuleDTO.emailModuleCreateDate = emailModule.emailModuleCreateDate;
        emailModuleDTO.emailModuleUpdateDate = emailModule.emailModuleUpdateDate;

        return emailModuleDTO;
        
    }

    async getEmailModules(): Promise<EmailModuleDTO[]> {
        let emailModules = await this.emailModuleRepository.find();
        
        if (emailModules == null) {
            return [];
        }

        let emailModuleDTOs: EmailModuleDTO[] = [];

        for(let i = 0; i < emailModules.length; i++) {
            let emailModule = emailModules[i];
            let emailModuleDTO = new EmailModuleDTO();
            emailModuleDTO.emailModuleId = emailModule.emailModuleId;
            emailModuleDTO.applicationModuleId = emailModule.applicationModuleId;
            emailModuleDTO.commerceAccountId = emailModule.commerceAccountId;
            emailModuleDTO.emailModuleSettings = emailModule.emailModuleSettings;
            emailModuleDTO.emailModuleRoles = emailModule.emailModuleRoles;
            emailModuleDTO.emailModuleIsActive = emailModule.emailModuleIsActive;
            emailModuleDTO.emailModuleCreateDate = emailModule.emailModuleCreateDate;
            emailModuleDTO.emailModuleUpdateDate = emailModule.emailModuleUpdateDate;

            emailModuleDTOs.push(emailModuleDTO);

        }

        return emailModuleDTOs;
        
    }

    async createEmailModule(createEmailModuleDTO: CreateEmailModuleDTO): Promise<EmailModuleDTO> {
        let newEmailModule = this.emailModuleRepository.create({ ...createEmailModuleDTO });
        newEmailModule = await this.emailModuleRepository.save(newEmailModule);

        let emailModuleDTO = await this.getEmailModule(newEmailModule.emailModuleId);

        return emailModuleDTO;
    }

    async updateEmailModule(updateEmailModuleDTO: UpdateEmailModuleDTO): Promise<EmailModuleDTO> {
            
        let existingEmailModule = await this.emailModuleRepository.findOne({ 
            where: { 
                emailModuleId: updateEmailModuleDTO.emailModuleId
            } 
        });

        if (!existingEmailModule) {
            throw new NotFoundException('Email module not found');
        }

        existingEmailModule.emailModuleSettings = updateEmailModuleDTO.emailModuleSettings;
        existingEmailModule.emailModuleRoles = updateEmailModuleDTO.emailModuleRoles;
        existingEmailModule.emailModuleIsActive = updateEmailModuleDTO.emailModuleIsActive;
        existingEmailModule.emailModuleUpdateDate = new Date();
        
        await this.emailModuleRepository.save(existingEmailModule);

        let emailModuleDTO = await this.getEmailModule(existingEmailModule.emailModuleId);
        
        return emailModuleDTO;
    }
    
}