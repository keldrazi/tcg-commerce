import { IsString, IsBoolean } from "class-validator";

export class InventoryProductCardServiceImportJobTypeDTO {
    inventoryProductCardServiceImportJobTypeId: string;
    inventoryProductCardServiceImportJobTypeName: string;
    inventoryProductCardServiceImportJobTypeDescription: string;
    inventoryProductCardServiceImportJobTypeIsActive: boolean;
    inventoryProductCardServiceImportJobTypeCreateDate: Date;
    inventoryProductCardServiceImportJobTypeUpdateDate: Date;  
}

export class CreateInventoryProductCardServiceImportJobTypeDTO {
    @IsString()
    inventoryProductCardServiceImportJobTypeName: string;
    @IsString()
    inventoryProductCardServiceImportJobTypeDescription: string;
}

export class UpdateInventoryProductCardServiceImportJobTypeDTO {
    @IsString()
    inventoryProductCardServiceImportJobTypeId: string;
    @IsString()
    inventoryProductCardServiceImportJobTypeName: string;
    @IsString()
    inventoryProductCardServiceImportJobTypeDescription: string;
    @IsBoolean()
    inventoryProductCardServiceImportJobTypeIsActive: boolean;
}