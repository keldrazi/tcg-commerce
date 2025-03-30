import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PricingProductCardDTO, PricingProductCardsDTO, CreatePricingProductCardDTO, UpdatePricingProductCardDTO } from './dto/pricing.product.card.dto';
import { PricingProductCard } from 'src/typeorm/entities/tcgcommerce/modules/pricing/product/card/pricing.product.card.entity';

@Injectable()
export class PricingProductCardService {

    constructor(
        @InjectRepository(PricingProductCard) private pricingProductCardRepository: Repository<PricingProductCard>,
    ) { }

    async getPricingProductCardsByCommerceAccountId(commerceAccountId: string) {
        let pricingProductCards = await this.pricingProductCardRepository.find({
            where: {
                commerceAccountId: commerceAccountId
            }
        });
        
        //TO DO: CREATE AN ERROR TO RETURN;
        if(pricingProductCards == null) {
            return null;
        }
        
        let pricingProductCardDTOs: PricingProductCardDTO[] = [];

        for(let i = 0; i < pricingProductCards.length; i++) {
            let pricingProductCard = pricingProductCards[i];
            let pricingProductCardDTO = new PricingProductCardDTO();
            pricingProductCardDTO.pricingProductCardId = pricingProductCard.pricingProductCardId;
            pricingProductCardDTO.commerceAccountId = pricingProductCard.commerceAccountId;
            pricingProductCardDTO.productCardTypeName = pricingProductCard.productCardTypeName;
            pricingProductCardDTO.pricingProductCardPriceType = pricingProductCard.pricingProductCardPriceType;
            pricingProductCardDTO.pricingProductCardPriceTypeOption = pricingProductCard.pricingProductCardPriceTypeOption;
            pricingProductCardDTO.pricingProductCardRuleMetadata = pricingProductCard.pricingProductCardRuleMetadata;
            pricingProductCardDTO.pricingProductCardUpdateDate = pricingProductCard.pricingProductCardUpdateDate;
            
            pricingProductCardDTOs.push(pricingProductCardDTO);
        }

        return pricingProductCardDTOs;
    }

    async getPricingProductCardsByPricingProductCardId(pricingProductCardId: string) {
        let pricingProductCard = await this.pricingProductCardRepository.findOne({
            where: {
                pricingProductCardId: pricingProductCardId
            }
        });
        
        //TO DO: CREATE AN ERROR TO RETURN;
        if(pricingProductCard == null) {
            return null;
        }
        
        let pricingProductCardDTO = new PricingProductCardDTO();
        pricingProductCardDTO.pricingProductCardId = pricingProductCard.pricingProductCardId;
        pricingProductCardDTO.commerceAccountId = pricingProductCard.commerceAccountId;
        pricingProductCardDTO.productCardTypeName = pricingProductCard.productCardTypeName;
        pricingProductCardDTO.pricingProductCardPriceType = pricingProductCard.pricingProductCardPriceType;
        pricingProductCardDTO.pricingProductCardPriceTypeOption = pricingProductCard.pricingProductCardPriceTypeOption;
        pricingProductCardDTO.pricingProductCardRuleMetadata = pricingProductCard.pricingProductCardRuleMetadata;
        pricingProductCardDTO.pricingProductCardUpdateDate = pricingProductCard.pricingProductCardUpdateDate;
            

        return pricingProductCardDTO;
    }
    
    async getPricingProductCardByCommerceAccountIdAndProductCardType(commerceAccountId: string, productCardTypeName: string) {
        let pricingProductCard = await this.pricingProductCardRepository.findOne({
            where: {
                commerceAccountId: commerceAccountId,
                productCardTypeName: productCardTypeName
            }
        });
        
        //TO DO: CREATE AN ERROR TO RETURN;
        if(pricingProductCard == null) {
            return null;
        }
        
        let pricingProductCardDTO = new PricingProductCardDTO();
        pricingProductCardDTO.pricingProductCardId = pricingProductCard.pricingProductCardId;
        pricingProductCardDTO.commerceAccountId = pricingProductCard.commerceAccountId;
        pricingProductCardDTO.productCardTypeName = pricingProductCard.productCardTypeName;
        pricingProductCardDTO.pricingProductCardPriceType = pricingProductCard.pricingProductCardPriceType;
        pricingProductCardDTO.pricingProductCardPriceTypeOption = pricingProductCard.pricingProductCardPriceTypeOption;
        pricingProductCardDTO.pricingProductCardRuleMetadata = pricingProductCard.pricingProductCardRuleMetadata;
        pricingProductCardDTO.pricingProductCardUpdateDate = pricingProductCard.pricingProductCardUpdateDate;

        return pricingProductCardDTO;
    }
    
    async createPricingProductCard(createPricingProductCardDTO: CreatePricingProductCardDTO) {
    
        //CHECK TO SEE IF THE PRODUCT CARD TYPE ALREADY EXISTS;
        let pricingProductCard = await this.getPricingProductCardByCommerceAccountIdAndProductCardType(createPricingProductCardDTO.commerceAccountId, createPricingProductCardDTO.productCardTypeName);
        
        //TO DO: RETURN AN ERROR FOR DUPLICATE PRICING PRODUCT CARD;
        if (pricingProductCard != null) {
            return null;
        }
        
        let newPricingProductCard = this.pricingProductCardRepository.create({ ...createPricingProductCardDTO });
        newPricingProductCard = await this.pricingProductCardRepository.save(newPricingProductCard);

        let pricingProductCardDTO = new PricingProductCardDTO();
        pricingProductCardDTO.pricingProductCardId = newPricingProductCard.pricingProductCardId;
        pricingProductCardDTO.commerceAccountId = newPricingProductCard.commerceAccountId;
        pricingProductCardDTO.productCardTypeName = newPricingProductCard.productCardTypeName;
        pricingProductCardDTO.pricingProductCardPriceType = newPricingProductCard.pricingProductCardPriceType;
        pricingProductCardDTO.pricingProductCardPriceTypeOption = newPricingProductCard.pricingProductCardPriceTypeOption;
        pricingProductCardDTO.pricingProductCardRuleMetadata = newPricingProductCard.pricingProductCardRuleMetadata;
        pricingProductCardDTO.pricingProductCardUpdateDate = newPricingProductCard.pricingProductCardUpdateDate;

        return pricingProductCardDTO;
        
    }   

    async updatePricingProductCard(updatePricingProductCardDTO: UpdatePricingProductCardDTO) {
    
        //CHECK TO SEE IF THE PRODUCT CARD TYPE ALREADY EXISTS;
        let pricingProductCard = await this.pricingProductCardRepository.findOne({
            where: {
                pricingProductCardId: updatePricingProductCardDTO.pricingProductCardId
            }
        });
        
        //TO DO: RETURN AN ERROR FOR DUPLICATE PRICING PRODUCT CARD;
        if (pricingProductCard == null) {
            return null;
        }

        pricingProductCard.pricingProductCardPriceType = updatePricingProductCardDTO.pricingProductCardPriceType;
        pricingProductCard.pricingProductCardPriceTypeOption = updatePricingProductCardDTO.pricingProductCardPriceTypeOption;
        pricingProductCard.pricingProductCardRuleMetadata = updatePricingProductCardDTO.pricingProductCardRuleMetadata;
        pricingProductCard.pricingProductCardUpdateDate = new Date();

        pricingProductCard = await this.pricingProductCardRepository.save(pricingProductCard);

        let pricingProductCardDTO = this.getPricingProductCardsByPricingProductCardId(pricingProductCard.pricingProductCardId);

        return pricingProductCardDTO;
        
    }   
}