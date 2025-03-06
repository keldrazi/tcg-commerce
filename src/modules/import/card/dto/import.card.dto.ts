
import { IsDecimal, IsNumber, IsString } from "class-validator";

export class ImportCardDTO {
    importCardId: string;
    importJobId: string;
    importCardTCGDBId: string;
    importCardStatus: string;
    importCardName: string;
    importCardSetName: string;
    importCardCondition: string;
    importCardPrinting: string;
    importCardQty: number;
    importCardPrice: number;
    importCardCreateDate: Date;
    importCardUpdateDate: Date;
}

export class CreateImportCardDTO {
    @IsString()
    importJobId: string;
    @IsString()
    importCardTCGDBId: string;
    @IsString()
    importCardStatus: string;
    @IsString()
    importCardName: string;
    @IsString()
    importCardSetName: string;
    @IsString()
    importCardCondition: string;
    @IsString()
    importCardPrinting: string;
    @IsNumber()
    importCardQty: number;  
    @IsDecimal()
    importCardPrice: number;

}

export class UpdateImportCardDTO {
    @IsString()
    importCardId: string;
    @IsString()
    importCardStatus: string;
    @IsNumber()
    importCardQty: number;  
    @IsDecimal()
    importCardPrice: number;
}
