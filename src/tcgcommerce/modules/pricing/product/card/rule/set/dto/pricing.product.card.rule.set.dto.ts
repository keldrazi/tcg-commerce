import { IsBoolean, IsString } from "class-validator";

export class PricingProductCardRuleSetDTO {
    pricingProductCardRuleSetId: string;
    commerceAccountId: string;
    productVendorId: string;
    productLineId: string;
    productTypeId: string;
    pricingProductCardTypeId: string;
    pricingProductCardRuleTypeCode: string;
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
    productVendorId: string;
    @IsString()
    productLineId: string;
    @IsString()
    productTypeId: string;
    @IsString()
    pricingProductCardTypeId: string;
    @IsString()
    pricingProductCardRuleTypeId: string;
    @IsString()
    pricingProductCardRuleTypeCode: string;
    @IsString()
    pricingProductCardRuleSetName: string;
    pricingProductCardRuleSetMetadata: any;
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
    pricingProductCardRuleSetMetadata: any;
    @IsBoolean()
    pricingProductCardRuleSetIsActive: boolean;
}
