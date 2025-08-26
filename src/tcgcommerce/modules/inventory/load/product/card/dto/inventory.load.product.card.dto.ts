export class InventoryLoadProductCardDTO {
    inventoryProductCardId: string;
    productVendorId: string;
    productLineId: string;
    commerceAccountId: string;
    commerceLocationId: string;
    productCardId: string;
    productSetCode: string;
    productCardPrintingName: string;
    productCardConditionCode: string;
    productCardLanguageCode: string;
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

export class CreateInventoryLoadProductCardDTO {
    productVendorId: string;
    productLineId: string;
    commerceAccountId: string;
    commerceLocationId: string;
    productCardId: string;
    productSetCode: string;
    productCardPrintingName: string;
    productCardConditionCode: string;
    productCardLanguageCode: string;
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