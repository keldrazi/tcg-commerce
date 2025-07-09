import { IsBoolean, IsString } from "class-validator";

export class PricingProductCardRuleTypeDTO {
    pricingProductCardRuleTypeId: string;
    pricingProductCardTypeId: string;
    pricingProductCardRuleTypeName: string;
    pricingProductCardRuleTypeCode: string;
    pricingProductCardRuleTypeDescription: string;
    pricingProductCardRuleTypeMetadata: string;
    pricingProductCardRuleTypeIsActive: boolean;
    pricingProductCardRuleTypeCreateDate: Date; 
    pricingProductCardRuleTypeUpdateDate: Date;
}

export class CreatePricingProductCardRuleTypeDTO {
    @IsString()
    pricingProductCardTypeId:string;
    @IsString()
    pricingProductCardRuleTypeName: string;
    @IsString()
    pricingProductCardRuleTypeCode: string;
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
    pricingProductCardRuleTypeCode: string;
    @IsString()
    pricingProductCardRuleTypeDescription: string;
    @IsString()
    pricingProductCardRuleTypeMetadata: string;
    @IsBoolean()
    pricingProductCardRuleTypeIsActive: boolean;
}
