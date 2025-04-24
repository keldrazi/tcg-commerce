import { IsBoolean, IsNumber, IsString } from "class-validator";

export class ProductCardConditionDTO {
    productCardConditionId: string;
    productLineId: string;
    productCardConditionName: string;
    productCardConditionAbbreviation: string;
    productCardConditionDisplayOrder: number;
    productCardConditionIsActive: boolean;
    productCardConditionCreateDate: Date;
    productCardConditionUpdateDate: Date;
}

export class CreateProductCardConditionDTO {
    @IsString()
    productLineId: string;
    @IsString()
    productCardConditionName: string;
    @IsString()
    productCardConditionAbbreviation: string;
    @IsNumber()
    productCardConditionDisplayOrder: number;
    @IsBoolean()
    productCardConditionIsActive: boolean;
}

export class UpdateProductCardConditionDTO {
    @IsString()
    productCardConditionId: string;
    @IsString()
    productLineId: string;
    @IsString()
    productCardConditionName: string;
    @IsString()
    productCardConditionAbbreviation: string;
    @IsNumber()
    productCardConditionDisplayOrder: number;
    @IsBoolean()
    productCardConditionIsActive: boolean;
}