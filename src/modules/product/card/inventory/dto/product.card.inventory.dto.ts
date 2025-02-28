import { IsDecimal, IsEmail, IsNumber, IsString } from "class-validator";

export class ProductCardInventorysDTO {
    commerceAccountId: string;
    productCardItemId: string;
    productCardInventoryDTOs: ProductCardInventoryDTO[];
}

export class ProductCardInventoryDTO {
    productCardInventoryId: string;
    commerceAccountId: string;
    productCardItemId: string;
    productCardOption: string;
    productCardVariant: string;
    productCardInventoryQty: number;
    productCardInventoryPrice: number;
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
    productCardItemId: string;
    @IsString()
    productCardOption: string;
    @IsString()
    productCardVariant: string;
    @IsNumber()
    productCardInventoryQty: number;
    @IsDecimal()
    productCardInventoryPrice: number;
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
    @IsNumber()
    productCardInventoryQty: number;
    @IsDecimal()
    productCardInventoryPrice: number;
    @IsString()
    productCardInventoryMetadata: string;
}