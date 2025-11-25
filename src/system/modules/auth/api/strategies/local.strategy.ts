import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthAPIService } from '../auth.api.service';
import { CommerceAccount } from 'src/typeorm/entities/tcgcommerce/modules/commerce/account/commerce.account.entity';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    private authAPIService: AuthAPIService) {
    super({
      usernameField: 'commerceAccountAPIClientId',
      passwordField: 'commerceAccountAPIClientToken',
    });
  }

  async validate(commerceAccountAPIClientId: string, commerceAccountAPIClientToken: string): Promise<CommerceAccount> {
    const commerceAccount = await this.authAPIService.validateCommerceAccount(commerceAccountAPIClientId, commerceAccountAPIClientToken);

    if (!commerceAccount) {
      throw new UnauthorizedException();
    }
    return commerceAccount;
  }
}