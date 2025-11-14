import { IsString, IsBoolean, IsNumber } from "class-validator";

export class BuylistHotlistProductCardItemDTO {
    buylistHotlistProductCardItemId: string;
    buylistHotlistProductCardId: string;
    commerceAccountId: string;
    commerceUserId: string;
    commerceUserName: string;
    productVendorId: string;
    productLineId: string;
    productTypeId: string;
    productCardId: string;
    productCardTCGdbId: string;
    productCardTCGPlayerId: number
    productCardName: string;
    productCardNumber: string;
    productCardRarityId: string;
    productCardRarityCode: string;
    productSetId: string;
    productSetCode: string;
    productLanguageId: string;
    productLanguageCode: string;
    productCardPrintingId: string;
    productCardPrintingName: string;
    buylistHotlistProductCardItemQty: number;
    buylistHotlistProductCardItemOverridePriceEnabled: boolean;
    buylistHotlistProductCardItemOverridePrice: number;
    buylistHotlistProductCardItemCreateDate: Date;
    buylistHotlistProductCardItemUpdateDate: Date;
}

export class CreateBuylistHotlistProductCardItemDTO {
    @IsString()
    buylistHotlistProductCardId: string;
    @IsString()
    productCardId: string;
    @IsString()
    productSetId: string;
    @IsString()
    productLanguageId: string
    @IsString()
    productCardPrintingId: string
    @IsNumber()
    buylistHotlistProductCardItemQty: number
    @IsBoolean()
    buylistHotlistProductCardItemOverridePriceEnabled: boolean;
    @IsNumber()
    buylistHotlistProductCardItemOverridePrice: number;
   
    
}

export class UpdateBuylistHotlistProductCardItemDTO {
    @IsString()
    buylistHotlistProductCardItemId: string;
    @IsString()
    productCardPrintingId: string
    @IsNumber()
    buylistHotlistProductCardItemQty: number
    @IsBoolean()
    buylistHotlistProductCardItemOverridePriceEnabled: boolean;
    @IsNumber()
    buylistHotlistProductCardItemOverridePrice: number;
    
}


