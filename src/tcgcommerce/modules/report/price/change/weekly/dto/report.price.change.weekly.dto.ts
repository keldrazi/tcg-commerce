import { IsString, IsBoolean } from "class-validator";
import { ReportPriceChangeWeeklyDefaultSettings, ReportPriceChangeWeeklyCategory } from '../interface/report.price.change.weekly.interface';

export class ReportPriceChangeWeeklyDTO {
    reportPriceChangeWeeklyId: string;
    productVendorId: string;
    productLineId: string;
    productTypeId: string;
    reportTypeId: string;
    reportPriceChangeWeeklyName: string;
    reportPriceChangeWeeklyDescription: string;
    reportPriceChangeWeeklyCategories: ReportPriceChangeWeeklyCategory[];
    reportPriceChangeWeeklyDefaultSettings: ReportPriceChangeWeeklyDefaultSettings;
    reportPriceChangeWeeklyIsActive: boolean;
    reportPriceChangeWeeklyCreateDate: Date;
    reportPriceChangeWeeklyUpdateDate: Date;
    
}

export class CreateReportPriceChangeWeeklyDTO {
    @IsString()
    productVendorId: string;
    @IsString()
    productLineId: string;
    @IsString()
    productTypeId: string;
    @IsString()
    reportTypeId: string;
    @IsString()
    reportPriceChangeWeeklyName: string;
    @IsString()
    reportPriceChangeWeeklyDescription: string;
    @IsString()
    reportPriceChangeWeeklyCategories: string;
    @IsString()
    reportPriceChangeWeeklyDefaultSettings: string;
    @IsBoolean()
    reportPriceChangeWeeklyIsActive: boolean;
}

export class UpdateReportPriceChangeWeeklyDTO {
    @IsString()
    reportPriceChangeWeeklyId: string
    @IsString()
    productVendorId: string;
    @IsString()
    productLineId: string;
    @IsString()
    productTypeId: string;
    @IsString()
    reportTypeId: string;
    @IsString()
    reportPriceChangeWeeklyName: string;
    @IsString()
    reportPriceChangeWeeklyDescription: string;
    @IsString()
    reportPriceChangeWeeklyCategories: string;
    @IsString()
    reportPriceChangeWeeklyDefaultSettings: string;
    @IsBoolean()
    reportPriceChangeWeeklyIsActive: boolean;
}