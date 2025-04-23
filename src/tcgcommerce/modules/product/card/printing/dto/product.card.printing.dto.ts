import { IsBoolean, IsNumber, IsString } from "class-validator";

export class ProductCardPrintingDTO {
    productCardPrintingId: string;
    productCardPrintingName: string;
    productCardPrintingDisplayOrder: number;
    productCardPrintingIsActive: boolean;
    productCardPrintingCreateDate: Date;
    productCardPrintingUpdateDate: Date;
}

export class CreateProductCardPrintingDTO {
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
    productCardPrintingName: string;
    @IsNumber()
    productCardPrintingDisplayOrder: number;
    @IsBoolean()
    productCardPrintingIsActive: boolean;
}