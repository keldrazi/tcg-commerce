import { IsBoolean, IsEmail, IsString, MinLength } from "class-validator";

export class CommerceAccountProfileDTO {
    customerAccountProfileId: string;
    customerAccountUserId: string;
    commerceAccountId: string;
    customerAccountProfileFirstName: string;
    customerAccountProfileLastName: string;
    customerAccountProfileScreenName: string;
    customerAccountProfilePhoto: string;
    customerAccountProfileShippingAddressPrimary: string;
    customerAccountProfileShippingAddressSecondary: string;
    customerAccountProfileShippingAddressCity: string;
    customerAccountProfileShippingAddressState: string;
    customerAccountProfileShippingAddressZip: string;
    customerAccountProfileBillingAddressPrimary: string;
    customerAccountProfileBillingAddressSecondary: string;
    customerAccountProfileBillingAddressCity: string;
    customerAccountProfileBillingAddressState: string;
    customerAccountProfileBillingAddressZip: string;
    customerAccountProfileCreateDate: Date;
    customerAccountProfileUpdateDate: Date;
}

export class CreateCommerceAccountProfileDTO {
    @IsString()
    customerAccountUserId: string;
    @IsString()
    commerceAccountId: string;
    @IsString()
    customerAccountProfileFirstName: string;
    @IsString()
    customerAccountProfileLastName: string;
    @IsString()
    customerAccountProfileScreenName: string;
    @IsString()
    customerAccountProfilePhoto: string
    @IsString()
    customerAccountProfileShippingAddressPrimary: string
    @IsString()
    customerAccountProfileShippingAddressSecondary: string
    @IsString()
    customerAccountProfileShippingAddressCity: string
    @IsString()
    customerAccountProfileShippingAddressState: string
    @IsString()
    customerAccountProfileShippingAddressZip: string
    @IsString()
    customerAccountProfileBillingAddressPrimary: string
    @IsString()
    customerAccountProfileBillingAddressSecondary: string
    @IsString()
    customerAccountProfileBillingAddressCity: string
    @IsString()
    customerAccountProfileBillingAddressState: string
    @IsString()
    customerAccountProfileBillingAddressZip: string

}

export class UpdateBuylistUserDTO {
    @IsString()
    customerAccountProfileId: string;
    @IsString()
    customerAccountUserId: string;
    @IsString()
    commerceAccountId: string;
    @IsString()
    customerAccountProfileFirstName: string;
    @IsString()
    customerAccountProfileLastName: string;
    @IsString()
    customerAccountProfileScreenName: string;
    @IsString()
    customerAccountProfilePhoto: string
    @IsString()
    customerAccountProfileShippingAddressPrimary: string
    @IsString()
    customerAccountProfileShippingAddressSecondary: string
    @IsString()
    customerAccountProfileShippingAddressCity: string
    @IsString()
    customerAccountProfileShippingAddressState: string
    @IsString()
    customerAccountProfileShippingAddressZip: string
    @IsString()
    customerAccountProfileBillingAddressPrimary: string
    @IsString()
    customerAccountProfileBillingAddressSecondary: string
    @IsString()
    customerAccountProfileBillingAddressCity: string
    @IsString()
    customerAccountProfileBillingAddressState: string
    @IsString()
    customerAccountProfileBillingAddressZip: string
    
}