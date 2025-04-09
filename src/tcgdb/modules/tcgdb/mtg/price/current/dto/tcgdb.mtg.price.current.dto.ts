export class TCGdbMTGPricesCurrentDTO {
    tcgdbMTGPricesCurrent: TCGdbMTGPriceCurrentDTO[];
}

export class TCGdbMTGPriceCurrentDTO {
    tcgdbMTGCardId: string;
    tcgdbMTGPriceCurrentTCGPlayerId: number;
    tcgdbMTGPriceCurrentSetAbbreviation: string;
    tcgdbMTGPriceCurrentLowPrice: number;
    tcgdbMTGPriceCurrentMidPrice: number;
    tcgdbMTGPriceCurrentHighPrice: number;
    tcgdbMTGPriceCurrentMarketPrice: number;
    tcgdbMTGPriceCurrentDirectLowPrice: number;
    tcgdbMTGPriceCurrentSubTypeName: string;
}
