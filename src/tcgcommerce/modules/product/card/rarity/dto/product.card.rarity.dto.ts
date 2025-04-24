import { IsBoolean, IsString } from "class-validator";

export class ProductCardRarityDTO {
    productCardRarityId: string;
    productLineId: string;
    productCardRarityName: string;
    productCardRarityAbbreviation: string;
    productCardRarityIsActive: boolean;
    productCardRarityCreateDate: Date;
    productCardRarityUpdateDate: Date;
}

export class CreateProductCardRarityDTO {
    @IsString()
    productLineId: string;
    @IsString()
    productCardRarityName: string;
    @IsString()
    productCardRarityAbbreviation: string;
    @IsBoolean()
    productCardRarityIsActive: boolean;
}

export class UpdateProductCardRarityDTO {
    @IsString()
    productCardRarityId: string;
    @IsString()
    productLineId: string;
    @IsString()
    productCardRarityName: string;
    @IsString()
    productCardRarityAbbreviation: string;
    @IsBoolean()
    productCardRarityIsActive: boolean;
}