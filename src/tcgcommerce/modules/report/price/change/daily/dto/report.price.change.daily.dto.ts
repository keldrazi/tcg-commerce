import { IsBoolean, IsString } from "class-validator";
import { ReportPriceChangeDailyDefaultSettings, ReportPriceChangeDailyCategory } from '../interface/report.price.change.daily.interface';

export class ReportPriceChangeDailyDTO {
    reportPriceChangeDailyId: string;
    productVendorId: string;
    productLineId: string;
    productTypeId: string;
    reportTypeId: string;
    reportPriceChangeDailyName: string;
    reportPriceChangeDailyDescription: string;
    reportPriceChangeDailyCategories: ReportPriceChangeDailyCategory[];
    reportPriceChangeDailyDefaultSettings: ReportPriceChangeDailyDefaultSettings;
    reportPriceChangeDailyIsActive: boolean;
    reportPriceChangeDailyCreateDate: Date;
    reportPriceChangeDailyUpdateDate: Date;
}

export class CreateReportPriceChangeDailyDTO {
    @IsString()
    productVendorId: string;
    @IsString()
    productLineId: string;
    @IsString()
    productTypeId: string;
    @IsString()
    reportTypeId: string;
    @IsString()
    reportPriceChangeDailyName: string;
    @IsString()
    reportPriceChangeDailyDescription: string;
    @IsString()
    reportPriceChangeDailyCategories: string;
    @IsString()
    reportPriceChangeDailyDefaultSettings: string;
    @IsBoolean()
    reportPriceChangeDailyIsActive: boolean;
}

export class UpdateReportPriceChangeDailyDTO {
    @IsString()
    reportPriceChangeDailyId: string;
    @IsString()
    productVendorId: string;
    @IsString()
    productLineId: string;
    @IsString()
    productTypeId: string;
    @IsString()
    reportTypeId: string;
    @IsString()
    reportPriceChangeDailyName: string;
    @IsString()
    reportPriceChangeDailyDescription: string;
    @IsString()
    reportPriceChangeDailyCategories: string;
    @IsString()
    reportPriceChangeDailyDefaultSettings: string;
    @IsBoolean()
    reportPriceChangeDailyIsActive: boolean;
}

