import { IsBoolean, IsString } from "class-validator";
import { PricingProductCardRuleSetMetadata } from 'src/tcgcommerce/modules/pricing/product/card/rule/set/interface/pricing.product.card.rule.set.metadata.interface';

export class PricingProductCardRuleSetDTO {
    pricingProductCardRuleSetId: string;
    commerceAccountId: string;
    productVendorId: string;
    productLineId: string;
    productTypeId: string;
    pricingProductCardTypeId: string;
    pricingProductCardRuleTypeId: string;
    pricingProductCardRuleTypeCode: string;
    pricingProductCardRuleSetName: string;
    pricingProductCardRuleSetMetadata: PricingProductCardRuleSetMetadata;
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
    pricingProductCardRuleSetMetadata: PricingProductCardRuleSetMetadata;
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
    pricingProductCardRuleSetMetadata: PricingProductCardRuleSetMetadata;
    @IsBoolean()
    pricingProductCardRuleSetIsActive: boolean;
}
