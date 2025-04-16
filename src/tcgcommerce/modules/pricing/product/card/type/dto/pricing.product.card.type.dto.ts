import { IsBoolean, IsString } from "class-validator";

export class PricingProductCardTypeDTO {
    pricingProductCardTypeId: string;
    pricingProductCardTypeName: string;
    pricingProductCardTypeDescription: string;
    pricingProductCardTypeMetadata: string;
    pricingProductCardTypeIsActive: boolean;
    pricingProductCardTypeCreateDate: Date; 
    pricingProductCardTypeUpdateDate: Date;
}

export class CreatePricingProductCardTypeDTO {
    @IsString()
    pricingProductCardTypeName: string;
    @IsString()
    pricingProductCardTypeDescription: string;
    @IsString()
    pricingProductCardTypeMetadata: string;
    @IsBoolean()
    pricingProductCardTypeIsActive: boolean;
}

export class UpdatePricingProductCardTypeDTO {
    @IsString()
    pricingProductCardTypeId: string;
    @IsString()
    pricingProductCardTypeName: string;
    @IsString()
    pricingProductCardTypeDescription: string;
    @IsString()
    pricingProductCardTypeMetadata: string;
    @IsBoolean()
    pricingProductCardTypeIsActive: boolean;
}
