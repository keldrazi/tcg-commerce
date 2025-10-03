export interface InventoryProductCardItems {
    inventoryProductCardItems: [
        {
            productCardConditionCode: string;
            inventoryProductCardItemTCGPlayerSKU: number;
            inventoryProductCardItemSKU: string;
            inventoryProductCardItemBarcode: string;
            inventoryProductCardItemQty: number;
            inventoryProductCardItemMaxQty: number;
            inventoryProductCardItemReserveQty: number;
            inventoryProductCardItemPrice: number;
            inventoryProductCardItemOverridePriceEnabled: boolean;
            inventoryProductCardItemOverridePrice: number;
        }
    ]
}

