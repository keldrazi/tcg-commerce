export class FullfilmentOrderProductCardDetailDTO {
    fullfilmentOrderProductCardDetailId: string;
    fullfilmentOrderId: string;
    productCardId: string;
    productCardTCGdbId: string;
    productCardTCGPlayerId: string;
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
    fullfillmentOrderProductCardItemQty: number;
    fullfillmentOrderProductCardItemPrice: number;
    fullfillmentOrderProductCardDetailCreateDate: Date;
    fullfillmentOrderProductCardDetailUpdateDate: Date; 
}