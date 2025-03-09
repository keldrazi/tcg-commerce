import { IsEmail, IsString } from "class-validator";

export class CommerceAccountDTO {
    commerceAccountId: string;
    commerceAccountName: string;
    commerceAccountContactName: string;
    commerceAccountContactEmail: string;
    commerceAccountContactPhone: string;
    commerceAccountHandle: string;
    commerceAccountIsActive: boolean;
    commerceAccountCreateDate: Date;
    commerceAccountUpdateDate: Date; 
}

export class CreateCommerceAccountDTO {
    @IsString()
    commerceAccountName: string;
    @IsString()
    commerceAccountContact: string;
    @IsEmail()
    commerceAccountContactEmail: string;
    @IsString()
    commerceAccountContactPhone: string;
    @IsString()
    commerceAccountHandle: string;
}

export class UpdateCommerceAccountDTO {
    @IsString()
    commerceAccountId: string;
    @IsString()
    commerceAccountContact: string;
    @IsEmail()
    commerceAccountContactEmail: string;
    @IsString()
    commerceAccountContactPhone: string;
    @IsString()
    commerceAccountPhone: string;
    @IsString()
    commerceAccountHandle: string;
}