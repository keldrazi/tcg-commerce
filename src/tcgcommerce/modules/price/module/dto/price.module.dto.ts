import { IsBoolean, IsString } from "class-validator";

export class PriceModuleDTO {
    priceModuleId: string;
    applicationModuleId: string;
    commerceAccountId: string;
    priceModuleSettings: string;
    priceModuleRoles: string;
    priceModuleIsActive: boolean;
    priceModuleCreateDate: Date;
    priceModuleUpdateDate: Date;
}

export class CreatePriceModuleDTO {
    @IsString()
    applicationModuleId: string;
    @IsString()
    commerceAccountId: string;
    @IsString()
    priceModuleSettings: string;
    @IsString()
    priceModuleRoles: string;
    @IsBoolean()
    priceModuleIsActive: boolean;
}

export class UpdatePriceModuleDTO {
    @IsString()
    priceModuleId: string;
    @IsString()
    applicationModuleId: string;
    @IsString()
    commerceAccountId: string;
    @IsString()
    priceModuleSettings: string;
    @IsString()
    priceModuleRoles: string;
    @IsBoolean()
    priceModuleIsActive: boolean;
}


