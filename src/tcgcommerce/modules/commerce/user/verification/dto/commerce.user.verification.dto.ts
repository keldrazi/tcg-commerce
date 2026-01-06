export class CommerceUserVerificationDTO {
    commerceUserVerificationId: string;
    commerceAccountId: string;
    commerceUserId: string;
    commerceUserVerificationType: string;
    commerceUserVerificationCode: string;
    commerceUserVerificationCodeExpires: Date;
    commerceUserVerificationCodeIsValid: boolean;
    commerceUserVerificationCreateDate: Date;
    commerceUserVerificationUpdateDate: Date;
}