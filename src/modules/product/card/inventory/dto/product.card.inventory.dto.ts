import { IsEmail, IsString } from "class-validator";

export class ProductCardInventoryDTO {
    productCardInventoryId: string;
    productCardTypeName: string;
    productCardInventoryName: string;
    
}

export class CreateProductCardInventoryDTO {
    @IsString()
    productCardTypeName: string;
    @IsString()
    productCardInventoryName: string;
   
}

export class UpdateProductCardInventoryDTO {
    @IsString()
    productCardInventoryId: string;
    @IsString()
    productCardTypeName: string;
    @IsString()
    productCardInventoryName: string;
}