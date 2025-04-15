import { IsBoolean, IsDecimal, IsEmail, IsNumber, IsString } from "class-validator";

export class PricingProductCardRuleSetDTO {
    pricingProductCardRuleSetId: string;
    commerceAccountId: string;
    productLineId: string;
    pricingProductCardTypeId: string;
    pricingProductCardRuleTypeId: string;
    pricingProductCardRuleSetName: string;
    pricingProductCardRuleSetPriceMinimumEnabled: boolean; 
    pricingProductCardRuleSetPriceMinimum: number;
    pricingProductCardRuleSetMetadata: string;
    pricingProductCardRuleSetIsActive: boolean;
    pricingProductCardRuleSetCreateDate: Date;
    pricingProductCardRuleSetUpdateDate: Date;
}

export class CreatePricingProductCardRuleSetDTO {
    @IsString()
    commerceAccountId: string;
    @IsString()
    productLineId: string;
    @IsString()
    pricingProductCardTypeId: string;
    @IsString()
    pricingProductCardRuleTypeId: string;
    @IsString()
    pricingProductCardRuleSetName: string;
    @IsBoolean()
    pricingProductCardRuleSetPriceMinimumEnabled: boolean;
    @IsDecimal()
    pricingProductCardRuleSetPriceMinimum: number;
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
    @IsBoolean()
    pricingProductCardRuleSetPriceMinimumEnabled: boolean;
    @IsDecimal()
    pricingProductCardRuleSetPriceMinimum: number;
    @IsString()
    pricingProductCardRuleSetMetadata: string;
    @IsBoolean()
    pricingProductCardRuleSetIsActive: boolean;
}
