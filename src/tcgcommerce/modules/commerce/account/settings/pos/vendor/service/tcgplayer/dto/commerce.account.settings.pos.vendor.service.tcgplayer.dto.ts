import { IsBoolean, IsEmail, IsString } from 'class-validator';

export class CommerceAccountSettingsPOSVendorServiceTCGPlayerDTO {
    commerceAccountSettingsPOSVendorServiceTCGPlayerId: string;
    commerceAccountId: string;
    commerceAccountSettingsPOSVendorServiceTCGPlayerAuthorizationCode: string;
    commerceAccountSettingsPOSVendorServiceTCGPlayerAccessToken: string;
    commerceAccountSettingsPOSVendorServiceTCGPlayerDisplayName: string;
    commerceAccountSettingsPOSVendorServiceTCGPlayerSellerKey: string;
    commerceAccountSettingsPOSVendorServiceTCGPlayerBearerToken: string;
    commerceAccountSettingsPOSVendorServiceTCGPlayerBearerTokenIssued: string;
    commerceAccountSettingsPOSVendorServiceTCGPlayerBearerTokenExpires: string;
    commerceAccountSettingsPOSVendorServiceTCGPlayerIsVerified: boolean;
    commerceAccountSettingsPOSVendorServiceTCGPlayerCreateDate: Date;
    commerceAccountSettingsPOSVendorServiceTCGPlayerUpdateDate: Date; 
}

export class CreateCommerceAccountSettingsPOSVendorServiceTCGPlayerDTO {
    @IsString()
    commerceAccountId: string;
    @IsEmail()
    commerceAccountSettingsPOSVendorServiceTCGPlayerUsername: string;
    @IsString()
    commerceAccountSettingsPOSVendorServiceTCGPlayerStoreKey: string;
    @IsBoolean()
    commerceAccountSettingsPOSVendorServiceTCGPlayerIsVerified: boolean;
}

export class UpdateCommerceAccountSettingsPOSVendorServiceTCGPlayerDTO {
    @IsString()
    commerceAccountSettingsPOSVendorServiceTCGPlayerId: string;
    @IsEmail()
    commerceAccountSettingsPOSVendorServiceTCGPlayerUsername: string;
    @IsString()
    commerceAccountSettingsPOSVendorServiceTCGPlayerStoreKey: string;
    @IsBoolean()
    commerceAccountSettingsPOSVendorServiceTCGPlayerIsVerified: boolean;
}
