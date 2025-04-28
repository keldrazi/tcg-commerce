import { IsBoolean, IsDecimal, IsEmail, IsNumber, IsString } from "class-validator";

export class InventoryProductCardsDTO {
    commerceAccountId: string;
    productCardItemId: string;
    inventoryProductCardDTOs: InventoryProductCardDTO[];
}

export class InventoryProductCardDTO {
    inventoryProductCardId: string;
    commerceAccountId: string;
    commerceLocationId: string;
    productCardItemId: string;
    productCardPrintingName: string;
    productCardConditionAbbreviation: string;
    productCardLanguageAbbreviation: string;
    inventoryProductCardSKU: string;
    inventoryProductCardBarcode: string;
    inventoryProductCardQty: number;
    inventoryProductCardMaxQty: number;
    inventoryProductCardReserveQty: number;
    inventoryProductCardPrice: number;
    inventoryProductCardOverridePriceEnabled: boolean;
    inventoryProductCardOverridePrice: number;
    inventoryProductCardMetadata: string;
    inventoryProductCardCreateDate: Date;
    inventoryProductCardUpdateDate: Date; 
    
}

export class CreateInventoryProductCardsDTO {
    commerceAccountId: string;
    productCardItemId: string;
    createInventoryProductCardDTOs: CreateInventoryProductCardDTO[];
}

export class CreateInventoryProductCardDTO {
    @IsString()
    commerceAccountId: string;
    @IsString()
    commerceLocationId: string;
    @IsString()
    productCardItemId: string;
    @IsString()
    productCardPrintingName: string;
    @IsString()
    productCardConditionAbbreviation: string;
    @IsString()
    productCardLanguageAbbreviation: string;
    @IsNumber()
    inventoryProductCardQty: number;
    @IsNumber()
    inventoryProductCardMaxQty: number;
    @IsNumber()
    inventoryProductCardReserveQty: number;
    @IsDecimal()
    inventoryProductCardPrice: number;
    @IsBoolean()
    inventoryProductCardOverridePriceEnabled: boolean;
    @IsNumber()
    inventoryProductCardOverridePrice: number;
    @IsString()
    inventoryProductCardMetadata: string;
   
}

export class UpdateInventoryProductCardsDTO {
    commerceAccountId: string;
    productCardItemId: string;
    updateInventoryProductCardDTOs: UpdateInventoryProductCardDTO[];
}

export class UpdateInventoryProductCardDTO {
    @IsString()
    productCardInventoryId: string;
    @IsString()
    commerceLocationId: string;
    @IsNumber()
    inventoryProductCardQty: number;
    @IsNumber()
    inventoryProductCardMaxQty: number;
    @IsNumber()
    inventoryProductCardReserveQty: number;
    @IsDecimal()
    inventoryProductCardPrice: number;
    @IsBoolean()
    inventoryProductCardOverridePriceEnabled: boolean;
    @IsNumber()
    inventoryProductCardOverridePrice: number;
    @IsString()
    inventoryProductCardMetadata: string;
   
}