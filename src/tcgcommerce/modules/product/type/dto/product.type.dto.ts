import { IsEmail, IsString, IsBoolean } from "class-validator";

export class ProductTypeDTO {
    productTypeId: string;
    productVendorId: string;
    productLineId: string;
    productTypeName: string;
    productTypeIsActive: boolean;
    productTypeCreateDate: Date;
    productTypeUpdateDate: Date;

    
}

export class CreateProductTypeDTO {
    @IsString()
    productVendorId: string;
    @IsString()
    productLineId: string;
    @IsString()
    productTypeName: string;
   
    
}

export class UpdateProductTypeDTO {
    @IsString()
    productTypeId: string;
    @IsString()
    productTypeName: string;
    @IsBoolean()
    productTypeIsActive: boolean;
    
}