import { IsBoolean, IsEmail, IsString } from 'class-validator';

export class CommerceAccountSettingsPOSVendorServiceManaPoolDTO {
    commerceAccountSettingsPOSVendorServiceManaPoolId: string;
    commerceAccountId: string;
    commerceAccountSettingsPOSVendorServiceManaPoolEmail: string;
    commerceAccountSettingsPOSVendorServiceManaPoolAccessToken: string;
    commerceAccountSettingsPOSVendorServiceManaPoolIsVerified: boolean;
    commerceAccountSettingsPOSVendorServiceManaPoolCreateDate: Date;
    commerceAccountSettingsPOSVendorServiceManaPoolUpdateDate: Date; 
}

export class CreateCommerceAccountSettingsPOSVendorServiceManaPoolDTO {
    @IsString()
    commerceAccountId: string;
    @IsEmail()
    commerceAccountSettingsPOSVendorServiceManaPoolEmail: string;
    @IsString()
    commerceAccountSettingsPOSVendorServiceManaPoolAccessToken: string;
    @IsBoolean()
    commerceAccountSettingsPOSVendorServiceManaPoolIsVerified: boolean;
}

export class UpdateCommerceAccountSettingsPOSVendorServiceManaPoolDTO {
    @IsString()
    commerceAccountSettingsPOSVendorServiceManaPoolId: string;
    @IsEmail()
    commerceAccountSettingsPOSVendorServiceManaPoolEmail: string;
    @IsString()
    commerceAccountSettingsPOSVendorServiceManaPoolAccessToken: string;
    @IsBoolean()
    commerceAccountSettingsPOSVendorServiceManaPoolIsVerified: boolean;
}
