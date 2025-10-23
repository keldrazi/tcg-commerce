import { InventoryProductCardServiceUpdatePriceJobItemDetail } from '../interface/inventory.product.card.service.update.price.job.item.detail.interface';

export class InventoryProductCardServiceUpdatePriceJobItemDTO {
    inventoryProductCardServiceUpdatePriceJobItemId: string;
    inventoryProductCardServiceUpdatePriceJobId: string;
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
    inventoryProductCardServiceUpdatePriceJobItemDetails: InventoryProductCardServiceUpdatePriceJobItemDetail[];
    inventoryProductCardServiceUpdatePriceJobItemIsVerified: boolean;
    inventoryProductCardServiceUpdatePriceJobItemIsActive: boolean;
    inventoryProductCardServiceUpdatePriceJobItemCreateDate: Date;
    inventoryProductCardServiceUpdatePriceJobItemUpdateDate: Date; 
}


