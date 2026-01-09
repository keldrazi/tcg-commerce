import { InventoryProductCardServiceCreateJobItemDetail } from '../interface/inventory.product.card.service.create.job.item.detail.interface';

export class InventoryProductCardServiceCreateJobItemDTO {
    inventoryProductCardServiceCreateJobItemId: string;
    inventoryProductCardServiceCreateJobId: string;
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
    inventoryProductCardServiceCreateJobItemDetails: InventoryProductCardServiceCreateJobItemDetail[];
    inventoryProductCardServiceCreateJobItemIsVerified: boolean;
    inventoryProductCardServiceCreateJobItemIsActive: boolean;
    inventoryProductCardServiceCreateJobItemCreateDate: Date;
    inventoryProductCardServiceCreateJobItemUpdateDate: Date; 
}


