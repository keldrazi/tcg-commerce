export class TCGdbMTGPricesDTO {
    tcgdbMTGPrices: TCGdbMTGPriceDTO[];
}

export class TCGdbMTGPriceDTO {
    tcgdbMTGPriceLowPrice: number;
    tcgdbMTGPriceMidPrice: number;
    tcgdbMTGPriceHighPrice: number;
    tcgdbMTGPriceMarketPrice: number;
    tcgdbMTGPriceDirectLowPrice: number;
    tcgdbMTGPriceSubTypeName: string;
}
