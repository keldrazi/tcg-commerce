import { TCGdbPokemonSetDTO } from 'src/tcgdb/modules/tcgdb/pokemon/set/dto/tcgdb.pokemon.set.dto';

export class TCGdbPokemonCardsDTO {
    tcgdbPokemonSet: TCGdbPokemonSetDTO;
    tcgdbPokemonCards: TCGdbPokemonCardDTO[];
}

export class TCGdbPokemonCardDTO {
    tcgdbPokemonCardId: string;
    tcgdbPokemonCardTCGPlayerId: number;
    tcgdbPokemonCardPokemonTCGId: string;
    tcgdbPokemonCardSetName: string;
    tcgdbPokemonCardSetCode: string;
    tcgdbPokemonCardRarityCode: string;
    tcgdbPokemonCardNumber: string;
    tcgdbPokemonCardName: string;
    tcgdbPokemonCardCleanName: string;
    tcgdbPokemonCardImageURL: string;
    tcgdbPokemonCardTCGPlayerData: string;
    tcgdbPokemonCardTCGPlayerSKUs: string; 
    tcgdbPokemonCardPokemonTCGData: string;   
}