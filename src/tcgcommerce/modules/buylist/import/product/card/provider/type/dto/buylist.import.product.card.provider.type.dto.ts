import { IsString, IsBoolean } from "class-validator";
import { BuylistImportProductCardProviderTypeFileDataKey, BuylistImportProductCardProviderTypeFileConditionKey, BuylistImportProductCardProviderTypeFilePrintingKey } from '../interface/buylist.import.product.card.provider.type.interface';

export class BuylistImportProductCardProviderTypeDTO {
    buylistImportProductCardProviderTypeId: string;
    buylistImportProductCardProviderTypeName: string;
    buylistImportProductCardProviderTypeCode: string;
    buylistImportProductCardProviderTypeDescription: string;
    buylistImportProductCardProviderTypeFileExtension: string;
    buylistImportProductCardProviderTypeFileUploadPath: string;
    buylistImportProductCardProviderTypeFileDataKey: BuylistImportProductCardProviderTypeFileDataKey;
    buylistImportProductCardProviderTypeFileConditionKey: BuylistImportProductCardProviderTypeFileConditionKey;
    buylistImportProductCardProviderTypeFilePrintingKey: BuylistImportProductCardProviderTypeFilePrintingKey;
    buylistImportProductCardProviderTypeIsActive: boolean;
    buylistImportProductCardProviderTypeCreateDate: Date;
    buylistImportProductCardProviderTypeUpdateDate: Date;  
}

export class CreateBuylistImportProductCardProviderTypeDTO {
    @IsString()
    buylistImportProductCardProviderTypeName: string;
    @IsString()
    buylistImportProductCardProviderTypeCode: string;
    @IsString()
    buylistImportProductCardProviderTypeDescription: string;
    @IsString()
    buylistImportProductCardProviderTypeFileExtension: string;
    @IsString()
    buylistImportProductCardProviderTypeFileUploadPath: string;
    @IsString()
    buylistImportProductCardProviderTypeFileDataKey: string;
    @IsString()
    buylistImportProductCardProviderTypeFileConditionKey: string;
    @IsString()
    buylistImportProductCardProviderTypeFilePrintingKey: string;
}

export class UpdateBuylistImportProductCardProviderTypeDTO {
    @IsString()
    buylistImportProductCardProviderTypeId: string;
    @IsString()
    buylistImportProductCardProviderTypeName: string;
    @IsString()
    buylistImportProductCardProviderTypeCode: string;
    @IsString()
    buylistImportProductCardProviderTypeDescription: string;
    @IsString()
    buylistImportProductCardProviderTypeFileExtension: string;
    @IsString()
    buylistImportProductCardProviderTypeFileUploadPath: string;
    @IsString()
    buylistImportProductCardProviderTypeFileDataKey: string;
    @IsString()
    buylistImportProductCardProviderTypeFileConditionKey: string
    @IsString()
    buylistImportProductCardProviderTypeFilePrintingKey: string
    @IsBoolean()
    buylistImportProductCardProviderTypeIsActive: boolean;
}