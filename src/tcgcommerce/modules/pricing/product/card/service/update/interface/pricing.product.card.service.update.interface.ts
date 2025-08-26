export interface PricingProductCardServiceUpdateData {
    data: {
        prices: [
            {
                productCardItemId: string;
                productCardItemTCGdbId: string;
                productSetCode: string;
                productCardRarityCode: string;
                productCardItemNumber: string;
                productCardItemName: string;
                pricingProductCardItemPriceChangeType: string;
                pricingProductCardItemPreviousPrice: number;
                pricingProductCardItemCurrentPrice: number;
                pricingProductCardItemPriceChange: number;
                pricingProductCardItemPriceChangePercent: number;
            }
        ]
    }
}

