import { IsBoolean, IsNumber, IsString } from "class-validator";

export class ProductCardRarityDTO {
    productCardRarityId: string;
    productCardRarityTCGdbId: string;
    productCardRarityTCGPlayerId: number;
    productVendorId: string;
    productLineId: string;
    productCardRarityName: string;
    productCardRarityCode: string;
    productCardRarityIsActive: boolean;
    productCardRarityCreateDate: Date;
    productCardRarityUpdateDate: Date;
}

export class CreateProductCardRarityDTO {
    @IsString()
    productCardRarityTCGdbId: string;
    @IsNumber()
    productCardRarityTCGPlayerId: number;
    @IsString()
    productVendorId: string;
    @IsString()
    productLineId: string;
    @IsString()
    productCardRarityName: string;
    @IsString()
    productCardRarityCode: string;
    @IsBoolean()
    productCardRarityIsActive: boolean;
}

export class UpdateProductCardRarityDTO {
    @IsString()
    productCardRarityId: string;
    @IsString()
    productVendorId: string;
    @IsString()
    productLineId: string;
    @IsString()
    productCardRarityName: string;
    @IsString()
    productCardRarityCode: string;
    @IsBoolean()
    productCardRarityIsActive: boolean;
}