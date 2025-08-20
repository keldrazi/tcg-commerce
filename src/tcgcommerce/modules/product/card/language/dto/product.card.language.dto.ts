import { IsBoolean, IsNumber, IsString } from "class-validator";

export class ProductCardLanguageDTO {
    productCardLanguageId: string;
    productCardLanguageTCGPlayerId: number;
    productLineId: string;
    productCardLanguageName: string;
    productCardLanguageCode: string;
    productCardLanguageIsActive: boolean;
    productCardLanguageCreateDate: Date;
    productCardLanguageUpdateDate: Date;
}

export class CreateProductCardLanguageDTO {
    @IsNumber()
    productCardLanguageTCGPlayerId: number;
    @IsString()
    productLineId: string;
    @IsString()
    productCardLanguageName: string;
    @IsString()
    productCardLanguageCode: string;
    @IsBoolean()
    productCardLanguageIsActive: boolean;
}

export class UpdateProductCardLanguageDTO {
    @IsString()
    productCardLanguageId: string;
    @IsNumber()
    productCardLanguageTCGPlayerId: number;
    @IsString()
    productLineId: string;
    @IsString()
    productCardLanguageName: string;
    @IsString()
    productCardLanguageCode: string;
    @IsBoolean()
    productCardLanguageIsActive: boolean;
}