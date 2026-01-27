import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBuylistProductCardNoteDTO, BuylistProductCardNoteDTO } from './dto/buylist.product.card.note.dto';
import { BuylistProductCardNote } from 'src/typeorm/entities/tcgcommerce/modules/buylist/product/card/note/buylist.product.card.note.entity';

@Injectable()
export class BuylistProductCardNoteService {

    constructor(
        @InjectRepository(BuylistProductCardNote) private buylistProductCardNoteRepository: Repository<BuylistProductCardNote>,
    ) { }

    async getBuylistProductCardNoteById(buylistProductCardNoteId: string): Promise<BuylistProductCardNoteDTO> {
        let buylistProductCardNote = await this.buylistProductCardNoteRepository.findOne({ 
            where: { 
                buylistProductCardNoteId: buylistProductCardNoteId 
            } 
        });
        
        if (buylistProductCardNote == null) {
            throw new NotFoundException('Buylist status was not found');
        }

        let buylistProductCardNoteDTO: BuylistProductCardNoteDTO = ({ ...buylistProductCardNote });

        return buylistProductCardNoteDTO;
        
    }

    async getBuylistProductCardNotesByBuylistProductCardId(buylistProductCardId: string): Promise<BuylistProductCardNoteDTO[]> {
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
    
    async createBuylistProductCardNote(createBuylistProductCardNoteDTO: CreateBuylistProductCardNoteDTO): Promise<BuylistProductCardNoteDTO> {
        
        let buylistProductCardNote = this.buylistProductCardNoteRepository.create({ ...createBuylistProductCardNoteDTO });
        buylistProductCardNote = await this.buylistProductCardNoteRepository.save(buylistProductCardNote);

        let buylistProductCardNoteDTO = await this.getBuylistProductCardNoteById(buylistProductCardNote.buylistProductCardNoteId);
        
        return buylistProductCardNoteDTO;
        
    }
    
}