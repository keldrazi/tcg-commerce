import { IsString, IsBoolean, IsDate } from "class-validator";

export class BuylistHotlistProductCardDTO {
    buylistHotlistProductCardId: string;
    commerceAccountId: string;
    commerceUserId: string;
    buylistLocationId: string;
    productVendorId: string;
    productLineId: string;
    productTypeId: string;
    productLanguageId: string;
    productLanguageCode: string;
    buylistHotlistProductCardCode: string;
    buylistHotlistProductCardStartDateTime: Date;
    buylistHotlistProductCardEndDateTime: Date;
    buylistHotlistProductCardIsExternal: boolean;
    buylistHotlistProductCardCreateDate: Date;
    buylistHotlistProductCardUpdateDate: Date;
}

export class CreateBuylistHotlistProductCardDTO {
    @IsString()
    commerceAccountId: string;
    @IsString()
    commerceUserId: string;
    @IsString()
    buylistLocationId: string;
    @IsString()
    productVendorId: string;
    @IsString()
    productLineId: string;
    @IsString()
    productTypeId: string;
    @IsString()
    productLanguageId: string;
    @IsDate()
    buylistHotlistProductCardStartDateTime: Date;
    @IsDate()
    buylistHotlistProductCardEndDateTime: Date;
    @IsBoolean()
    buylistHotlistProductCardIsExternal: boolean;  
}

export class UpdateBuylistHotlistProductCardDTO {
    @IsString()
    buylistHotlistProductCardId: string;
    @IsString()
    commerceUserId: string;
    @IsString()
    buylistLocationId: string;
    @IsDate()
    buylistHotlistProductCardStartDateTime: Date;
    @IsDate()
    buylistHotlistProductCardEndDateTime: Date;
    @IsBoolean()
    buylistHotlistProductCardIsExternal: boolean;
}

 