import { IsBoolean, IsString } from "class-validator";

export class InventoryModuleDTO {
    inventoryModuleId: string;
    applicationModuleId: string;
    commerceAccountId: string;
    inventoryModuleSettings: string;
    inventoryModuleRoles: string;
    inventoryModuleIsActive: boolean;
    inventoryModuleCreateDate: Date;
    inventoryModuleUpdateDate: Date;
}

export class CreateInventoryModuleDTO {
    @IsString()
    applicationModuleId: string;
    @IsString()
    commerceAccountId: string;
    @IsString()
    inventoryModuleSettings: string;
    @IsString()
    inventoryModuleRoles: string;
    @IsBoolean()
    inventoryModuleIsActive: boolean;
}

export class UpdateInventoryModuleDTO {
    @IsString()
    inventoryModuleId: string;
    @IsString()
    applicationModuleId: string;
    @IsString()
    commerceAccountId: string;
    @IsString()
    inventoryModuleSettings: string;
    @IsString()
    inventoryModuleRoles: string;
    @IsBoolean()
    inventoryModuleIsActive: boolean;
}


