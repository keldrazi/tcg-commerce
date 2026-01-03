import { IsBoolean, IsString } from "class-validator";

export class POSVendorOptionPriceTypeDTO {
    posVendorId: string;
    posVendorOptionPriceTypeId: string;
    posVendorOptionPriceTypeName: string;
    posVendorOptionPriceTypeCode: string;
    posVendorOptionPriceTypeIsActive: boolean;
    posVendorOptionPriceTypeCreateDate: Date;
    posVendorOptionPriceTypeUpdateDate: Date;
}

export class CreatePOSVendorOptionPriceTypeDTO {
    @IsString()
    posVendorId: string;
    @IsString()
    posVendorOptionPriceTypeName: string;
    @IsString()
    posVendorOptionPriceTypeCode: string
    @IsBoolean()
    posVendorOptionPriceTypeIsActive: boolean; 
}

export class UpdatePOSVendorOptionPriceTypeDTO {
    @IsString()
    posVendorOptionPriceTypeId: string
    @IsString()
    posVendorOptionPriceTypeName: string;
    @IsString()
    posVendorOptionPriceTypeCode: string;
    @IsBoolean()
    posVendorOptionPriceTypeIsActive: boolean; 
}
