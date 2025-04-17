import { IsBoolean, IsString } from "class-validator";

export class EmailModuleDTO {
    emailModuleId: string;
    applicationModuleId: string;
    commerceAccountId: string;
    emailModuleSettings: string;
    emailModuleRoles: string;
    emailModuleIsActive: boolean;
    emailModuleCreateDate: Date;
    emailModuleUpdateDate: Date;
}

export class CreateEmailModuleDTO {
    @IsString()
    applicationModuleId: string;
    @IsString()
    commerceAccountId: string;
    @IsString()
    emailModuleSettings: string;
    @IsString()
    emailModuleRoles: string;
    @IsBoolean()
    emailModuleIsActive: boolean;
}

export class UpdateEmailModuleDTO {
    @IsString()
    emailModuleId: string;
    @IsString()
    applicationModuleId: string;
    @IsString()
    commerceAccountId: string;
    @IsString()
    emailModuleSettings: string;
    @IsString()
    emailModuleRoles: string;
    @IsBoolean()
    emailModuleIsActive: boolean;
}


