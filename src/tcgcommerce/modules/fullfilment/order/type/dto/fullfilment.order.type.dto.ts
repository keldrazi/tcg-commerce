import { IsString, IsBoolean } from "class-validator";

export class FullfilmentOrderTypeDTO {
    fullfilmentOrderTypeId: string;
    fullfilmentOrderTypeName: string;
    fullfilmentOrderTypeCode: string;
    fullfilmentOrderTypeDescription: string;
    fullfilmentOrderTypeIsActive: boolean;
    fullfilmentOrderTypeCreateDate: Date;
    fullfilmentOrderTypeUpdateDate: Date;  
}

export class CreateFullfilmentOrderTypeDTO {
    @IsString()
    fullfilmentOrderTypeName: string;
    @IsString()
    fullfilmentOrderTypeCode: string;
    @IsString()
    fullfilmentOrderTypeDescription: string;
}

export class UpdateFullfilmentOrderTypeDTO {
    @IsString()
    fullfilmentOrderTypeId: string;
    @IsString()
    fullfilmentOrderTypeName: string;
    @IsString()
    fullfilmentOrderTypeCode: string;
    @IsString()
    fullfilmentOrderTypeDescription: string;
    @IsBoolean()
    fullfilmentOrderTypeIsActive: boolean;
    
}