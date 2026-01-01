import { IsBoolean, IsString } from "class-validator";

export class ReportModuleDTO {
    reportModuleId: string;
    applicationModuleId: string;
    commerceAccountId: string;
    reportModuleSettings: string;
    reportModuleRoles: string;
    reportModuleIsActive: boolean;
    reportModuleCreateDate: Date;
    reportModuleUpdateDate: Date;
}

export class CreateReportModuleDTO {
    @IsString()
    applicationModuleId: string;
    @IsString()
    commerceAccountId: string;
    @IsString()
    reportModuleSettings: string;
    @IsString()
    reportModuleRoles: string;
    @IsBoolean()
    reportModuleIsActive: boolean;
}

export class UpdateReportModuleDTO {
    @IsString()
    reportModuleId: string;
    @IsString()
    applicationModuleId: string;
    @IsString()
    commerceAccountId: string;
    @IsString()
    reportModuleSettings: string;
    @IsString()
    reportModuleRoles: string;
    @IsBoolean()
    reportModuleIsActive: boolean;
}


