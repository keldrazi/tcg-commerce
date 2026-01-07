import { Controller, Get, Post, Body, Put, Param, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateBuylistProductCardNoteDTO } from './dto/buylist.product.card.note.dto';
import { BuylistProductCardNoteService } from './buylist.product.card.note.service';



@Controller('buylist/product/card/note')
export class BuylistProductCardNoteController {

    constructor(
        private buylistProductCardNoteService: BuylistProductCardNoteService,
    ) { }
    
    
    @Get('/id/:buylistProductCardNoteId')
    async getBuylistProductCardNoteById(@Param('buylistProductCardNoteId') buylistProductCardNoteId: string) {
        return await this.buylistProductCardNoteService.getBuylistProductCardNoteById(buylistProductCardNoteId);
    }

    @Get('/blpcid/:buylistProductCardId')
    async getBuylistProductCardNotesByBuylistProductCardId(@Param('buylistProductCardId') buylistProductCardId: string) {
        return await this.buylistProductCardNoteService.getBuylistProductCardNotesByBuylistProductCardId(buylistProductCardId);
    }

    @Post('/create')
    @UsePipes(new ValidationPipe())
    async createBuylistProductCardNote(@Body() createBuylistProductCardNoteDTO: CreateBuylistProductCardNoteDTO) {
        return await this.buylistProductCardNoteService.createBuylistProductCardNote(createBuylistProductCardNoteDTO);
    }


}