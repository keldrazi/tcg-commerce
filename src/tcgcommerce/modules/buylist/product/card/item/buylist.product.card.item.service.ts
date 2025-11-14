import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBuylistProductCardItemDTO, UpdateBuylistProductCardItemDTO, BuylistProductCardItemDTO } from './dto/buylist.product.card.item.dto';
import { BuylistProductCardItem } from 'src/typeorm/entities/tcgcommerce/modules/buylist/product/card/item/buylist.product.card.item.entity';

@Injectable()
export class BuylistProductCardItemService {

    constructor(
        @InjectRepository(BuylistProductCardItem) private buylistProductCardItemRepository: Repository<BuylistProductCardItem>,
    ) { }

    async getBuylistProductCardItemById(buylistProductCardItemId: string) {
        let buylistProductCardItem = await this.buylistProductCardItemRepository.findOne({ 
            where: { 
                buylistProductCardItemId: buylistProductCardItemId 
            } 
        });
        
        if (buylistProductCardItem == null) {
            return null;
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
        
        //TO DO: CREATE AN ERROR TO RETURN;
        if(buylistProductCardItems == null) {
            return null;
        }
        
        let buylistProductCardItemDTOs: BuylistProductCardItemDTO[] = [];

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
                    
        let existingBuylistProductCardItem = await this.getBuylistProductCardItemById(updateBuylistProductCardItemDTO.buylistProductCardItemId);
            
        //TO DO: RETUNR AN ERROR IF BUYLIST TYPE NOT FOUND;
        if (!existingBuylistProductCardItem) {
            return null; 
        }

        existingBuylistProductCardItem.productCardPrintingId = updateBuylistProductCardItemDTO.productCardPrintingId;
        existingBuylistProductCardItem.productCardPrintingName = updateBuylistProductCardItemDTO.productCardPrintingName;
        existingBuylistProductCardItem.productCardConditionId = updateBuylistProductCardItemDTO.productCardConditionId;
        existingBuylistProductCardItem.productCardConditionCode = updateBuylistProductCardItemDTO.productCardConditionCode;
        existingBuylistProductCardItem.productCardConditionName = updateBuylistProductCardItemDTO.productCardConditionName;
        existingBuylistProductCardItem.buylistProductCardItemQty = updateBuylistProductCardItemDTO.buylistProductCardItemQty;
        
        await this.buylistProductCardItemRepository.save(existingBuylistProductCardItem);

        let buylistProductCardItemDTO = this.getBuylistProductCardItemById(existingBuylistProductCardItem.buylistProductCardItemId);

        return buylistProductCardItemDTO;
    
    }
 
}