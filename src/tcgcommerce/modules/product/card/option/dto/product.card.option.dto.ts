import { IsEmail, IsString } from "class-validator";

export class ProductCardOptionDTO {
    productCardOptionId: string;
    productCardTypeName: string;
    productCardOptionName: string;
    
}

export class CreateProductCardOptionDTO {
    @IsString()
    productCardTypeName: string;
    @IsString()
    productCardOptionName: string;
   
}

export class UpdateProductCardOptionDTO {
    @IsString()
    productCardOptionId: string;
    @IsString()
    productCardTypeName: string;
    @IsString()
    productCardOptionName: string;
}