import { IsString, IsBoolean } from "class-validator";

export class BuylistProductCardDTO {
    buylistProductCardId: string;
    commerceAccountId: string;
    commerceUserId: string;
    buylistUserId: string;
    buylistLocationId: string;
    buylistTypeId: string;
    buylistPaymentTypeId: string;
    buylistPaymentServiceId: string;
    productVendorId: string;
    productLineId: string;
    productTypeId: string;
    productLanguageId: string;
    productLanguageCode: string;
    buylistProductCardStatus: string;   
    buylistProductCardCode: string;
    buylistProductCardDateTime: Date;
    buylistProductCardTotalCount: number;
    buylistProductCardTotalQtyCount: number;
    buylistProductCardTotalPrice: number;   
    buylistProductCardCreateDate: Date;
    buylistProductCardUpdateDate: Date;

    
}

export class CreateBuylistProductCardDTO {
    @IsString()
    commerceAccountId: string;
    @IsString()
    commerceUserId: string;
    @IsString()
    buylistUserId: string;
    @IsString()
    buylistLocationId: string;
    @IsString()
    buyListTypeId: string;
    @IsString()
    buylistPaymentTypeId: string;
    @IsString()
    buylistPaymentServiceId: string;
    @IsString()
    productVendorId: string;
    @IsString()
    productLineId: string;
    @IsString()
    productTypeId: string;
    @IsString()
    productLanguageId: string;
    
}

export class UpdateBuylistProductCardDTO {
    @IsString()
    buylistProductCardId: string;
    @IsString()
    commerceUserId: string;
    @IsString()
    buylistLocationId: string;
    @IsString()
    buylistTypeId: string;
    @IsString()
    buylistPaymentTypeId: string;
    @IsString()
    buylistPaymentServiceId: string;
}