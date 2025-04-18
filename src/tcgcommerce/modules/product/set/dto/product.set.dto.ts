import { IsBoolean, IsDate, IsNumber, IsString } from "class-validator";

export class ProductSetDTO {
    productSetId: string;
    productVendorId: string;
    productLineId: string;
    productSetName: string;
    productSetAbbreviation: string;
    productSetReleaseDate: Date;
    productSetTotalCards: number;
    productSetIsActive: boolean;
    productSetCreateDate: Date;
    productSetUpdateDate: Date; 
}

export class CreateProductSetDTO {
    @IsString()
    productVendorId: string;
    @IsString()
    productLineId: string;
    @IsString()
    productSetName: string;
    @IsString()
    productSetAbbreviation: string;  
    @IsNumber()
    productSetTotalCards: number;
    @IsDate()
    productSetReleaseDate: Date;
}

export class UpdateProductSetDTO {
    @IsString()
    productSetId: string;
    @IsString()
    productSetName: string;
    @IsString()
    productSetAbbreviation: string; 
    @IsNumber()
    productSetTotalCards: number;
    @IsDate()
    productSetReleaseDate: Date; 
    @IsBoolean()
    productSetIsActive: boolean;
}