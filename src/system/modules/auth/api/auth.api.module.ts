import { Module } from '@nestjs/common';
import { AuthAPIService } from './auth.api.service';
import { CommerceAccountModule } from 'src/tcgcommerce/modules/commerce/account/commerce.account.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { AuthAPIController } from './auth.api.controller';

@Module({
  imports: [
    CommerceAccountModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: configService.get('JWT_EXPIRATION_TIME') ?? '7d' },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthAPIController],
  providers: [AuthAPIService, LocalStrategy, JwtStrategy],
  exports: [AuthAPIService, JwtModule],
})
export class AuthAPIModule {}
