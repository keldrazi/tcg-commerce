import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBuylistProductCardDTO, UpdateBuylistProductCardDTO, BuylistProductCardDTO } from './dto/buylist.product.card.dto';
import { BuylistProductCard } from 'src/typeorm/entities/tcgcommerce/modules/buylist/product/card/buylist.product.card.entity';

@Injectable()
export class BuylistProductCardService {

    constructor(
        @InjectRepository(BuylistProductCard) private buylistProductCardRepository: Repository<BuylistProductCard>,
    ) { }

    async getBuylistProductCardById(buylistProductCardId: string) {
        let buylistProductCard = await this.buylistProductCardRepository.findOne({ 
            where: { 
                buylistProductCardId: buylistProductCardId 
            } 
        });
        
        if (buylistProductCard == null) {
            return null;
        }

        let buylistProductCardDTO: BuylistProductCardDTO = ({ ...buylistProductCard });

        return buylistProductCardDTO;
        
    }

    async getBuylistProductCardsByCommerceAccountId(commerceAccountId: string) {
        let buylistProductCards = await this.buylistProductCardRepository.find({
            where: {
                commerceAccountId: commerceAccountId
            }
        });
        
        //TO DO: CREATE AN ERROR TO RETURN;
        if(buylistProductCards == null) {
            return null;
        }
        
        let buylistProductCardDTOs: BuylistProductCardDTO[] = [];

        for(let i = 0; i < buylistProductCards.length; i++) {
            let buylistProductCard = buylistProductCards[i];
            let buylistProductCardDTO: BuylistProductCardDTO = ({ ...buylistProductCard });

            buylistProductCardDTOs.push(buylistProductCardDTO);
        }

        return buylistProductCardDTOs;
    }
    
    async createBuylistProductCard(createBuylistProductCardDTO: CreateBuylistProductCardDTO) {

        //ADD SOME VALIDATION TO PREVENT DUPLICATE ENTRIES;
        
        let newBuylistProductCard = this.buylistProductCardRepository.create({ ...createBuylistProductCardDTO });
        newBuylistProductCard = await this.buylistProductCardRepository.save(newBuylistProductCard);

        let buylistProductCardDTO = this.getBuylistProductCardById(newBuylistProductCard.buylistProductCardId);
        
        return buylistProductCardDTO;
        
    }

    async updateBuylistProductCard(updateBuylistProductCardDTO: UpdateBuylistProductCardDTO) {
                    
        let existingBuylistProductCard = await this.getBuylistProductCardById(updateBuylistProductCardDTO.buylistProductCardId);
            
        //TO DO: RETUNR AN ERROR IF BUYLIST TYPE NOT FOUND;
        if (!existingBuylistProductCard) {
            return null; 
        }

        existingBuylistProductCard.commerceUserId = updateBuylistProductCardDTO.commerceUserId;
        existingBuylistProductCard.buylistLocationId = updateBuylistProductCardDTO.buylistLocationId;
        existingBuylistProductCard.buylistTypeId = updateBuylistProductCardDTO.buylistTypeId;
        existingBuylistProductCard.buylistPaymentTypeId = updateBuylistProductCardDTO.buylistPaymentTypeId;
        existingBuylistProductCard.buylistPaymentServiceId = updateBuylistProductCardDTO.buylistPaymentServiceId;
        
        await this.buylistProductCardRepository.save(existingBuylistProductCard);

        let buylistProductCardDTO = this.getBuylistProductCardById(existingBuylistProductCard.buylistProductCardId);

        return buylistProductCardDTO;
    
    }
 
}