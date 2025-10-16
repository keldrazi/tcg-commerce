import { InventoryBatchLoadProductCardItem } from 'src/tcgcommerce/modules/inventory/batch/load/product/card/interface/inventory.batch.load.product.card.item.interface';



export class InventoryBatchLoadProductCardDTO {
    inventoryBatchLoadProductCardId: string;
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
    inventoryBatchLoadProductCardItems: InventoryBatchLoadProductCardItem[];
    inventoryBatchLoadProductCardIsVerified: boolean;
    inventoryBatchLoadProductCardIsActive: boolean;
    inventoryBatchLoadProductCardCreateDate: Date;
    inventoryBatchLoadProductCardUpdateDate: Date; 
}


