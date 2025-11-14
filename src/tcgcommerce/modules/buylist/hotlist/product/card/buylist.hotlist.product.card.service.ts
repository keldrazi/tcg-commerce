import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBuylistHotlistProductCardDTO, UpdateBuylistHotlistProductCardDTO, BuylistHotlistProductCardDTO } from './dto/buylist.hotlist.product.card.dto';
import { BuylistHotlistProductCard } from 'src/typeorm/entities/tcgcommerce/modules/buylist/hotlist/product/card/buylist.hotlist.product.card.entity';

@Injectable()
export class BuylistHotlistProductCardService {

    constructor(
        @InjectRepository(BuylistHotlistProductCard) private buylistHotlistProductCardRepository: Repository<BuylistHotlistProductCard>,
    ) { }

    async getBuylistHotlistProductCardById(buylistHotlistProductCardId: string) {
        let buylistHotlistProductCard = await this.buylistHotlistProductCardRepository.findOne({ 
            where: { 
                buylistHotlistProductCardId: buylistHotlistProductCardId 
            } 
        });
        
        if (buylistHotlistProductCard == null) {
            return null;
        }

        let buylistHotlistProductCardDTO: BuylistHotlistProductCardDTO = ({ ...buylistHotlistProductCard });

        return buylistHotlistProductCardDTO;
        
    }

    async getBuylistHotlistProductCardsByCommerceAccountId(commerceAccountId: string) {
        let buylistHotlistProductCards = await this.buylistHotlistProductCardRepository.find({
            where: {
                commerceAccountId: commerceAccountId
            }
        });
        
        //TO DO: CREATE AN ERROR TO RETURN;
        if(buylistHotlistProductCards == null) {
            return null;
        }
        
        let buylistHotlistProductCardDTOs: BuylistHotlistProductCardDTO[] = [];

        for(let i = 0; i < buylistHotlistProductCards.length; i++) {
            let buylistHotlistProductCard = buylistHotlistProductCards[i];
            let buylistHotlistProductCardDTO: BuylistHotlistProductCardDTO = ({ ...buylistHotlistProductCard });

            buylistHotlistProductCardDTOs.push(buylistHotlistProductCardDTO);
        }

        return buylistHotlistProductCardDTOs;
    }
    
    async createBuylistHotlistProductCard(createBuylistHotlistProductCardDTO: CreateBuylistHotlistProductCardDTO) {

        //ADD SOME VALIDATION TO PREVENT DUPLICATE ENTRIES;
        
        let newBuylistHotlistProductCard = this.buylistHotlistProductCardRepository.create({ ...createBuylistHotlistProductCardDTO });
        newBuylistHotlistProductCard = await this.buylistHotlistProductCardRepository.save(newBuylistHotlistProductCard);

        let buylistHotlistProductCardDTO = this.getBuylistHotlistProductCardById(newBuylistHotlistProductCard.buylistHotlistProductCardId);
        
        return buylistHotlistProductCardDTO;
        
    }

    async updateBuylistHotlistProductCard(updateBuylistHotlistProductCardDTO: UpdateBuylistHotlistProductCardDTO) {
                    
        let existingBuylistHotlistProductCard = await this.getBuylistHotlistProductCardById(updateBuylistHotlistProductCardDTO.buylistHotlistProductCardId);
            
        //TO DO: RETUNR AN ERROR IF BUYLIST TYPE NOT FOUND;
        if (!existingBuylistHotlistProductCard) {
            return null; 
        }

        existingBuylistHotlistProductCard.commerceUserId = updateBuylistHotlistProductCardDTO.commerceUserId;
        existingBuylistHotlistProductCard.buylistLocationId = updateBuylistHotlistProductCardDTO.buylistLocationId;
        existingBuylistHotlistProductCard.buylistHotlistProductCardStartDateTime = updateBuylistHotlistProductCardDTO.buylistHotlistProductCardStartDateTime;
        existingBuylistHotlistProductCard.buylistHotlistProductCardEndDateTime = updateBuylistHotlistProductCardDTO.buylistHotlistProductCardEndDateTime;
        existingBuylistHotlistProductCard.buylistHotlistProductCardIsExternal = updateBuylistHotlistProductCardDTO.buylistHotlistProductCardIsExternal;
        
        await this.buylistHotlistProductCardRepository.save(existingBuylistHotlistProductCard);

        let buylistHotlistProductCardDTO = this.getBuylistHotlistProductCardById(existingBuylistHotlistProductCard.buylistHotlistProductCardId);

        return buylistHotlistProductCardDTO;
    
    }
 
}