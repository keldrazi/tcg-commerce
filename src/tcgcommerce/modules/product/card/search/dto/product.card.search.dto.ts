export class ProductCardSearchResultDTO {
    productCardSearchResultCount: number;
    productCardSearchResults: ProductCardSearchDTO[];
}

export class ProductCardSearchDTO {
    productCardId: string;
    productCardTCGdbId: string;
    productCardTCGPlayerId: number;
    productVendorId: string;
    productLineId: string;
    productSetId: string;
    productSetCode: string;
    productCardRarityCode: string;
    productCardNumber: string;
    productCardName: string;
    productCardCleanName: string;
    productCardImage: string;
}
