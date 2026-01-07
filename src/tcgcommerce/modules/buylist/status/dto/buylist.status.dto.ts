import { IsString, IsBoolean } from "class-validator";

export class BuylistStatusDTO {
    buylistStatusId: string;
    buylistStatusName: string;
    buylistStatusCode: string;
    buylistStatusIsActive: boolean;
    buylistStatusCreateDate: Date;
    buylistStatusUpdateDate: Date;

    
}

export class CreateBuylistStatusDTO {
    @IsString()
    buylistStatusName: string;
    @IsString()
    buylistStatusCode: string;
    @IsBoolean()
    buylistStatusIsActive: boolean;
   
    
}

export class UpdateBuylistStatusDTO {
    @IsString()
    buylistStatusId: string;
    @IsString()
    buylistStatusName: string;
    @IsString()
    buylistStatusCode: string;
    @IsBoolean()
    buylistStatusIsActive: boolean;
    
}

