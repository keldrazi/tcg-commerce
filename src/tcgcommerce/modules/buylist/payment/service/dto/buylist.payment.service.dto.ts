import { IsString, IsBoolean } from "class-validator";

export class BuylistPaymentServiceDTO {
    buylistPaymentServiceId: string;
    buylistPaymentServiceName: string;
    buylistPaymentServiceCode: string;
    buylistPaymentServiceIsActive: boolean;
    buylistPaymentServiceCreateDate: Date;
    buylistPaymentServiceUpdateDate: Date;

    
}

export class CreateBuylistPaymentServiceDTO {
    @IsString()
    buylistPaymentServiceName: string;
    @IsString()
    buylistPaymentServiceCode: string;
    @IsBoolean()
    buylistPaymentServiceIsActive: boolean;
   
    
}

export class UpdateBuylistPaymentServiceDTO {
    @IsString()
    buylistPaymentServiceId: string;
    @IsString()
    buylistPaymentServiceName: string;
    @IsString()
    buylistPaymentServiceCode: string;
    @IsBoolean()
    buylistPaymentServiceIsActive: boolean;
    
}

