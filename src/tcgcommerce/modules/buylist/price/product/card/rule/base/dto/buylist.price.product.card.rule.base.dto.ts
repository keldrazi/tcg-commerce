import { IsBoolean, IsNumber, IsString } from "class-validator";

export class BuylistPriceProductCardRuleBaseDTO {
    buylistPriceProductCardRuleBaseId: string;
    commerceAccountId: string;
    buylistLocationId: string;
    productVendorId: string;
    productLineId: string;
    productTypeId: string;
    buylistPriceProductCardRuleBaseOption: string;
    buylistPriceProductCardRuleBaseCashPercentage: number;
    buylistPriceProductCardRuleBaseCreditPercentage: number;
    buylistPriceProductCardRuleBaseNMPercentage: number;
    buylistPriceProductCardRuleBaseLPPercentage: number;
    buylistPriceProductCardRuleBaseMPPercentage: number;
    buylistPriceProductCardRuleBaseHPPercentage: number;
    buylistPriceProductCardRuleBaseDMPercentage: number;
    buylistPriceProductCardRuleBaseCreateDate: Date;
    buylistPriceProductCardRuleBaseUpdateDate: Date;

}

export class CreateBuylistPriceProductCardRuleBaseDTO {
    @IsString()
    commerceAccountId: string;
    @IsString()
    buylistLocationId: string;
    @IsString()
    productVendorId: string;
    @IsString()
    productLineId: string;
    @IsString()
    productTypeId: string;
    @IsString()
    buylistPriceProductCardRuleBaseOption: string;
    @IsNumber()
    buylistPriceProductCardRuleBaseCashPercentage: number;
    @IsNumber()
    buylistPriceProductCardRuleBaseCreditPercentage: number;
    @IsNumber()
    buylistPriceProductCardRuleBaseNMPercentage: number;
    @IsNumber()
    buylistPriceProductCardRuleBaseLPPercentage: number;
    @IsNumber()
    buylistPriceProductCardRuleBaseMPPercentage: number;
    @IsNumber()
    buylistPriceProductCardRuleBaseHPPercentage: number;
    @IsNumber()
    buylistPriceProductCardRuleBaseDMPercentage: number;
}

export class UpdateBuylistPriceProductCardRuleBaseDTO {
    @IsString()
    buylistPriceProductCardRuleBaseId: string;
    @IsString()
    buylistPriceProductCardRuleBaseOption: string;
    @IsNumber()
    buylistPriceProductCardRuleBaseCashPercentage: number;
    @IsNumber()
    buylistPriceProductCardRuleBaseCreditPercentage: number;
    @IsNumber()
    buylistPriceProductCardRuleBaseNMPercentage: number;
    @IsNumber()
    buylistPriceProductCardRuleBaseLPPercentage: number;
    @IsNumber()
    buylistPriceProductCardRuleBaseMPPercentage: number;
    @IsNumber()
    buylistPriceProductCardRuleBaseHPPercentage: number;
    @IsNumber()
    buylistPriceProductCardRuleBaseDMPercentage: number;
}

