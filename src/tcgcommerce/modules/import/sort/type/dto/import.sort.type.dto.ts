import { IsEmail, IsString, IsBoolean } from "class-validator";

export class ImportSortTypeDTO {
    importSortTypeId: string;
    importSortTypeName: string;
    importSortTypeDescription: string;
    importSortTypeMetadata: string;
    importSortTypeIsActive: boolean;
    importSortTypeCreateDate: Date;
    importSortTypeUpdateDate: Date;

    
}

export class CreateImportSortTypeDTO {
    @IsString()
    importSortTypeName: string;
    @IsString()
    importSortTypeDescription: string;
    @IsString()
    importSortTypeMetadata: string;
   
    
}

export class UpdateImportSortTypeDTO {
    @IsString()
    importSortTypeId: string;
    @IsString()
    importSortTypeName: string;
    @IsString()
    importSortTypeDescription: string;
    @IsString()
    importSortTypeMetadata: string;
    @IsBoolean()
    importSortTypeIsActive: boolean;
    
}