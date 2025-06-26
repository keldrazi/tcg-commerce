import { IsDate, IsString } from "class-validator";

export class ImportJobDTO {
    importJobId: string;
    commerceAccountId: string;
    productVendorName: string;
    productLineName: string;
    importSortTypeName: string; //ROCA, TCGPlayer
    importJobDate: Date;
    importJobCode: string;
    importJobStatus: string;
    importJobInputFileName: string;
    importJobInputFileOriginalName: string;
    importJobOutputFileName: string;
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
    productVendorName: string;
    @IsString()
    productLineName: string;
    @IsString()
    importSortTypeName: string; //ROCA, TCGPlayer
    @IsDate()
    importJobDate: Date;
    @IsString()
    importJobCode: string;
    @IsString()
    importJobStatus: string;
    @IsString()
    importJobInputFileName: string;
    @IsString()
    importJobInputFileOriginalName: string;
    @IsString()
    importJobSortData: string; //CARD DATA;
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