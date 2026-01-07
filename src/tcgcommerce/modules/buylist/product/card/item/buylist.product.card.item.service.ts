import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBuylistProductCardItemDTO, UpdateBuylistProductCardItemDTO, BuylistProductCardItemDTO } from './dto/buylist.product.card.item.dto';
import { BuylistProductCardItem } from 'src/typeorm/entities/tcgcommerce/modules/buylist/product/card/item/buylist.product.card.item.entity';
import { ErrorMessageService } from 'src/system/modules/error/message/error.message.service';
import { OnEvent } from '@nestjs/event-emitter';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { BuylistImportProductCardItemService } from 'src/tcgcommerce/modules/buylist/import/product/card/item/buylist.import.product.card.item.service';
import { BuylistImportProductCardService } from 'src/tcgcommerce/modules/buylist/import/product/card/buylist.import.product.card.service';
import { ErrorMessageDTO } from 'src/system/modules/error/message/dto/error.message.dto';

@Injectable()
export class BuylistProductCardItemService {

    constructor(
        @InjectRepository(BuylistProductCardItem) private buylistProductCardItemRepository: Repository<BuylistProductCardItem>,
        private errorMessageService: ErrorMessageService,
        private buylistImportProductCardItemService: BuylistImportProductCardItemService,
        private buylistImportProductCardService: BuylistImportProductCardService,
        private eventEmitter: EventEmitter2,
    ) { }

    async getBuylistProductCardItemById(buylistProductCardItemId: string) {
        let buylistProductCardItem = await this.buylistProductCardItemRepository.findOne({ 
            where: { 
                buylistProductCardItemId: buylistProductCardItemId 
            } 
        });
        
        if (buylistProductCardItem == null) {
            return this.errorMessageService.createErrorMessage('BUYLIST_PRODUCT_CARD_ITEM_NOT_FOUND', 'Buylist product card item was not found');
        }

        let buylistProductCardItemDTO: BuylistProductCardItemDTO = ({ ...buylistProductCardItem });

        return buylistProductCardItemDTO;
        
    }

    async getBuylistProductCardItemsByBuylistProductCardId(buylistProductCardId: string) {
        let buylistProductCardItems = await this.buylistProductCardItemRepository.find({ 
            where: { 
                buylistProductCardId: buylistProductCardId 
            } 
        });
        
        if (buylistProductCardItems == null) {
            return [];
        }

        let buylistProductCardItemDTOs: BuylistProductCardItemDTO[] = [];

        for(let i = 0; i < buylistProductCardItems.length; i++) {
            let buylistProductCardItem = buylistProductCardItems[i];
            let buylistProductCardItemDTO: BuylistProductCardItemDTO = ({ ...buylistProductCardItem });
            buylistProductCardItemDTOs.push(buylistProductCardItemDTO);
        }

        return buylistProductCardItemDTOs;
        
    }

    async createBuylistProductCardItem(createBuylistProductCardItemDTO: CreateBuylistProductCardItemDTO) {

        //ADD SOME VALIDATION TO PREVENT DUPLICATE ENTRIES;
        
        let newBuylistProductCardItem = this.buylistProductCardItemRepository.create({ ...createBuylistProductCardItemDTO });
        newBuylistProductCardItem = await this.buylistProductCardItemRepository.save(newBuylistProductCardItem);

        let buylistProductCardItemDTO = this.getBuylistProductCardItemById(newBuylistProductCardItem.buylistProductCardItemId);
        
        return buylistProductCardItemDTO;
        
    }

    async updateBuylistProductCardItem(updateBuylistProductCardItemDTO: UpdateBuylistProductCardItemDTO) {
                    
        let buylistProductCardItem = await this.buylistProductCardItemRepository.findOne({ 
            where: { 
                buylistProductCardItemId: updateBuylistProductCardItemDTO.buylistProductCardItemId 
            } 
        });   
        
        if (!buylistProductCardItem) {
            return this.errorMessageService.createErrorMessage('BUYLIST_PRODUCT_CARD_ITEM_NOT_FOUND', 'Buylist product card item was not found'); 
        }

        buylistProductCardItem.productCardPrintingId = updateBuylistProductCardItemDTO.productCardPrintingId;
        buylistProductCardItem.productCardConditionId = updateBuylistProductCardItemDTO.productCardConditionId;
        buylistProductCardItem.buylistProductCardItemQty = updateBuylistProductCardItemDTO.buylistProductCardItemQty;
        
        //NEED TO EMIT EVENT TO UPDATE THE BUYLIST QTY COUNT

        await this.buylistProductCardItemRepository.save(buylistProductCardItem);

        let buylistProductCardItemDTO = await this.getBuylistProductCardItemById(buylistProductCardItem.buylistProductCardItemId);

        return buylistProductCardItemDTO;
    
    }

    @OnEvent('buylist.import.product.card.approved')
    async createBuylistProductCardItemsFromImport(payload: any) {
        let buylistImportProductCardDTO = await this.buylistImportProductCardService.getBuylistImportProductCardById(payload.buylistImportProductCardId);

        if(buylistImportProductCardDTO == null || buylistImportProductCardDTO instanceof ErrorMessageDTO) {
            return this.errorMessageService.createErrorMessage('BUYLIST_IMPORT_PRODUCT_CARD_NOT_FOUND', 'Buylist import product card not found');
        }
        let buylistImportProductCardItemDTOs = await this.buylistImportProductCardItemService.getBuylistImportProductCardItemsByBuylistId(payload.buylistImportProductCardId);

        let buylistProductCardItemCount = 0;
        let buylistProductCardItemQtyCount = 0;

        for(let i = 0; i < buylistImportProductCardItemDTOs.length; i++) {
            let buylistImportProductCardItemDTO = buylistImportProductCardItemDTOs[i];
            
            let buylistProductCardItem = this.buylistProductCardItemRepository.create({
                buylistProductCardId: buylistImportProductCardDTO.buylistProductCardId,
                productCardId: buylistImportProductCardItemDTO.productCardId,
                productCardTCGdbId: buylistImportProductCardItemDTO.productCardTCGdbId,
                productCardTCGPlayerId: buylistImportProductCardItemDTO.productCardTCGPlayerId,
                productCardName: buylistImportProductCardItemDTO.productCardName,
                productCardNumber: buylistImportProductCardItemDTO.productCardNumber,
                productCardRarityId: buylistImportProductCardItemDTO.productCardRarityId,
                productCardRarityCode: buylistImportProductCardItemDTO.productCardRarityCode,
                productSetId: buylistImportProductCardItemDTO.productSetId,
                productSetCode: buylistImportProductCardItemDTO.productSetCode,
                productLanguageId: buylistImportProductCardItemDTO.productLanguageId,
                productLanguageCode: buylistImportProductCardItemDTO.productLanguageCode,
                productCardPrintingId: buylistImportProductCardItemDTO.productCardPrintingId,
                productCardPrintingName: buylistImportProductCardItemDTO.productCardPrintingName,
                productCardConditionId: buylistImportProductCardItemDTO.productCardConditionId,
                productCardConditionCode: buylistImportProductCardItemDTO.productCardConditionCode,
                productCardConditionName: buylistImportProductCardItemDTO.productCardConditionName,
                buylistProductCardItemQty: buylistImportProductCardItemDTO.buylistImportProductCardItemQty,
            });

            buylistProductCardItem = await this.buylistProductCardItemRepository.save(buylistProductCardItem);

            buylistProductCardItemCount = buylistProductCardItemCount + 1;
            buylistProductCardItemQtyCount = buylistProductCardItemQtyCount + buylistImportProductCardItemDTO.buylistImportProductCardItemQty;
        }

        this.eventEmitter.emit('buylist.product.card.update.count', {
            buylistProductCardId: buylistImportProductCardDTO.buylistProductCardId,
            buylistProductCardItemCount: buylistProductCardItemCount,
            buylistProductCardItemQtyCount: buylistProductCardItemQtyCount,
        });
    } 
 
}