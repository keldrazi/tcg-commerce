import { IsBoolean, IsString } from "class-validator";

export class POSVendorOptionPriceDTO {
    posVendorId: string;
    posVendorOptionPriceId: string;
    posVendorOptionPriceName: string;
    posVendorOptionPriceCode: string;
    posVendorOptionPriceIsActive: boolean;
    posVendorOptionPriceCreateDate: Date;
    posVendorOptionPriceUpdateDate: Date;
}

export class CreatePOSVendorOptionPriceDTO {
    @IsString()
    posVendorId: string;
    @IsString()
    posVendorOptionPriceName: string;
    @IsString()
    posVendorOptionPriceCode: string
    @IsBoolean()
    posVendorOptionPriceIsActive: boolean; 
}

export class UpdatePOSVendorOptionPriceDTO {
    @IsString()
    posVendorOptionPriceId: string
    @IsString()
    posVendorOptionPriceName: string;
    @IsString()
    posVendorOptionPriceCode: string;
    @IsBoolean()
    posVendorOptionPriceIsActive: boolean; 
}
