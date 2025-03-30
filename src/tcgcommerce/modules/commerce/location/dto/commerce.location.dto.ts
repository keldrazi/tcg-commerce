import { IsEmail, IsString, MinLength } from "class-validator";

export class CommerceLocationDTO {
    commerceLocationId: string;
    commerceAccountId: string;
    commerceLocationName: string;
    commerceLocationAddress: string;
    commerceLocationCity: string;
    commerceLocationState: string;
    commerceLocationZip: string;
    commerceLocationPhoneNumber: string;
    commerceLocationIsActive: boolean;
    commerceLocationCreateDate: Date;
    commerceLocationUpdateDate: Date;
}

export class CreateCommerceLocationDTO {
    @IsString()
    commerceAccountId: string;
    @IsString()
    commerceLocationName: string;
    @IsString()
    commerceLocationAddress: string;
    @IsString()
    commerceLocationCity: string;
    @IsString()
    commerceLocationState: string;
    @IsString()
    commerceLocationZip: string;
    @IsString()
    commerceLocationPhoneNumber: string;
    @IsString()
    commerceLocationIsActive: boolean;
}

export class UpdateCommerceLocationDTO {
    @IsString()
    commerceLocationId: string;
    @IsString()
    commerceAccountId: string;
    @IsString()
    commerceLocationName: string;
    @IsString()
    commerceLocationAddress: string;
    @IsString()
    commerceLocationCity: string;
    @IsString()
    commerceLocationState: string;
    @IsString()
    commerceLocationZip: string;
    @IsString()
    commerceLocationPhoneNumber: string;
    @IsString()
    commerceLocationIsActive: boolean;
}