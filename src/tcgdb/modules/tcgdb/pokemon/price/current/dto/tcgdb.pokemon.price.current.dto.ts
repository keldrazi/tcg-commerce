export class TCGdbPokemonPricesCurrentDTO {
    tcgdbPokemonPricesCurrent: TCGdbPokemonPriceCurrentDTO[];
}

export class TCGdbPokemonPriceCurrentDTO {
    tcgdbPokemonCardId: string;
    tcgdbPokemonPriceCurrentTCGPlayerId: number;
    tcgdbPokemonPriceCurrentSetCode: string;
    tcgdbPokemonPriceCurrentLowPrice: number;
    tcgdbPokemonPriceCurrentMidPrice: number;
    tcgdbPokemonPriceCurrentHighPrice: number;
    tcgdbPokemonPriceCurrentMarketPrice: number;
    tcgdbPokemonPriceCurrentDirectLowPrice: number;
    tcgdbPokemonPriceCurrentSubTypeName: string;
}
