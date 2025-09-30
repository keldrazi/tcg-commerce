import { TCGdbMTGSetDTO } from 'src/tcgdb/modules/tcgdb/api/mtg/set/dto/tcgdb.mtg.set.dto';

export class TCGdbMTGSetCardDTO {
    tcgdbMTGSet: TCGdbMTGSetDTO;
    tcgdbMTGCards: TCGdbMTGCardDTO[];
}

export class TCGdbMTGCardDTO {
    tcgdbMTGCardId: string;
    tcgdbMTGCardTCGPlayerId: number;
    tcgdbMTGCardScryfallId: string;
    tcgdbMTGCardSetName: string;
    tcgdbMTGCardSetCode: string;
    tcgdbMTGCardRarityCode: string;
    tcgdbMTGCardNumber: string;
    tcgdbMTGCardName: string;
    tcgdbMTGCardCleanName: string;
    tcgdbMTGCardImageURL: string;
    tcgdbMTGCardTCGPlayerData: string;
    tcgdbMTGCardTCGPlayerSKUs: string;  
    tcgdbMTGCardScryfallData: string;  
}