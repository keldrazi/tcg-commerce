import { IsString, IsBoolean } from "class-validator";

export class ReportPriceHistoryDTO {
    reportPriceHistoryId: string;
    reportTypeId: string;
    productVendorId: string;
    productLineId: string;
    productTypeId: string;
    reportPriceHistoryName: string;
    reportPriceHistoryDescription: string;
    reportPriceHistoryCategories: string;
    reportPriceHistorySettings: string;
    reportPriceHistoryCreateDate: Date;
    reportPriceHistoryUpdateDate: Date;
}

export class CreateReportPriceHistoryDTO {
    @IsString()
    reportTypeId: string;
    @IsString()
    productVendorId: string;
    @IsString()
    productLineId: string;
    @IsString()
    productTypeId: string;
    @IsString()
    reportPriceHistoryName: string;
    @IsString()
    reportPriceHistoryDescription: string;
    @IsString()
    reportPriceHistoryCategories: string;
    @IsString()
    reportPriceHistorySettings: string;
}

export class UpdateReportPriceHistoryDTO {
    @IsString()
    reportPriceHistoryId: string;
    @IsString()
    reportTypeId: string;
    @IsString()
    productVendorId: string;
    @IsString()
    productLineId: string;
    @IsString()
    productTypeId: string;
    @IsString()
    reportPriceHistoryName: string;
    @IsString()
    reportPriceHistoryDescription: string;
    @IsString()
    reportPriceHistoryCategories: string; 
    @IsString()
    reportPriceHistorySettings: string;  
}