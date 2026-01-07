import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBuylistQuicklistProductCardItemDTO, BuylistQuicklistProductCardItemDTO } from './dto/buylist.quicklist.product.card.item.dto';
import { BuylistQuicklistProductCardItem } from 'src/typeorm/entities/tcgcommerce/modules/buylist/quicklist/product/card/item/buylist.quicklist.product.card.item.entity';
import { ErrorMessageService } from 'src/system/modules/error/message/error.message.service';


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

    async getBuylistQuicklistProductCardItemsByBuyListQuicklistProductCardId(buylistQuicklistProductCardId: string) {
        let buylistQuicklistProductCardItems = await this.buylistQuicklistProductCardItemRepository.find({ 
            where: { 
                buylistQuicklistProductCardId: buylistQuicklistProductCardId 
            } 
        });
        
        if (buylistQuicklistProductCardItems == null) {
            return [];
        }

        let buylistQuicklistProductCardItemDTOs: BuylistQuicklistProductCardItemDTO[] = [];

        for(let i = 0; i < buylistQuicklistProductCardItems.length; i++) {
            let buylistQuicklistProductCardItem = buylistQuicklistProductCardItems[i];
            let buylistQuicklistProductCardItemDTO: BuylistQuicklistProductCardItemDTO = ({ ...buylistQuicklistProductCardItem });

            buylistQuicklistProductCardItemDTOs.push(buylistQuicklistProductCardItemDTO);
        }

        return buylistQuicklistProductCardItemDTOs;
        
    }

    
    async createBuylistQuicklistProductCardItem(createBuylistQuicklistProductCardItemDTO: CreateBuylistQuicklistProductCardItemDTO) {

        let buylistQuicklistProductCardItem = await this.buylistQuicklistProductCardItemRepository.findOne({ 
            where: { 
                productCardId: createBuylistQuicklistProductCardItemDTO.productCardId,
                productCardNumber: createBuylistQuicklistProductCardItemDTO.productCardNumber,
                productSetId: createBuylistQuicklistProductCardItemDTO.productSetId,
                productLanguageId: createBuylistQuicklistProductCardItemDTO.productLanguageId,
                productCardPrintingId: createBuylistQuicklistProductCardItemDTO.productCardPrintingId
            } 
        });

        if (buylistQuicklistProductCardItem != null) {
            return this.errorMessageService.createErrorMessage('BUYLIST_QUICKLIST_PRODUCT_CARD_EXISTS', 'Buylist quicklist product card item exists');
        }
        
        buylistQuicklistProductCardItem = this.buylistQuicklistProductCardItemRepository.create({ ...createBuylistQuicklistProductCardItemDTO });
        buylistQuicklistProductCardItem = await this.buylistQuicklistProductCardItemRepository.save(buylistQuicklistProductCardItem);

        let buylistQuicklistProductCardItemDTO = await this.getBuylistQuicklistProductCardItemById(buylistQuicklistProductCardItem.buylistQuicklistProductCardItemId);
        
        return buylistQuicklistProductCardItemDTO;
        
    }

    async deleteBuylistQuicklistProductCardItem(buylistQuicklistProductCardItemId: string) {

        let buylistQuicklistProductCardItem = await this.buylistQuicklistProductCardItemRepository.findOne({ 
            where: { 
                buylistQuicklistProductCardItemId: buylistQuicklistProductCardItemId 
            } 
        });

        if (buylistQuicklistProductCardItem == null) {
            return this.errorMessageService.createErrorMessage('BUYLIST_QUICKLIST_PRODUCT_CARD_ITEM_NOT_FOUND', 'Buylist quicklist product card item was not found');
        }

        await this.buylistQuicklistProductCardItemRepository.delete({ buylistQuicklistProductCardItemId: buylistQuicklistProductCardItemId });

        return true;

    }
}