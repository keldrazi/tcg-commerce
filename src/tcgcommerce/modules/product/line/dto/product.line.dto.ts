import { IsBoolean, IsString } from "class-validator";

export class ProductLineDTO {
    productLineId: string;
    productVendorId: string;
    productLineName: string;
    productLineCode: string;
    productLineIsActive: boolean;
    productLineCreateDate: Date;
    productLineUpdateDate: Date;
    
}

export class CreateProductLineDTO {
    @IsString()
    productVendorId: string;
    @IsString()
    productLineName: string;
    @IsString()
    productLineCode: string;
    
}

export class UpdateProductLineDTO {
    @IsString()
    productLineId: string;
    @IsString()
    productLineName: string;
    @IsString()
    productLineCode: string;
    @IsBoolean()
    productLineIsActive: boolean;
    
}