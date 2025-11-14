import { IsString, IsBoolean, IsNumber } from "class-validator";

export class BuylistProductCardItemDTO {
    buylistProductCardItemId: string;
    buylistProductCardId: string;
    commerceAccountId: string;
    productVendorId: string;
    productLineId: string;
    productTypeId: string;
    productCardId: string;
    productCardTCGdbId: string;
    productCardTCGPlayerId: number
    productCardName: string;
    productSetId: string;
    productSetCode: string;
    productLanguageId: string;
    productLanguageCode: string;
    productCardPrintingId: string;
    productCardPrintingName: string;
    productCardConditionId: string;
    productCardConditionCode: string;
    productCardConditionName: string;
    buylistProductCardItemQty: number;
    buylistProductCardItemPrice: number;
    buylistProductCardItemCreateDate: Date;
    buylistProductCardItemUpdateDate: Date;
}

export class CreateBuylistProductCardItemDTO {
    @IsString()
    buylistProductCardId: string;
    @IsString()
    productCardId: string;
    @IsString()
    productSetId: string;
    @IsString()
    productSetName: string;
    @IsString()
    productLanguageId: string
    @IsString()
    productLanguageCode: string;
    @IsString()
    productCardPrintingId: string
    @IsString()
    productCardPrintinName: string
    @IsString()
    productCardConditionId: string
    @IsString()
    productCardConditionCode: string
    @IsString()
    productCardConditionName: string
    @IsNumber()
    buylistProductCardItemQty: number
   
    
}

export class UpdateBuylistProductCardItemDTO {
    @IsString()
    buylistProductCardItemId: string;
    @IsString()
    productCardPrintingId: string
    @IsString()
    productCardPrintingName: string
    @IsString()
    productCardConditionId: string
    @IsString()
    productCardConditionCode: string
    @IsString()
    productCardConditionName: string
    @IsNumber()
    buylistProductCardItemQty: number
    
}
