import { Injectable, NotFoundException } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer'; 
import { EmailTemplateService } from 'src/system/modules/email/template/email.template.service';


@Injectable()
export class EmailServiceSendService {
  constructor(
    private mailerService: MailerService,
    private emailTemplateService: EmailTemplateService,
  ) {}

  
  async sendEmail(emailTo: string, emailTemplateName: string, emailTemplateContextValues: any): Promise<void> {

    let emailTemplateDTO = await this.emailTemplateService.getEmailTemplateByName(emailTemplateName);

    let context: any = {};

    for (let i = 0; i < emailTemplateDTO.emailTemplateContext.length; i++) {
      let emailTemplateContext = emailTemplateDTO.emailTemplateContext[i];
      context[emailTemplateContext.emailTemplateContextNameField] = emailTemplateContextValues[emailTemplateContext.emailTemplateContextValueField];
    }

    let emailTemplate = './' +emailTemplateDTO.emailTemplateHBSTemplatePath + '/' + emailTemplateDTO.emailTemplateHBSTemplateName;
    
    await this
      .mailerService
      .sendMail({
        to: emailTo,
        from: emailTemplateDTO.emailTemplateFrom,
        subject: emailTemplateDTO.emailTemplateSubject,
        template: emailTemplateDTO.emailTemplateHBSTemplateName,
        context: context,
      })
      .then((success) => {
        console.log('Email sent successfully', success);
      })
      .catch((error) => {
        console.error('Error sending email', error);
      });
  }
}