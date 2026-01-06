import { IsString } from "class-validator";

export class CustomerUserProfileDTO {
    customerUserProfileId: string;
    customerUserId: string;
    commerceAccountId: string;
    customerUserProfileFirstName: string;
    customerUserProfileLastName: string;
    customerUserProfileShippingAddressPrimary: string;
    customerUserProfileShippingAddressSecondary: string;
    customerUserProfileShippingAddressCity: string;
    customerUserProfileShippingAddressState: string;
    customerUserProfileShippingAddressZip: string;
    customerUserProfileBillingAddressPrimary: string;
    customerUserProfileBillingAddressSecondary: string;
    customerUserProfileBillingAddressCity: string;
    customerUserProfileBillingAddressState: string;
    customerUserProfileBillingAddressZip: string;
    customerUserProfileIsActive: boolean;
    customerUserProfileCreateDate: Date;
    customerUserProfileUpdateDate: Date;
}

export class CreateCustomerUserProfileDTO {
    @IsString()
    customerUserId: string;
    @IsString()
    commerceAccountId: string;
    @IsString()
    customerUserProfileFirstName: string;
    @IsString()
    customerUserProfileLastName: string;
    @IsString()
    customerUserProfileShippingAddressPrimary: string
    @IsString()
    customerUserProfileShippingAddressSecondary: string
    @IsString()
    customerUserProfileShippingAddressCity: string
    @IsString()
    customerUserProfileShippingAddressState: string
    @IsString()
    customerUserProfileShippingAddressZip: string
    @IsString()
    customerUserProfileBillingAddressPrimary: string
    @IsString()
    customerUserProfileBillingAddressSecondary: string
    @IsString()
    customerUserProfileBillingAddressCity: string
    @IsString()
    customerUserProfileBillingAddressState: string
    @IsString()
    customerUserProfileBillingAddressZip: string

}

export class UpdateCustomerUserProfileDTO {
    @IsString()
    customerUserProfileId: string;
    @IsString()
    customerUserId: string;
    @IsString()
    commerceAccountId: string;
    @IsString()
    customerUserProfileFirstName: string;
    @IsString()
    customerUserProfileLastName: string;
    @IsString()
    customerUserProfileShippingAddressPrimary: string
    @IsString()
    customerUserProfileShippingAddressSecondary: string
    @IsString()
    customerUserProfileShippingAddressCity: string
    @IsString()
    customerUserProfileShippingAddressState: string
    @IsString()
    customerUserProfileShippingAddressZip: string
    @IsString()
    customerUserProfileBillingAddressPrimary: string
    @IsString()
    customerUserProfileBillingAddressSecondary: string
    @IsString()
    customerUserProfileBillingAddressCity: string
    @IsString()
    customerUserProfileBillingAddressState: string
    @IsString()
    customerUserProfileBillingAddressZip: string
    
}