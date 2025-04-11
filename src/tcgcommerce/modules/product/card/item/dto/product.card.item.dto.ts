import { IsBoolean, IsString } from "class-validator";

export class ProductCardItemDTO {
    productCardItemId: string;
    commerceAccountId: string;
    productCardItemTCGdbId: string;
    productVendorId: string;
    productLineId: string;
    productTypeId: string;
    productCardItemSetName: string;
    productCardItemSetAbbreviation: string;
    productCardItemNumber: number;
    productCardItemName: string;
    productCardItemCleanName: string;
    productCardItemImage: string;
    productCardItemExtendedData: string;
    productCardItemMetadata: string;
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
    productCardItemSetName: string;
    @IsString()
    productCardItemSetAbbreviation: string;
    @IsString()
    productCardItemNumber: number;
    @IsString()
    productCardItemName: string;
    @IsString()
    productCardItemCleanName: string;
    @IsString()
    productCardItemImage: string;
    @IsString()
    productCardItemExtendedData: string;
    @IsString()
    productCardItemMetadata: string;
   
}

export class UpdateProductCardItemDTO {
    @IsString()
    productCardItemId: string;
    @IsString()
    productCardItemSetName: string;
    @IsString()
    productCardItemSetAbbreviation: string;
    @IsString()
    productCardItemNumber: number;
    @IsString()
    productCardItemName: string;
    @IsString()
    productCardItemCleanName: string;
    @IsString()
    productCardItemImage: string;
    @IsString()
    productCardItemExtendedData: string;
    @IsString()
    productCardItemMetadata: string;
    @IsBoolean()
    productCardItemIsActive: boolean;
}
