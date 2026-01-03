import { IsString, IsBoolean } from "class-validator";
import { ReportPriceHistoryDefaultSettings, ReportPriceHistoryCategory } from '../interface/report.price.history.interface';

export class ReportPriceHistoryDTO {
    reportPriceHistoryId: string;
    productVendorId: string;
    productLineId: string;
    productTypeId: string;
    reportTypeId: string;
    reportPriceHistoryName: string;
    reportPriceHistoryDescription: string;
    reportPriceHistoryCategories: ReportPriceHistoryCategory[];
    reportPriceHistoryDefaultSettings: ReportPriceHistoryDefaultSettings;
    reportPriceHistoryIsActive: boolean;
    reportPriceHistoryCreateDate: Date;
    reportPriceHistoryUpdateDate: Date;
}

export class CreateReportPriceHistoryDTO {
    @IsString()
    productVendorId: string;
    @IsString()
    productLineId: string;
    @IsString()
    productTypeId: string;
    @IsString()
    reportTypeId: string;
    @IsString()
    reportPriceHistoryName: string;
    @IsString()
    reportPriceHistoryDescription: string;
    @IsString()
    reportPriceHistoryCategories: string;
    @IsString()
    reportPriceHistoryDefaultSettings: string;
    @IsBoolean()
    reportPriceHistoryIsActive: boolean;
}

export class UpdateReportPriceHistoryDTO {
    @IsString()
    reportPriceHistoryId: string;
    @IsString()
    productVendorId: string;
    @IsString()
    productLineId: string;
    @IsString()
    productTypeId: string;
    @IsString()
    reportTypeId: string;
    @IsString()
    reportPriceHistoryName: string;
    @IsString()
    reportPriceHistoryDescription: string;
    @IsString()
    reportPriceHistoryCategories: string; 
    @IsString()
    reportPriceHistoryDefaultSettings: string; 
    @IsBoolean()
    reportPriceHistoryIsActive: boolean; 
}