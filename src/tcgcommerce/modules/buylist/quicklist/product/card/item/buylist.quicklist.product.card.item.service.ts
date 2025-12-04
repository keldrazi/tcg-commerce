import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBuylistQuicklistProductCardItemDTO, BuylistQuicklistProductCardItemDTO } from './dto/buylist.quicklist.product.card.item.dto';
import { BuylistQuicklistProductCardItem } from 'src/typeorm/entities/tcgcommerce/modules/buylist/quicklist/product/card/item/buylist.quicklist.product.card.item.entity';
import { ErrorMessageService } from 'src/system/modules/error/message/error.message.service';
import { ErrorMessageDTO } from 'src/system/modules/error/message/dto/error.message.dto';

@Injectable()
export class BuylistQuicklistProductCardItemService {

    constructor(
        @InjectRepository(BuylistQuicklistProductCardItem) private buylistQuicklistProductCardItemRepository: Repository<BuylistQuicklistProductCardItem>,
        private errorMessageService: ErrorMessageService,
    ) { }

    async getBuylistQuicklistProductCardItemById(buylistQuicklistProductCardItemId: string) {
        let buylistQuicklistProductCardItem = await this.buylistQuicklistProductCardItemRepository.findOne({ 
            where: { 
                buylistQuicklistProductCardItemId: buylistQuicklistProductCardItemId 
            } 
        });
        
        if (buylistQuicklistProductCardItem == null) {
            return this.errorMessageService.createErrorMessage('BUYLIST_QUICKLIST_PRODUCT_CARD_ITEM_NOT_FOUND', 'Buylist quicklist product card item was not found');
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

    //TO DO:DELETE METHOD;
}