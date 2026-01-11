import { IsBoolean, IsEmail, IsString } from 'class-validator';
import { CommerceAccountApplicationModule } from '../interface/commerce.account.interface';

export class CommerceAccountDTO {
    commerceAccountId: string;
    commerceAccountName: string;
    commerceAccountContactName: string;
    commerceAccountContactEmail: string;
    commerceAccountContactPhone: string;
    commerceAccountHandle: string;
    commerceAccountApplicationModules: CommerceAccountApplicationModule[];
    commerceAccountAPIClientId: string;
    commerceAccountAPIClientToken: string;
    commerceAccountIsActive: boolean;
    commerceAccountIsAdmin: boolean;
    commerceAccountCreateDate: Date;
    commerceAccountUpdateDate: Date; 
}

export class CreateCommerceAccountDTO {
    @IsString()
    commerceAccountName: string;
    @IsString()
    commerceAccountContactName: string;
    @IsEmail()
    commerceAccountContactEmail: string;
    @IsString()
    commerceAccountContactPhone: string;
    @IsString()
    commerceAccountHandle: string;
    @IsString()
    commerceAccountApplicationModules: string;
    @IsBoolean()
    commerceAccountIsActive: boolean;
}

export class UpdateCommerceAccountDTO {
    @IsString()
    commerceAccountId: string;
    @IsString()
    commerceAccountName: string;
    @IsString()
    commerceAccountContactName: string;
    @IsEmail()
    commerceAccountContactEmail: string;
    @IsString()
    commerceAccountContactPhone: string;
    @IsString()
    commerceAccountApplicationModules: string;
    @IsBoolean()
    commerceAccountIsActive: boolean;
}