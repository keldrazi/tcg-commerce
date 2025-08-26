import { IsString } from "class-validator";

export class InventoryBatchLoadJobProductCardDTO {
    inventoryBatchLoadJobProductCardId: string;
    commerceAccountId: string;
    commerceLocationId: string;
    commerceLocationName: string;
    commerceUserName: string;
    productVendorId: string;
    productVendorName: string;
    productLineId: string;
    productLineName: string;
    productLineCode: string;
    inventoryBatchLoadJobProductCardSetCode: string;
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
    productVendorName: string;
    @IsString()
    productLineId: string;
    @IsString()
    productLineName: string;
    @IsString()
    productLineCode: string;
    @IsString()
    inventoryBatchLoadJobProductCardSetCode: string;
}