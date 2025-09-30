import { IsBoolean, IsDate, IsNumber, IsString } from "class-validator";

export class ProductSetDTO {
    productSetId: string;
    productSetTCGdbId: string;
    productSetTCGPlayerId: number;
    productVendorId: string;
    productLineId: string;
    productSetName: string;
    productSetCode: string;
    productSetReleaseDate: Date;
    productSetTotalCards: number;
    productSetIsActive: boolean;
    productSetCreateDate: Date;
    productSetUpdateDate: Date; 
}

export class CreateProductSetDTO {
    @IsString()
    productSetTCGdbId: string;
    @IsNumber()
    productSetTCGPlayerId: number;
    @IsString()
    productVendorId: string;
    @IsString()
    productLineId: string;
    @IsString()
    productSetName: string;
    @IsString()
    productSetCode: string;  
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
    productSetCode: string; 
    @IsNumber()
    productSetTotalCards: number;
    @IsDate()
    productSetReleaseDate: Date; 
    @IsBoolean()
    productSetIsActive: boolean;
}