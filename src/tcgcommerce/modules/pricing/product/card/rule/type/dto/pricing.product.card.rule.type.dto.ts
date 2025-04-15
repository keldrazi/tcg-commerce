import { IsBoolean, IsString } from "class-validator";

export class PricingProductCardRuleTypeDTO {
    pricingProductCardRuleTypeId: string;
    pricingProductCardRuleTypeName: string;
    pricingProductCardRuleTypeDescription: string;
    pricingProductCardRuleTypeMetadata: string;
    pricingProductCardRuleTypeIsActive: boolean;
    pricingProductCardRuleTypeCreateDate: Date; 
    pricingProductCardRuleTypeUpdateDate: Date;
}

export class CreatePricingProductCardRuleTypeDTO {
    @IsString()
    pricingProductCardRuleTypeName: string;
    @IsString()
    pricingProductCardRuleTypeDescription: string;
    @IsString()
    pricingProductCardRuleTypeMetadata: string;
    @IsBoolean()
    pricingProductCardRuleTypeIsActive: boolean;
}

export class UpdatePricingProductCardRuleTypeDTO {
    @IsString()
    pricingProductCardRuleTypeId: string;
    @IsString()
    pricingProductCardRuleTypeName: string;
    @IsString()
    pricingProductCardRuleTypeDescription: string;
    @IsString()
    pricingProductCardRuleTypeMetadata: string;
    @IsBoolean()
    pricingProductCardRuleTypeIsActive: boolean;
}
