import { IsString, IsBoolean } from "class-validator";

export class InventoryProductCardServiceImportJobProviderTypeDTO {
    inventoryProductCardServiceImportJobProviderTypeId: string;
    inventoryProductCardServiceImportJobProviderTypeName: string;
    inventoryProductCardServiceImportJobProviderTypeCode: string;
    inventoryProductCardServiceImportJobProviderTypeDescription: string;
    inventoryProductCardServiceImportJobProviderTypeFileExtension: string;
    inventoryProductCardServiceImportJobProviderTypeIsActive: boolean;
    inventoryProductCardServiceImportJobProviderTypeCreateDate: Date;
    inventoryProductCardServiceImportJobProviderTypeUpdateDate: Date;  
}

export class CreateInventoryProductCardServiceImportJobProviderTypeDTO {
    @IsString()
    inventoryProductCardServiceImportJobProviderTypeName: string;
    @IsString()
    inventoryProductCardServiceImportJobProviderTypeCode: string;
    @IsString()
    inventoryProductCardServiceImportJobProviderTypeDescription: string;
    @IsString()
    inventoryProductCardServiceImportJobProviderTypeFileExtension: string;
}

export class UpdateInventoryProductCardServiceImportJobProviderTypeDTO {
    @IsString()
    inventoryProductCardServiceImportJobProviderTypeId: string;
    @IsString()
    inventoryProductCardServiceImportJobProviderTypeName: string;
    @IsString()
    inventoryProductCardServiceImportJobProviderTypeCode: string;
    @IsString()
    inventoryProductCardServiceImportJobProviderTypeDescription: string;
    @IsString()
    inventoryProductCardServiceImportJobProviderTypeFileExtension: string;
    @IsBoolean()
    inventoryProductCardServiceImportJobProviderTypeIsActive: boolean;
}