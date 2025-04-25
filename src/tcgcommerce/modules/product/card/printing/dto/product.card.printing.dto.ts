import { IsBoolean, IsNumber, IsString } from "class-validator";

export class ProductCardPrintingDTO {
    productCardPrintingId: string;
    productCardPrintingTCGPlayerId: number;
    productLineId: string;
    productCardPrintingName: string;
    productCardPrintingDisplayOrder: number;
    productCardPrintingIsActive: boolean;
    productCardPrintingCreateDate: Date;
    productCardPrintingUpdateDate: Date;
}

export class CreateProductCardPrintingDTO {
    @IsNumber()
    productCardPrintingTCGPlayerId: number;
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
    @IsNumber()
    productCardPrintingTCGPlayerId: number;
    @IsString()
    productLineId: string;
    @IsString()
    productCardPrintingName: string;
    @IsNumber()
    productCardPrintingDisplayOrder: number;
    @IsBoolean()
    productCardPrintingIsActive: boolean;
}