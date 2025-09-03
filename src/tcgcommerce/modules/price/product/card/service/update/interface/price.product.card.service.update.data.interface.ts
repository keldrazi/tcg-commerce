export interface PriceProductCardServiceUpdateData {
    data: [
        productLineCode: string,
        productSetCode: string,
        priceProductCardChanges: [
            {
                productCardId: string;
                productCardTCGdbId: string;
                productSetCode: string;
                productCardRarityCode: string;
                productCardNumber: string;
                productCardName: string;
                priceProductCardChangeType: string;
                priceProductCardPreviousPrice: number;
                priceProductCardCurrentPrice: number;
                priceProductCardPriceChange: number;
                priceProductCardPriceChangePercent: number;
            }
        ]
    ]
}

