import { IsBoolean, IsString } from "class-validator";

export class PriceProductCardTypeDTO {
    priceProductCardTypeId: string;
    productVendorId: string;
    productLineId: string;
    productTypeId: string;
    priceProductCardTypeName: string;
    priceProductCardTypeDescription: string;
    priceProductCardTypeIsActive: boolean;
    priceProductCardTypeCreateDate: Date; 
    priceProductCardTypeUpdateDate: Date;
}

export class CreatePriceProductCardTypeDTO {
    @IsString()
    productVendorId: string;
    @IsString()
    productLineId: string;
    @IsString()
    productTypeId: string;
    @IsString()
    priceProductCardTypeName: string;
    @IsString()
    priceProductCardTypeDescription: string;
    @IsBoolean()
    priceProductCardTypeIsActive: boolean;
}

export class UpdatePriceProductCardTypeDTO {
    @IsString()
    priceProductCardTypeId: string;
    @IsString()
    priceProductCardTypeName: string;
    @IsString()
    priceProductCardTypeDescription: string;
    @IsBoolean()
    priceProductCardTypeIsActive: boolean;
}
