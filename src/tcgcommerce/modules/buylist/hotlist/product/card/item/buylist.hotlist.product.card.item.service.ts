import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBuylistHotlistProductCardItemDTO, UpdateBuylistHotlistProductCardItemDTO, BuylistHotlistProductCardItemDTO } from './dto/buylist.hotlist.product.card.item.dto';
import { BuylistHotlistProductCardItem } from 'src/typeorm/entities/tcgcommerce/modules/buylist/hotlist/product/card/item/buylist.hotlist.product.card.item.entity';
import { ErrorMessageService } from 'src/system/modules/error/message/error.message.service';
import { ErrorMessageDTO } from 'src/system/modules/error/message/dto/error.message.dto';

@Injectable()
export class BuylistHotlistProductCardItemService {

    constructor(
        @InjectRepository(BuylistHotlistProductCardItem) private buylistHotlistProductCardItemRepository: Repository<BuylistHotlistProductCardItem>,
        private errorMessageService: ErrorMessageService,
    ) { }

    async getBuylistHotlistProductCardItemById(buylistHotlistProductCardItemId: string) {
        let buylistHotlistProductCardItem = await this.buylistHotlistProductCardItemRepository.findOne({ 
            where: { 
                buylistHotlistProductCardItemId: buylistHotlistProductCardItemId 
            } 
        });
        
        if(buylistHotlistProductCardItem == null) {
            return this.errorMessageService.createErrorMessage('BUYLIST_HOTLIST_PRODUCT_CARD_ITEM_NOT_FOUND', 'Buylist hotlist product card item was not found');
        }

        let buylistHotlistProductCardItemDTO: BuylistHotlistProductCardItemDTO = ({ ...buylistHotlistProductCardItem });

        return buylistHotlistProductCardItemDTO;
        
    }

    async getBuylistHotlistProductCardItemsByCommerceAccountId(commerceAccountId: string) {
        
        let buylistHotlistProductCardItemDTOs: BuylistHotlistProductCardItemDTO[] = [];
        
        let buylistHotlistProductCardItems = await this.buylistHotlistProductCardItemRepository.find({
            where: {
                commerceAccountId: commerceAccountId
            }
        });
        
        //TO DO: CREATE AN ERROR TO RETURN;
        if(buylistHotlistProductCardItems == null) {
            return buylistHotlistProductCardItemDTOs;
        }
        
        for(let i = 0; i < buylistHotlistProductCardItems.length; i++) {
            let buylistHotlistProductCardItem = buylistHotlistProductCardItems[i];
            let buylistHotlistProductCardItemDTO: BuylistHotlistProductCardItemDTO = ({ ...buylistHotlistProductCardItem });

            buylistHotlistProductCardItemDTOs.push(buylistHotlistProductCardItemDTO);
        }

        return buylistHotlistProductCardItemDTOs;
    }
    
    async createBuylistHotlistProductCardItem(createBuylistHotlistProductCardItemDTO: CreateBuylistHotlistProductCardItemDTO) {

        //ADD SOME VALIDATION TO PREVENT DUPLICATE ENTRIES;
        
        let newBuylistHotlistProductCardItem = this.buylistHotlistProductCardItemRepository.create({ ...createBuylistHotlistProductCardItemDTO });
        newBuylistHotlistProductCardItem = await this.buylistHotlistProductCardItemRepository.save(newBuylistHotlistProductCardItem);

        let buylistHotlistProductCardItemDTO = this.getBuylistHotlistProductCardItemById(newBuylistHotlistProductCardItem.buylistHotlistProductCardItemId);
        
        return buylistHotlistProductCardItemDTO;
        
    }

    async updateBuylistHotlistProductCardItem(updateBuylistHotlistProductCardItemDTO: UpdateBuylistHotlistProductCardItemDTO) {
                    
        let existingBuylistHotlistProductCardItem = await this.getBuylistHotlistProductCardItemById(updateBuylistHotlistProductCardItemDTO.buylistHotlistProductCardItemId);
            
        //TO DO: RETUNR AN ERROR IF BUYLIST TYPE NOT FOUND;
        if (existingBuylistHotlistProductCardItem == null || existingBuylistHotlistProductCardItem instanceof ErrorMessageDTO) {
            return this.errorMessageService.createErrorMessage('BUYLIST_HOTLIST_PRODUCT_CARD_ITEM_NOT_FOUND', 'Buylist hotlist product card item was not found');
        }

        existingBuylistHotlistProductCardItem.productCardPrintingId = updateBuylistHotlistProductCardItemDTO.productCardPrintingId;
        existingBuylistHotlistProductCardItem.buylistHotlistProductCardItemQty = updateBuylistHotlistProductCardItemDTO.buylistHotlistProductCardItemQty;
        existingBuylistHotlistProductCardItem.buylistHotlistProductCardItemOverridePriceEnabled = updateBuylistHotlistProductCardItemDTO.buylistHotlistProductCardItemOverridePriceEnabled;
        existingBuylistHotlistProductCardItem.buylistHotlistProductCardItemOverridePrice = updateBuylistHotlistProductCardItemDTO.buylistHotlistProductCardItemOverridePrice;
        
        await this.buylistHotlistProductCardItemRepository.save(existingBuylistHotlistProductCardItem);

        let buylistHotlistProductCardItemDTO = this.getBuylistHotlistProductCardItemById(existingBuylistHotlistProductCardItem.buylistHotlistProductCardItemId);

        return buylistHotlistProductCardItemDTO;
    
    }

    //TO DO:DELETE METHOD;

}