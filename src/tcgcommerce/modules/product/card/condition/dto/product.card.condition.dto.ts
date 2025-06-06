import { IsBoolean, IsNumber, IsString } from "class-validator";

export class ProductCardConditionDTO {
    productCardConditionId: string;
    productCardConditionTCGPlayerId: number;
    productLineId: string;
    productCardConditionName: string;
    productCardConditionAbbreviation: string;
    productCardConditionPriceFactor: number;
    productCardConditionDisplayOrder: number;
    productCardConditionIsActive: boolean;
    productCardConditionCreateDate: Date;
    productCardConditionUpdateDate: Date;
}

export class CreateProductCardConditionDTO {
    @IsNumber()
    productCardConditionTCGPlayerId: number;
    @IsString()
    productLineId: string;
    @IsString()
    productCardConditionName: string;
    @IsString()
    productCardConditionAbbreviation: string;
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
    @IsNumber()
    productCardConditionTCGPlayerId: number;
    @IsString()
    productLineId: string;
    @IsString()
    productCardConditionName: string;
    @IsString()
    productCardConditionAbbreviation: string;
    @IsNumber()
    productCardConditionPriceFactor: number;
    @IsNumber()
    productCardConditionDisplayOrder: number;
    @IsBoolean()
    productCardConditionIsActive: boolean;
}