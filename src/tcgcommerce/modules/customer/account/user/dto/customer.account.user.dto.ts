import { IsBoolean, IsEmail, IsString, MinLength } from "class-validator";

export class CustomerAccountUserDTO {
    customerAccountUserId: string;
    commerceAccountId: string;
    customerAccountUserEmail: string;
    customerAccountUserIsVerified: boolean;
    customerAccountUserIsActive: boolean;
    customerAccountUserCreateDate: Date;
    customerAccountUserUpdateDate: Date;
}

export class CreateCustomerAccountUserDTO {
    @IsString()
    commerceAccountId: string;
    @IsEmail()
    customerAccountUserEmail: string;
    @IsString()
    @MinLength(8)
    customerAccountUserPassword: string;
}

export class UpdateCustomerAccountUserDTO {
    @IsString()
    customerAccountUserId: string;
    @IsString()
    commerceAccountId: string;
    @IsEmail()
    customerAccountUserEmail: string;
    @IsBoolean()
    customerAccountUserIsActive: boolean; 
}