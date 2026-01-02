import { IsBoolean, IsString } from "class-validator";

export class OrderModuleDTO {
    orderModuleId: string;
    applicationModuleId: string;
    orderAccountId: string;
    orderModuleSettings: string;
    orderModuleRoles: string;
    orderModuleIsActive: boolean;
    orderModuleCreateDate: Date;
    orderModuleUpdateDate: Date;
}

export class CreateOrderModuleDTO {
    @IsString()
    applicationModuleId: string;
    @IsString()
    orderAccountId: string;
    @IsString()
    orderModuleSettings: string;
    @IsString()
    orderModuleRoles: string;
    @IsBoolean()
    orderModuleIsActive: boolean;
}

export class UpdateOrderModuleDTO {
    @IsString()
    orderModuleId: string;
    @IsString()
    orderModuleSettings: string;
    @IsString()
    orderModuleRoles: string;
    @IsBoolean()
    orderModuleIsActive: boolean;
}


