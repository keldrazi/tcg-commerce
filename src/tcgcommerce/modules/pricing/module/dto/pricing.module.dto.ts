import { IsBoolean, IsString } from "class-validator";

export class PricingModuleDTO {
    pricingModuleId: string;
    applicationModuleId: string;
    commerceAccountId: string;
    pricingModuleSettings: string;
    pricingModuleRoles: string;
    pricingModuleIsActive: boolean;
    pricingModuleCreateDate: Date;
    pricingModuleUpdateDate: Date;
}

export class CreatePricingModuleDTO {
    @IsString()
    applicationModuleId: string;
    @IsString()
    commerceAccountId: string;
    @IsString()
    pricingModuleSettings: string;
    @IsString()
    pricingModuleRoles: string;
    @IsBoolean()
    pricingModuleIsActive: boolean;
}

export class UpdatePricingModuleDTO {
    @IsString()
    pricingModuleId: string;
    @IsString()
    applicationModuleId: string;
    @IsString()
    commerceAccountId: string;
    @IsString()
    pricingModuleSettings: string;
    @IsString()
    pricingModuleRoles: string;
    @IsBoolean()
    pricingModuleIsActive: boolean;
}


