import { PriceBatchUpdateProductCardItem } from 'src/tcgcommerce/modules/price/batch/update/product/card/interface/price.batch.update.product.card.item.interface';



export class PriceBatchUpdateProductCardDTO {
    priceBatchUpdateProductCardId: string;
    priceBatchUpdateJobProductCardId: string;
    productCardId: string;
    productCardTCGdbId: string;
    productCardTCGPlayerId: number;
    commerceAccountId: string;
    commerceLocationId: string;
    productVendorId: string;
    productLineId: string;
    productTypeId: string;
    productLanguageId: string;
    productLanguageCode: string;
    productSetId: string;
    productSetCode: string;
    productCardPrintingId: string;
    productCardPrintingName: string;
    priceBatchUpdateProductCardItems: PriceBatchUpdateProductCardItem[];
    priceBatchUpdateProductCardCreateDate: Date;
    priceBatchUpdateProductCardUpdateDate: Date; 
}


