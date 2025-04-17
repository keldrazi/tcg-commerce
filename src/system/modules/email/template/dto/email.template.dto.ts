import { IsBoolean, IsString } from "class-validator";

export class EmailTemplateDTO {
    emailTemplateId: string;
    emailTemplateName: string;
    emailTemplateDescription: string;
    emailTemplateSubject: string;
    emailTemplateHBSTemplateName: string;
    emailTemplateSettings: string;
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
    emailTemplateSubject: string;
    @IsString()
    emailTemplateHBSTemplateName: string;
    @IsString()
    emailTemplateSettings: string;
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
    emailTemplateSubject: string;
    @IsString()
    emailTemplateHBSTemplateName: string;
    @IsString()
    emailTemplateSettings: string;
    @IsBoolean()
    emailTemplateIsActive: boolean;
}

