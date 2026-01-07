import { IsString } from "class-validator";

export class BuylistProductCardNoteDTO {
    buylistProductCardNoteId: string;
    buylistProductCardId: string;
    buylistProductCardNoteType: string;
    buylistProductCardNoteUserName: string;
    buylistProductCardNote: string;
    buylistProductCardNoteCreateDate: Date;
    buylistProductCardNoteUpdateDate: Date;
}

export class CreateBuylistProductCardNoteDTO {
    @IsString()
    buylistProductCardId: string;
    @IsString()
    buylistProductCardNoteType: string;
    @IsString()
    buylistProductCardNoteUserName: string;
    @IsString()
    buylistProductCardNote: string
}