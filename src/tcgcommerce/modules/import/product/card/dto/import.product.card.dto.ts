
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
    importProductCardPriceLow: number;
    importProductCardPriceMarket: number;
    importProductCardCreateDate: Date;
    importProductCardUpdateDate: Date;
}

export class CreateImportProductCardDTO {
    @IsString()
    importJobCardId: string;
    @IsString()
    importProductCardTCGdbId: string;
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
    importProductCardPriceLow: number;
    @IsDecimal()
    importProductCardPriceMarket: number;

}
