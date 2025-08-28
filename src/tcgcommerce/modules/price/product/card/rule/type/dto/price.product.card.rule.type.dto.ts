import { IsBoolean, IsJSON, IsString } from "class-validator";
import { PriceProductCardRuleTypeMetadata } from 'src/tcgcommerce/modules/price/product/card/rule/type/interface/price.product.card.rule.type.metadata.interface';

export class PriceProductCardRuleTypeDTO {
    priceProductCardRuleTypeId: string;
    priceProductCardTypeId: string;
    priceProductCardRuleTypeName: string;
    priceProductCardRuleTypeCode: string;
    priceProductCardRuleTypeDescription: string;
    priceProductCardRuleTypeMetadata: PriceProductCardRuleTypeMetadata;
    priceProductCardRuleTypeIsActive: boolean;
    priceProductCardRuleTypeCreateDate: Date; 
    priceProductCardRuleTypeUpdateDate: Date;
}

export class CreatePriceProductCardRuleTypeDTO {
    @IsString()
    priceProductCardTypeId:string;
    @IsString()
    priceProductCardRuleTypeName: string;
    @IsString()
    priceProductCardRuleTypeCode: string;
    @IsString()
    priceProductCardRuleTypeDescription: string;
    priceProductCardRuleTypeMetadata: PriceProductCardRuleTypeMetadata;
    @IsBoolean()
    priceProductCardRuleTypeIsActive: boolean;
}

export class UpdatePriceProductCardRuleTypeDTO {
    @IsString()
    priceProductCardRuleTypeId: string;
    @IsString()
    priceProductCardRuleTypeName: string;
    @IsString()
    priceProductCardRuleTypeCode: string;
    @IsString()
    priceProductCardRuleTypeDescription: string;
    priceProductCardRuleTypeMetadata: PriceProductCardRuleTypeMetadata;
    @IsBoolean()
    priceProductCardRuleTypeIsActive: boolean;
}
