export class TCGdbMTGPricesPreviousDailyDTO {
    tcgdbMTGPricesPreviousDaily: TCGdbMTGPricePreviousDailyDTO[];
}

export class TCGdbMTGPricePreviousDailyDTO {
    tcgdbMTGPricePreviousDailyId: string;
    tcgdbMTGCardId: string;
    tcgdbMTGPricePreviousDailyTCGPlayerId: number;
    tcgdbMTGPricePreviousDailySetCode: string;
    tcgdbMTGPricePreviousDailyLowPrice: number;
    tcgdbMTGPricePreviousDailyMidPrice: number;
    tcgdbMTGPricePreviousDailyHighPrice: number;
    tcgdbMTGPricePreviousDailyMarketPrice: number;
    tcgdbMTGPricePreviousDailyDirectLowPrice: number;
    tcgdbMTGPricePreviousDailySubTypeName: string;
    tcgdbMTGPricePreviousDailyCreateDate: Date;
    tcgdbMTGPricePreviousDailyUpdateDate: Date;
}
