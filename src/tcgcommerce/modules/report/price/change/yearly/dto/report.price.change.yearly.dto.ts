import { IsString } from "class-validator";

export class ReportPriceChangeYearlyDTO {
    reportPriceChangeYearlyId: string;
    reportTypeId: string;
    productVendorId: string;
    productLineId: string;
    productTypeId: string;
    reportPriceChangeYearlyName: string;
    reportPriceChangeYearlyDescription: string;
    reportPriceChangeYearlyCategories: string;
    reportPriceChangeYearlySettings: string;
    reportPriceChangeYearlyCreateDate: Date;
    reportPriceChangeYearlyUpdateDate: Date;
}

export class CreateReportPriceChangeYearlyDTO {
    @IsString()
    reportTypeId: string;
    @IsString()
    productVendorId: string;
    @IsString()
    productLineId: string;
    @IsString()
    productTypeId: string;
    @IsString()
    reportPriceChangeYearlyName: string;
    @IsString()
    reportPriceChangeYearlyDescription: string;
    @IsString()
    reportPriceChangeYearlyCategories: string;
    @IsString()
    reportPriceChangeYearlySettings: string;
}

export class UpdateReportPriceChangeYearlyDTO {
    @IsString()
    reportPriceChangeYearlyId: string;
    @IsString()
    reportTypeId: string;
    @IsString()
    productVendorId: string;
    @IsString()
    productLineId: string;
    @IsString()
    productTypeId: string;
    @IsString()
    reportPriceChangeYearlyName: string;
    @IsString()
    reportPriceChangeYearlyDescription: string;
    @IsString()
    reportPriceChangeYearlyCategories: string;
    @IsString()
    reportPriceChangeYearlySettings: string;  
}