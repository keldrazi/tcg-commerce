export class TCGdbMTGPricesCurrentDTO {
    tcgdbMTGPricesCurrent: TCGdbMTGPriceCurrentDTO[];
}

export class TCGdbMTGPriceCurrentDTO {
    tcgdbMTGPriceCurrentId: string;
    tcgdbMTGCardId: string;
    tcgdbMTGPriceCurrentTCGPlayerId: number;
    tcgdbMTGPriceCurrentSetAbbreviation: string;
    tcgdbMTGPriceCurrentLowPrice: number;
    tcgdbMTGPriceCurrentMidPrice: number;
    tcgdbMTGPriceCurrentHighPrice: number;
    tcgdbMTGPriceCurrentMarketPrice: number;
    tcgdbMTGPriceCurrentDirectLowPrice: number;
    tcgdbMTGPriceCurrentSubTypeName: string;
    tcgdbMTGPriceCurrentCreateDate: Date;
    tcgdbMTGPriceCurrentUpdateDate: Date;
}
