import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBuylistProductCardDTO, UpdateBuylistProductCardDTO, BuylistProductCardDTO } from './dto/buylist.product.card.dto';
import { BuylistProductCard } from 'src/typeorm/entities/tcgcommerce/modules/buylist/product/card/buylist.product.card.entity';
import { ErrorMessageService } from 'src/system/modules/error/message/error.message.service';
import { OnEvent } from '@nestjs/event-emitter';
import { ErrorMessageDTO } from 'src/system/modules/error/message/dto/error.message.dto';

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
            return this.errorMessageService.createErrorMessage('BUYLIST_PRODUCT_CARD_NOT_FOUND', 'Buylist product card was not found');
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
        
        let buylistProductCard = this.buylistProductCardRepository.create({ ...createBuylistProductCardDTO });
        //CREATE BUYLIST PRODUCT CARD CODE
        buylistProductCard.buylistProductCardCode = await this.createBuylistProductCardCode(
            createBuylistProductCardDTO.productVendorCode,
            createBuylistProductCardDTO.productLineCode,
            createBuylistProductCardDTO.productTypeCode,
            createBuylistProductCardDTO.productLanguageCode
        );

        buylistProductCard = await this.buylistProductCardRepository.save(buylistProductCard);

        let buylistProductCardDTO = this.getBuylistProductCardById(buylistProductCard.buylistProductCardId);
        
        return buylistProductCardDTO;
        
    }

    async updateBuylistProductCard(updateBuylistProductCardDTO: UpdateBuylistProductCardDTO) {
                    
        let buylistProductCard = await this.buylistProductCardRepository.findOne({ 
            where: { 
                buylistProductCardId: updateBuylistProductCardDTO.buylistProductCardId 
            } 
        });
            
        if (!buylistProductCard) {
            return this.errorMessageService.createErrorMessage('BUYLIST_PRODUCT_CARD_NOT_FOUND', 'Buylist product card was not found'); 
        }

        buylistProductCard.customerAccountUserId = updateBuylistProductCardDTO.customerAccountUserId;
        buylistProductCard.buylistLocationId = updateBuylistProductCardDTO.buylistLocationId;
        buylistProductCard.buylistLocationName = updateBuylistProductCardDTO.buylistLocationName;
        buylistProductCard.buylistTypeId = updateBuylistProductCardDTO.buylistTypeId;
        buylistProductCard.buylistTypeName = updateBuylistProductCardDTO.buylistTypeName;
        buylistProductCard.buylistStatusId = updateBuylistProductCardDTO.buylistStatusId;
        buylistProductCard.buylistStatusName = updateBuylistProductCardDTO.buylistStatusName;
        buylistProductCard.buylistPaymentTypeId = updateBuylistProductCardDTO.buylistPaymentTypeId;
        buylistProductCard.buylistPaymentTypeName = updateBuylistProductCardDTO.buylistPaymentTypeName;
        buylistProductCard.buylistPaymentServiceId = updateBuylistProductCardDTO.buylistPaymentServiceId;
        buylistProductCard.buylistPaymentServiceName = updateBuylistProductCardDTO.buylistPaymentServiceName;
        buylistProductCard.buylistProductCardUpdateDate = new Date();
        
        await this.buylistProductCardRepository.save(buylistProductCard);

        let buylistProductCardDTO = await this.getBuylistProductCardById(buylistProductCard.buylistProductCardId);
        
        return buylistProductCardDTO;
    
    }

    async createBuylistProductCardCode(productVendorCode: string, productLineCode: string, productTypeCode: string, productLanguageCode: string) {
        return `BPC-${productVendorCode}-${productLineCode}-${productTypeCode}-${productLanguageCode}-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    }

    //DELETE BUYLIST PRODUCT CARD, ONLY IF IT HASN'T BEEN SUBMITTED;

    @OnEvent('buylist.product.card.update.count')
    async updateBuylistProductCardCount(payload: any) {
        let buylistProductCard = await this.getBuylistProductCardById(payload.buylistProductCardId);
        let countType = payload.countType;
        if(buylistProductCard == null || buylistProductCard instanceof ErrorMessageDTO) {
            return this.errorMessageService.createErrorMessage('BUYLIST_PRODUCT_CARD_NOT_FOUND', 'Buylist product card was not found'); 
        }
        if(countType == "ADD") {
            buylistProductCard.buylistProductCardTotalCount = buylistProductCard.buylistProductCardTotalCount + payload.buylistProductCardItemCount;
            buylistProductCard.buylistProductCardTotalQtyCount = buylistProductCard.buylistProductCardTotalQtyCount + payload.buylistProductCardItemQtyCount;
        }
        else if(countType == "REMOVE") {
            buylistProductCard.buylistProductCardTotalCount = buylistProductCard.buylistProductCardTotalCount - payload.buylistProductCardItemCount;
            buylistProductCard.buylistProductCardTotalQtyCount = buylistProductCard.buylistProductCardTotalQtyCount - payload.buylistProductCardItemQtyCount;
        }
        
        buylistProductCard.buylistProductCardUpdateDate = new Date();

        await this.buylistProductCardRepository.save({ ...buylistProductCard });
    }
 
}