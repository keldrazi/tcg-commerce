import { IsString } from "class-validator";

export class ReportPriceChangeMonthlyDTO {
    reportPriceChangeMonthlyId: string;
    reportTypeId: string;
    productVendorId: string;
    productLineId: string;
    productTypeId: string;
    reportPriceChangeMonthlyName: string;
    reportPriceChangeMonthlyDescription: string;
    reportPriceChangeMonthlyCategories: string;
    reportPriceChangeMonthlySettings: string;
    reportPriceChangeMonthlyCreateDate: Date;
    reportPriceChangeMonthlyUpdateDate: Date;
}

export class CreateReportPriceChangeMonthlyDTO {
    @IsString()
    reportTypeId: string;
    @IsString()
    productVendorId: string;
    @IsString()
    productLineId: string;
    @IsString()
    productTypeId: string;
    @IsString()
    reportPriceChangeMonthlyName: string;
    @IsString()
    reportPriceChangeMonthlyDescription: string;
    @IsString()
    reportPriceChangeMonthlyCategories: string;
    @IsString()
    reportPriceChangeMonthlySettings: string;
}

export class UpdateReportPriceChangeMonthlyDTO {
    @IsString()
    reportPriceChangeMonthlyId: string;
    @IsString()
    reportTypeId: string;
    @IsString()
    productVendorId: string;
    @IsString()
    productLineId: string;
    @IsString()
    productTypeId: string;
    @IsString()
    reportPriceChangeMonthlyName: string;
    @IsString()
    reportPriceChangeMonthlyDescription: string;
    @IsString()
    reportPriceChangeMonthlyCategories: string;
    @IsString()
    reportPriceChangeMonthlySettings: string;  
}