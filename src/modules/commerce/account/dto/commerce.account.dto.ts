import { IsEmail, IsString } from "class-validator";

export class CommerceAccountDTO {
    commerceAccountId: string;
    commerceAccountName: string;
    commerceAccountEmail: string;
    commerceAccountHandle: string;
    commerceAccountIsActive: boolean;
    commerceAccountCreateDate: Date;
    commerceAccountUpdateDate: Date; 
}

export class CreateCommerceAccountDTO {
    @IsString()
    commerceAccountName: string;
    @IsEmail()
    commerceAccountEmail: string;
    @IsString()
    commerceAccountHandle: string;
}

export class UpdateCommerceAccountDTO {
    @IsString()
    commerceAccountId: string;
    @IsString()
    commerceAccountName: string;
    @IsEmail()
    commerceAccountEmail: string;
    @IsString()
    commerceAccountHandle: string;
}