import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BuylistImportProductCardDTO } from 'src/tcgcommerce/modules/buylist/import/product/card/dto/buylist.import.product.card.dto';
import { BuylistImportProductCardItemDTO } from 'src/tcgcommerce/modules/buylist/import/product/card/item/dto/buylist.import.product.card.item.dto';
import { BuylistImportProductCardItem } from 'src/typeorm/entities/tcgcommerce/modules/buylist/import/product/card/item/buylist.import.product.card.item.entity';
import { ProductCardService } from 'src/tcgcommerce/modules/product/card/product.card.service';
import { ProductSetService } from 'src/tcgcommerce/modules/product/set/product.set.service';
import { ProductCardConditionService } from 'src/tcgcommerce/modules/product/card/condition/product.card.condition.service';
import { ProductCardPrintingService } from 'src/tcgcommerce/modules/product/card/printing/product.card.printing.service';
import { BuylistImportProductCardProviderService } from '../provider/buylist.import.product.card.provider.service';
import { BuylistProductCardService } from 'src/tcgcommerce/modules/buylist/product/card/buylist.product.card.service';
import { ErrorMessageService } from 'src/system/modules/error/message/error.message.service';
import { ErrorMessageDTO } from 'src/system/modules/error/message/dto/error.message.dto';
import { EventEmitter2 } from '@nestjs/event-emitter';


@Injectable()
export class BuylistImportProductCardItemService {

    constructor(
        @InjectRepository(BuylistImportProductCardItem) private buylistImportProductCardItemRepository: Repository<BuylistImportProductCardItem>,
        private productCardService: ProductCardService,
        private productSetService: ProductSetService,
        private productCardConditionService: ProductCardConditionService,
        private productCardPrintingService: ProductCardPrintingService,
        private errorMessageService: ErrorMessageService,
        private buylistImportProductCardProviderService: BuylistImportProductCardProviderService,
        private buylistProductCardService: BuylistProductCardService,
        private eventEmitter: EventEmitter2,
    ) { }

    async getBuylistImportProductCardItemsByBuylistId(buylistImportProductCardId: string) {
    
        let buylistImportProductCardItemDTOs: BuylistImportProductCardItemDTO[] = [];

        let buylistImportProductCardItems = await this.buylistImportProductCardItemRepository.find({
            where: {
                buylistImportProductCardId: buylistImportProductCardId,
            }
        });

        for(let i = 0; i < buylistImportProductCardItems.length; i++) {
            let buylistImportProductCardItem = buylistImportProductCardItems[i];
            let buylistImportProductCardItemDTO: BuylistImportProductCardItemDTO = ({ ...buylistImportProductCardItem});
            buylistImportProductCardItemDTO.buylistImportProductCardItemCSVData = JSON.parse(buylistImportProductCardItem.buylistImportProductCardItemCSVData);
            
            buylistImportProductCardItemDTOs.push(buylistImportProductCardItemDTO);
        }

        return buylistImportProductCardItemDTOs;

    }

    async createBuylistImportProductCardItems(buylistImportProductCardFile: Express.Multer.File, buylistImportProductCardDTO: BuylistImportProductCardDTO) {

        let buylistImportProductCardProviderDTOs = await this.buylistImportProductCardProviderService.processBuylistImportProductCardCards(buylistImportProductCardFile, buylistImportProductCardDTO.buylistImportProductCardId, buylistImportProductCardDTO.buylistImportProductCardProviderTypeCode);
        
        if(buylistImportProductCardProviderDTOs == null || buylistImportProductCardProviderDTOs instanceof ErrorMessageDTO) {
            return this.errorMessageService.createErrorMessage('BUYLIST_IMPORT_PRODUCT_CARD_ITEM_DATA_INVALID', 'No valid buylist import product card provider items found in the import file.');
        }

        let buylistProductCard = await this.buylistProductCardService.getBuylistProductCardById(buylistImportProductCardDTO.buylistProductCardId);

        if(buylistProductCard == null || buylistProductCard instanceof ErrorMessageDTO) {
            return this.errorMessageService.createErrorMessage('BUYLIST_PRODUCT_CARD_NOT_FOUND', 'Buylist product card not found');
        }

        let buylistImportProductCardCount = 0;
        let buylistImportProductCardQtyCount = 0;

        for(let i = 0; i < buylistImportProductCardProviderDTOs.length; i++) {
            let buylistImportProductCardProviderDTO = buylistImportProductCardProviderDTOs[i];

            let productCard = await this.productCardService.getProductCardByNameAndSetCodeAndNumber(buylistImportProductCardProviderDTO.buylistImportProductCardProviderProductName, buylistImportProductCardProviderDTO.buylistImportProductCardProviderSetCode, buylistImportProductCardProviderDTO.buylistImportProductCardProviderNumber);
            let productCardCondition = await this.productCardConditionService.getProductCardConditionByCodeAndProductLineId(buylistImportProductCardProviderDTO.buylistImportProductCardProviderCondition, buylistProductCard.productLineId);
            let productCardPrinting = await this.productCardPrintingService.getProductCardPrintingByNameAndProductLineId(buylistImportProductCardProviderDTO.buylistImportProductCardProviderPrinting, buylistProductCard.productLineId);
            
            if((productCard == null ||productCard instanceof ErrorMessageDTO) || (productCardCondition == null || productCardCondition instanceof ErrorMessageDTO) || (productCardPrinting == null || productCardPrinting instanceof ErrorMessageDTO)) {
                continue;
            }

            let productSet = await this.productSetService.getProductSetById(productCard.productSetId);

            if(productSet == null || productSet instanceof ErrorMessageDTO) {
                continue;
            }

            let buylistImportProductCardItem = this.buylistImportProductCardItemRepository.create({
                buylistImportProductCardId: buylistImportProductCardDTO.buylistImportProductCardId,
                productCardId: productCard.productCardId,
                productCardTCGdbId: productCard.productCardTCGdbId,
                productCardTCGPlayerId: productCard.productCardTCGPlayerId,
                productCardName: productCard.productCardName,
                productCardNumber: productCard.productCardNumber,
                productCardRarityId: productCard.productCardRarityId,
                productCardRarityCode: productCard.productCardRarityCode,
                productLanguageId: buylistProductCard.productLanguageId,
                productLanguageCode: buylistProductCard.productLanguageCode,
                productSetId: productSet.productSetId,
                productSetCode: productSet.productSetCode,
                productCardConditionId: productCardCondition.productCardConditionId,
                productCardConditionCode: productCardCondition.productCardConditionCode,
                productCardConditionName: productCardCondition.productCardConditionName,
                productCardPrintingId: productCardPrinting.productCardPrintingId,
                productCardPrintingName: productCardPrinting.productCardPrintingName,
                buylistImportProductCardItemQty: buylistImportProductCardProviderDTO.buylistImportProductCardProviderQty,
                buylistImportProductCardItemCSVData: JSON.stringify(buylistImportProductCardProviderDTO)
            });

            await this.buylistImportProductCardItemRepository.save(buylistImportProductCardItem); 

            buylistImportProductCardCount = buylistImportProductCardCount + 1;
            buylistImportProductCardQtyCount = buylistImportProductCardQtyCount + buylistImportProductCardProviderDTO.buylistImportProductCardProviderQty;

        }

        this.eventEmitter.emit('buylist.import.product.card.update.count', {
            buylistImportProductCardId: buylistImportProductCardDTO.buylistImportProductCardId,
            buylistImportProductCardCount: buylistImportProductCardCount,
            buylistImportProductCardQtyCount: buylistImportProductCardQtyCount,
        });

        return true;
    }

    async deleteBuylistImportProductCardItemsByJobId(buylistImportProductCardId: string) {
        
        await this.buylistImportProductCardItemRepository.delete({
            buylistImportProductCardId: buylistImportProductCardId
        });
        
        return true;

    }


    
}

