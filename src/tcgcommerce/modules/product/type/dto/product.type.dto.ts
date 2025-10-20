import { IsEmail, IsString, IsBoolean } from "class-validator";

export class ProductTypeDTO {
    productTypeId: string;
    productVendorId: string;
    productLineId: string;
    productTypeName: string;
    productTypeCode: string;
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
    @IsString()
    productTypeCode: string;
   
    
}

export class UpdateProductTypeDTO {
    @IsString()
    productTypeId: string;
    @IsString()
    productTypeName: string;
    @IsString()
    productTypeCode: string;
    @IsBoolean()
    productTypeIsActive: boolean;
    
}