import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBuylistProductCardItemDTO, UpdateBuylistProductCardItemDTO, BuylistProductCardItemDTO } from './dto/buylist.product.card.item.dto';
import { BuylistProductCardItem } from 'src/typeorm/entities/tcgcommerce/modules/buylist/product/card/item/buylist.product.card.item.entity';
import { ErrorMessageService } from 'src/system/modules/error/message/error.message.service';

@Injectable()
export class BuylistProductCardItemService {

    constructor(
        @InjectRepository(BuylistProductCardItem) private buylistProductCardItemRepository: Repository<BuylistProductCardItem>,
        private errorMessageService: ErrorMessageService,
    ) { }

    async getBuylistProductCardItemById(buylistProductCardItemId: string) {
        let buylistProductCardItem = await this.buylistProductCardItemRepository.findOne({ 
            where: { 
                buylistProductCardItemId: buylistProductCardItemId 
            } 
        });
        
        if (buylistProductCardItem == null) {
            return this.errorMessageService.createErrorMessage('BUYLIST_PRODUCT_CARD_ITEM_NOT_FOUND', 'Buylist product card item was not found for buylistProductCardItemId: ' + buylistProductCardItemId);
        }

        let buylistProductCardItemDTO: BuylistProductCardItemDTO = ({ ...buylistProductCardItem });

        return buylistProductCardItemDTO;
        
    }

    async getBuylistProductCardItemsByCommerceAccountId(commerceAccountId: string) {
        let buylistProductCardItems = await this.buylistProductCardItemRepository.find({
            where: {
                commerceAccountId: commerceAccountId
            }
        });
        
        let buylistProductCardItemDTOs: BuylistProductCardItemDTO[] = [];

        if(buylistProductCardItems == null) {
            return buylistProductCardItemDTOs;
        }
        
        for(let i = 0; i < buylistProductCardItems.length; i++) {
            let buylistProductCardItem = buylistProductCardItems[i];
            let buylistProductCardItemDTO: BuylistProductCardItemDTO = ({ ...buylistProductCardItem });

            buylistProductCardItemDTOs.push(buylistProductCardItemDTO);
        }

        return buylistProductCardItemDTOs;
    }
    
    async createBuylistProductCardItem(createBuylistProductCardItemDTO: CreateBuylistProductCardItemDTO) {

        //ADD SOME VALIDATION TO PREVENT DUPLICATE ENTRIES;
        
        let newBuylistProductCardItem = this.buylistProductCardItemRepository.create({ ...createBuylistProductCardItemDTO });
        newBuylistProductCardItem = await this.buylistProductCardItemRepository.save(newBuylistProductCardItem);

        let buylistProductCardItemDTO = this.getBuylistProductCardItemById(newBuylistProductCardItem.buylistProductCardItemId);
        
        return buylistProductCardItemDTO;
        
    }

    async updateBuylistProductCardItem(updateBuylistProductCardItemDTO: UpdateBuylistProductCardItemDTO) {
                    
        let existingBuylistProductCardItem = await this.buylistProductCardItemRepository.findOne({ 
            where: { 
                buylistProductCardItemId: updateBuylistProductCardItemDTO.buylistProductCardItemId 
            } 
        });   
        
        if (!existingBuylistProductCardItem) {
            return this.errorMessageService.createErrorMessage('BUYLIST_PRODUCT_CARD_ITEM_NOT_FOUND', 'Buylist product card item was not found for buylistProductCardItemId: ' + updateBuylistProductCardItemDTO.buylistProductCardItemId); 
        }

        existingBuylistProductCardItem.productCardPrintingId = updateBuylistProductCardItemDTO.productCardPrintingId;
        existingBuylistProductCardItem.productCardConditionId = updateBuylistProductCardItemDTO.productCardConditionId;
        existingBuylistProductCardItem.buylistProductCardItemQty = updateBuylistProductCardItemDTO.buylistProductCardItemQty;
        
        await this.buylistProductCardItemRepository.save(existingBuylistProductCardItem);

        let buylistProductCardItemDTO = this.getBuylistProductCardItemById(existingBuylistProductCardItem.buylistProductCardItemId);

        return buylistProductCardItemDTO;
    
    }
 
}