import { IsString } from "class-validator";

export class PriceBatchUpdateJobProductCardDTO {
    priceBatchUpdateJobProductCardId: string;
    commerceAccountId: string;
    productVendorId: string;
    productVendorCode: string;
    productLineId: string;
    productLineCode: string;
    productTypeId: string;
    productTypeCode: string;
    productLanguageId: string;
    productLanguageCode: string;
    productSetId: string;
    productSetCode: string;
    priceRuleProductCardBaseId: string;
    priceRuleProductCardBaseOption: string;
    priceBatchUpdateJobProductCardDate: Date;
    priceBatchUpdateJobProductCardCode: string;
    priceBatchUpdateJobProductCardCountIncrease: number;
    priceBatchUpdateJobProductCardCountDecrease: number;
    priceBatchUpdateJobProductCardStatus: string;
    priceBatchUpdateJobProductCardCreateDate: Date;
    priceBatchUpdateJobProductCardUpdateDate: Date;
}

export class CreatePriceBatchUpdateJobProductCardDTO {
    @IsString()
    commerceAccountId: string;
    @IsString()
    productVendorId: string;
    @IsString()
    productVendorCode: string;
    @IsString()
    productLineId: string;
    @IsString()
    productLineCode: string;
    @IsString()
    productTypeId: string;
    @IsString()
    productTypeCode: string;
    @IsString()
    productLanguageId: string;
    @IsString()
    productLanguageCode: string;
    @IsString()
    productSetId: string;
    @IsString()
    productSetCode: string;
    @IsString()
    priceRuleProductCardBaseId: string;
    @IsString()
    priceRuleProductCardBaseOption: string;
}
