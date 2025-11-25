import { IsBoolean, IsNumber, IsString } from "class-validator";

export class ProductCardPrintingDTO {
    productCardPrintingId: string;
    productCardPrintingTCGdbId: string;
    productCardPrintingTCGPlayerId: number;
    productVendorId: string;
    productLineId: string;
    productCardPrintingName: string;
    productCardPrintingDisplayOrder: number;
    productCardPrintingIsActive: boolean;
    productCardPrintingCreateDate: Date;
    productCardPrintingUpdateDate: Date;
}

export class CreateProductCardPrintingDTO {
    @IsString()
    productCardPrintingTCGdbId: string;
    @IsNumber()
    productCardPrintingTCGPlayerId: number;
    @IsString()
    productVendorId: string;
    @IsString()
    productLineId: string;
    @IsString()
    productCardPrintingName: string;
    @IsNumber()
    productCardPrintingDisplayOrder: number;
    @IsBoolean()
    productCardPrintingIsActive: boolean;
}

export class UpdateProductCardPrintingDTO {
    @IsString()
    productCardPrintingId: string;
    @IsString()
    productVendorId: string;
    @IsString()
    productLineId: string;
    @IsString()
    productCardPrintingName: string;
    @IsNumber()
    productCardPrintingDisplayOrder: number;
    @IsBoolean()
    productCardPrintingIsActive: boolean;
}