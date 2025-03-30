import { IsEmail, IsString } from "class-validator";

export class ProductTypeDTO {
    productTypeId: string;
    productVendorId: string;
    productTypeName: string;
    
}

export class CreateProductTypeDTO {
    @IsString()
    productVendorId: string;
    @IsString()
    productTypeName: string;
    
}

export class UpdateProductTypeDTO {
    @IsString()
    productTypeId: string;
    @IsString()
    productVendorId: string;
    @IsString()
    productTypeName: string;
    
}