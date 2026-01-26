import { IsBoolean, IsString } from "class-validator";

export class CustomerModuleDTO {
    customerModuleId: string;
    applicationModuleId: string;
    commerceAccountId: string;
    customerModuleSettings: string;
    customerModuleRoles: string;
    customerModuleIsActive: boolean;
    customerModuleCreateDate: Date;
    customerModuleUpdateDate: Date;
}

export class CreateCustomerModuleDTO {
    @IsString()
    applicationModuleId: string;
    @IsString()
    commerceAccountId: string;
    @IsString()
    customerModuleSettings: string;
    @IsString()
    customerModuleRoles: string;
    @IsBoolean()
    customerModuleIsActive: boolean;
}

export class UpdateCustomerModuleDTO {
    @IsString()
    customerModuleId: string;
    @IsString()
    customerModuleSettings: string;
    @IsString()
    customerModuleRoles: string;
    @IsBoolean()
    customerModuleIsActive: boolean;
}
