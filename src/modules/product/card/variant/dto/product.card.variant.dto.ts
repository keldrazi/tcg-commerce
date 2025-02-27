import { IsEmail, IsString } from "class-validator";

export class ProductCardVariantDTO {
    productCardVariantId: string;
    productCardVariantName: string;
}

export class CreateProductCardVariantDTO {
    @IsString()
    productCardVariantName: string;
}

export class UpdateProductCardVariantDTO {
    @IsString()
    productCardVariantId: string;
    @IsString()
    productCardVariantName: string;
}