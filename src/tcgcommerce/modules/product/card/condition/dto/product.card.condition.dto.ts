import { IsBoolean, IsNumber, IsString } from "class-validator";

export class ProductCardConditionDTO {
    productCardConditionId: string;
    productCardConditionName: string;
    productCardConditionAbbreviation: string;
    productCardConditionDisplayOrder: number;
    productCardConditionIsActive: boolean;
    productCardConditionCreateDate: Date;
    productCardConditionUpdateDate: Date;
}

export class CreateProductCardConditionDTO {
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
    productCardConditionName: string;
    @IsString()
    productCardConditionAbbreviation: string;
    @IsNumber()
    productCardConditionDisplayOrder: number;
    @IsBoolean()
    productCardConditionIsActive: boolean;
}