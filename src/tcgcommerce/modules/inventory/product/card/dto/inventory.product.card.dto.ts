import { IsBoolean, IsDecimal, IsEmail, IsNumber, IsString } from 'class-validator';
import { InventoryProductCardItems } from 'src/tcgcommerce/modules/inventory/product/card/interface/inventory.product.card.items.interface';
import { ProductCardDTO } from 'src/tcgcommerce/modules/product/card/dto/product.card.dto';
import { CommerceLocation } from 'src/typeorm/entities/tcgcommerce/modules/commerce/location/commerce.location.entity';

export class InventoryProductCardsDTO {
    commerceAccountId: string;
    commerceLocationDTO: CommerceLocation
    productCardDTO: ProductCardDTO;
    productCardLanguageCode: string;
    inventoryProductCardDTOs: InventoryProductCardDTO[];
}

export class InventoryProductCardDTO {
    inventoryProductCardId: string;
    productCardId: string;
    commerceAccountId: string;
    commerceLocationId: string;
    productVendorId: string;
    productLineId: string;
    productSetId: string;
    productSetCode: string;
    productCardLanguageCode: string;
    productCardPrintingName: string;
    inventoryProductCardItems: InventoryProductCardItems;
    inventoryProductCardCreateDate: Date;
    inventoryProductCardUpdateDate: Date; 
    
}

export class CreateInventoryProductCardsDTO {
    commerceAccountId: string;
    productCardDTO: ProductCardDTO;
    productCardLanguageCode: string;
    createInventoryProductCardDTOs: CreateInventoryProductCardDTO[];
}

export class CreateInventoryProductCardDTO {
    @IsString()
    productCardId: string;
    @IsString()
    commerceAccountId: string;
    @IsString()
    commerceLocationId: string;
    @IsString()
    productVendorId: string;
    @IsString()
    productLineId: string;
    @IsString()
    productSetId: string;
    @IsString()
    productSetCode: string;
    @IsString()
    productCardLanguageCode: string;
    @IsString()
    productCardPrintingName: string;
    @IsString()
    inventoryProductCardItems: InventoryProductCardItems;
   
}

export class UpdateInventoryProductCardsDTO {
    commerceAccountId: string;
    productCardDTO: ProductCardDTO;
    productCardLanguageCode: string;
    updateInventoryProductCardDTOs: UpdateInventoryProductCardDTO[];
}

export class UpdateInventoryProductCardDTO {
    @IsString()
    inventoryProductCardId: string;
    @IsString()
    productCardId: string;
    @IsString()
    commerceAccountId: string;
    @IsString()
    commerceLocationId: string;
    @IsString()
    productVendorId: string;
    @IsString()
    productLineId: string;
    @IsString()
    productSetId: string;
    @IsString()
    productSetCode: string;
    @IsString()
    productCardLanguageCode: string;
    @IsString()
    productCardPrintingName: string;
    @IsString()
    inventoryProductCardItems: InventoryProductCardItems;
   
}