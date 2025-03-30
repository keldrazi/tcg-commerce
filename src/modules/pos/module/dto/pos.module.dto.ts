import { IsBoolean, IsString } from "class-validator";

export class POSModuleDTO {
    posModuleId: string;
    applicationModuleId: string;
    commerceAccountId: string;
    posModuleSettings: string;
    posModuleRoles: string;
    posModuleIsActive: boolean;
    posModuleCreateDate: Date;
    posModuleUpdateDate: Date;
}

export class CreatePOSModuleDTO {
    @IsString()
    applicationModuleId: string;
    @IsString()
    commerceAccountId: string;
    @IsString()
    posModuleSettings: string;
    @IsString()
    posModuleRoles: string;
    @IsBoolean()
    posModuleIsActive: boolean;
}

export class UpdatePOSModuleDTO {
    @IsString()
    posModuleId: string;
    @IsString()
    applicationModuleId: string;
    @IsString()
    commerceAccountId: string;
    @IsString()
    posModuleSettings: string;
    @IsString()
    posModuleRoles: string;
    @IsBoolean()
    posModuleIsActive: boolean;
}


