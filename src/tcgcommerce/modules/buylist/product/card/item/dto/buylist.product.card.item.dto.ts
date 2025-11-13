import { IsString, IsBoolean } from "class-validator";

export class BuylistTypeDTO {
    buylistTypeId: string;
    buylistTypeName: string;
    buylistTypeCode: string;
    buylistTypeIsActive: boolean;
    buylistTypeCreateDate: Date;
    buylistTypeUpdateDate: Date;

    
}

export class CreateBuylistTypeDTO {
    @IsString()
    buylistTypeName: string;
    @IsString()
    buylistTypeCode: string;
    @IsBoolean()
    buylistTypeIsActive: boolean;
   
    
}

export class UpdateBuylistTypeDTO {
    @IsString()
    buylistTypeId: string;
    @IsString()
    buylistTypeName: string;
    @IsString()
    buylistTypeCode: string;
    @IsBoolean()
    buylistTypeIsActive: boolean;
    
}

