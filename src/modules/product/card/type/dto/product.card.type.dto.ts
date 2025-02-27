import { IsEmail, IsString } from "class-validator";

export class ProductCardTypeDTO {
    productCardTypeId: string;
    productCardTypeName: string;
    productCardTypeVendor: string;
}

export class CreateProductCardTypeDTO {
    @IsString()
    productCardTypeName: string;
    @IsString()
    productCardTypeVendor: string;
}

export class UpdateProductCardTypeDTO {
    @IsString()
    productCardTypeId: string;
    @IsString()
    productCardTypeName: string;
    @IsString()
    productCardTypeVendor: string;
}