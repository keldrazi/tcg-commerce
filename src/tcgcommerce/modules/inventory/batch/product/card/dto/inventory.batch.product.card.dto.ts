export class InventoryBatchProductCardDTO {
    inventoryProductCardId: string;
    commerceAccountId: string;
    commerceLocationId: string;
    productCardItemId: string;
    productCardPrintingName: string;
    productCardConditionAbbreviation: string;
    productCardLanguageAbbreviation: string;
    inventoryProductCardSKU: string;
    inventoryProductCardBarcode: string;
    inventoryProductCardQty: number;
    inventoryProductCardMaxQty: number;
    inventoryProductCardReserveQty: number;
    inventoryProductCardPrice: number;
    inventoryProductCardOverridePriceEnabled: boolean;
    inventoryProductCardOverridePrice: number;
    inventoryProductCardMetadata: string;
    inventoryProductCardCreateDate: Date;
    inventoryProductCardUpdateDate: Date; 
    
}