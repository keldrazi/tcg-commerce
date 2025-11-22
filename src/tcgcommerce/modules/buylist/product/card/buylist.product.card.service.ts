import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBuylistProductCardDTO, UpdateBuylistProductCardDTO, BuylistProductCardDTO } from './dto/buylist.product.card.dto';
import { BuylistProductCard } from 'src/typeorm/entities/tcgcommerce/modules/buylist/product/card/buylist.product.card.entity';
import { ErrorMessageService } from 'src/system/modules/error/message/error.message.service';
import { OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class BuylistProductCardService {

    constructor(
        @InjectRepository(BuylistProductCard) private buylistProductCardRepository: Repository<BuylistProductCard>,
        private errorMessageService: ErrorMessageService,
    ) { }

    async getBuylistProductCardById(buylistProductCardId: string) {
        let buylistProductCard = await this.buylistProductCardRepository.findOne({ 
            where: { 
                buylistProductCardId: buylistProductCardId 
            } 
        });
        
        if (buylistProductCard == null) {
            return this.errorMessageService.createErrorMessage('BUYLIST_PRODUCT_CARD_NOT_FOUND', 'Buylist product card was not found for buylistProductCardId: ' + buylistProductCardId);
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
        
        let buylistProductCardDTOs: BuylistProductCardDTO[] = [];
       
        if(buylistProductCards == null) {
            return buylistProductCardDTOs;
        }
        
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
                    
        let existingBuylistProductCard = await this.buylistProductCardRepository.findOne({ 
            where: { 
                buylistProductCardId: updateBuylistProductCardDTO.buylistProductCardId 
            } 
        });
            
        //TO DO: RETUNR AN ERROR IF BUYLIST TYPE NOT FOUND;
        if (!existingBuylistProductCard) {
            return this.errorMessageService.createErrorMessage('BUYLIST_PRODUCT_CARD_NOT_FOUND', 'Buylist product card was not found for buylistProductCardId: ' + updateBuylistProductCardDTO.buylistProductCardId); 
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

    @OnEvent('buylist.product.card.update.count')
    async updateBuylistProductCardCount(payload: any) {
        // Handle the event here
    }
 
}