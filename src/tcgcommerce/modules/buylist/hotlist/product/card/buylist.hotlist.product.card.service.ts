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

        let buylistHotlistProductCard = await this.buylistHotlistProductCardRepository.findOne({ 
            where: { 
                commerceAccountId: createBuylistHotlistProductCardDTO.commerceAccountId,
                buylistLocationId: createBuylistHotlistProductCardDTO.buylistLocationId,
                productVendorId: createBuylistHotlistProductCardDTO.productVendorId,
                productLineId: createBuylistHotlistProductCardDTO.productLineId,
                productTypeId: createBuylistHotlistProductCardDTO.productTypeId,
                productLanguageId: createBuylistHotlistProductCardDTO.productLanguageId,
                buylistHotlistProductCardCode: createBuylistHotlistProductCardDTO.buylistHotlistProductCardCode 
            } 
        });
        
        if(buylistHotlistProductCard != null) {
            return this.errorMessageService.createErrorMessage('BUYLIST_HOTLIST_PRODUCT_CARD_ALREADY_EXISTS', 'Buylist hotlist product card already exists');
        }

        buylistHotlistProductCard = this.buylistHotlistProductCardRepository.create({ ...createBuylistHotlistProductCardDTO });
        buylistHotlistProductCard = await this.buylistHotlistProductCardRepository.save(buylistHotlistProductCard);

        let buylistHotlistProductCardDTO = this.getBuylistHotlistProductCardById(buylistHotlistProductCard.buylistHotlistProductCardId);
        
        return buylistHotlistProductCardDTO;
        
    }

    async updateBuylistHotlistProductCard(updateBuylistHotlistProductCardDTO: UpdateBuylistHotlistProductCardDTO) {
                    
        let buylistHotlistProductCard = await this.buylistHotlistProductCardRepository.findOne({ 
            where: { 
                buylistHotlistProductCardId: updateBuylistHotlistProductCardDTO.buylistHotlistProductCardId 
            } 
        });
        
        if(buylistHotlistProductCard == null) {
            return this.errorMessageService.createErrorMessage('BUYLIST_HOTLIST_PRODUCT_CARD_NOT_FOUND', 'Buylist hotlist product card was not found');
        }

        buylistHotlistProductCard.commerceUserId = updateBuylistHotlistProductCardDTO.commerceUserId;
        buylistHotlistProductCard.buylistLocationId = updateBuylistHotlistProductCardDTO.buylistLocationId;
        buylistHotlistProductCard.buylistHotlistProductCardStartDateTime = updateBuylistHotlistProductCardDTO.buylistHotlistProductCardStartDateTime;
        buylistHotlistProductCard.buylistHotlistProductCardEndDateTime = updateBuylistHotlistProductCardDTO.buylistHotlistProductCardEndDateTime;
        buylistHotlistProductCard.buylistHotlistProductCardIsExternal = updateBuylistHotlistProductCardDTO.buylistHotlistProductCardIsExternal;
        
        await this.buylistHotlistProductCardRepository.save(buylistHotlistProductCard);

        let buylistHotlistProductCardDTO = await this.getBuylistHotlistProductCardById(buylistHotlistProductCard.buylistHotlistProductCardId);
        
        return buylistHotlistProductCardDTO;
    
    }

    async deleteBuylistHotlistProductCard(buylistHotlistProductCardId: string) {

        let buylistHotlistProductCard = await this.buylistHotlistProductCardRepository.findOne({ 
            where: { 
                buylistHotlistProductCardId: buylistHotlistProductCardId 
            } 
        });

        if (buylistHotlistProductCard == null) {
            return this.errorMessageService.createErrorMessage('BUYLIST_HOTLIST_PRODUCT_CARD_NOT_FOUND', 'Buylist hotlist product card was not found');
        }

        await this.buylistHotlistProductCardRepository.delete({buylistHotlistProductCardId: buylistHotlistProductCardId});

        return true;
    }
 
}