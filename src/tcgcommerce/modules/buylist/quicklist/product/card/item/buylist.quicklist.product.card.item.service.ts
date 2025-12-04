import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBuylistQuicklistProductCardItemDTO, BuylistQuicklistProductCardItemDTO } from './dto/buylist.quicklist.product.card.item.dto';
import { BuylistQuicklistProductCardItem } from 'src/typeorm/entities/tcgcommerce/modules/buylist/quicklist/product/card/item/buylist.quicklist.product.card.item.entity';

@Injectable()
export class BuylistQuicklistProductCardItemService {

    constructor(
        @InjectRepository(BuylistQuicklistProductCardItem) private buylistQuicklistProductCardItemRepository: Repository<BuylistQuicklistProductCardItem>,
    ) { }

    async getBuylistQuicklistProductCardItemById(buylistQuicklistProductCardItemId: string) {
        let buylistQuicklistProductCardItem = await this.buylistQuicklistProductCardItemRepository.findOne({ 
            where: { 
                buylistQuicklistProductCardItemId: buylistQuicklistProductCardItemId 
            } 
        });
        
        if (buylistQuicklistProductCardItem == null) {
            return null;
        }

        let buylistQuicklistProductCardItemDTO: BuylistQuicklistProductCardItemDTO = ({ ...buylistQuicklistProductCardItem });

        return buylistQuicklistProductCardItemDTO;
        
    }

    
    async createBuylistQuicklistProductCardItem(createBuylistQuicklistProductCardItemDTO: CreateBuylistQuicklistProductCardItemDTO) {

        //ADD SOME VALIDATION TO PREVENT DUPLICATE ENTRIES;
        
        let newBuylistQuicklistProductCardItem = this.buylistQuicklistProductCardItemRepository.create({ ...createBuylistQuicklistProductCardItemDTO });
        newBuylistQuicklistProductCardItem = await this.buylistQuicklistProductCardItemRepository.save(newBuylistQuicklistProductCardItem);

        let buylistQuicklistProductCardItemDTO = this.getBuylistQuicklistProductCardItemById(newBuylistQuicklistProductCardItem.buylistQuicklistProductCardItemId);
        
        return buylistQuicklistProductCardItemDTO;
        
    }

    

}