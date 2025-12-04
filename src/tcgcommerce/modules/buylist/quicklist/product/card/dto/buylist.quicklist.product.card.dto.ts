import { IsString, IsBoolean } from "class-validator";

export class BuylistQuicklistProductCardDTO {
    buylistQuicklistProductCardId: string;
    commerceAccountId: string;
    commerceUserId: string;
    buylistLocationId: string;
    productVendorId: string;
    productLineId: string;
    productTypeId: string;
    productLanguageId: string;
    productLanguageCode: string;
    buylistQuicklistProductCardCode: string;
    buylistQuicklistProductCardIsActive: boolean;
    buylistQuicklistProductCardCreateDate: Date;
    buylistQuicklistProductCardUpdateDate: Date;
}

export class CreateBuylistQuicklistProductCardDTO {
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
    @IsBoolean()
    buylistQuicklistProductCardIsActive: boolean;
}

export class UpdateBuylistQuicklistProductCardDTO {
    @IsString()
    buylistQuicklistProductCardId: string;
    @IsString()
    commerceUserId: string;
    @IsString()
    buylistLocationId: string;
    @IsBoolean()
    buylistQuicklistProductCardIsActive: boolean;
}

 