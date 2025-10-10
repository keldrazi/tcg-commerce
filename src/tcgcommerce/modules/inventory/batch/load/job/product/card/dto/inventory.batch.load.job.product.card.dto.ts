import { IsString } from "class-validator";
import { InventoryProductCardDTO } from "src/tcgcommerce/modules/inventory/product/card/dto/inventory.product.card.dto";

export class InventoryBatchLoadJobProductCardDTO {
    inventoryBatchLoadJobProductCardId: string;
    commerceAccountId: string;
    commerceLocationId: string;
    commerceLocationName: string;
    commerceUserId: string;
    commerceUserName: string;
    productVendorId: string;
    productVendorCode: string;
    productLineId: string;
    productLineCode: string;
    productTypeId: string;
    productTypeCode: string;
    productCardLanguageId: string;
    productCardLanguageCode: string;
    productSetId: string;
    productSetCode: string;
    inventoryBatchLoadJobProductCardDate: Date;
    inventoryBatchLoadJobProductCardCode: string;
    inventoryBatchLoadJobProductCardStatus: string;
    inventoryBatchLoadJobProductCardData: string;
    inventoryBatchLoadJobProductCardCreateDate: Date;
    inventoryBatchLoadJobProductCardUpdateDate: Date;
}

export class CreateInventoryBatchLoadJobsProductCardDTO {
    @IsString()
    commerceAccountId: string;
    @IsString()
    commerceLocationId: string;
    @IsString()
    commerceLocationName: string;
    @IsString()
    commerceUserId: string;
    @IsString()
    commerceUserName: string;
    @IsString()
    productVendorId: string;
    @IsString()
    productVendorCode: string;
    @IsString()
    productLineId: string;
    @IsString()
    productLineCode: string;
    @IsString()
    productTypeId: string;
    @IsString()
    productTypeCode: string;
    @IsString()
    productCardLanguageId: string;
    @IsString()
    productCardLanguageCode: string;
}

export class CreateInventoryBatchLoadJobProductCardDTO {
    @IsString()
    commerceAccountId: string;
    @IsString()
    commerceLocationId: string;
    @IsString()
    commerceLocationName: string;
    @IsString()
    commerceUserId: string;
    @IsString()
    commerceUserName: string;
    @IsString()
    productVendorId: string;
    @IsString()
    productVendorCode: string;
    @IsString()
    productLineId: string;
    @IsString()
    productLineCode: string;
    @IsString()
    productTypeId: string;
    @IsString()
    productTypeCode: string;
    @IsString()
    productCardLanguageId: string;
    @IsString()
    productCardLanguageCode: string;
    @IsString()
    productSetId: string;
    @IsString()
    productSetCode: string;
}
