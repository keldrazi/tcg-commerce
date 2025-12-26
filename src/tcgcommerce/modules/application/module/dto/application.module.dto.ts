import { IsBoolean, IsString } from "class-validator";

export class ApplicationModuleDTO {
    applicationModuleId: string;
    applicationModuleName: string;
    applicationModuleHandle: string;
    applicationModuleDescription: string;
    applicationModuleIsActive: boolean;
    applicationModuleCreateDate: Date;
    applicationModuleUpdateDate: Date; 
}

export class CreateApplicationModuleDTO {
    @IsString()
    applicationModuleName: string;
    @IsString()
    applicationModuleHandle: string;
    @IsString()
    applicationModuleDescription: string;
    @IsBoolean()
    applicationModuleIsActive: boolean;
}

export class UpdateApplicationModuleDTO {
    @IsString()
    applicationModuleId: string;
    @IsString()
    applicationModuleName: string;
    @IsString()
    applicationModuleHandle: string;
    @IsString()
    applicationModuleDescription: string;
    @IsBoolean()
    applicationModuleIsActive: boolean;
}










