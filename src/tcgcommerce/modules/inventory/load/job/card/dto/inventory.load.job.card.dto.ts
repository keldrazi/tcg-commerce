import { IsString } from "class-validator";

export class InventoryLoadJobCardDTO {
    inventoryLoadJobCardId: string;
    commerceAccountId: string;
    commerceLocationId: string;
    commerceLocationName: string;
    commerceUserName: string;
    productVendorId: string;
    productVendorName: string;
    productLineId: string;
    productLineName: string;
    productLineCode: string;
    inventoryLoadJobCardSetCode: string;
    inventoryLoadJobCardDate: Date;
    inventoryLoadJobCardCode: string;
    inventoryLoadJobCardStatus: string;
    inventoryLoadJobCardData: string;
    inventoryLoadJobCardCreateDate: Date;
    inventoryLoadJobCardUpdateDate: Date;  
}

export class CreateInventoryLoadJobCardDTO {
    @IsString()
    commerceAccountId: string;
    @IsString()
    commerceLocationId: string;
    @IsString()
    commerceLocationName: string;
    @IsString()
    commerceUserName: string;
    @IsString()
    productVendorId: string;
    @IsString()
    productVendorName: string;
    @IsString()
    productLineId: string;
    @IsString()
    productLineName: string;
    @IsString()
    productLineCode: string;
    @IsString()
    inventoryLoadJobCardSetCode: string; 
}