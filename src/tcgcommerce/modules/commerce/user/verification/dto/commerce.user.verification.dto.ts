export class CommerceUserVerificationDTO {
    commerceUserVerificationId: string;
    commerceAccountId: string;
    commerceUserId: string;
    commerceUserVerificationType: string;
    commerceUserVerificationCode: number;
    commerceUserVerificationCodeExpires: Date;
    commerceUserVerificationCodeIsUsed: boolean;
    commerceUserVerificationCreateDate: Date;
    commerceUserVerificationUpdateDate: Date;
}