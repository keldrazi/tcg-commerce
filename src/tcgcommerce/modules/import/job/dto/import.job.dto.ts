import { IsString } from "class-validator";

export class ImportJobDTO {
    importJobId: string;
    commerceAccountId: string;
    commerceLocationName: string;
    commerceUserName: string;
    productVendorName: string;
    productLineName: string;
    productLineAbbreviation: string;
    importSortTypeName: string; //ROCA, TCGPlayer
    importJobDate: Date;
    importJobCode: string;
    importJobStatus: string;
    importJobInputFileURL: string;
    importJobInputFileOriginalName: string;
    importJobOutputFileURL: string;
    importJobSortData: string; //CARD DATA;
    importJobMetadata: string;
    importJobIsPublished: boolean;
    importJobCreateDate: Date;
    importJobUpdateDate: Date;  
}


export class CreateImportJobDTO {
    @IsString()
    commerceAccountId: string;
    @IsString()
    commerceLocationName: string;
    @IsString()
    commerceUserName: string;
    @IsString()
    productVendorName: string;
    @IsString()
    productLineName: string;
    @IsString()
    productLineAbbreviation: string;
    @IsString()
    importSortTypeName: string; //ROCA, TCGPlayer
    @IsString()
    importJobMetadata: string;  
}

export class UpdateImportJobDTO {
    @IsString()
    commerceAccountId: string;
    @IsString()
    importJobId: string;
    @IsString()
    importJobStatus: string;
    
}