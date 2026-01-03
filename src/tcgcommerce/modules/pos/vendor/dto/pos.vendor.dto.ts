import { IsBoolean, IsString } from "class-validator";

export class POSVendorDTO {
    posVendorId: string;
    posVendorName: string;
    posVendorDescription: string;
    posVendorCode: string;
    posVendorURL: string;
    posVendorIsActive: boolean;
    posVendorCreateDate: Date;
    posVendorUpdateDate: Date; 
}

export class CreatePOSVendorDTO {
    @IsString()
    posVendorName: string;
    @IsString()
    posVendorDescription: string
    @IsString()
    posVendorCode: string
    @IsString()
    posVendorURL: string
    @IsBoolean()
    posVendorIsActive: boolean; 
}

export class UpdatePOSVendorDTO {
    @IsString()
    posVendorId: string;
    @IsString()
    posVendorName: string;
    @IsString()
    posVendorDescription: string
    @IsString()
    posVendorCode: string
    @IsString()
    posVendorURL: string
    @IsBoolean()
    posVendorIsActive: boolean;  
}

