import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBuylistHotlistProductCardItemDTO, UpdateBuylistHotlistProductCardItemDTO, BuylistHotlistProductCardItemDTO } from './dto/buylist.hotlist.product.card.item.dto';
import { BuylistHotlistProductCardItem } from 'src/typeorm/entities/tcgcommerce/modules/buylist/hotlist/product/card/item/buylist.hotlist.product.card.item.entity';


@Injectable()
export class BuylistHotlistProductCardItemService {

    constructor(
        @InjectRepository(BuylistHotlistProductCardItem) private buylistHotlistProductCardItemRepository: Repository<BuylistHotlistProductCardItem>,
    ) { }

    async getBuylistHotlistProductCardItemById(buylistHotlistProductCardItemId: string): Promise<BuylistHotlistProductCardItemDTO> {
        let buylistHotlistProductCardItem = await this.buylistHotlistProductCardItemRepository.findOne({ 
            where: { 
                buylistHotlistProductCardItemId: buylistHotlistProductCardItemId 
            } 
        });
        
        if(buylistHotlistProductCardItem == null) {
            throw new NotFoundException('Buylist hotlist product card item was not found');
        }

        let buylistHotlistProductCardItemDTO: BuylistHotlistProductCardItemDTO = ({ ...buylistHotlistProductCardItem });

        return buylistHotlistProductCardItemDTO;
        
    }

    async getBuylistHotlistProductCardItemsByBuylistHotlistProductCardId(buylistHotlistProductCardId: string): Promise<BuylistHotlistProductCardItemDTO[]> {
        
        let buylistHotlistProductCardItemDTOs: BuylistHotlistProductCardItemDTO[] = [];
        
        let buylistHotlistProductCardItems = await this.buylistHotlistProductCardItemRepository.find({
            where: {
                buylistHotlistProductCardId: buylistHotlistProductCardId
            }
        });
        
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
    
    async createBuylistHotlistProductCardItem(createBuylistHotlistProductCardItemDTO: CreateBuylistHotlistProductCardItemDTO): Promise<BuylistHotlistProductCardItemDTO> {

        let buylistHotlistProductCardItem = await this.buylistHotlistProductCardItemRepository.findOne({ 
            where: { 
                productCardId: createBuylistHotlistProductCardItemDTO.productCardId,
                productCardNumber: createBuylistHotlistProductCardItemDTO.productCardNumber,
                productSetId: createBuylistHotlistProductCardItemDTO.productSetId,
                productLanguageId: createBuylistHotlistProductCardItemDTO.productLanguageId,
                productCardPrintingId: createBuylistHotlistProductCardItemDTO.productCardPrintingId
            } 
        });

        if (buylistHotlistProductCardItem != null) {
            throw new ConflictException('Buylist hotlist product card item exists');
        }
        
        buylistHotlistProductCardItem = this.buylistHotlistProductCardItemRepository.create({ ...createBuylistHotlistProductCardItemDTO });
        buylistHotlistProductCardItem = await this.buylistHotlistProductCardItemRepository.save(buylistHotlistProductCardItem);

        let buylistHotlistProductCardItemDTO = this.getBuylistHotlistProductCardItemById(buylistHotlistProductCardItem.buylistHotlistProductCardItemId);
        
        return buylistHotlistProductCardItemDTO;
        
    }

    async updateBuylistHotlistProductCardItem(updateBuylistHotlistProductCardItemDTO: UpdateBuylistHotlistProductCardItemDTO): Promise<BuylistHotlistProductCardItemDTO> {
                    
        let buylistHotlistProductCardItem = await this.buylistHotlistProductCardItemRepository.findOne({ 
            where: { 
                buylistHotlistProductCardItemId: updateBuylistHotlistProductCardItemDTO.buylistHotlistProductCardItemId 
            } 
        });
        
        if(buylistHotlistProductCardItem == null) {
            throw new NotFoundException('Buylist hotlist product card item was not found');
        }

        buylistHotlistProductCardItem.productCardPrintingId = updateBuylistHotlistProductCardItemDTO.productCardPrintingId;
        buylistHotlistProductCardItem.buylistHotlistProductCardItemQty = updateBuylistHotlistProductCardItemDTO.buylistHotlistProductCardItemQty;
        buylistHotlistProductCardItem.buylistHotlistProductCardItemOverridePriceEnabled = updateBuylistHotlistProductCardItemDTO.buylistHotlistProductCardItemOverridePriceEnabled;
        buylistHotlistProductCardItem.buylistHotlistProductCardItemOverridePrice = updateBuylistHotlistProductCardItemDTO.buylistHotlistProductCardItemOverridePrice;
        
        await this.buylistHotlistProductCardItemRepository.save(buylistHotlistProductCardItem);

        let buylistHotlistProductCardItemDTO = await this.getBuylistHotlistProductCardItemById(buylistHotlistProductCardItem.buylistHotlistProductCardItemId);
        
        return buylistHotlistProductCardItemDTO;
    
    }

    async deleteBuylistHotlistProductCardItemById(buylistHotlistProductCardItemId: string): Promise<boolean> {
        let buylistHotlistProductCardItem = await this.buylistHotlistProductCardItemRepository.findOne({ 
            where: { 
                buylistHotlistProductCardItemId: buylistHotlistProductCardItemId 
            } 
        }); 

        if (buylistHotlistProductCardItem == null) {
            throw new NotFoundException('Buylist hotlist product card item was not found');
        }

        await this.buylistHotlistProductCardItemRepository.delete({ buylistHotlistProductCardItemId: buylistHotlistProductCardItemId });

        return true;
    }

    async deleteBuylistHotlistProductCardItemsByBuylistHotlistProductCardId(buylistHotlistProductCardId: string): Promise<boolean> {
        let buylistHotlistProductCardItems = await this.buylistHotlistProductCardItemRepository.find({ 
            where: { 
                buylistHotlistProductCardId: buylistHotlistProductCardId 
            } 
        });

        if (buylistHotlistProductCardItems == null || buylistHotlistProductCardItems.length == 0) {
            throw new NotFoundException('Buylist hotlist product card items were not found');
        }

        await this.buylistHotlistProductCardItemRepository.delete({ buylistHotlistProductCardId: buylistHotlistProductCardId });

        return true;
    }


}