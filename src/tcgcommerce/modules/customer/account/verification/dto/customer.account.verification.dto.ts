export class CustomerAccountVerificationDTO {
    customerAccountVerificationId: string;
    customerAccountUserId: string;
    commerceAccountId: string;
    customerAccountVerificationType: string;
    customerAccountVerificationCode: string;
    customerAccountVerificationCodeExpires: Date;
    customerAccountVerificationCodeIsValid: boolean;
    customerAccountVerificationCreateDate: Date;
    customerAccountVerificationUpdateDate: Date;
}