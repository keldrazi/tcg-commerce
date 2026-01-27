import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBuylistQuicklistProductCardDTO, UpdateBuylistQuicklistProductCardDTO, BuylistQuicklistProductCardDTO } from './dto/buylist.quicklist.product.card.dto';
import { BuylistQuicklistProductCard } from 'src/typeorm/entities/tcgcommerce/modules/buylist/quicklist/product/card/buylist.quicklist.product.card.entity';

@Injectable()
export class BuylistQuicklistProductCardService {

    constructor(
        @InjectRepository(BuylistQuicklistProductCard) private buylistQuicklistProductCardRepository: Repository<BuylistQuicklistProductCard>,
    ) { }

    async getBuylistQuicklistProductCardById(buylistQuicklistProductCardId: string): Promise<BuylistQuicklistProductCardDTO> {
        let buylistQuicklistProductCard = await this.buylistQuicklistProductCardRepository.findOne({ 
            where: { 
                buylistQuicklistProductCardId: buylistQuicklistProductCardId 
            } 
        });
        
        if (buylistQuicklistProductCard == null) {
            throw new NotFoundException('Buylist quicklist product card was not found');
        }

        let buylistQuicklistProductCardDTO: BuylistQuicklistProductCardDTO = ({ ...buylistQuicklistProductCard });

        return buylistQuicklistProductCardDTO;
        
    }

    async getBuylistQuicklistProductCardsByCommerceAccountId(commerceAccountId: string): Promise<BuylistQuicklistProductCardDTO[]> {
        
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
    
    async createBuylistQuicklistProductCard(createBuylistQuicklistProductCardDTO: CreateBuylistQuicklistProductCardDTO): Promise<BuylistQuicklistProductCardDTO> {

        let buylistQuicklistProductCard = await this.buylistQuicklistProductCardRepository.findOne({ 
            where: { 
                commerceAccountId: createBuylistQuicklistProductCardDTO.commerceAccountId,
                buylistLocationId: createBuylistQuicklistProductCardDTO.buylistLocationId,
                productVendorId: createBuylistQuicklistProductCardDTO.productVendorId,
                productLineId: createBuylistQuicklistProductCardDTO.productLineId,
                productTypeId: createBuylistQuicklistProductCardDTO.productTypeId,
                productLanguageId: createBuylistQuicklistProductCardDTO.productLanguageId,
                buylistQuicklistProductCardCode: createBuylistQuicklistProductCardDTO.buylistQuicklistProductCardCode 
            } 
        });
        
        if (buylistQuicklistProductCard != null) {
            throw new ConflictException('Buylist quicklist product card already exists');
        }
        
        
        buylistQuicklistProductCard = this.buylistQuicklistProductCardRepository.create({ ...createBuylistQuicklistProductCardDTO });
        buylistQuicklistProductCard = await this.buylistQuicklistProductCardRepository.save(buylistQuicklistProductCard);

        let buylistQuicklistProductCardDTO = this.getBuylistQuicklistProductCardById(buylistQuicklistProductCard.buylistQuicklistProductCardId);
        
        return buylistQuicklistProductCardDTO;
        
    }

    async updateBuylistQuicklistProductCard(updateBuylistQuicklistProductCardDTO: UpdateBuylistQuicklistProductCardDTO): Promise<BuylistQuicklistProductCardDTO> {
                    
        let buylistQuicklistProductCard = await this.buylistQuicklistProductCardRepository.findOne({ 
            where: { 
                buylistQuicklistProductCardId: updateBuylistQuicklistProductCardDTO.buylistQuicklistProductCardId 
            } 
        });
        
        if (buylistQuicklistProductCard == null) {
            throw new NotFoundException('Buylist quicklist product card was not found');
        }

        buylistQuicklistProductCard.commerceUserId = updateBuylistQuicklistProductCardDTO.commerceUserId;
        buylistQuicklistProductCard.buylistLocationId = updateBuylistQuicklistProductCardDTO.buylistLocationId;
        buylistQuicklistProductCard.buylistQuicklistProductCardIsActive = updateBuylistQuicklistProductCardDTO.buylistQuicklistProductCardIsActive;
        
        await this.buylistQuicklistProductCardRepository.save(buylistQuicklistProductCard);

        let buylistQuicklistProductCardDTO = await this.getBuylistQuicklistProductCardById(buylistQuicklistProductCard.buylistQuicklistProductCardId);

        return buylistQuicklistProductCardDTO;
    
    }
    
    async deleteBuylistQuicklistProductCard(buylistQuicklistProductCardId: string): Promise<boolean> {

        let buylistQuicklistProductCard = await this.buylistQuicklistProductCardRepository.findOne({ 
            where: { 
                buylistQuicklistProductCardId: buylistQuicklistProductCardId 
            } 
        });

        if (buylistQuicklistProductCard == null) {
            throw new NotFoundException('Buylist quicklist product card was not found');
        }

        await this.buylistQuicklistProductCardRepository.delete({ buylistQuicklistProductCardId: buylistQuicklistProductCardId });

        return true;
    }
}