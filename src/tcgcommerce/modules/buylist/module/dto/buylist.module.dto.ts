import { IsBoolean, IsString } from "class-validator";

export class BuylistModuleDTO {
    buylistModuleId: string;
    applicationModuleId: string;
    commerceAccountId: string;
    buylistModuleSettings: string;
    buylistModuleRoles: string;
    buylistModuleIsActive: boolean;
    buylistModuleCreateDate: Date;
    buylistModuleUpdateDate: Date;
}

export class CreateBuylistModuleDTO {
    @IsString()
    applicationModuleId: string;
    @IsString()
    commerceAccountId: string;
    @IsString()
    buylistModuleSettings: string;
    @IsString()
    buylistModuleRoles: string;
    @IsBoolean()
    buylistModuleIsActive: boolean;
}

export class UpdateBuylistModuleDTO {
    @IsString()
    buylistModuleId: string;
    @IsString()
    buylistModuleSettings: string;
    @IsString()
    buylistModuleRoles: string;
    @IsBoolean()
    buylistModuleIsActive: boolean;
}


