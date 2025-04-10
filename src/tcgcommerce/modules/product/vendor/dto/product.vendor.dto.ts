import { IsBoolean, IsString } from "class-validator";

export class ProductVendorDTO {
    productVendorId: string;
    productVendorName: string;
    productVendorIsActive: boolean;
    productVendorCreateDate: Date;
    productVendorUpdateDate: Date;
    
}

export class CreateProductVendorDTO {
    @IsString()
    productVendorName: string;
    
}

export class UpdateProductVendorDTO {
    @IsString()
    productVendorId: string;
    @IsString()
    productVendorName: string;
    @IsBoolean()
    productVendorIsActive: boolean;
    
}