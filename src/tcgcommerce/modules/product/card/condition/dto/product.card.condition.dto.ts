import { IsBoolean, IsNumber, IsString } from "class-validator";

export class ProductCardConditionDTO {
    productCardConditionId: string;
    productCardConditionTCGdbId: string;
    productCardConditionTCGPlayerId: number;
    productLineId: string;
    productCardConditionName: string;
    productCardConditionCode: string;
    productCardConditionPriceFactor: number;
    productCardConditionDisplayOrder: number;
    productCardConditionIsActive: boolean;
    productCardConditionCreateDate: Date;
    productCardConditionUpdateDate: Date;
}

export class CreateProductCardConditionDTO {
    @IsString()
    productCardConditionTCGdbId: string;
    @IsNumber()
    productCardConditionTCGPlayerId: number;
    @IsString()
    productLineId: string;
    @IsString()
    productCardConditionName: string;
    @IsString()
    productCardConditionCode: string;
    @IsNumber()
    productCardConditionPriceFactor: number;
    @IsNumber()
    productCardConditionDisplayOrder: number;
    @IsBoolean()
    productCardConditionIsActive: boolean;
}

export class UpdateProductCardConditionDTO {
    @IsString()
    productCardConditionId: string;
    @IsString()
    productCardConditionTCGdbId: string;
    @IsNumber()
    productCardConditionTCGPlayerId: number;
    @IsString()
    productLineId: string;
    @IsString()
    productCardConditionName: string;
    @IsString()
    productCardConditionCode: string;
    @IsNumber()
    productCardConditionPriceFactor: number;
    @IsNumber()
    productCardConditionDisplayOrder: number;
    @IsBoolean()
    productCardConditionIsActive: boolean;
}