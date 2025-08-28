import { PriceProductCardServiceUpdateData } from "../interface/price.product.card.service.update.interface";

export class PriceProductCardServiceUpdateDTO {
    priceProductCardServiceUpdateId: string;
    applicationModuleId: string;
    commerceAccountId: string;
    productVendorId: string;
    productLineId: string;
    productTypeId: string;
    priceProductCardServiceUpdateStatus: string;
    priceProductCardServiceUpdateType: string;
    priceProductCardServiceUpdateCode: string;
    priceProductCardServiceUpdateTotalCards: number;
    priceProductCardServiceUpdateTotalCardsIncrease: number;
    priceProductCardServiceUpdateTotalCardsDecrease: number;
    priceProductCardServiceUpdateData: PriceProductCardServiceUpdateData;
    priceProductCardServiceUpdateCreateDate: Date;
    priceProductCardServiceUpdateUpdateDate: Date;
}



