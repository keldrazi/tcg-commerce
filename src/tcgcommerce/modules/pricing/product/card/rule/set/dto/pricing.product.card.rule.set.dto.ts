import { IsBoolean, IsDecimal, IsEmail, IsNumber, IsString } from "class-validator";

export class PricingProductCardRuleSetDTO {
    pricingProductCardRuleSetId: string;
    commerceAccountId: string;
    pricingProductCardTypeId: string;
    pricingProductCardRuleTypeId: string;
    pricingProductCardRuleSetName: string;
    pricingProductCardRuleSetMetadata: string;
    pricingProductCardRuleSetIsActive: boolean;
    pricingProductCardRuleSetCreateDate: Date;
    pricingProductCardRuleSetUpdateDate: Date;
}

export class CreatePricingProductCardRuleSetDTO {
    @IsString()
    commerceAccountId: string;
    @IsString()
    pricingProductCardTypeId: string;
    @IsString()
    pricingProductCardRuleTypeId: string;
    @IsString()
    pricingProductCardRuleSetName: string;
    @IsString()
    pricingProductCardRuleSetMetadata: string;
    @IsBoolean()
    pricingProductCardRuleSetIsActive: boolean;
}

export class UpdatePricingProductCardRuleSetDTO {
    @IsString()
    pricingProductCardRuleSetId: string;
    @IsString()
    pricingProductCardTypeId: string;
    @IsString()
    pricingProductCardRuleTypeId: string;
    @IsString()
    pricingProductCardRuleSetName: string;
    @IsString()
    pricingProductCardRuleSetMetadata: string;
    @IsBoolean()
    pricingProductCardRuleSetIsActive: boolean;
}
