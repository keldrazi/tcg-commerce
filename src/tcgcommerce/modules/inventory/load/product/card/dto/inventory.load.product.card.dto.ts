export class InventoryLoadProductCardDTO {
    inventoryProductCardId: string;
    productVendorId: string;
    productLineId: string;
    commerceAccountId: string;
    commerceLocationId: string;
    productCardItemId: string;
    productSetAbbreviation: string;
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

export class CreateInventoryLoadProductCardDTO {
    productVendorId: string;
    productLineId: string;
    commerceAccountId: string;
    commerceLocationId: string;
    productCardItemId: string;
    productSetAbbreviation: string;
    productCardPrintingName: string;
    productCardConditionAbbreviation: string;
    productCardLanguageAbbreviation: string;
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