import { IsBoolean, IsNumber, IsString } from "class-validator";

export class ProductLanguageDTO {
    productLanguageId: string;
    productLanguageTCGdbId: string;
    productLanguageTCGPlayerId: number;
    productLineId: string;
    productLanguageName: string;
    productLanguageCode: string;
    productLanguageIsActive: boolean;
    productLanguageCreateDate: Date;
    productLanguageUpdateDate: Date;
}

export class CreateProductLanguageDTO {
    @IsString()
    productLanguageTCGdbId: string;
    @IsNumber()
    productLanguageTCGPlayerId: number;
    @IsString()
    productLineId: string;
    @IsString()
    productLanguageName: string;
    @IsString()
    productLanguageCode: string;
    @IsBoolean()
    productLanguageIsActive: boolean;
}

export class UpdateProductLanguageDTO {
    @IsString()
    productLanguageId: string;
    @IsString()
    productLineId: string;
    @IsString()
    productLanguageName: string;
    @IsString()
    productLanguageCode: string;
    @IsBoolean()
    productLanguageIsActive: boolean;
}