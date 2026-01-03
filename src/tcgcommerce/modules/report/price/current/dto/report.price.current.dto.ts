import { IsString, IsBoolean } from "class-validator";
import { ReportPriceCurrentDefaultSettings, ReportPriceCurrentCategory } from '../interface/report.price.current.interface';

export class ReportPriceCurrentDTO {
    reportPriceCurrentId: string;
    productVendorId: string;
    productLineId: string;
    productTypeId: string;
    reportTypeId: string;
    reportPriceCurrentName: string;
    reportPriceCurrentDescription: string;
    reportPriceCurrentCategories: ReportPriceCurrentCategory[];
    reportPriceCurrentDefaultSettings: ReportPriceCurrentDefaultSettings;
    reportPriceCurrentIsActive: boolean;
    reportPriceCurrentCreateDate: Date;
    reportPriceCurrentUpdateDate: Date;

}

export class CreateReportPriceCurrentDTO {
    @IsString()
    productVendorId: string;
    @IsString()
    productLineId: string;
    @IsString()
    productTypeId: string;
    @IsString()
    reportTypeId: string;
    @IsString()
    reportPriceCurrentName: string;
    @IsString()
    reportPriceCurrentDescription: string;
    @IsString()
    reportPriceCurrentCategories: string;
    @IsString()
    reportPriceCurrentDefaultSettings: string;
    @IsBoolean()
    reportPriceCurrentIsActive: boolean;
}

export class UpdateReportPriceCurrentDTO {
    @IsString()
    reportPriceCurrentId: string;
    @IsString()
    productVendorId: string;
    @IsString()
    productLineId: string;
    @IsString()
    productTypeId: string;
    @IsString()
    reportTypeId: string;
    @IsString()
    reportPriceCurrentName: string;
    @IsString()
    reportPriceCurrentDescription: string;
    @IsString()
    reportPriceCurrentCategories: string;
    @IsString()
    reportPriceCurrentDefaultSettings: string; 
    @IsBoolean()
    reportPriceCurrentIsActive: boolean; 
}