import { IsBoolean, IsNumber, IsString } from "class-validator";

export class ProductLanguageDTO {
    productLanguageId: string;
    productLanguageTCGdbId: string;
    productLanguageTCGPlayerId: number;
    productVendorId: string;
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
    productVendorId: string;
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
    productVendorId: string;
    @IsString()
    productLineId: string;
    @IsString()
    productLanguageName: string;
    @IsString()
    productLanguageCode: string;
    @IsBoolean()
    productLanguageIsActive: boolean;
}