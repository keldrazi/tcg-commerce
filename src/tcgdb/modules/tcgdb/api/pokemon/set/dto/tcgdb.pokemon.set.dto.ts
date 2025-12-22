export class TCGdbPokemonSetsDTO {
    tcgdbPokemonSets: TCGdbPokemonSetDTO[];
}

export class TCGdbPokemonSetDTO {
    tcgdbPokemonSetId: string;
    tcgdbPokemonSetTCGPlayerId: number;
    tcgdbPokemonSetPokemonTCGId: string;
    tcgdbPokemonSetCode: string;
    tcgdbPokemonSetName: string;
    tcgdbPokemonSetPublishedOn: Date;
    tcgdbPokemonSetTotalCards: number;
}