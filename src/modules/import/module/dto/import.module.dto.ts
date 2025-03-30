import { IsBoolean, IsString } from "class-validator";

export class ImportModuleDTO {
    importModuleId: string;
    applicationModuleId: string;
    commerceAccountId: string;
    importModuleSettings: string;
    importModuleRoles: string;
    importModuleIsActive: boolean;
    importModuleCreateDate: Date;
    importModuleUpdateDate: Date;
}

export class CreateImportModuleDTO {
    @IsString()
    applicationModuleId: string;
    @IsString()
    commerceAccountId: string;
    @IsString()
    importModuleSettings: string;
    @IsString()
    importModuleRoles: string;
    @IsBoolean()
    importModuleIsActive: boolean;
}

export class UpdateImportModuleDTO {
    @IsString()
    importModuleId: string;
    @IsString()
    applicationModuleId: string;
    @IsString()
    commerceAccountId: string;
    @IsString()
    importModuleSettings: string;
    @IsString()
    importModuleRoles: string;
    @IsBoolean()
    importModuleIsActive: boolean;
}


