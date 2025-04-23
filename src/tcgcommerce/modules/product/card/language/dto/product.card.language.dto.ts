import { IsBoolean, IsString } from "class-validator";

export class ProductCardLanguageDTO {
    productCardLanguageId: string;
    productCardLanguageName: string;
    productCardLanguageAbbreviation: string;
    productCardLanguageIsActive: boolean;
    productCardLanguageCreateDate: Date;
    productCardLanguageUpdateDate: Date;
}

export class CreateProductCardLanguageDTO {
    @IsString()
    productCardLanguageName: string;
    @IsString()
    productCardLanguageAbbreviation: string;
    @IsBoolean()
    productCardLanguageIsActive: boolean;
}

export class UpdateProductCardLanguageDTO {
    @IsString()
    productCardLanguageId: string;
    @IsString()
    productCardLanguageName: string;
    @IsString()
    productCardLanguageAbbreviation: string;
    @IsBoolean()
    productCardLanguageIsActive: boolean;
}