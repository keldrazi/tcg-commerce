import { IsBoolean, IsString } from "class-validator";

export class ProductCardItemDTO {
    productCardItemId: string;
    commerceAccountId: string;
    productCardItemTCGdbId: string;
    productVendorId: string;
    productLineId: string;
    productTypeId: string;
    productSetId: string;
    productSetAbbreviation: string;
    productCardRarityAbbreviation: string;
    productCardItemNumber: string;
    productCardItemName: string;
    productCardItemCleanName: string;
    productCardItemImage: string;
    productCardItemIsPresale: boolean;
    productCardItemExtendedData: string;
    productCardItemMetadata: string;
    productCardItemSKUs: string;
    productCardItemIsActive: boolean;
    productCardItemCreateDate: Date;
    productCardItemUpdateDate: Date;
    
}

export class CreateProductCardItemDTO {
    @IsString()
    commerceAccountId: string;
    @IsString()
    productCardItemTCGdbId: string;
    @IsString()
    productVendorId: string;
    @IsString()
    productLineId: string;
    @IsString()
    productTypeId: string;
    @IsString()
    productSetId: string;
    @IsString()
    productSetAbbreviation: string;
    @IsString()
    productCardRarityId: string;
    @IsString()
    productCardRarityAbbreviation: string;
    @IsString()
    productCardItemName: string;
    @IsString()
    productCardItemCleanName: string;
    @IsString()
    productCardItemImage: string;
    @IsBoolean()
    productCardItemIsPresale: boolean;
    @IsString()
    productCardItemExtendedData: string;
    @IsString()
    productCardItemMetadata: string;
    @IsString()
    productCardItemSKUs: string;
    @IsBoolean()
    productCardItemIsActive: boolean;
   
}

export class UpdateProductCardItemDTO {
    @IsString()
    productCardItemId: string;
    @IsString()
    productSetAbbreviation: string;
    @IsString()
    productCardRarityAbbreviation: string;
    @IsString()
    productCardItemNumber: string;
    @IsString()
    productCardItemName: string;
    @IsString()
    productCardItemCleanName: string;
    @IsString()
    productCardItemImage: string;
    @IsBoolean()
    productCardItemIsPresale: boolean;
    @IsString()
    productCardItemExtendedData: string;
    @IsString()
    productCardItemMetadata: string;
    @IsString()
    productCardItemSKUs: string;
    @IsBoolean()
    productCardItemIsActive: boolean;
}
