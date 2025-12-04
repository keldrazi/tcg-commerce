import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBuylistHotlistProductCardDTO, UpdateBuylistHotlistProductCardDTO, BuylistHotlistProductCardDTO } from './dto/buylist.hotlist.product.card.dto';
import { BuylistHotlistProductCard } from 'src/typeorm/entities/tcgcommerce/modules/buylist/hotlist/product/card/buylist.hotlist.product.card.entity';
import { ErrorMessageService } from 'src/system/modules/error/message/error.message.service';
import { ErrorMessageDTO } from 'src/system/modules/error/message/dto/error.message.dto';

@Injectable()
export class BuylistHotlistProductCardService {

    constructor(
        @InjectRepository(BuylistHotlistProductCard) private buylistHotlistProductCardRepository: Repository<BuylistHotlistProductCard>,
        private errorMessageService: ErrorMessageService,
    ) { }

    async getBuylistHotlistProductCardById(buylistHotlistProductCardId: string) {
        let buylistHotlistProductCard = await this.buylistHotlistProductCardRepository.findOne({ 
            where: { 
                buylistHotlistProductCardId: buylistHotlistProductCardId 
            } 
        });
        
        if(buylistHotlistProductCard == null) {
            return this.errorMessageService.createErrorMessage('BUYLIST_HOTLIST_PRODUCT_CARD_NOT_FOUND', 'Buylist hotlist product card was not found');
        }

        let buylistHotlistProductCardDTO: BuylistHotlistProductCardDTO = ({ ...buylistHotlistProductCard });

        return buylistHotlistProductCardDTO;
        
    }

    async getBuylistHotlistProductCardsByCommerceAccountId(commerceAccountId: string) {
        
        let buylistHotlistProductCardDTOs: BuylistHotlistProductCardDTO[] = [];
        
        let buylistHotlistProductCards = await this.buylistHotlistProductCardRepository.find({
            where: {
                commerceAccountId: commerceAccountId
            }
        });
        
        if(buylistHotlistProductCards == null) {
            return buylistHotlistProductCardDTOs;
        }
        
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
        if(existingBuylistHotlistProductCard == null || existingBuylistHotlistProductCard instanceof ErrorMessageDTO) {
            return this.errorMessageService.createErrorMessage('BUYLIST_HOTLIST_PRODUCT_CARD_NOT_FOUND', 'Buylist hotlist product card was not found');
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