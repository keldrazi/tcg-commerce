import { IsDecimal, IsEmail, IsNumber, IsString } from "class-validator";

export class PricingProductCardsDTO {
    pricingProductCardDTOs: PricingProductCardDTO[];
}

export class PricingProductCardDTO {
    pricingProductCardId: string;
    commerceAccountId: string;
    productCardTypeName: string;
    pricingProductCardPriceType: string;
    pricingProductCardPriceTypeOption: string;
    pricingProductCardRuleMetadata: string;
    pricingProductCardUpdateDate: Date; 
    
}

export class CreatePricingProductCardDTO {
    @IsString()
    commerceAccountId: string;
    @IsString()
    productCardTypeName: string;
    @IsString()
    pricingProductCardPriceType: string;
    @IsString()
    pricingProductCardPriceTypeOption: string;
    @IsString()
    pricingProductCardRuleMetadata: string;
}

export class UpdatePricingProductCardDTO {
    @IsString()
    pricingProductCardId: string;
    @IsString()
    commerceAccountId: string;
    @IsString()
    productCardTypeName: string;
    @IsString()
    pricingProductCardPriceType: string;
    @IsString()
    pricingProductCardPriceTypeOption: string;
    @IsString()
    pricingProductCardRuleMetadata: string;
}
