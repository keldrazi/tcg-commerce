import { IsBoolean, IsString } from "class-validator";

export class CommerceModuleDTO {
    commerceModuleId: string;
    applicationModuleId: string;
    commerceAccountId: string;
    commerceModuleSettings: string;
    commerceModuleRoles: string;
    commerceModuleIsActive: boolean;
    commerceModuleCreateDate: Date;
    commerceModuleUpdateDate: Date;
}

export class CreateCommerceModuleDTO {
    @IsString()
    applicationModuleId: string;
    @IsString()
    commerceAccountId: string;
    @IsString()
    commerceModuleSettings: string;
    @IsString()
    commerceModuleRoles: string;
    @IsBoolean()
    commerceModuleIsActive: boolean;
}

export class UpdateCommerceModuleDTO {
    @IsString()
    commerceModuleId: string;
    @IsString()
    commerceModuleSettings: string;
    @IsString()
    commerceModuleRoles: string;
    @IsBoolean()
    commerceModuleIsActive: boolean;
}


