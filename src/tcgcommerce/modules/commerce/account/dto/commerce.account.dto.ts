import { IsBoolean, IsEmail, IsString } from "class-validator";

export class CommerceAccountDTO {
    commerceAccountId: string;
    commerceAccountName: string;
    commerceAccountContactName: string;
    commerceAccountContactEmail: string;
    commerceAccountContactPhone: string;
    commerceAccountHandle: string;
    commerceAccountModules: string;
    commerceAccountIsActive: boolean;
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
    commerceAccountModules: string;
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
    commerceAccountModules: string;
    @IsBoolean()
    commerceAccountIsActive: boolean;
}