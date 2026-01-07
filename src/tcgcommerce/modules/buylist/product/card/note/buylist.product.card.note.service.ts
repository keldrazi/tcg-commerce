import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBuylistProductCardNoteDTO, BuylistProductCardNoteDTO } from './dto/buylist.product.card.note.dto';
import { BuylistProductCardNote } from 'src/typeorm/entities/tcgcommerce/modules/buylist/product/card/note/buylist.product.card.note.entity';
import { ErrorMessageService } from 'src/system/modules/error/message/error.message.service';

@Injectable()
export class BuylistProductCardNoteService {

    constructor(
        @InjectRepository(BuylistProductCardNote) private buylistProductCardNoteRepository: Repository<BuylistProductCardNote>,
        private errorMessageService: ErrorMessageService,
    ) { }

    async getBuylistProductCardNoteById(buylistProductCardNoteId: string) {
        let buylistProductCardNote = await this.buylistProductCardNoteRepository.findOne({ 
            where: { 
                buylistProductCardNoteId: buylistProductCardNoteId 
            } 
        });
        
        if (buylistProductCardNote == null) {
            return this.errorMessageService.createErrorMessage('BUYLIST_STATUS_NOT_FOUND', 'Buylist status was not found');
        }

        let buylistProductCardNoteDTO: BuylistProductCardNoteDTO = ({ ...buylistProductCardNote });

        return buylistProductCardNoteDTO;
        
    }

    async getBuylistProductCardNotesByBuylistProductCardId(buylistProductCardId: string) {
        let buylistProductCardNotes = await this.buylistProductCardNoteRepository.find({
            where: {
                buylistProductCardId: buylistProductCardId
            }
        });
        
        let buylistProductCardNoteDTOs: BuylistProductCardNoteDTO[] = [];

        if(buylistProductCardNotes == null) {
            return buylistProductCardNoteDTOs;
        }
        
        for(let i = 0; i < buylistProductCardNotes.length; i++) {
            let buylistProductCardNote = buylistProductCardNotes[i];
            let buylistProductCardNoteDTO: BuylistProductCardNoteDTO = ({ ...buylistProductCardNote });

            buylistProductCardNoteDTOs.push(buylistProductCardNoteDTO);
        }

        return buylistProductCardNoteDTOs;
    }
    
    async createBuylistProductCardNote(createBuylistProductCardNoteDTO: CreateBuylistProductCardNoteDTO) {
        
        let buylistProductCardNote = this.buylistProductCardNoteRepository.create({ ...createBuylistProductCardNoteDTO });
        buylistProductCardNote = await this.buylistProductCardNoteRepository.save(buylistProductCardNote);

        let buylistProductCardNoteDTO = await this.getBuylistProductCardNoteById(buylistProductCardNote.buylistProductCardNoteId);
        
        return buylistProductCardNoteDTO;
        
    }
    
}