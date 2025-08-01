
export class ImportSortCardDataDTO {
    importJobId: string;
    importSortCardTotalCardQty: number;
    importSortCardTotalCardTCGPlayerMarketPrice: number;
    importSortCardTotalCardTCGPlayerLowPrice: number;
    importSortCardData: ImportSortCardDTO[];
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
