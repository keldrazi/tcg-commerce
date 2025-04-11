import { IsBoolean, IsString } from "class-validator";

export class ProductSetDTO {
    productSetId: string;
    productVendorId: string;
    productLineId: string;
    productSetName: string;
    productSetAbbreviation: string;
    productSetExtendedData: string;
    productSetMetadata: string;
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
    @IsString()
    productSetExtendedData: string;
    @IsString()
    productSetMetadata: string;
}

export class UpdateProductSetDTO {
    @IsString()
    productSetId: string;
    @IsString()
    productSetName: string;
    @IsString()
    productSetAbbreviation: string;  
    @IsString()
    productSetExtendedData: string;
    @IsString()
    productSetMetadata: string;
    @IsBoolean()
    productSetIsActive: boolean;
}