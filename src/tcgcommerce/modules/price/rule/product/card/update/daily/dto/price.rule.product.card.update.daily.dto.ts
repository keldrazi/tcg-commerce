import { IsBoolean, IsNumber, IsString } from "class-validator";

export class PriceRuleProductCardUpdateDailyDTO {
    priceRuleProductCardUpdateDailyId: string;
    commerceAccountId: string;
    productVendorId: string;
    productLineId: string;
    productTypeId: string;
    priceRuleProductCardUpdateDailyCommerceLocationIds: any;
    priceRuleProductCardUpdateDailyCreateDate: Date;
    priceRuleProductCardUpdateDailyUpdateDate: Date;

}

export class CreatePriceRuleProductCardUpdateDailyDTO {
    @IsString()
    commerceAccountId: string;
    @IsString()
    productVendorId: string;
    @IsString()
    productLineId: string;
    @IsString()
    productTypeId: string;
    @IsString()
    priceRuleProductCardUpdateDailyCommerceLocationIds: string;
}

export class UpdatePriceRuleProductCardUpdateDailyDTO {
    @IsString()
    priceRuleProductCardUpdateDailyId: string;
    @IsString()
    commerceAccountId: string;
    @IsString()
    productVendorId: string;
    @IsString()
    productLineId: string;
    @IsString()
    productTypeId: string;
    @IsString()
    priceRuleProductCardUpdateDailyCommerceLocationIds: string;

}
