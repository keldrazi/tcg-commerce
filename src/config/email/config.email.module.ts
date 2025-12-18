import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MailerModule.forRootAsync({
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: async (configService: ConfigService) => ({
            transport: {
                host: configService.get('EMAIL_HOST'),
                port: configService.get('EMAIL_PORT'),
                auth: {
                    user: configService.get('EMAIL_USER'),
                    pass: configService.get('EMAIL_PASSWORD'),
                },
            },
            defaults: {
                from: configService.get('EMAIL_FROM'),
            },
            template: {
                dir: configService.get('EMAIL_TEMPLATE_DIR'),
                adapter: new HandlebarsAdapter(),
                options: {
                    strict: true,
                },
            },
        }),
    }),
  ],
})
export class ConfigEmailModule {}