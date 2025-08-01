
import { IsDecimal, IsNumber, IsString } from "class-validator";

export class ImportProductCardDTO {
    importProductCardId: string;
    importJobCardId: string;
    importProductCardTCGdbId: string;
    importProductCardName: string;
    importProductCardSetName: string;
    importProductCardSetCode: string;
    importProductCardCondition: string;
    importProductCardPrinting: string;
    importProductCardQty: number;
    importProductCardPrice: number;
    importProductCardCreateDate: Date;
    importProductCardUpdateDate: Date;
}

export class CreateImportProductCardDTO {
    @IsString()
    importJobCardId: string;
    @IsString()
    importProductCardTCGDBId: string;
    @IsString()
    importProductCardName: string;
    @IsString()
    importProductCardSetName: string;
    @IsString()
    importProductCardSetCode: string;
    @IsString()
    importProductCardCondition: string;
    @IsString()
    importProductCardPrinting: string;
    @IsNumber()
    importProductCardQty: number;  
    @IsDecimal()
    importProductCardPrice: number;

}
