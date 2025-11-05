import { IsString } from "class-validator";
import { Column } from "typeorm/browser/decorator/columns/Column.js";


export class InventoryProductCardServiceImportJobDTO {
    inventoryProductCardServiceImportJobId: string;
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
    inventoryProductCardServiceImportTypeId: string;
    inventoryProductCardServiceImportTypeName: string;
    inventoryProductCardServiceImportJobFileURL: string;
    inventoryProductCardServiceImportJobFileOriginalName: string;
    inventoryProductCardServiceImportJobDate: Date;
    inventoryProductCardServiceImportJobCode: string;
    inventoryProductCardServiceImportJobCount: number;
    inventoryProductCardServiceImportJobStatus: string;
    inventoryProductCardServiceImportJobImportDate: Date;
    inventoryProductCardServiceImportJobUpdateDate: Date;
}

export class CreateInventoryProductCardServiceImportJobDTO {
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
    inventoryProductCardServiceImportTypeId: string;
    @IsString()
    inventoryProductCardServiceImportTypeName: string;

}


