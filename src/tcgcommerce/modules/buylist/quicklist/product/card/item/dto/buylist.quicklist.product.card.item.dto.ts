import { IsNumber, IsString } from "class-validator";

export class BuylistQuicklistProductCardItemDTO {
    buylistQuicklistProductCardItemId: string;
    buylistQuicklistProductCardId: string;
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
    buylistQuicklistProductCardItemCreateDate: Date;
    buylistQuicklistProductCardItemUpdateDate: Date;
}

export class CreateBuylistQuicklistProductCardItemDTO {
    @IsString()
    buylistQuicklistProductCardId: string;
    @IsString()
    productCardId: string;
    @IsString()
    productCardTCGdbId: string;
    @IsNumber()
    productCardTCGPlayerId: number
    @IsString()
    productCardName: string
    @IsString()
    productCardNumber: string;
    @IsString()
    productCardRarityId: string;
    @IsString()
    productCardRarityCode: string;
    @IsString()
    productSetId: string;
    @IsString()
    productSetCode: string;
    @IsString()
    productLanguageId: string
    @IsString()
    productLanguageCode: string
    @IsString()
    productCardPrintingId: string;
    @IsString()
    productCardPrintingName: string;  
}



