import { TCGdbPokemonSetDTO } from 'src/tcgdb/modules/tcgdb/pokemon/set/dto/tcgdb.pokemon.set.dto';

export class TCGdbPokemonCardsDTO {
    tcgdbPokemonSet: TCGdbPokemonSetDTO;
    tcgdbPokemonCards: TCGdbPokemonCardDTO[];
}

export class TCGdbPokemonCardDTO {
    tcgdbPokemonCardId: string;
    tcgdbPokemonCardTCGPlayerId: number;
    tcgdbPokemonCardPokemonTCGId: string;
    tcgdbPokemonCardSetCode: string;
    tcgdbPokemonCardName: string;
    tcgdbPokemonCardCleanName: string;
    tcgdbPokemonCardImageURL: string;
    tcgdbPokemonCardData: string;
    tcgdbPokemonCardTCGPlayerSKUs: string;    
}