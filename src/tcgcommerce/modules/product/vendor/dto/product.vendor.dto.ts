import { IsString } from "class-validator";

export class ProductVendorDTO {
    productVendorId: string;
    productVendorName: string;
    
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
    
}