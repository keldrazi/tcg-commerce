import { IsString } from "class-validator";

export class ProductCardItemDTO {
    productCardItemId: string;
    commerceAccountId: string;
    productCardItemTCGdbId: string;
    productVendorName: string;
    productTypeName: string;
    productCardItemSetName: string;
    productCardItemSetAbbreviation: string;
    productCardItemNumber: number;
    productCardItemName: string;
    productCardItemCleanName: string;
    productCardItemImage: string;
    productCardItemExtendedData: string;
    productCardItemMetadata: string;
    
}

export class CreateProductCardItemDTO {
    @IsString()
    commerceAccountId: string;
    @IsString()
    productCardItemTCGdbId: string;
    @IsString()
    productVendorName: string;
    @IsString()
    productTypeName: string;
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
    commerceAccountId: string;
    @IsString()
    productCardItemTCGdbId: string;
    @IsString()
    productVendorName: string;
    @IsString()
    productTypeName: string;
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
