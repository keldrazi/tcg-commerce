import { IsBoolean, IsEmail, IsString, MinLength } from "class-validator";

export class BuylistUserDTO {
    buylistUserId: string;
    commerceAccountId: string;
    buylistUserFirstName: string;
    buylistUserLastName: string;
    buylistUserEmail: string;
    buylistUserAddress1: string;
    buylistUserAddress2: string;
    buylistUserCity: string;
    buylistUserState: string;
    buylistUserZipCode: string;
    buylistUserIsVerified: boolean;
    buylistUserIsActive: boolean;
    buylistUserCreateDate: Date;
    buylistUserUpdateDate: Date;
}

export class CreateBuylistUserDTO {
    @IsString()
    commerceAccountId: string;
    @IsString()
    buylistUserFirstName: string;
    @IsString()
    buylistUserLastName: string;
    @IsEmail()
    buylistUserEmail: string;
    @IsString()
    @MinLength(8)
    buylistUserPassword: string;
    @IsString()
    buylistUserAddress1: string;
    @IsString()
    buylistUserAddress2: string;
    @IsString()
    buylistUserCity: string;
    @IsString()
    buylistUserState: string;
    @IsString()
    buylistUserZipCode: string; 

}

export class UpdateBuylistUserDTO {
    @IsString()
    buylistUserId: string;
    @IsString()
    commerceAccountId: string;
    @IsString()
    buylistUserFirstName: string;
    @IsString()
    buylistUserLastName: string;
    @IsEmail()
    buylistUserEmail: string;
    @IsString()
    buylistUserAddress1: string;
    @IsString()
    buylistUserAddress2: string;
    @IsString()
    buylistUserCity: string;
    @IsString()
    buylistUserState: string;
    @IsString()
    buylistUserZipCode: string;
    @IsBoolean()
    buylistUserIsActive: boolean; 
}