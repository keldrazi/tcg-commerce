import { IsBoolean, IsNumber, IsString } from "class-validator";

export class PriceRuleProductCardBaseDTO {
    priceRuleProductCardBaseId: string;
    commerceAccountId: string;
    productVendorId: string;
    productLineId: string;
    productTypeId: string;
    priceRuleProductCardBaseOption: string;
    priceRuleProductCardBaseNMPercentage: number;
    priceRuleProductCardBaseLPPercentage: number;
    priceRuleProductCardBaseMPPercentage: number;
    priceRuleProductCardBaseHPPercentage: number;
    priceRuleProductCardBaseDMPercentage: number;
    priceRuleProductCardBaseCreateDate: Date;
    priceRuleProductCardBaseUpdateDate: Date;

}

export class CreatePriceRuleProductCardBaseDTO {
    @IsString()
    commerceAccountId: string;
    @IsString()
    productVendorId: string;
    @IsString()
    productLineId: string;
    @IsString()
    productTypeId: string;
    @IsString()
    priceRuleProductCardBaseOption: string;
    @IsNumber()
    priceRuleProductCardBaseNMPercentage: number;
    @IsNumber()
    priceRuleProductCardBaseLPPercentage: number;
    @IsNumber()
    priceRuleProductCardBaseMPPercentage: number;
    @IsNumber()
    priceRuleProductCardBaseHPPercentage: number;
    @IsNumber()
    priceRuleProductCardBaseDMPercentage: number;
}

export class UpdatePriceRuleProductCardBaseDTO {
    @IsString()
    priceRuleProductCardBaseId: string;
    @IsString()
    commerceAccountId: string;
    @IsString()
    productVendorId: string;
    @IsString()
    productLineId: string;
    @IsString()
    productTypeId: string;
    @IsString()
    priceRuleProductCardBaseOption: string;
    @IsNumber()
    priceRuleProductCardBaseNMPercentage: number;
    @IsNumber()
    priceRuleProductCardBaseLPPercentage: number;
    @IsNumber()
    priceRuleProductCardBaseMPPercentage: number;
    @IsNumber()
    priceRuleProductCardBaseHPPercentage: number;
    @IsNumber()
    priceRuleProductCardBaseDMPercentage: number;

}
