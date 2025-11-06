import { IsString, IsBoolean } from "class-validator";

export class InventoryProductCardServiceImportJobTypeDTO {
    inventoryProductCardServiceImportJobTypeId: string;
    inventoryProductCardServiceImportJobTypeName: string;
    inventoryProductCardServiceImportJobTypeCode: string;
    inventoryProductCardServiceImportJobTypeDescription: string;
    inventoryProductCardServiceImportJobTypeFileExtension: string;
    inventoryProductCardServiceImportJobTypeIsActive: boolean;
    inventoryProductCardServiceImportJobTypeCreateDate: Date;
    inventoryProductCardServiceImportJobTypeUpdateDate: Date;  
}

export class CreateInventoryProductCardServiceImportJobTypeDTO {
    @IsString()
    inventoryProductCardServiceImportJobTypeName: string;
    @IsString()
    inventoryProductCardServiceImportJobTypeCode: string;
    @IsString()
    inventoryProductCardServiceImportJobTypeDescription: string;
    @IsString()
    inventoryProductCardServiceImportJobTypeFileExtension: string
}

export class UpdateInventoryProductCardServiceImportJobTypeDTO {
    @IsString()
    inventoryProductCardServiceImportJobTypeId: string;
    @IsString()
    inventoryProductCardServiceImportJobTypeName: string;
    @IsString()
    inventoryProductCardServiceImportJobTypeCode: string;
    @IsString()
    inventoryProductCardServiceImportJobTypeDescription: string;
    @IsString()
    inventoryProductCardServiceImportJobTypeFileExtension: string;
    @IsBoolean()
    inventoryProductCardServiceImportJobTypeIsActive: boolean;
}