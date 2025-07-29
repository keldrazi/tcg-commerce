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
    productLineAbbreviation: string;
    inventoryLoadJobCardSetCode: string;
    inventoryLoadJobCardDate: Date;
    inventoryLoadJobCardCode: string;
    inventoryLoadJobCardStatus: string;
    inventoryLoadJobCardData: string;
    inventoryLoadJobCardCreateDate: Date;
    inventoryLoadJobCardUpdateDate: Date;  
}

export class CreateInventoryLoadCardJobDTO {
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
    productLineAbbreviation: string;
    @IsString()
    inventoryLoadJobCardSetCode: string; 
}