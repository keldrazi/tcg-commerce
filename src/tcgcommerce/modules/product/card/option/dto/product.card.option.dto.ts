import { IsBoolean, IsEmail, IsString } from "class-validator";

export class ProductCardOptionDTO {
    productCardOptionId: string;
    productVendorId: string;
    productLineId: string;
    productTypeId: string;
    productCardOptionName: string;
    productCardOptionIsActive: boolean;
    productCardOptionCreateDate: Date;
    productCardOptionUpdateDate: Date; 
}

export class CreateProductCardOptionDTO {
    @IsString()
    productVendorId: string;
    @IsString()
    productLineId: string;
    @IsString()
    productTypeId: string;
    @IsString()
    productCardOptionName: string;  
}

export class UpdateProductCardOptionDTO {
    @IsString()
    productCardOptionId: string;
    @IsString()
    productCardOptionName: string;
    @IsBoolean()
    productCardOptionIsActive: boolean;
}