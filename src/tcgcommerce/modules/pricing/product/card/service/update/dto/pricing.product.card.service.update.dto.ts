import { PricingProductCardServiceUpdateData } from "../interface/pricing.product.card.service.update.interface";

export class PricingProductCardServiceUpdateDTO {
    pricingProductCardServiceUpdateId: string;
    applicationModuleId: string;
    commerceAccountId: string;
    productVendorId: string;
    productLineId: string;
    productTypeId: string;
    pricingProductCardServiceUpdateStatus: string;
    pricingProductCardServiceUpdateType: string;
    pricingProductCardServiceUpdateCode: string;
    pricingProductCardServiceUpdateTotalCards: number;
    pricingProductCardServiceUpdateTotalCardsIncrease: number;
    pricingProductCardServiceUpdateTotalCardsDecrease: number;
    pricingProductCardServiceUpdateData: PricingProductCardServiceUpdateData;
    pricingProductCardServiceUpdateCreateDate: Date;
    pricingProductCardServiceUpdateUpdateDate: Date;
}



