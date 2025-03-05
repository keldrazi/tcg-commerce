import { IsDate, IsEmail, IsString } from "class-validator";

export class ImportJobsDTO {
    commerceAccountId: string;
    importJobDTOs: ImportJobDTO[];
}

export class ImportJobDTO {
    importJobId: string;
    commerceAccountId: string;
    importJobDate: Date;
    importJobStatus: string;
    importJobCode: string;
    importJobType: string;
    importJobSortType: string;
    importJobInputFileName: string;
    importJobInputFileOriginalName: string;
    importJobOutputFileName: string;
    importJobMetadata: string;
    importJobIsPublished: boolean;
    importJobCreateDate: Date;
    importJobUpdateDate: Date;  
}

export class CreateImportJobDTO {
    @IsString()
    commerceAccountId: string;
    @IsDate()
    importJobDate: Date;
    @IsString()
    importJobStatus: string;
    @IsString()
    importJobCode: string;
    @IsString()
    importJobSortType: string;
    @IsString()
    importJobInputFileName: string;
    @IsString()
    importJobInputFileOriginalName: string;
    @IsString()
    importJobOutputFileName: string;
    @IsString()
    importJobMetadata: string;  
}

export class UpdateImportJobDTO {
    @IsString()
    importJobId: string;
    @IsString()
    commerceAccountId: string;
    @IsString()
    importJobStatus: string;
    @IsString()
    importJobOutputFileName: string;
    @IsString()
    importJobMetadata: string;   
}