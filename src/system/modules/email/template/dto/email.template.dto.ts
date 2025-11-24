import { IsBoolean, IsString } from "class-validator";
import { EmailTemplateContext } from "../interface/email.template.interface";

export class EmailTemplateDTO {
    emailTemplateId: string;
    emailTemplateName: string;
    emailTemplateDescription: string;
    emailTemplateFrom: string;
    emailTemplateSubject: string;
    emailTemplateHBSTemplateName: string;
    emailTemplateContext: EmailTemplateContext[];
    emailTemplateIsActive: boolean;
    emailTemplateCreateDate: Date;
    emailTemplateUpdateDate: Date;
}

export class CreateEmailTemplateDTO {
    @IsString()
    emailTemplateName: string;
    @IsString()
    emailTemplateDescription: string;
    @IsString()
    emailTemplateFrom: string;
    @IsString()
    emailTemplateSubject: string;
    @IsString()
    emailTemplateHBSTemplateName: string;
    @IsString()
    emailTemplateContext: string;
    @IsBoolean()
    emailTemplateIsActive: boolean;
}

export class UpdateEmailTemplateDTO {
    @IsString()
    emailTemplateId: string;
    @IsString()
    emailTemplateName: string;
    @IsString()
    emailTemplateDescription: string;
    @IsString()
    emailTemplateFrom: string;
    @IsString()
    emailTemplateSubject: string;
    @IsString()
    emailTemplateHBSTemplateName: string;
    @IsString()
    emailTemplateContext: string;
    @IsBoolean()
    emailTemplateIsActive: boolean;
}

