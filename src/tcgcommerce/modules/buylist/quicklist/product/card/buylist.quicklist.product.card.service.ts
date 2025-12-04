import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBuylistQuicklistProductCardDTO, UpdateBuylistQuicklistProductCardDTO, BuylistQuicklistProductCardDTO } from './dto/buylist.quicklist.product.card.dto';
import { BuylistQuicklistProductCard } from 'src/typeorm/entities/tcgcommerce/modules/buylist/quicklist/product/card/buylist.quicklist.product.card.entity';
import { ErrorMessageService } from 'src/system/modules/error/message/error.message.service';
import { ErrorMessageDTO } from 'src/system/modules/error/message/dto/error.message.dto';

@Injectable()
export class BuylistQuicklistProductCardService {

    constructor(
        @InjectRepository(BuylistQuicklistProductCard) private buylistQuicklistProductCardRepository: Repository<BuylistQuicklistProductCard>,
        private errorMessageService: ErrorMessageService,
    ) { }

    async getBuylistQuicklistProductCardById(buylistQuicklistProductCardId: string) {
        let buylistQuicklistProductCard = await this.buylistQuicklistProductCardRepository.findOne({ 
            where: { 
                buylistQuicklistProductCardId: buylistQuicklistProductCardId 
            } 
        });
        
        if (buylistQuicklistProductCard == null) {
            return this.errorMessageService.createErrorMessage('BUYLIST_QUICKLIST_PRODUCT_CARD_NOT_FOUND', 'Buylist quicklist product card was not found');
        }

        let buylistQuicklistProductCardDTO: BuylistQuicklistProductCardDTO = ({ ...buylistQuicklistProductCard });

        return buylistQuicklistProductCardDTO;
        
    }

    async getBuylistQuicklistProductCardsByCommerceAccountId(commerceAccountId: string) {
        
        let buylistQuicklistProductCardDTOs: BuylistQuicklistProductCardDTO[] = [];

        let buylistQuicklistProductCards = await this.buylistQuicklistProductCardRepository.find({
            where: {
                commerceAccountId: commerceAccountId
            }
        });
        
        if(buylistQuicklistProductCards == null) {
            return buylistQuicklistProductCardDTOs;
        }
        
        for(let i = 0; i < buylistQuicklistProductCards.length; i++) {
            let buylistQuicklistProductCard = buylistQuicklistProductCards[i];
            let buylistQuicklistProductCardDTO: BuylistQuicklistProductCardDTO = ({ ...buylistQuicklistProductCard });

            buylistQuicklistProductCardDTOs.push(buylistQuicklistProductCardDTO);
        }

        return buylistQuicklistProductCardDTOs;
    }
    
    async createBuylistQuicklistProductCard(createBuylistQuicklistProductCardDTO: CreateBuylistQuicklistProductCardDTO) {

        //ADD SOME VALIDATION TO PREVENT DUPLICATE ENTRIES;
        
        let newBuylistQuicklistProductCard = this.buylistQuicklistProductCardRepository.create({ ...createBuylistQuicklistProductCardDTO });
        newBuylistQuicklistProductCard = await this.buylistQuicklistProductCardRepository.save(newBuylistQuicklistProductCard);

        let buylistQuicklistProductCardDTO = this.getBuylistQuicklistProductCardById(newBuylistQuicklistProductCard.buylistQuicklistProductCardId);
        
        return buylistQuicklistProductCardDTO;
        
    }

    async updateBuylistQuicklistProductCard(updateBuylistQuicklistProductCardDTO: UpdateBuylistQuicklistProductCardDTO) {
                    
        let existingBuylistQuicklistProductCard = await this.getBuylistQuicklistProductCardById(updateBuylistQuicklistProductCardDTO.buylistQuicklistProductCardId);
            
        //TO DO: RETUNR AN ERROR IF BUYLIST TYPE NOT FOUND;
        if (existingBuylistQuicklistProductCard == null || existingBuylistQuicklistProductCard instanceof ErrorMessageDTO) {
            return this.errorMessageService.createErrorMessage('BUYLIST_QUICKLIST_PRODUCT_CARD_NOT_FOUND', 'Buylist quicklist product card was not found'); 
        }

        existingBuylistQuicklistProductCard.commerceUserId = updateBuylistQuicklistProductCardDTO.commerceUserId;
        existingBuylistQuicklistProductCard.buylistLocationId = updateBuylistQuicklistProductCardDTO.buylistLocationId;
        existingBuylistQuicklistProductCard.buylistQuicklistProductCardIsActive = updateBuylistQuicklistProductCardDTO.buylistQuicklistProductCardIsActive;
        
        await this.buylistQuicklistProductCardRepository.save(existingBuylistQuicklistProductCard);

        let buylistQuicklistProductCardDTO = this.getBuylistQuicklistProductCardById(existingBuylistQuicklistProductCard.buylistQuicklistProductCardId);

        return buylistQuicklistProductCardDTO;
    
    }
 
}