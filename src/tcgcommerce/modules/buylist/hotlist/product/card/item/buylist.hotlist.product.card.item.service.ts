import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBuylistHotlistProductCardItemDTO, UpdateBuylistHotlistProductCardItemDTO, BuylistHotlistProductCardItemDTO } from './dto/buylist.hotlist.product.card.item.dto';
import { BuylistHotlistProductCardItem } from 'src/typeorm/entities/tcgcommerce/modules/buylist/hotlist/product/card/item/buylist.hotlist.product.card.item.entity';

@Injectable()
export class BuylistHotlistProductCardItemService {

    constructor(
        @InjectRepository(BuylistHotlistProductCardItem) private buylistHotlistProductCardItemRepository: Repository<BuylistHotlistProductCardItem>,
    ) { }

    async getBuylistHotlistProductCardItemById(buylistHotlistProductCardItemId: string) {
        let buylistHotlistProductCardItem = await this.buylistHotlistProductCardItemRepository.findOne({ 
            where: { 
                buylistHotlistProductCardItemId: buylistHotlistProductCardItemId 
            } 
        });
        
        if (buylistHotlistProductCardItem == null) {
            return null;
        }

        let buylistHotlistProductCardItemDTO: BuylistHotlistProductCardItemDTO = ({ ...buylistHotlistProductCardItem });

        return buylistHotlistProductCardItemDTO;
        
    }

    async getBuylistHotlistProductCardItemsByCommerceAccountId(commerceAccountId: string) {
        let buylistHotlistProductCardItems = await this.buylistHotlistProductCardItemRepository.find({
            where: {
                commerceAccountId: commerceAccountId
            }
        });
        
        //TO DO: CREATE AN ERROR TO RETURN;
        if(buylistHotlistProductCardItems == null) {
            return null;
        }
        
        let buylistHotlistProductCardItemDTOs: BuylistHotlistProductCardItemDTO[] = [];

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
        if (!existingBuylistHotlistProductCardItem) {
            return null; 
        }

        existingBuylistHotlistProductCardItem.productCardPrintingId = updateBuylistHotlistProductCardItemDTO.productCardPrintingId;
        existingBuylistHotlistProductCardItem.buylistHotlistProductCardItemQty = updateBuylistHotlistProductCardItemDTO.buylistHotlistProductCardItemQty;
        existingBuylistHotlistProductCardItem.buylistHotlistProductCardItemOverridePriceEnabled = updateBuylistHotlistProductCardItemDTO.buylistHotlistProductCardItemOverridePriceEnabled;
        existingBuylistHotlistProductCardItem.buylistHotlistProductCardItemOverridePrice = updateBuylistHotlistProductCardItemDTO.buylistHotlistProductCardItemOverridePrice;
        
        await this.buylistHotlistProductCardItemRepository.save(existingBuylistHotlistProductCardItem);

        let buylistHotlistProductCardItemDTO = this.getBuylistHotlistProductCardItemById(existingBuylistHotlistProductCardItem.buylistHotlistProductCardItemId);

        return buylistHotlistProductCardItemDTO;
    
    }

}