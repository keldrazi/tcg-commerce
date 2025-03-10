import { IsString } from "class-validator";

export class ProductCardItemDTO {
    productCardItemId: string;
    commerceAccountId: string;
    productCardItemTCGdbId: string;
    productVendorName: string;
    productTypeName: string;
    productCardItemSetAbbreviation: string;
    productCardItemName: string;
    productCardItemCleanName: string;
    productCardItemImage: string;
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
    productCardItemSetAbbreviation: string;
    @IsString()
    productCardItemName: string;
    @IsString()
    productCardItemCleanName: string;
    @IsString()
    productCardItemImage: string;
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
    productCardItemSetAbbreviation: string;
    @IsString()
    productCardItemName: string;
    @IsString()
    productCardItemCleanName: string;
    @IsString()
    productCardItemImage: string;
    @IsString()
    productCardItemMetadata: string;
}
