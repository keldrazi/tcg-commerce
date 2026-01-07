import { IsString } from "class-validator";

export class BuylistProductCardDTO {
    buylistProductCardId: string;
    commerceAccountId: string;
    commerceUserId: string;
    customerAccountUserId: string;
    buylistLocationId: string;
    buylistLocationName: string;
    buylistTypeId: string;
    buylistTypeName: string;
    buylistStatusId: string
    buylistStatusName: string;
    buylistPaymentTypeId: string;
    buylistPaymentTypeName: string;
    buylistPaymentServiceId: string;
    buylistPaymentServiceName: string;
    productVendorId: string;
    productVendorName: string;
    productVendorCode: string;
    productLineId: string;
    productLineName: string;
    productLineCode: string;    
    productTypeId: string;
    productTypeName: string;
    productTypeCode: string;
    productLanguageId: string;
    productLanguageCode: string;
    buylistProductCardCode: string;
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
    customerAccountUserId: string;
    @IsString()
    buylistLocationId: string;
    @IsString()
    buylistLocationName: string;
    @IsString()
    buyListTypeId: string;
    @IsString()
    buylistTypeName: string
    @IsString()
    buylistStatusId: string;
    @IsString()
    buylistStatusName: string;
    @IsString()
    buylistPaymentTypeId: string
    @IsString()
    buylistPaymentTypeName: string;
    @IsString()
    buylistPaymentServiceId: string;
    @IsString()
    buylistPaymentServiceName: string
    @IsString()
    productVendorId: string;
    @IsString()
    productVendorName: string;
    @IsString()
    productVendorCode: string;
    @IsString()
    productLineId: string
    @IsString()
    productLineName: string;
    @IsString()
    productLineCode: string;
    @IsString()
    productTypeId: string;
    @IsString()
    productTypeName: string;
    @IsString()
    productTypeCode: string;
    @IsString()
    productLanguageId: string;
    @IsString()
    productLanguageCode: string;
    
}

export class UpdateBuylistProductCardDTO {
    @IsString()
    buylistProductCardId: string;
    @IsString()
    customerAccountUserId: string;
    @IsString()
    buylistLocationId: string;
    @IsString()
    buylistLocationName: string;
    @IsString()
    buylistTypeId: string;
    @IsString()
    buylistTypeName: string;
    @IsString()
    buylistStatusId: string;
    @IsString()
    buylistStatusName: string
    @IsString()
    buylistPaymentTypeId: string;
    @IsString()
    buylistPaymentTypeName: string
    @IsString()
    buylistPaymentServiceId: string;
    @IsString()
    buylistPaymentServiceName: string
}