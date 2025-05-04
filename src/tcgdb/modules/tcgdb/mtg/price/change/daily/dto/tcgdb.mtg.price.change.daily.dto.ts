export class TCGdbMTGPricesChangeDailyDTO {
    tcgdbMTGPricesChangeDaily: TCGdbMTGPriceChangeDailyDTO[];
}

export class TCGdbMTGPriceChangeDailyDTO {
    tcgdbMTGPriceChangeDailyId: string;
    tcgdbMTGCardId: string;
    tcgdbMTGPriceChangeDailyTCGPlayerId: number;
    tcgdbMTGPriceChangeDailySetAbbreviation: string;
    tcgdbMTGPriceChangeDailyCurrentLowPrice: number;
    tcgdbMTGPriceChangeDailyPreviousLowPrice: number;
    tcgdbMTGPriceChangeDailyLowPriceDifference: number;
    tcgdbMTGPriceChangeDailyLowPricePercentage: number;
    tcgdbMTGPriceChangeDailyCurrentMidPrice: number;
    tcgdbMTGPriceChangeDailyPreviousMidPrice: number;
    tcgdbMTGPriceChangeDailyMidPriceDifference: number;
    tcgdbMTGPriceChangeDailyMidPricePercentage: number;
    tcgdbMTGPriceChangeDailyCurrentHighPrice: number;
    tcgdbMTGPriceChangeDailyPreviousHighPrice: number;
    tcgdbMTGPriceChangeDailyHighPriceDifference: number;
    tcgdbMTGPriceChangeDailyHighPricePercentage: number;
    tcgdbMTGPriceChangeDailyCurrentMarketPrice: number;
    tcgdbMTGPriceChangeDailyPreviousMarketPrice: number;
    tcgdbMTGPriceChangeDailyMarketPriceDifference: number;
    tcgdbMTGPriceChangeDailyMarketPricePercentage: number;
    tcgdbMTGPriceChangeDailySubTypeName: string;
}

export class CreateTCGdbMTGPriceChangeDailyDTO {
    tcgdbMTGCardId: string;
    tcgdbMTGPriceChangeDailyTCGPlayerId: number;
    tcgdbMTGPriceChangeDailySetAbbreviation: string;
    tcgdbMTGPriceChangeDailyCurrentLowPrice: number;
    tcgdbMTGPriceChangeDailyPreviousLowPrice: number;
    tcgdbMTGPriceChangeDailyLowPriceDifference: number;
    tcgdbMTGPriceChangeDailyLowPricePercentage: number;
    tcgdbMTGPriceChangeDailyCurrentMidPrice: number;
    tcgdbMTGPriceChangeDailyPreviousMidPrice: number;
    tcgdbMTGPriceChangeDailyMidPriceDifference: number;
    tcgdbMTGPriceChangeDailyMidPricePercentage: number;
    tcgdbMTGPriceChangeDailyCurrentHighPrice: number;
    tcgdbMTGPriceChangeDailyPreviousHighPrice: number;
    tcgdbMTGPriceChangeDailyHighPriceDifference: number;
    tcgdbMTGPriceChangeDailyHighPricePercentage: number;
    tcgdbMTGPriceChangeDailyCurrentMarketPrice: number;
    tcgdbMTGPriceChangeDailyPreviousMarketPrice: number;
    tcgdbMTGPriceChangeDailyMarketPriceDifference: number;
    tcgdbMTGPriceChangeDailyMarketPricePercentage: number;
    tcgdbMTGPriceChangeDailySubTypeName: string;
}
