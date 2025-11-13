import { IsString, IsBoolean } from "class-validator";

export class BuylistPaymentTypeDTO {
    buylistPaymentTypeId: string;
    buylistPaymentTypeName: string;
    buylistPaymentTypeCode: string;
    buylistPaymentTypeIsActive: boolean;
    buylistPaymentTypeCreateDate: Date;
    buylistPaymentTypeUpdateDate: Date;

    
}

export class CreateBuylistPaymentTypeDTO {
    @IsString()
    buylistPaymentTypeName: string;
    @IsString()
    buylistPaymentTypeCode: string;
    @IsBoolean()
    buylistPaymentTypeIsActive: boolean;
   
    
}

export class UpdateBuylistPaymentTypeDTO {
    @IsString()
    buylistPaymentTypeId: string;
    @IsString()
    buylistPaymentTypeName: string;
    @IsString()
    buylistPaymentTypeCode: string;
    @IsBoolean()
    buylistPaymentTypeIsActive: boolean;
    
}

