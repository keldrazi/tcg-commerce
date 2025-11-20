import { IsString, IsBoolean } from "class-validator";

export class BuylistProductCardImportDTO {
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
    buylistProductCardTotalCardCount: number;
    buylistProductCardTotalCardPrice: number;   
    buylistProductCardCreateDate: Date;
    buylistProductCardUpdateDate: Date;

    
}

export class CreateBuylistProductCardImportDTO {
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

export class UpdateBuylistProductCardImportDTO {
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