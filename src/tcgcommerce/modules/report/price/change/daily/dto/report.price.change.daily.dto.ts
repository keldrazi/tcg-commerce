import { IsString } from "class-validator";
import { ReportPriceChangeDailySettings } from '../interface/report.price.change.daily.interface';

export class ReportPriceChangeDailyDTO {
    reportPriceChangeDailyId: string;
    reportPriceTypeId: string;
    productVendorId: string;
    productLineId: string;
    productTypeId: string;
    reportPriceChangeDailyName: string;
    reportPriceChangeDailyDescription: string;
    reportPriceChangeDailyCategories: string;
    reportPriceChangeDailySettings: ReportPriceChangeDailySettings;
    reportPriceChangeDailyCreateDate: Date;
    reportPriceChangeDailyUpdateDate: Date;
}

export class CreateReportPriceChangeDailyDTO {
    @IsString()
    reportPriceTypeId: string;
    @IsString()
    productVendorId: string;
    @IsString()
    productLineId: string;
    @IsString()
    productTypeId: string;
    @IsString()
    reportPriceChangeDailyName: string;
    @IsString()
    reportPriceChangeDailyDescription: string;
    @IsString()
    reportPriceChangeDailyCategories: string;
    @IsString()
    reportPriceChangeDailySettings: string;
}

export class UpdateReportPriceChangeDailyDTO {
    @IsString()
    reportPriceChangeDailyId: string;
    @IsString()
    reportPriceTypeId: string;
    @IsString()
    productVendorId: string;
    @IsString()
    productLineId: string;
    @IsString()
    productTypeId: string;
    @IsString()
    reportPriceChangeDailyName: string;
    @IsString()
    reportPriceChangeDailyDescription: string;
    @IsString()
    reportPriceChangeDailyCategories: string;
    @IsString()
    reportPriceChangeDailySettings: string;

}