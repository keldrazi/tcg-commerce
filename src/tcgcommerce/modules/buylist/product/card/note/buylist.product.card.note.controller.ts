import { Controller, Get, Post, Body, Put, Param, UsePipes, ValidationPipe, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { CreateBuylistProductCardNoteDTO } from './dto/buylist.product.card.note.dto';
import { BuylistProductCardNoteService } from './buylist.product.card.note.service';
import { EntityNotFoundError } from 'typeorm';



@Controller('buylist/product/card/note')
export class BuylistProductCardNoteController {

    constructor(
        private buylistProductCardNoteService: BuylistProductCardNoteService,
    ) { }
    
    
    @Get('/id/:buylistProductCardNoteId')
    async getBuylistProductCardNoteById(@Param('buylistProductCardNoteId') buylistProductCardNoteId: string) {
        try {
            return await this.buylistProductCardNoteService.getBuylistProductCardNoteById(buylistProductCardNoteId);
        } catch (e) {
            if(e instanceof EntityNotFoundError) {
                throw new NotFoundException('Buylist Product Card Note not found');
            }
            throw new InternalServerErrorException('Failed to get buylist product card note');
        }
    }

    @Get('/blpcid/:buylistProductCardId')
    async getBuylistProductCardNotesByBuylistProductCardId(@Param('buylistProductCardId') buylistProductCardId: string) {
        try {
            return await this.buylistProductCardNoteService.getBuylistProductCardNotesByBuylistProductCardId(buylistProductCardId);
        } catch (e) {
            throw new InternalServerErrorException('Failed to get buylist product card notes');
        }
    }

    @Post('/create')
    @UsePipes(new ValidationPipe())
    async createBuylistProductCardNote(@Body() createBuylistProductCardNoteDTO: CreateBuylistProductCardNoteDTO) {
        try {
            return await this.buylistProductCardNoteService.createBuylistProductCardNote(createBuylistProductCardNoteDTO);
        } catch (e) {
            throw new InternalServerErrorException('Failed to create buylist product card note');
        }
    }


}