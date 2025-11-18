export class BuylistUserVerificationDTO {
    buylistUserVerificationId: string;
    commerceAccountId: string;
    buylistUserId: string;
    buylistUserVerificationType: string;
    buylistUserVerificationCode: number;
    buylistUserVerificationCodeExpires: Date;
    buylistUserVerificationCodeIsUsed: boolean;
    buylistUserVerificationCreateDate: Date;
    buylistUserVerificationUpdateDate: Date;
}