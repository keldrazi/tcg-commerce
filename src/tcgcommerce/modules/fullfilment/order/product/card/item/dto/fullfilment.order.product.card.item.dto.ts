export class FullfilmentOrderProductCardItemDTO {
    fullfilmentOrderProductCardItemId: string;
    fullfilmentOrderId: string;
    productCardId: string;
    productCardTCGdbId: string;
    productCardTCGPlayerId: number;
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
    fullfilmentOrderProductCardItemQty: number;
    fullfilmentOrderProductCardItemPrice: number;
    fullfilmentOrderProductCardItemCreateDate: Date;
    fullfilmentOrderProductCardItemUpdateDate: Date; 
}