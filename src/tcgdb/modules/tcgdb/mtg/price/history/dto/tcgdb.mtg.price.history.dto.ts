export class TCGdbMTGPricesHistoryDTO {
    tcgdbMTGPricesHistory: TCGdbMTGPriceHistoryDTO[];
}

export class TCGdbMTGPriceHistoryDTO {
    tcgdbMTGPriceHistoryId: string;
    tcgdbMTGCardId: string;
    tcgdbMTGPriceHistoryTCGPlayerId: number;
    tcgdbMTGPriceHistorySetAbbreviation: string;
    tcgdbMTGPriceHistoryLowPrice: number;
    tcgdbMTGPriceHistoryMidPrice: number;
    tcgdbMTGPriceHistoryHighPrice: number;
    tcgdbMTGPriceHistoryMarketPrice: number;
    tcgdbMTGPriceHistoryDirectLowPrice: number;
    tcgdbMTGPriceHistorySubTypeName: string;
    tcgdbMTGPriceHistoryCreateDate: Date;
    tcgdbMTGPriceHistoryUpdateDate: Date;
}
