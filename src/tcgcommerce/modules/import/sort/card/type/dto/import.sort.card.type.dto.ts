import { IsEmail, IsString, IsBoolean } from "class-validator";

export class ImportSortCardTypeDTO {
    importSortCardTypeId: string;
    importSortCardTypeName: string;
    importSortCardTypeDescription: string;
    importSortCardTypeMetadata: string;
    importSortCardTypeIsActive: boolean;
    importSortCardTypeCreateDate: Date;
    importSortCardTypeUpdateDate: Date;

    
}

export class CreateImportSortCardTypeDTO {
    @IsString()
    importSortCardTypeName: string;
    @IsString()
    importSortCardTypeDescription: string;
    @IsString()
    importSortCardTypeMetadata: string;
   
    
}

export class UpdateImportSortCardTypeDTO {
    @IsString()
    importSortCardTypeId: string;
    @IsString()
    importSortCardTypeName: string;
    @IsString()
    importSortCardTypeDescription: string;
    @IsString()
    importSortCardTypeMetadata: string;
    @IsBoolean()
    importSortCardTypeIsActive: boolean;
    
}