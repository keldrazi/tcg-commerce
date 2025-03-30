import { IsBoolean, IsString } from "class-validator";

export class ProductModuleDTO {
    productModuleId: string;
    applicationModuleId: string;
    commerceAccountId: string;
    productModuleSettings: string;
    productModuleRoles: string;
    productModuleIsActive: boolean;
    productModuleCreateDate: Date;
    productModuleUpdateDate: Date;
}

export class CreateProductModuleDTO {
    @IsString()
    applicationModuleId: string;
    @IsString()
    commerceAccountId: string;
    @IsString()
    productModuleSettings: string;
    @IsString()
    productModuleRoles: string;
    @IsBoolean()
    productModuleIsActive: boolean;
}

export class UpdateProductModuleDTO {
    @IsString()
    productModuleId: string;
    @IsString()
    applicationModuleId: string;
    @IsString()
    commerceAccountId: string;
    @IsString()
    productModuleSettings: string;
    @IsString()
    productModuleRoles: string;
    @IsBoolean()
    productModuleIsActive: boolean;
}


