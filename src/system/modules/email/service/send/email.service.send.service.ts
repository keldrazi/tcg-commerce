import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer'; 

@Injectable()
export class EmailServiceSendService {
  constructor(
    private readonly mailerService: MailerService
  ) {}

  
  async sendEmail(emailMessage: any) {

    await this
      .mailerService
      .sendMail({
        to: emailMessage.to,
        from: emailMessage.from,
        subject: emailMessage.subject,
        template: emailMessage.template,
        context: emailMessage.context,
      })
      .then((success) => {
        console.log('Email sent successfully', success);
      })
      .catch((error) => {
        console.error('Error sending email', error);
      });
  }
}