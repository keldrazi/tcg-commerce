import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EmailTemplate } from 'src/typeorm/entities/system/modules/email/template/email.template.entity';
import { CreateEmailTemplateDTO, EmailTemplateDTO, UpdateEmailTemplateDTO } from './dto/email.template.dto';

@Injectable()
export class EmailTemplateService {

    constructor(
        @InjectRepository(EmailTemplate) private emailTemplateRepository: Repository<EmailTemplate>,
    ) { }

    async getEmailTemplate(emailTemplateId: string) {
        let emailTemplate = await this.emailTemplateRepository.findOne({ 
            where: { 
                emailTemplateId : emailTemplateId
            } 
        });
        
        if (!emailTemplate) {
            return null;
        }

        let emailTemplateDTO = new EmailTemplateDTO();
        emailTemplateDTO.emailTemplateId = emailTemplate.emailTemplateId;
        emailTemplateDTO.emailTemplateName = emailTemplate.emailTemplateName;
        emailTemplateDTO.emailTemplateDescription = emailTemplate.emailTemplateDescription;
        emailTemplateDTO.emailTemplateSubject = emailTemplate.emailTemplateSubject;
        emailTemplateDTO.emailTemplateHBSTemplateName = emailTemplate.emailTemplateHBSTemplateName;
        emailTemplateDTO.emailTemplateSettings = emailTemplate.emailTemplateSettings;
        emailTemplateDTO.emailTemplateIsActive = emailTemplate.emailTemplateIsActive;
        emailTemplateDTO.emailTemplateCreateDate = emailTemplate.emailTemplateCreateDate;
        emailTemplateDTO.emailTemplateUpdateDate = emailTemplate.emailTemplateUpdateDate;

        return emailTemplateDTO;
        
    }

    async getEmailTemplates() {
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
            emailTemplateDTO.emailTemplateSubject = emailTemplate.emailTemplateSubject;
            emailTemplateDTO.emailTemplateHBSTemplateName = emailTemplate.emailTemplateHBSTemplateName;
            emailTemplateDTO.emailTemplateSettings = emailTemplate.emailTemplateSettings;
            emailTemplateDTO.emailTemplateIsActive = emailTemplate.emailTemplateIsActive;
            emailTemplateDTO.emailTemplateCreateDate = emailTemplate.emailTemplateCreateDate;
            emailTemplateDTO.emailTemplateUpdateDate = emailTemplate.emailTemplateUpdateDate;

            emailTemplateDTOs.push(emailTemplateDTO);
        }
        
        return emailTemplateDTOs;
        
    }

    async createEmailTemplate(createEmailTemplateDTO: CreateEmailTemplateDTO) {

        let newEmailTemplate = this.emailTemplateRepository.create({ ...createEmailTemplateDTO });
        newEmailTemplate = await this.emailTemplateRepository.save(newEmailTemplate);

        let emailTemplateDTO = await this.getEmailTemplate(newEmailTemplate.emailTemplateId);

        return emailTemplateDTO;
    }

    async updateEmailTemplate(updateEmailTemplateDTO: UpdateEmailTemplateDTO) {
        let emailTemplate = await this.emailTemplateRepository.findOne({
            where: {
                emailTemplateId: updateEmailTemplateDTO.emailTemplateId
            }
        });

        if(emailTemplate == null) {
            return null;
        }

        emailTemplate.emailTemplateName = updateEmailTemplateDTO.emailTemplateName;
        emailTemplate.emailTemplateDescription = updateEmailTemplateDTO.emailTemplateDescription;
        emailTemplate.emailTemplateSubject = updateEmailTemplateDTO.emailTemplateSubject;
        emailTemplate.emailTemplateHBSTemplateName = updateEmailTemplateDTO.emailTemplateHBSTemplateName;
        emailTemplate.emailTemplateSettings = updateEmailTemplateDTO.emailTemplateSettings;
        emailTemplate.emailTemplateIsActive = updateEmailTemplateDTO.emailTemplateIsActive;
        emailTemplate.emailTemplateUpdateDate = new Date();

        emailTemplate = await this.emailTemplateRepository.save(emailTemplate);

        let emailTemplateDTO = await this.getEmailTemplate(emailTemplate.emailTemplateId);

        return emailTemplateDTO;
    }
    
}