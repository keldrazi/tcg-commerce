import { IsNumber, IsString } from "class-validator";

export class BuylistPriceProductCardRuleHotlistDTO {
    buylistPriceProductCardRuleHotlistId: string;
    commerceAccountId: string;
    buylistLocationId: string;
    productVendorId: string;
    productLineId: string;
    productTypeId: string;
    buylistPriceProductCardRuleHotlistOption: string;
    buylistPriceProductCardRuleHotlistCashPercentage: number;
    buylistPriceProductCardRuleHotlistCreditPercentage: number;
    buylistPriceProductCardRuleHotlistNMPercentage: number;
    buylistPriceProductCardRuleHotlistLPPercentage: number;
    buylistPriceProductCardRuleHotlistMPPercentage: number;
    buylistPriceProductCardRuleHotlistHPPercentage: number;
    buylistPriceProductCardRuleHotlistDMPercentage: number;
    buylistPriceProductCardRuleHotlistCreateDate: Date;
    buylistPriceProductCardRuleHotlistUpdateDate: Date;

}

export class CreateBuylistPriceProductCardRuleHotlistDTO {
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
    buylistPriceProductCardRuleHotlistOption: string;
    @IsNumber()
    buylistPriceProductCardRuleHotlistCashPercentage: number;
    @IsNumber()
    buylistPriceProductCardRuleHotlistCreditPercentage: number;
    @IsNumber()
    buylistPriceProductCardRuleHotlistNMPercentage: number;
    @IsNumber()
    buylistPriceProductCardRuleHotlistLPPercentage: number;
    @IsNumber()
    buylistPriceProductCardRuleHotlistMPPercentage: number;
    @IsNumber()
    buylistPriceProductCardRuleHotlistHPPercentage: number;
    @IsNumber()
    buylistPriceProductCardRuleHotlistDMPercentage: number;
}

export class UpdateBuylistPriceProductCardRuleHotlistDTO {
    @IsString()
    buylistPriceProductCardRuleHotlistId: string;
    @IsString()
    buylistPriceProductCardRuleHotlistOption: string;
    @IsNumber()
    buylistPriceProductCardRuleHotlistCashPercentage: number;
    @IsNumber()
    buylistPriceProductCardRuleHotlistCreditPercentage: number;
    @IsNumber()
    buylistPriceProductCardRuleHotlistNMPercentage: number;
    @IsNumber()
    buylistPriceProductCardRuleHotlistLPPercentage: number;
    @IsNumber()
    buylistPriceProductCardRuleHotlistMPPercentage: number;
    @IsNumber()
    buylistPriceProductCardRuleHotlistHPPercentage: number;
    @IsNumber()
    buylistPriceProductCardRuleHotlistDMPercentage: number;
}

