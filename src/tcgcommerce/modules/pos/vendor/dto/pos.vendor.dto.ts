import { IsBoolean, IsString } from "class-validator";

export class ProductVendorDTO {
    productVendorId: string;
    productVendorName: string;
    productVendorCode: string;
    productVendorIsActive: boolean;
    productVendorCreateDate: Date;
    productVendorUpdateDate: Date;
    
}

export class CreateProductVendorDTO {
    @IsString()
    productVendorName: string;
    @IsString()
    productVendorCode: string
    
}

export class UpdateProductVendorDTO {
    @IsString()
    productVendorId: string;
    @IsString()
    productVendorName: string;
    @IsString()
    productVendorCode: string;
    @IsBoolean()
    productVendorIsActive: boolean;
    
}