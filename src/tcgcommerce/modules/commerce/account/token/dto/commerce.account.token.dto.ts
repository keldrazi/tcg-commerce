import { IsString } from 'class-validator';

export class CommerceAccountTokenDTO {
    commerceAccountTokenId: string;
    commerceAccountId: string;
    commerceAccountToken: string;
    commerceAccountTokenIssued: string;
    commerceAccountTokenExpires: string;
    commerceAccountTokenCreateDate: Date;
    commerceAccountTokenUpdateDate: Date; 
}

export class CreateCommerceAccountTokenDTO {
    @IsString()
    commerceAccountId: string;
    @IsString()
    commerceAccountToken: string;
    @IsString()
    commerceAccountTokenIssued: string;
    @IsString()
    commerceAccountTokenExpires: string;
}

export class UpdateCommerceAccountTokenDTO {
    @IsString()
    commerceAccountTokenId: string;
    @IsString()
    commerceAccountId: string;
    @IsString()
    commerceAccountToken: string;
    @IsString()
    commerceAccountTokenIssued: string;
    @IsString()
    commerceAccountTokenExpires: string;
}
    