export class TCGdbPokemonPricesDTO {
    tcgdbPokemonPrices: TCGdbPokemonPriceDTO[];
}

export class TCGdbPokemonPriceDTO {
    tcgdbPokemonPriceLowPrice: number;
    tcgdbPokemonPriceMidPrice: number;
    tcgdbPokemonPriceHighPrice: number;
    tcgdbPokemonPriceMarketPrice: number;
    tcgdbPokemonPriceDirectLowPrice: number;
    tcgdbPokemonPriceSubTypeName: string;
}
