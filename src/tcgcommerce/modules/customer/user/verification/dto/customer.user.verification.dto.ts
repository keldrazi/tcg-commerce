export class CustomerUserVerificationDTO {
    customerUserVerificationId: string;
    customerUserId: string;
    commerceAccountId: string;
    customerUserVerificationType: string;
    customerUserVerificationCode: string;
    customerUserVerificationCodeExpires: Date;
    customerUserVerificationCodeIsValid: boolean;
    customerUserVerificationCreateDate: Date;
    customerUserVerificationUpdateDate: Date;
}