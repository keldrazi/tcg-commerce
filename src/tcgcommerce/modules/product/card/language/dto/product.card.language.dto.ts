import { IsBoolean, IsString } from "class-validator";

export class ProductCardLanguageDTO {
    productCardLanguageId: string;
    productLineId: string;
    productCardLanguageName: string;
    productCardLanguageAbbreviation: string;
    productCardLanguageIsActive: boolean;
    productCardLanguageCreateDate: Date;
    productCardLanguageUpdateDate: Date;
}

export class CreateProductCardLanguageDTO {
    @IsString()
    productLineId: string;
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
    productLineId: string;
    @IsString()
    productCardLanguageName: string;
    @IsString()
    productCardLanguageAbbreviation: string;
    @IsBoolean()
    productCardLanguageIsActive: boolean;
}