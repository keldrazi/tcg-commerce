import { IsString } from "class-validator";

export class ImportJobCardDTO {
    importJobCardId: string;
    commerceAccountId: string;
    commerceLocationId: string;
    commerceLocationName: string;
    commerceUserName: string;
    productVendorId: string;
    productVendorName: string;
    productLineId: string;
    productLineName: string;
    productLineCode: string;
    importSortCardTypeName: string; //ROCA, TCGPlayer
    importJobCardDate: Date;
    importJobCardCode: string;
    importJobCardStatus: string;
    importJobCardInputFileURL: string;
    importJobCardInputFileOriginalName: string;
    importJobCardOutputFileURL: string;
    importJobCardSortData: string; //CARD DATA;
    importJobCardMetadata: string;
    importJobCardIsPublished: boolean;
    importJobCardCreateDate: Date;
    importJobCardUpdateDate: Date;  
}

export class CreateImportJobCardDTO {
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
    importSortCardTypeName: string; //ROCA, TCGPlayer
    @IsString()
    importJobCardMetadata: string;  
}