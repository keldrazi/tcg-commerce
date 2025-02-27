import { IsEmail, IsString } from "class-validator";

export class ProductCardItemDTO {
    productCardItemId: string;
    productCardTypeName: string;
    productCardItemName: string;
    
}

export class CreateProductCardItemDTO {
    @IsString()
    productCardTypeName: string;
    @IsString()
    productCardItemName: string;
   
}

export class UpdateProductCardItemDTO {
    @IsString()
    productCardItemId: string;
    @IsString()
    productCardTypeName: string;
    @IsString()
    productCardItemName: string;
}