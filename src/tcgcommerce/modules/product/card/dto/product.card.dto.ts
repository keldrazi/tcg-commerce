import { IsBoolean, IsString } from "class-validator";

export class ProductCardDTO {
    productCardId: string;
    productCardTCGdbId: string;
    productVendorId: string;
    productLineId: string;
    productTypeId: string;
    productSetId: string;
    productSetCode: string;
    productCardRarityCode: string;
    productCardNumber: string;
    productCardName: string;
    productCardCleanName: string;
    productCardImage: string;
    productCardIsPresale: boolean;
    productCardExtendedData: string;
    productCardMetadata: string;
    productCardSKUs: string;
    productCardIsActive: boolean;
    productCardCreateDate: Date;
    productCardUpdateDate: Date;
    
}

export class CreateProductCardDTO {
    @IsString()
    commerceAccountId: string;
    @IsString()
    productCardTCGdbId: string;
    @IsString()
    productVendorId: string;
    @IsString()
    productLineId: string;
    @IsString()
    productTypeId: string;
    @IsString()
    productSetId: string;
    @IsString()
    productSetCode: string;
    @IsString()
    productCardRarityId: string;
    @IsString()
    productCardRarityCode: string;
    @IsString()
    productCardName: string;
    @IsString()
    productCardCleanName: string;
    @IsString()
    productCardImage: string;
    @IsBoolean()
    productCardIsPresale: boolean;
    @IsString()
    productCardExtendedData: string;
    @IsString()
    productCardMetadata: string;
    @IsString()
    productCardSKUs: string;
    @IsBoolean()
    productCardIsActive: boolean;
   
}

export class UpdateProductCardDTO {
    @IsString()
    productCardId: string;
    @IsString()
    productSetCode: string;
    @IsString()
    productCardRarityCode: string;
    @IsString()
    productCardNumber: string;
    @IsString()
    productCardName: string;
    @IsString()
    productCardCleanName: string;
    @IsString()
    productCardImage: string;
    @IsBoolean()
    productCardIsPresale: boolean;
    @IsString()
    productCardExtendedData: string;
    @IsString()
    productCardMetadata: string;
    @IsString()
    productCardSKUs: string;
    @IsBoolean()
    productCardIsActive: boolean;
}
