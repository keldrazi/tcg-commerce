import { BadRequestException, Injectable } from '@nestjs/common';
import { CommerceAccountService } from 'src/tcgcommerce/modules/commerce/account/commerce.account.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CommerceAccount } from 'src/typeorm/entities/tcgcommerce/modules/commerce/account/commerce.account.entity';

@Injectable()
export class AuthAPIService {
  constructor(
    private commerceAccountService: CommerceAccountService,
    private jwtService: JwtService,
  ) {}

  async validateCommerceAccount(commerceAccountAPIClientId: string, commerceAccountAPIClientToken: string): Promise<CommerceAccount> {
    const commerceAccount = await this.commerceAccountService.getCommerceAccountByClientIdAndToken(commerceAccountAPIClientId, commerceAccountAPIClientToken);
    
    if(!commerceAccount){
      throw new BadRequestException('Commerce Account not found');
    }

    if(!commerceAccount.commerceAccountIsActive){
      throw new BadRequestException('Commerce Account is not active');
    }

    return commerceAccount;
  }
    
  async loginCommerceAccount(commerceAccount: CommerceAccount): Promise<any> {
    const payload = { commerceAccountId: commerceAccount.commerceAccountId, commerceAccountAPIClientId: commerceAccount.commerceAccountAPIClientId, commerceAccountIsAdmin: commerceAccount.commerceAccountIsAdmin };
    const access_token_issued = new Date();
    const access_token_expires = new Date(access_token_issued);
    access_token_expires.setDate(access_token_expires.getDate() + 7); 
    return{
      access_token: this.jwtService.sign(payload),
      access_token_issued: access_token_issued,
      access_token_expires: access_token_expires
    }
  }
}