
export class ImportSortDTO {
    importSortTotalCardQty: number;
    importSortTotalCardTCGPlayerMarketPrice: number;
    importSortTotalCardTCGPlayerLowPrice: number;
    importSortCards: ImportSortCardDTO[];
}

export class ImportSortCardDTO {
    importSortCardTCGPlayerId: number;
    importSortCardName: string;
    importSortCardSetName: string;
    importSortCardNumber: string;
    importSortCardCondition: string;
    importSortCardPrinting: string;
    importSortCardTCGPlayerMarketPrice: number;
    importSortCardTCGPlayerLowPrice: number;
    importSortCardQty: number;
}
