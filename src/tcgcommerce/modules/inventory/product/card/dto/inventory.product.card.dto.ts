import { IsBoolean, IsDecimal, IsEmail, IsNumber, IsString } from "class-validator";

export class InventoryProductCardsDTO {
    commerceAccountId: string;
    productCardId: string;
    inventoryProductCardDTOs: InventoryProductCardDTO[];
}

export class InventoryProductCardDTO {
    inventoryProductCardId: string;
    productVendorId: string;
    productLineId: string;
    commerceAccountId: string;
    commerceLocationId: string;
    productCardId: string;
    productSetCode: string;
    productCardPrintingName: string;
    productCardConditionCode: string;
    productCardLanguageCode: string;
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
    productCardId: string;
    createInventoryProductCardDTOs: CreateInventoryProductCardDTO[];
}

export class CreateInventoryProductCardDTO {
    @IsString()
    commerceAccountId: string;
    @IsString()
    productVendorId: string;
    @IsString()
    productLineId: string;
    @IsString()
    commerceLocationId: string;
    @IsString()
    productCardId: string;
    @IsString()
    productSetCode: string;
    @IsString()
    productCardPrintingName: string;
    @IsString()
    productCardConditionCode: string;
    @IsString()
    productCardLanguageCode: string;
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
    productCardId: string;
    updateInventoryProductCardDTOs: UpdateInventoryProductCardDTO[];
}

export class UpdateInventoryProductCardDTO {
    @IsString()
    inventoryProductCardId: string;
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