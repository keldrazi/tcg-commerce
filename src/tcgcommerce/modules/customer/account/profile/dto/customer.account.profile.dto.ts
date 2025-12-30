import { IsString, MinLength } from "class-validator";

export class CustomerAccountProfileDTO {
    customerAccountProfileId: string;
    customerAccountUserId: string;
    commerceAccountId: string;
    customerAccountProfileFirstName: string;
    customerAccountProfileLastName: string;
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
    customerAccountProfileIsActive: boolean;
    customerAccountProfileCreateDate: Date;
    customerAccountProfileUpdateDate: Date;
}

export class CreateCustomerAccountProfileDTO {
    @IsString()
    customerAccountUserId: string;
    @IsString()
    commerceAccountId: string;
    @IsString()
    customerAccountProfileFirstName: string;
    @IsString()
    customerAccountProfileLastName: string;
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

export class UpdateCustomerAccountProfileDTO {
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