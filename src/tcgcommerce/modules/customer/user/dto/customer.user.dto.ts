import { IsBoolean, IsEmail, IsString, MinLength } from "class-validator";

export class CustomerUserDTO {
    customerUserId: string;
    commerceAccountId: string;
    customerUserEmail: string;
    customerUserIsVerified: boolean;
    customerUserIsActive: boolean;
    customerUserCreateDate: Date;
    customerUserUpdateDate: Date;
}

export class CreateCustomerUserDTO {
    @IsString()
    commerceAccountId: string;
    @IsEmail()
    customerUserEmail: string;
    @IsString()
    @MinLength(8)
    customerUserPassword: string;
}

export class UpdateCustomerUserDTO {
    @IsString()
    customerUserId: string;
    @IsString()
    commerceAccountId: string;
    @IsEmail()
    customerUserEmail: string;
    @IsBoolean()
    customerUserIsActive: boolean; 
}