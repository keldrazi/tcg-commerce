import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EmailTemplate } from 'src/typeorm/entities/system/modules/email/template/email.template.entity';
import { CreateEmailTemplateDTO, EmailTemplateDTO, UpdateEmailTemplateDTO } from './dto/email.template.dto';
import { EmailTemplateContext } from './interface/email.template.interface';

@Injectable()
export class EmailTemplateService {

    constructor(
        @InjectRepository(EmailTemplate) private emailTemplateRepository: Repository<EmailTemplate>,
    ) { }

    async getEmailTemplate(emailTemplateId: string): Promise<EmailTemplateDTO> {
        let emailTemplate = await this.emailTemplateRepository.findOne({ 
            where: { 
                emailTemplateId : emailTemplateId
            } 
        });
        
        if (!emailTemplate) {
            throw new NotFoundException('Email template not found for emailTemplateId: ' + emailTemplateId);
        }

        let emailTemplateDTO = new EmailTemplateDTO();
        emailTemplateDTO.emailTemplateId = emailTemplate.emailTemplateId;
        emailTemplateDTO.emailTemplateName = emailTemplate.emailTemplateName;
        emailTemplateDTO.emailTemplateDescription = emailTemplate.emailTemplateDescription;
        emailTemplateDTO.emailTemplateSubject = emailTemplate.emailTemplateSubject;
        emailTemplateDTO.emailTemplateHBSTemplatePath = emailTemplate.emailTemplateHBSTemplatePath;
        emailTemplateDTO.emailTemplateHBSTemplateName = emailTemplate.emailTemplateHBSTemplateName;
        emailTemplateDTO.emailTemplateContext = JSON.parse(emailTemplate.emailTemplateContext) as EmailTemplateContext[];
        emailTemplateDTO.emailTemplateIsActive = emailTemplate.emailTemplateIsActive;
        emailTemplateDTO.emailTemplateCreateDate = emailTemplate.emailTemplateCreateDate;
        emailTemplateDTO.emailTemplateUpdateDate = emailTemplate.emailTemplateUpdateDate;

        return emailTemplateDTO;
        
    }

    async getEmailTemplateByName(emailTemplateName: string): Promise<EmailTemplateDTO> {
        let emailTemplate = await this.emailTemplateRepository.findOne({ 
            where: { 
                emailTemplateName : emailTemplateName
            } 
        });
        
        if (!emailTemplate) {
            throw new NotFoundException('Email template not found for emailTemplateName: ' + emailTemplateName);
        }

        let emailTemplateDTO = new EmailTemplateDTO();
        emailTemplateDTO.emailTemplateId = emailTemplate.emailTemplateId;
        emailTemplateDTO.emailTemplateName = emailTemplate.emailTemplateName;
        emailTemplateDTO.emailTemplateDescription = emailTemplate.emailTemplateDescription;
        emailTemplateDTO.emailTemplateFrom = emailTemplate.emailTemplateFrom;
        emailTemplateDTO.emailTemplateSubject = emailTemplate.emailTemplateSubject;
        emailTemplateDTO.emailTemplateHBSTemplatePath = emailTemplate.emailTemplateHBSTemplatePath;
        emailTemplateDTO.emailTemplateHBSTemplateName = emailTemplate.emailTemplateHBSTemplateName;
        emailTemplateDTO.emailTemplateContext = JSON.parse(emailTemplate.emailTemplateContext) as EmailTemplateContext[];
        emailTemplateDTO.emailTemplateIsActive = emailTemplate.emailTemplateIsActive;
        emailTemplateDTO.emailTemplateCreateDate = emailTemplate.emailTemplateCreateDate;
        emailTemplateDTO.emailTemplateUpdateDate = emailTemplate.emailTemplateUpdateDate;

        return emailTemplateDTO;
        
    }

    async getEmailTemplates(): Promise<EmailTemplateDTO[]> {
        let emailTemplates = await this.emailTemplateRepository.find();
        
        if (emailTemplates == null) {
            return [];
        }

        let emailTemplateDTOs: EmailTemplateDTO[] = [];

        for(let i = 0; i < emailTemplates.length; i++) {
            let emailTemplate = emailTemplates[i];
            let emailTemplateDTO = new EmailTemplateDTO();
            emailTemplateDTO.emailTemplateId = emailTemplate.emailTemplateId;
            emailTemplateDTO.emailTemplateName = emailTemplate.emailTemplateName;
            emailTemplateDTO.emailTemplateDescription = emailTemplate.emailTemplateDescription;
            emailTemplateDTO.emailTemplateFrom = emailTemplate.emailTemplateFrom;
            emailTemplateDTO.emailTemplateSubject = emailTemplate.emailTemplateSubject;
            emailTemplateDTO.emailTemplateHBSTemplatePath = emailTemplate.emailTemplateHBSTemplatePath;
            emailTemplateDTO.emailTemplateHBSTemplateName = emailTemplate.emailTemplateHBSTemplateName;
            emailTemplateDTO.emailTemplateContext = JSON.parse(emailTemplate.emailTemplateContext) as EmailTemplateContext[];
            emailTemplateDTO.emailTemplateIsActive = emailTemplate.emailTemplateIsActive;
            emailTemplateDTO.emailTemplateCreateDate = emailTemplate.emailTemplateCreateDate;
            emailTemplateDTO.emailTemplateUpdateDate = emailTemplate.emailTemplateUpdateDate;

            emailTemplateDTOs.push(emailTemplateDTO);
        }
        
        return emailTemplateDTOs;
        
    }

    async createEmailTemplate(createEmailTemplateDTO: CreateEmailTemplateDTO): Promise<EmailTemplateDTO> {

        let newEmailTemplate = this.emailTemplateRepository.create({ ...createEmailTemplateDTO });
        newEmailTemplate = await this.emailTemplateRepository.save(newEmailTemplate);

        let emailTemplateDTO = await this.getEmailTemplate(newEmailTemplate.emailTemplateId);

        return emailTemplateDTO;
    }

    async updateEmailTemplate(updateEmailTemplateDTO: UpdateEmailTemplateDTO): Promise<EmailTemplateDTO> {
        let emailTemplate = await this.emailTemplateRepository.findOne({
            where: {
                emailTemplateId: updateEmailTemplateDTO.emailTemplateId
            }
        });

        if(emailTemplate == null) {
            throw new NotFoundException('Email template not found for emailTemplateId: ' + updateEmailTemplateDTO.emailTemplateId);
        }

        emailTemplate.emailTemplateName = updateEmailTemplateDTO.emailTemplateName;
        emailTemplate.emailTemplateDescription = updateEmailTemplateDTO.emailTemplateDescription;
        emailTemplate.emailTemplateFrom = updateEmailTemplateDTO.emailTemplateFrom;
        emailTemplate.emailTemplateSubject = updateEmailTemplateDTO.emailTemplateSubject;
        emailTemplate.emailTemplateHBSTemplatePath = updateEmailTemplateDTO.emailTemplateHBSTemplatePath;
        emailTemplate.emailTemplateHBSTemplateName = updateEmailTemplateDTO.emailTemplateHBSTemplateName;
        emailTemplate.emailTemplateContext = updateEmailTemplateDTO.emailTemplateContext;
        emailTemplate.emailTemplateIsActive = updateEmailTemplateDTO.emailTemplateIsActive;
        emailTemplate.emailTemplateUpdateDate = new Date();

        emailTemplate = await this.emailTemplateRepository.save(emailTemplate);

        let emailTemplateDTO = await this.getEmailTemplate(emailTemplate.emailTemplateId);

        return emailTemplateDTO;
    }
    
}