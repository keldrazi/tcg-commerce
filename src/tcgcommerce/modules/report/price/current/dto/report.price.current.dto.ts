import { IsString } from "class-validator";

export class ReportPriceCurrentDTO {
    reportPriceCurrentId: string;
    reportTypeId: string;
    productVendorId: string;
    productLineId: string;
    productTypeId: string;
    reportPriceCurrentName: string;
    reportPriceCurrentDescription: string;
    reportPriceCurrentCategories: string;
    reportPriceCurrentSettings: string;
    reportPriceCurrentCreateDate: Date;
    reportPriceCurrentUpdateDate: Date;
}

export class CreateReportPriceCurrentDTO {
    @IsString()
    reportTypeId: string;
    @IsString()
    productVendorId: string;
    @IsString()
    productLineId: string;
    @IsString()
    productTypeId: string;
    @IsString()
    reportPriceCurrentName: string;
    @IsString()
    reportPriceCurrentDescription: string;
    @IsString()
    reportPriceCurrentCategories: string;
    @IsString()
    reportPriceCurrentSettings: string;
}

export class UpdateReportPriceCurrentDTO {
    @IsString()
    reportPriceCurrentId: string;
    @IsString()
    reportTypeId: string;
    @IsString()
    productVendorId: string;
    @IsString()
    productLineId: string;
    @IsString()
    productTypeId: string;
    @IsString()
    reportPriceCurrentName: string;
    @IsString()
    reportPriceCurrentDescription: string;
    @IsString()
    reportPriceCurrentCategories: string;
    @IsString()
    reportPriceCurrentSettings: string;  
}