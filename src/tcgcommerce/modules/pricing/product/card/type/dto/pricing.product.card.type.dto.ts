import { IsBoolean, IsString } from "class-validator";

export class PricingProductCardTypeDTO {
    pricingProductCardTypeId: string;
    productVendorId: string;
    productLineId: string;
    pricingProductCardTypeName: string;
    pricingProductCardTypeDescription: string;
    pricingProductCardTypeIsActive: boolean;
    pricingProductCardTypeCreateDate: Date; 
    pricingProductCardTypeUpdateDate: Date;
}

export class CreatePricingProductCardTypeDTO {
    @IsString()
    productVendorId: string;
    @IsString()
    productLineId: string;
    @IsString()
    pricingProductCardTypeName: string;
    @IsString()
    pricingProductCardTypeDescription: string;
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
    @IsBoolean()
    pricingProductCardTypeIsActive: boolean;
}
