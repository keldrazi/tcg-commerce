import { IsBoolean, IsEmail, IsString } from 'class-validator';

export class CommerceAccountSettingsPOSVendorServiceShopifyDTO {
    commerceAccountSettingsPOSVendorServiceShopifyId: string;
    commerceAccountId: string;
    commerceAccountSettingsPOSVendorServiceShopifyStoreName: string;
    commerceAccountSettingsPOSVendorServiceShopifyAccessToken: string;
    commerceAccountSettingsPOSVendorServiceShopifyIsVerified: boolean;
    commerceAccountSettingsPOSVendorServiceShopifyCreateDate: Date;
    commerceAccountSettingsPOSVendorServiceShopifyUpdateDate: Date; 
}

export class CreateCommerceAccountSettingsPOSVendorServiceShopifyDTO {
    @IsString()
    commerceAccountId: string;
    @IsEmail()
    commerceAccountSettingsPOSVendorServiceShopifyStoreName: string;
    @IsString()
    commerceAccountSettingsPOSVendorServiceShopifyAccessToken: string;
    @IsBoolean()
    commerceAccountSettingsPOSVendorServiceShopifyIsVerified: boolean;
}

export class UpdateCommerceAccountSettingsPOSVendorServiceShopifyDTO {
    @IsString()
    commerceAccountSettingsPOSVendorServiceShopifyId: string;
    @IsEmail()
    commerceAccountSettingsPOSVendorServiceShopifyStoreName: string;
    @IsString()
    commerceAccountSettingsPOSVendorServiceShopifyAccessToken: string;
    @IsBoolean()
    commerceAccountSettingsPOSVendorServiceShopifyIsVerified: boolean;
}
