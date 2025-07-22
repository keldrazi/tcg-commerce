import { IsBoolean, IsJSON, IsString } from "class-validator";
import { PricingProductCardRuleTypeMetadata } from 'src/tcgcommerce/modules/pricing/product/card/rule/type/interface/pricing.product.card.rule.type.metadata.interface';

export class PricingProductCardRuleTypeDTO {
    pricingProductCardRuleTypeId: string;
    pricingProductCardTypeId: string;
    pricingProductCardRuleTypeName: string;
    pricingProductCardRuleTypeCode: string;
    pricingProductCardRuleTypeDescription: string;
    pricingProductCardRuleTypeMetadata: PricingProductCardRuleTypeMetadata;
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
    pricingProductCardRuleTypeMetadata: PricingProductCardRuleTypeMetadata;
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
    pricingProductCardRuleTypeMetadata: PricingProductCardRuleTypeMetadata;
    @IsBoolean()
    pricingProductCardRuleTypeIsActive: boolean;
}
