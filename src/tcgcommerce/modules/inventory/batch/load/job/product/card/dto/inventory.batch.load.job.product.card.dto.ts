import { IsString } from "class-validator";

export class InventoryBatchLoadJobProductCardDTO {
    inventoryBatchLoadJobProductCardId: string;
    commerceAccountId: string;
    commerceLocationId: string;
    commerceUserName: string;
    productVendorId: string;
    productLineId: string;
    productTypeId: string;
    inventoryBatchLoadJobProductCardSetCode: string;
    inventoryBatchLoadJobProductCardLanguageCode: string;
    inventoryBatchLoadJobProductCardDate: Date;
    inventoryBatchLoadJobProductCardCode: string;
    inventoryBatchLoadJobProductCardStatus: string;
    inventoryBatchLoadJobProductCardData: string;
    inventoryBatchLoadJobProductCardCreateDate: Date;
    inventoryBatchLoadJobProductCardUpdateDate: Date;
}

export class CreateInventoryBatchLoadJobProductCardDTO {
    @IsString()
    commerceAccountId: string;
    @IsString()
    commerceLocationId: string;
    @IsString()
    commerceLocationName: string;
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
    inventoryBatchLoadJobProductCardSetCode: string;
}