import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBuylistProductCardItemDTO, UpdateBuylistProductCardItemDTO, BuylistProductCardItemDTO } from './dto/buylist.product.card.item.dto';
import { BuylistProductCardItem } from 'src/typeorm/entities/tcgcommerce/modules/buylist/product/card/item/buylist.product.card.item.entity';
import { OnEvent } from '@nestjs/event-emitter';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { BuylistImportProductCardItemService } from 'src/tcgcommerce/modules/buylist/import/product/card/item/buylist.import.product.card.item.service';
import { BuylistImportProductCardService } from 'src/tcgcommerce/modules/buylist/import/product/card/buylist.import.product.card.service';

@Injectable()
export class BuylistProductCardItemService {

    constructor(
        @InjectRepository(BuylistProductCardItem) private buylistProductCardItemRepository: Repository<BuylistProductCardItem>,
        private buylistImportProductCardItemService: BuylistImportProductCardItemService,
        private buylistImportProductCardService: BuylistImportProductCardService,
        private eventEmitter: EventEmitter2,
    ) { }

    async getBuylistProductCardItemById(buylistProductCardItemId: string): Promise<BuylistProductCardItemDTO> {
        let buylistProductCardItem = await this.buylistProductCardItemRepository.findOneOrFail({ 
            where: { 
                buylistProductCardItemId: buylistProductCardItemId 
            } 
        });
        
        let buylistProductCardItemDTO: BuylistProductCardItemDTO = ({ ...buylistProductCardItem });

        return buylistProductCardItemDTO;
        
    }

    async getBuylistProductCardItemsByBuylistProductCardId(buylistProductCardId: string): Promise<BuylistProductCardItemDTO[]> {
        let buylistProductCardItems = await this.buylistProductCardItemRepository.find({ 
            where: { 
                buylistProductCardId: buylistProductCardId 
            } 
        });
        
        let buylistProductCardItemDTOs: BuylistProductCardItemDTO[] = [];

        if (buylistProductCardItems == null) {
            return buylistProductCardItemDTOs;
        }

        for(let i = 0; i < buylistProductCardItems.length; i++) {
            let buylistProductCardItem = buylistProductCardItems[i];
            let buylistProductCardItemDTO: BuylistProductCardItemDTO = ({ ...buylistProductCardItem });
            buylistProductCardItemDTOs.push(buylistProductCardItemDTO);
        }

        return buylistProductCardItemDTOs;
        
    }

    async createBuylistProductCardItem(createBuylistProductCardItemDTO: CreateBuylistProductCardItemDTO): Promise<BuylistProductCardItemDTO> {

        let buylistProductCardItem = await this.buylistProductCardItemRepository.findOne({ 
            where: { 
                productCardId: createBuylistProductCardItemDTO.productCardId,
                productCardPrintingId: createBuylistProductCardItemDTO.productCardPrintingId,
                productCardConditionId: createBuylistProductCardItemDTO.productCardConditionId, 
            } 
        });
        
        if (buylistProductCardItem) {
            throw new ConflictException('Buylist product card item exists');
        }
        
        buylistProductCardItem = this.buylistProductCardItemRepository.create({ ...createBuylistProductCardItemDTO });
        buylistProductCardItem = await this.buylistProductCardItemRepository.save(buylistProductCardItem);

        //TO DO:
        //NEED TO EMIT EVENT TO UPDATE THE BUYLIST QTY COUNT;

        let buylistProductCardItemDTO = this.getBuylistProductCardItemById(buylistProductCardItem.buylistProductCardItemId);
        
        return buylistProductCardItemDTO;
        
    }

    async updateBuylistProductCardItem(updateBuylistProductCardItemDTO: UpdateBuylistProductCardItemDTO): Promise<BuylistProductCardItemDTO> {
                    
        let buylistProductCardItem = await this.buylistProductCardItemRepository.findOneOrFail({ 
            where: { 
                buylistProductCardItemId: updateBuylistProductCardItemDTO.buylistProductCardItemId 
            } 
        });   
        
        
        let buylistProductCardItemQtyUpdateCount = 0;
        let countType = "";
        
        if(buylistProductCardItem.buylistProductCardItemQty > updateBuylistProductCardItemDTO.buylistProductCardItemQty) {
            buylistProductCardItemQtyUpdateCount = buylistProductCardItem.buylistProductCardItemQty - updateBuylistProductCardItemDTO.buylistProductCardItemQty;
            countType = "REMOVE";
        }
        else if(buylistProductCardItem.buylistProductCardItemQty < updateBuylistProductCardItemDTO.buylistProductCardItemQty) {
            buylistProductCardItemQtyUpdateCount = updateBuylistProductCardItemDTO.buylistProductCardItemQty - buylistProductCardItem.buylistProductCardItemQty;
            countType = "ADD";
        }

        buylistProductCardItem.productCardPrintingId = updateBuylistProductCardItemDTO.productCardPrintingId;
        buylistProductCardItem.productCardConditionId = updateBuylistProductCardItemDTO.productCardConditionId;
        buylistProductCardItem.buylistProductCardItemQty = updateBuylistProductCardItemDTO.buylistProductCardItemQty;

        await this.buylistProductCardItemRepository.save(buylistProductCardItem);

        this.eventEmitter.emit('buylist.product.card.update.count', {
            countType: countType,
            buylistProductCardId: buylistProductCardItem.buylistProductCardId,
            buylistProductCardItemCount: 0,
            buylistProductCardItemQtyCount: buylistProductCardItemQtyUpdateCount,
        });

        let buylistProductCardItemDTO = await this.getBuylistProductCardItemById(buylistProductCardItem.buylistProductCardItemId);

        return buylistProductCardItemDTO;
    
    }

    async deleteBuylistProductCardItemById(buylistProductCardItemId: string): Promise<boolean> {

        let buylistProductCardItem = await this.buylistProductCardItemRepository.findOneOrFail({
            where: {
                buylistProductCardItemId: buylistProductCardItemId
            }
        });

        //NEED TO EMIT EVENT TO UPDATE THE BUYLIST QTY COUNT;
        this.eventEmitter.emit('buylist.product.card.update.count', {
            countType: "REMOVE",
            buylistProductCardId: buylistProductCardItem.buylistProductCardId,
            buylistProductCardItemCount: 1,
            buylistProductCardItemQtyCount: buylistProductCardItem.buylistProductCardItemQty,
        });

        await this.buylistProductCardItemRepository.delete({ buylistProductCardItemId: buylistProductCardItemId });

        return true;
    }

    @OnEvent('buylist.import.product.card.approved')
    async createBuylistProductCardItemsFromImport(payload: any): Promise<void> {
        
        //TO DO:
        //REFACTOR THIS;
        let buylistImportProductCardDTO = await this.buylistImportProductCardService.getBuylistImportProductCardById(payload.buylistImportProductCardId);

        if(buylistImportProductCardDTO == null) {
            throw new NotFoundException('Buylist import product card not found');
        }

        let buylistProductCardItem = await this.buylistProductCardItemRepository.findOneOrFail({ 
            where: { 
                buylistProductCardItemId: payload.buylistImportProductCardId 
            } 
        });

        let buylistImportProductCardItemDTOs = await this.buylistImportProductCardItemService.getBuylistImportProductCardItemsByBuylistId(payload.buylistImportProductCardId);

        let buylistProductCardItemCount = 0;
        let buylistProductCardItemQtyCount = 0;

        for(let i = 0; i < buylistImportProductCardItemDTOs.length; i++) {
            //NEED TO CHECK IF AN ITEM IS ALREADY THERE AND UPDATE VS CREATE;
            
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
            countType: "ADD",
            buylistProductCardId: buylistImportProductCardDTO.buylistProductCardId,
            buylistProductCardItemCount: buylistProductCardItemCount,
            buylistProductCardItemQtyCount: buylistProductCardItemQtyCount,
        });
    } 
 
}