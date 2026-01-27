import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBuylistQuicklistProductCardItemDTO, BuylistQuicklistProductCardItemDTO } from './dto/buylist.quicklist.product.card.item.dto';
import { BuylistQuicklistProductCardItem } from 'src/typeorm/entities/tcgcommerce/modules/buylist/quicklist/product/card/item/buylist.quicklist.product.card.item.entity';


@Injectable()
export class BuylistQuicklistProductCardItemService {

    constructor(
        @InjectRepository(BuylistQuicklistProductCardItem) private buylistQuicklistProductCardItemRepository: Repository<BuylistQuicklistProductCardItem>,
    ) { }

    async getBuylistQuicklistProductCardItemById(buylistQuicklistProductCardItemId: string): Promise<BuylistQuicklistProductCardItemDTO> {
        let buylistQuicklistProductCardItem = await this.buylistQuicklistProductCardItemRepository.findOne({ 
            where: { 
                buylistQuicklistProductCardItemId: buylistQuicklistProductCardItemId 
            } 
        });
        
        if (buylistQuicklistProductCardItem == null) {
            throw new NotFoundException('Buylist quicklist product card item was not found');
        }

        let buylistQuicklistProductCardItemDTO: BuylistQuicklistProductCardItemDTO = ({ ...buylistQuicklistProductCardItem });

        return buylistQuicklistProductCardItemDTO;
        
    }

    async getBuylistQuicklistProductCardItemsByBuyListQuicklistProductCardId(buylistQuicklistProductCardId: string): Promise<BuylistQuicklistProductCardItemDTO[]> {
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

    
    async createBuylistQuicklistProductCardItem(createBuylistQuicklistProductCardItemDTO: CreateBuylistQuicklistProductCardItemDTO): Promise<BuylistQuicklistProductCardItemDTO> {

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
            throw new ConflictException('Buylist quicklist product card item exists');
        }
        
        buylistQuicklistProductCardItem = this.buylistQuicklistProductCardItemRepository.create({ ...createBuylistQuicklistProductCardItemDTO });
        buylistQuicklistProductCardItem = await this.buylistQuicklistProductCardItemRepository.save(buylistQuicklistProductCardItem);

        let buylistQuicklistProductCardItemDTO = await this.getBuylistQuicklistProductCardItemById(buylistQuicklistProductCardItem.buylistQuicklistProductCardItemId);
        
        return buylistQuicklistProductCardItemDTO;
        
    }

    async deleteBuylistQuicklistProductCardItemById(buylistQuicklistProductCardItemId: string): Promise<boolean> {

        let buylistQuicklistProductCardItem = await this.buylistQuicklistProductCardItemRepository.findOne({ 
            where: { 
                buylistQuicklistProductCardItemId: buylistQuicklistProductCardItemId 
            } 
        });

        if (buylistQuicklistProductCardItem == null) {
            throw new NotFoundException('Buylist quicklist product card item was not found');
        }

        await this.buylistQuicklistProductCardItemRepository.delete({ buylistQuicklistProductCardItemId: buylistQuicklistProductCardItemId });

        return true;

    }

    async deleteBuylistQuicklistProductCardItemsByBuylistQuicklistProductCardId(buylistQuicklistProductCardId: string): Promise<boolean> {

        let buylistQuicklistProductCardItems = await this.buylistQuicklistProductCardItemRepository.find({ 
            where: { 
                buylistQuicklistProductCardId: buylistQuicklistProductCardId 
            } 
        }); 

        if (buylistQuicklistProductCardItems == null || buylistQuicklistProductCardItems.length == 0) {
            throw new NotFoundException('Buylist quicklist product card items were not found');
        }

        await this.buylistQuicklistProductCardItemRepository.delete({ buylistQuicklistProductCardId: buylistQuicklistProductCardId });

        return true;
    }
}