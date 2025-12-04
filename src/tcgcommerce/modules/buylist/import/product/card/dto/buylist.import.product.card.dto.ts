import { IsString } from "class-validator";

export class BuylistImportProductCardDTO {
    buylistImportProductCardId: string;
    buylistProductCardId: string;
    buylistImportProductCardProviderTypeId: string;
    buylistImportProductCardProviderTypeCode: string;
    buylistImportProductCardProviderTypeName: string;
    buylistImportProductCardFileURL: string;
    buylistImportProductCardFileOriginalName: string;
    buylistImportProductCardDate: Date;
    buylistImportProductCardCode: string;
    buylistImportProductCardStatus: string;
    buylistImportProductCardCount: number;
    buylistImportProductCardQtyCount: number; 
    buylistImportProductCardCreateDate: Date;
    buylistImportProductCardUpdateDate: Date; 
}

export class CreateBuylistImportProductCardDTO {
    @IsString()
    buylistProductCardId: string;
    @IsString()
    buylistImportProductCardProviderTypeId: string;
    @IsString()
    buylistImportProductCardProviderTypeCode: string;
    @IsString()
    buylistImportProductCardProviderTypeName: string;
}


 