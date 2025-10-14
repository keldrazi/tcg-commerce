import { IsBoolean, IsNumber, IsString } from "class-validator";

export class PriceProductCardBaseDTO {
    priceProductCardBaseId: string;
    commerceAccountId: string;
    productVendorId: string;
    productLineId: string;
    productTypeId: string;
    priceProductCardBaseOption: string;
    priceProductCardBaseNMPercentage: number;
    priceProductCardBaseLPPercentage: number;
    priceProductCardBaseMPPercentage: number;
    priceProductCardBaseHPPercentage: number;
    priceProductCardBaseDMPercentage: number;
    priceProductCardBaseCreateDate: Date;
    priceProductCardBaseUpdateDate: Date;

}

export class CreatePriceProductCardBaseDTO {
    @IsString()
    commerceAccountId: string;
    @IsString()
    productVendorId: string;
    @IsString()
    productLineId: string;
    @IsString()
    productTypeId: string;
    @IsString()
    priceProductCardBaseOption: string;
    @IsNumber()
    priceProductCardBaseNMPercentage: number;
    @IsNumber()
    priceProductCardBaseLPPercentage: number;
    @IsNumber()
    priceProductCardBaseMPPercentage: number;
    @IsNumber()
    priceProductCardBaseHPPercentage: number;
    @IsNumber()
    priceProductCardBaseDMPercentage: number;
}

export class UpdatePriceProductCardBaseDTO {
    @IsString()
    priceProductCardBaseId: string;
    @IsString()
    commerceAccountId: string;
    @IsString()
    productVendorId: string;
    @IsString()
    productLineId: string;
    @IsString()
    productTypeId: string;
    @IsString()
    priceProductCardBaseOption: string;
    @IsNumber()
    priceProductCardBaseNMPercentage: number;
    @IsNumber()
    priceProductCardBaseLPPercentage: number;
    @IsNumber()
    priceProductCardBaseMPPercentage: number;
    @IsNumber()
    priceProductCardBaseHPPercentage: number;
    @IsNumber()
    priceProductCardBaseDMPercentage: number;

}
