import { IsString } from "class-validator";

export class ReportPriceChangeWeeklyDTO {
    reportPriceChangeWeeklyId: string;
    reportTypeId: string;
    productVendorId: string;
    productLineId: string;
    productTypeId: string;
    reportPriceChangeWeeklyName: string;
    reportPriceChangeWeeklyDescription: string;
    reportPriceChangeWeeklyCategories: string;
    reportPriceChangeWeeklySettings: string;
    reportPriceChangeWeeklyCreateDate: Date;
    reportPriceChangeWeeklyUpdateDate: Date;
}

export class CreateReportPriceChangeWeeklyDTO {
    @IsString()
    reportTypeId: string;
    @IsString()
    productVendorId: string;
    @IsString()
    productLineId: string;
    @IsString()
    productTypeId: string;
    @IsString()
    reportPriceChangeWeeklyName: string;
    @IsString()
    reportPriceChangeWeeklyDescription: string;
    @IsString()
    reportPriceChangeWeeklyCategories: string;
    @IsString()
    reportPriceChangeWeeklySettings: string;
}

export class UpdateReportPriceChangeWeeklyDTO {
    @IsString()
    reportPriceChangeWeeklyId: string;
    @IsString()
    reportTypeId: string;
    @IsString()
    productVendorId: string;
    @IsString()
    productLineId: string;
    @IsString()
    productTypeId: string;
    @IsString()
    reportPriceChangeWeeklyName: string;
    @IsString()
    reportPriceChangeWeeklyDescription: string;
    @IsString()
    reportPriceChangeWeeklyCategories: string; 
    @IsString()
    reportPriceChangeWeeklySettings: string; 
}