import { IsBoolean, IsString } from "class-validator";
import { PriceProductCardRuleSetMetadata } from 'src/tcgcommerce/modules/price/product/card/rule/set/interface/price.product.card.rule.set.metadata.interface';

export class PriceProductCardRuleSetDTO {
    priceProductCardRuleSetId: string;
    commerceAccountId: string;
    productVendorId: string;
    productLineId: string;
    productTypeId: string;
    priceProductCardTypeId: string;
    priceProductCardRuleTypeId: string;
    priceProductCardRuleTypeCode: string;
    priceProductCardRuleSetName: string;
    priceProductCardRuleSetMetadata: PriceProductCardRuleSetMetadata;
    priceProductCardRuleSetIsActive: boolean;
    priceProductCardRuleSetCreateDate: Date;
    priceProductCardRuleSetUpdateDate: Date;
}

export class CreatePriceProductCardRuleSetDTO {
    @IsString()
    commerceAccountId: string;
    @IsString()
    productVendorId: string;
    @IsString()
    productLineId: string;
    @IsString()
    productTypeId: string;
    @IsString()
    priceProductCardTypeId: string;
    @IsString()
    priceProductCardRuleTypeId: string;
    @IsString()
    priceProductCardRuleTypeCode: string;
    @IsString()
    priceProductCardRuleSetName: string;
    priceProductCardRuleSetMetadata: PriceProductCardRuleSetMetadata;
    @IsBoolean()
    priceProductCardRuleSetIsActive: boolean;
}

export class UpdatePriceProductCardRuleSetDTO {
    @IsString()
    priceProductCardRuleSetId: string;
    @IsString()
    priceProductCardTypeId: string;
    @IsString()
    priceProductCardRuleTypeId: string;
    @IsString()
    priceProductCardRuleSetName: string;
    priceProductCardRuleSetMetadata: PriceProductCardRuleSetMetadata;
    @IsBoolean()
    priceProductCardRuleSetIsActive: boolean;
}
