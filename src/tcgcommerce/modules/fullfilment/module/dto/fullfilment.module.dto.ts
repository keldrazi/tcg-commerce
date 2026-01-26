import { IsBoolean, IsString } from "class-validator";

export class FullfilmentModuleDTO {
    fullfilmentModuleId: string;
    applicationModuleId: string;
    commerceAccountId: string;
    fullfilmentModuleSettings: string;
    fullfilmentModuleRoles: string;
    fullfilmentModuleIsActive: boolean;
    fullfilmentModuleCreateDate: Date;
    fullfilmentModuleUpdateDate: Date;
}

export class CreateFullfilmentModuleDTO {
    @IsString()
    applicationModuleId: string;
    @IsString()
    commerceAccountId: string;
    @IsString()
    fullfilmentModuleSettings: string;
    @IsString()
    fullfilmentModuleRoles: string;
    @IsBoolean()
    fullfilmentModuleIsActive: boolean;
}

export class UpdateFullfilmentModuleDTO {
    @IsString()
    fullfilmentModuleId: string;
    @IsString()
    fullfilmentModuleSettings: string;
    @IsString()
    fullfilmentModuleRoles: string;
    @IsBoolean()
    fullfilmentModuleIsActive: boolean;
}


