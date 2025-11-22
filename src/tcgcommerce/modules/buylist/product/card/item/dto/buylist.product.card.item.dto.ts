import { IsString, IsBoolean, IsNumber } from "class-validator";

export class BuylistProductCardItemDTO {
    buylistProductCardItemId: string;
    buylistProductCardId: string;
    productCardId: string;
    productCardTCGdbId: string;
    productCardTCGPlayerId: number
    productCardName: string;
    productCardNumber: string;
    productCardRarityId: string
    productCardRarityCode: string;
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
    productLanguageId: string
    @IsString()
    productLanguageCode: string;
    @IsString()
    productCardPrintingId: string
    @IsString()
    productCardConditionId: string
    @IsNumber()
    buylistProductCardItemQty: number
   
    
}

export class UpdateBuylistProductCardItemDTO {
    @IsString()
    buylistProductCardItemId: string;
    @IsString()
    productCardPrintingId: string
    @IsString()
    productCardConditionId: string
    @IsNumber()
    buylistProductCardItemQty: number
    
}
