import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { BuylistProductCardNoteService } from './buylist.product.card.note.service';
import { BuylistProductCardNoteController } from './buylist.product.card.note.controller';
import { BuylistProductCardNote } from 'src/typeorm/entities/tcgcommerce/modules/buylist/product/card/note/buylist.product.card.note.entity';
import { ErrorMessageModule } from 'src/system/modules/error/message/error.message.module';


@Module({
    imports: [
        TypeOrmModule.forFeature([BuylistProductCardNote]),
        ErrorMessageModule
    ],
    controllers: [BuylistProductCardNoteController],
    providers: [BuylistProductCardNoteService],
    exports: [BuylistProductCardNoteService]
})
export class BuylistProductCardNoteModule {}
