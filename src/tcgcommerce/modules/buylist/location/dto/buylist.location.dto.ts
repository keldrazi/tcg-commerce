import { IsString, IsBoolean } from "class-validator";

export class BuylistLocationDTO {
    buylistLocationId: string;
    commerceAccountId: string;
    buylistLocationName: string;
    buylistLocationCode: string;
    buylistLocationIsActive: boolean;
    buylistLocationCreateDate: Date;
    buylistLocationUpdateDate: Date;

    
}

export class CreateBuylistLocationDTO {
    @IsString()
    commerceAccountId: string;
    @IsString()
    buylistLocationName: string;
    @IsString()
    buylistLocationCode: string;
    @IsBoolean()
    buylistLocationIsActive: boolean;
   
    
}

export class UpdateBuylistLocationDTO {
    @IsString()
    buylistLocationId: string;
    @IsString()
    commerceAccountId: string;
    @IsString()
    buylistLocationName: string;
    @IsString()
    buylistLocationCode: string;
    @IsBoolean()
    buylistLocationIsActive: boolean;
    
}

