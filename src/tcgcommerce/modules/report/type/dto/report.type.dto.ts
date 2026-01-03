import { IsString, IsBoolean } from "class-validator";

export class ReportTypeDTO {
    reportTypeId: string;
    reportTypeCode: string;
    reportTypeIsActive: boolean;
    reportTypeCreateDate: Date;
    reportTypeUpdateDate: Date; 
}

export class CreateReportTypeDTO {
    @IsString()
    reportTypeName: string;
    @IsString()
    reportTypeCode: string;
    @IsBoolean()
    reportTypeIsActive: boolean;
}

export class UpdateReportTypeDTO {
    @IsString()
    reportTypeId: string;
    @IsString()
    reportTypeName: string;
    @IsString()
    reportTypeCode: string;
    @IsBoolean()
    reportTypeIsActive: boolean;   
}