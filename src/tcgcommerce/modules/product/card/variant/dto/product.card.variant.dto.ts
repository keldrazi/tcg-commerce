import { IsBoolean, IsString } from "class-validator";

export class ProductCardVariantDTO {
    productCardVariantId: string;
    productCardVariantName: string;
    productCardVariantAbbreviation: string;
    productCardVariantIsActive: boolean;
    productCardVariantCreateDate: Date;
    productCardVariantUpdateDate: Date;
}

export class CreateProductCardVariantDTO {
    @IsString()
    productCardVariantName: string;
    @IsString()
    productCardVariantAbbreviation: string;
}

export class UpdateProductCardVariantDTO {
    @IsString()
    productCardVariantId: string;
    @IsString()
    productCardVariantName: string;
    @IsString()
    productCardVariantAbbreviation: string;
    @IsBoolean()
    productCardVariantIsActive: boolean;
}