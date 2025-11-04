import { CommerceLocationDTO } from "src/tcgcommerce/modules/commerce/location/dto/commerce.location.dto";

export class InventoryProductCardServiceUpdatePriceJobDTO {
    inventoryProductCardServiceUpdatePriceJobId: string;
    commerceAccountId: string;
    commerceLocations: any;
    productVendorId: string;
    productVendorCode: string;
    productLineId: string;
    productLineCode: string;
    productTypeId: string;
    productTypeCode: string;
    productLanguageId: string;
    productLanguageCode: string;
    productSetId: string;
    productSetCode: string;
    inventoryProductCardServiceUpdatePriceJobDate: Date;
    inventoryProductCardServiceUpdatePriceJobCode: string;
    inventoryProductCardServiceUpdatePriceJobCount: number;
    inventoryProductCardServiceUpdatePriceJobIncreaseCount: number;
    inventoryProductCardServiceUpdatePriceJobDecreaseCount: number;
    inventoryProductCardServiceUpdatePriceJobStatus: string;
    inventoryProductCardServiceUpdatePriceJobCreateDate: Date;
    inventoryProductCardServiceUpdatePriceJobUpdateDate: Date;
}


