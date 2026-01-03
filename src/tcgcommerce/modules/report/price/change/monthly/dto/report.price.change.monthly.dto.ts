import { IsBoolean, IsString } from "class-validator";
import { ReportPriceChangeMonthlyDefaultSettings, ReportPriceChangeMonthlyCategory } from '../interface/report.price.change.monthly.interface';


export class ReportPriceChangeMonthlyDTO {
    reportPriceChangeMonthlyId: string;
    productVendorId: string;
    productLineId: string;
    productTypeId: string;
    reportTypeId: string;
    reportPriceChangeMonthlyName: string;
    reportPriceChangeMonthlyDescription: string;
    reportPriceChangeMonthlyCategories: ReportPriceChangeMonthlyCategory[];
    reportPriceChangeMonthlyDefaultSettings: ReportPriceChangeMonthlyDefaultSettings;
    reportPriceChangeMonthlyIsActive: boolean;
    reportPriceChangeMonthlyCreateDate: Date;
    reportPriceChangeMonthlyUpdateDate: Date;
}

export class CreateReportPriceChangeMonthlyDTO {
    @IsString()
    productVendorId: string;
    @IsString()
    productLineId: string;
    @IsString()
    productTypeId: string;
    @IsString()
    reportTypeId: string;
    @IsString()
    reportPriceChangeMonthlyName: string;
    @IsString()
    reportPriceChangeMonthlyDescription: string;
    @IsString()
    reportPriceChangeMonthlyCategories: string;
    @IsString()
    reportPriceChangeMonthlyDefaultSettings: string;
    @IsBoolean()
    reportPriceChangeMonthlyIsActive: boolean;
}

export class UpdateReportPriceChangeMonthlyDTO {
    @IsString()
    reportPriceChangeMonthlyId: string;
    @IsString()
    productVendorId: string;
    @IsString()
    productLineId: string;
    @IsString()
    productTypeId: string;
    @IsString()
    reportTypeId: string;
    @IsString()
    reportPriceChangeMonthlyName: string;
    @IsString()
    reportPriceChangeMonthlyDescription: string;
    @IsString()
    reportPriceChangeMonthlyCategories: string;
    @IsString()
    reportPriceChangeMonthlyDefaultSettings: string;
    @IsBoolean()
    reportPriceChangeMonthlyIsActive: boolean;
}