import { IsString, IsBoolean } from "class-validator";
import { ReportPriceChangeYearlyDefaultSettings, ReportPriceChangeYearlyCategory } from '../interface/report.price.change.yearly.interface';

export class ReportPriceChangeYearlyDTO {
    reportPriceChangeYearlyId: string;
    productVendorId: string;
    productLineId: string;
    productTypeId: string;
    reportTypeId: string;
    reportPriceChangeYearlyName: string;
    reportPriceChangeYearlyDescription: string;
    reportPriceChangeYearlyCategories: ReportPriceChangeYearlyCategory[];
    reportPriceChangeYearlyDefaultSettings: ReportPriceChangeYearlyDefaultSettings;
    reportPriceChangeYearlyIsActive: boolean;
    reportPriceChangeYearlyCreateDate: Date;
    reportPriceChangeYearlyUpdateDate: Date;
    
}

export class CreateReportPriceChangeYearlyDTO {
    @IsString()
    productVendorId: string;
    @IsString()
    productLineId: string;
    @IsString()
    productTypeId: string;
    @IsString()
    reportTypeId: string;
    @IsString()
    reportPriceChangeYearlyName: string;
    @IsString()
    reportPriceChangeYearlyDescription: string;
    @IsString()
    reportPriceChangeYearlyCategories: string;
    @IsString()
    reportPriceChangeYearlyDefaultSettings: string;
    @IsBoolean()
    reportPriceChangeYearlyIsActive: boolean;
}

export class UpdateReportPriceChangeYearlyDTO {
    @IsString()
    reportPriceChangeYearlyId: string
    @IsString()
    productVendorId: string;
    @IsString()
    productLineId: string;
    @IsString()
    productTypeId: string;
    @IsString()
    reportTypeId: string;
    @IsString()
    reportPriceChangeYearlyName: string;
    @IsString()
    reportPriceChangeYearlyDescription: string;
    @IsString()
    reportPriceChangeYearlyCategories: string;
    @IsString()
    reportPriceChangeYearlyDefaultSettings: string;
    @IsBoolean()
    reportPriceChangeYearlyIsActive: boolean;
}