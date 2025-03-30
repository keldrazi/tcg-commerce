import { IsBoolean, IsEmail, IsString, MinLength } from "class-validator";

export class CommerceUserDTO {
    commerceUserId: string;
    commerceAccountId: string;
    commerceUserName: string;
    commerceUserEmail: string;
    commerceUserRoles: string;
    commerceUserIsActive: boolean;
    commerceUserCreateDate: Date;
    commerceUserUpdateDate: Date;
}

export class CreateCommerceUserDTO {
    @IsString()
    commerceAccountId: string;
    @IsString()
    commerceUserName: string;
    @IsEmail()
    commerceUserEmail: string;
    @IsString()
    commerceUserRoles: string;
    @IsString()
    @MinLength(8)
    commerceUserPassword: string;
}

export class UpdateCommerceUserDTO {
    @IsString()
    commerceUserId: string;
    @IsString()
    commerceAccountId: string;
    @IsString()
    commerceUserName: string;
    @IsEmail()
    commerceUserEmail: string;
    @IsString()
    commerceUserRoles: string;
    @IsBoolean()
    commerceUserIsActive: boolean;
}