export interface PriceProductCardServiceUpdateData {
    data: {
        prices: [
            {
                productCardItemId: string;
                productCardItemTCGdbId: string;
                productSetCode: string;
                productCardRarityCode: string;
                productCardItemNumber: string;
                productCardItemName: string;
                priceProductCardItemPriceChangeType: string;
                priceProductCardItemPreviousPrice: number;
                priceProductCardItemCurrentPrice: number;
                priceProductCardItemPriceChange: number;
                priceProductCardItemPriceChangePercent: number;
            }
        ]
    }
}

