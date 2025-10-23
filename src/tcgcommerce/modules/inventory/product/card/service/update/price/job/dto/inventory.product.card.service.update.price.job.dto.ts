import { IsString } from "class-validator";


export class InventoryProductCardServiceUpdatePriceJobDTO {
    inventoryProductCardServiceUpdatePriceJobId: string;
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
    productLanguageId: string;
    productLanguageCode: string;
    productSetId: string;
    productSetCode: string;
    inventoryProductCardServiceUpdatePriceJobDate: Date;
    inventoryProductCardServiceUpdatePriceJobCode: string;
    inventoryProductCardServiceUpdatePriceJobCount: number;
    inventoryProductCardServiceUpdatePriceJobStatus: string;
    inventoryProductCardServiceUpdatePriceJobCreateDate: Date;
    inventoryProductCardServiceUpdatePriceJobUpdateDate: Date;
}

export class CreateInventoryProductCardServiceUpdatePriceJobsDTO {
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
    productLanguageId: string;
    @IsString()
    productLanguageCode: string;
}

export class CreateInventoryProductCardServiceUpdatePriceJobDTO {
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
    productLanguageId: string;
    @IsString()
    productLanguageCode: string;
    @IsString()
    productSetId: string;
    @IsString()
    productSetCode: string;
}
