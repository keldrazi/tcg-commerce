export class TCGdbPokemonPricesHistoryDTO {
    tcgdbPokemonPricesHistory: TCGdbPokemonPriceHistoryDTO[];
}

export class TCGdbPokemonPriceHistoryDTO {
    tcgdbPokemonCardId: string;
    tcgdbPokemonPriceHistoryTCGPlayerId: number;
    tcgdbPokemonPriceHistorySetCode: string;
    tcgdbPokemonPriceHistoryLowPrice: number;
    tcgdbPokemonPriceHistoryMidPrice: number;
    tcgdbPokemonPriceHistoryHighPrice: number;
    tcgdbPokemonPriceHistoryMarketPrice: number;
    tcgdbPokemonPriceHistoryDirectLowPrice: number;
    tcgdbPokemonPriceHistorySubTypeName: string;
}
