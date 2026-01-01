import { IsString } from "class-validator";

export class ReportPriceChangeDailyDTO {
    reportPriceChangeDailyId: string;
    reportTypeId: string;
    productVendorId: string;
    productLineId: string;
    productTypeId: string;
    reportPriceChangeDailyName: string;
    reportPriceChangeDailyDescription: string;
    reportPriceChangeDailyCategories: string;
    reportPriceChangeDailySettings: string;
    reportPriceChangeDailyCreateDate: Date;
    reportPriceChangeDailyUpdateDate: Date;
}

export class CreateReportPriceChangeDailyDTO {
    @IsString()
    reportTypeId: string;
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
    reportTypeId: string;
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