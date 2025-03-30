import { IsBoolean, IsDecimal, IsEmail, IsNumber, IsString } from "class-validator";

export class ProductCardInventorysDTO {
    commerceAccountId: string;
    productCardItemId: string;
    productCardInventoryDTOs: ProductCardInventoryDTO[];
}

export class ProductCardInventoryDTO {
    productCardInventoryId: string;
    commerceAccountId: string;
    commerceLocationId: string;
    productCardItemId: string;
    productCardOption: string;
    productCardVariant: string;
    productCardInventoryQty: number;
    productCardInventoryMaxQty: number;
    productCardInventoryReserveQty: number;
    productCardInventoryPrice: number;
    productCardInventoryOverridePriceEnabled: boolean;
    productCardInventoryOverridePrice: number;
    productCardInventoryMetadata: string;
    productCardInventoryUpdateDate: Date; 
    
}

export class CreateProductCardInventorysDTO {
    commerceAccountId: string;
    productCardItemId: string;
    createProductCardInventoryDTOs: CreateProductCardInventoryDTO[];
}

export class CreateProductCardInventoryDTO {
    @IsString()
    commerceAccountId: string;
    @IsString()
    commerceLocationId: string;
    @IsString()
    productCardItemId: string;
    @IsString()
    productCardOption: string;
    @IsString()
    productCardVariant: string;
    @IsNumber()
    productCardInventoryQty: number;
    @IsNumber()
    productCardInventoryMaxQty: number;
    @IsNumber()
    productCardInventoryReserveQty: number;
    @IsDecimal()
    productCardInventoryPrice: number;
    @IsBoolean()
    productCardInventoryOverridePriceEnabled: boolean;
    @IsNumber()
    productCardInventoryOverridePrice: number;
    @IsString()
    productCardInventoryMetadata: string;
   
}

export class UpdateProductCardInventorysDTO {
    commerceAccountId: string;
    productCardItemId: string;
    updateProductCardInventoryDTOs: UpdateProductCardInventoryDTO[];
}

export class UpdateProductCardInventoryDTO {
    @IsString()
    productCardInventoryId: string;
    @IsString()
    commerceLocationId: string;
    @IsNumber()
    productCardInventoryQty: number;
    @IsNumber()
    productCardInventoryMaxQty: number;
    @IsNumber()
    productCardInventoryReserveQty: number;
    @IsDecimal()
    productCardInventoryPrice: number;
    @IsBoolean()
    productCardInventoryOverridePriceEnabled: boolean;
    @IsNumber()
    productCardInventoryOverridePrice: number;
    @IsString()
    productCardInventoryMetadata: string;
}