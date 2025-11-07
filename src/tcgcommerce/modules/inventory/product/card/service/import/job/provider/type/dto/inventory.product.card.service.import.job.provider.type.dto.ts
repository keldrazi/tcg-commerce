import { IsString, IsBoolean } from "class-validator";
import { InventoryProductCardServiceImportJobProviderTypeDataKey } from '../interface/inventory.product.card.service.import.job.provider.type.interface';

export class InventoryProductCardServiceImportJobProviderTypeDTO {
    inventoryProductCardServiceImportJobProviderTypeId: string;
    inventoryProductCardServiceImportJobProviderTypeName: string;
    inventoryProductCardServiceImportJobProviderTypeCode: string;
    inventoryProductCardServiceImportJobProviderTypeDescription: string;
    inventoryProductCardServiceImportJobProviderTypeFileExtension: string;
    inventoryProductCardServiceImportJobProviderTypeFileUploadPath: string;
    inventoryProductCardServiceImportJobProviderTypeFileDataKey: InventoryProductCardServiceImportJobProviderTypeDataKey;
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
    @IsString()
    inventoryProductCardServiceImportJobProviderTypeFileUploadPath: string;
    @IsString()
    inventoryProductCardServiceImportJobProviderTypeFileDataKey: string;
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
    @IsString()
    inventoryProductCardServiceImportJobProviderTypeFileUploadPath: string;
    @IsString()
    inventoryProductCardServiceImportJobProviderTypeFileDataKey: string;
    @IsBoolean()
    inventoryProductCardServiceImportJobProviderTypeIsActive: boolean;
}