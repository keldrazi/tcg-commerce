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
import { InventoryProductCardService } from 'src/tcgcommerce/modules/inventory/product/card/inventory.product.card.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { BuylistImportProductCardProviderService } from '../provider/buylist.import.product.card.provider.service';
import { INVENTORY_PRODUCT_CARD_SERVICE_IMPORT_JOB_STATUS } from 'src/system/constants/tcgcommerce/inventory/product/card/service/import/job/inventory.product.card.service.import.job.constants';
import { ErrorMessageService } from 'src/system/modules/error/message/error.message.service';
import { ErrorMessageDTO } from 'src/system/modules/error/message/dto/error.message.dto';


@Injectable()
export class BuylistImportProductCardItemService {

    constructor(
        @InjectRepository(BuylistImportProductCardItem) private buylistImportProductCardItemRepository: Repository<BuylistImportProductCardItem>,
        private productCardService: ProductCardService,
        private productSetService: ProductSetService,
        private productCardConditionService: ProductCardConditionService,
        private productCardPrintingService: ProductCardPrintingService,
        private inventoryProductCardService: InventoryProductCardService,
        private eventEmitter: EventEmitter2,
        private buylistImportProductCardProviderRocaService: BuylistImportProductCardProviderService,
        private errorMessageService: ErrorMessageService,
    ) { }

    async getBuylistImportProductCardItemsByJobId(buylistImportProductCardId: string) {
    
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

        let buylistImportProductCardProviderDTOs = await this.buylistImportProductCardProviderRocaService.processBuylistImportProductCardCards(buylistImportProductCardFile, buylistImportProductCardDTO.buylistImportProductCardId, buylistImportProductCardDTO.buylistImportProductCardProviderTypeCode);
        
        if(buylistImportProductCardProviderDTOs == null || buylistImportProductCardProviderDTOs instanceof ErrorMessageDTO) {
            return this.errorMessageService.createErrorMessage('INVENTORY_PRODUCT_CARD_SERVICE_IMPORT_JOB_ITEM_DATA_INVALID', 'No valid inventory product card service import job items found in the import file.');
        }

        for(let i = 0; i < buylistImportProductCardProviderDTOs.length; i++) {
            let buylistImportProductCardProviderDTO = buylistImportProductCardProviderDTOs[i];

            let productCard = await this.productCardService.getProductCardByTCGPlayerId(buylistImportProductCardProviderDTO.buylistImportProductCardProviderTCGPlayerId);
            let productCardCondition = await this.productCardConditionService.getProductCardConditionByCodeAndProductLineId(buylistImportProductCardProviderDTO.buylistImportProductCardProviderCondition, buylistImportProductCardDTO.productLineId);
            let productCardPrinting = await this.productCardPrintingService.getProductCardPrintingByNameAndProductLineId(buylistImportProductCardProviderDTO.buylistImportProductCardProviderPrinting, buylistImportProductCardDTO.productLineId);
            
            if((productCard == null ||productCard instanceof ErrorMessageDTO) || (productCardCondition == null || productCardCondition instanceof ErrorMessageDTO) || (productCardPrinting == null || productCardPrinting instanceof ErrorMessageDTO)) {
                continue;
            }

            let productSet = await this.productSetService.getProductSet(productCard.productSetId);

            if(productSet == null || productSet instanceof ErrorMessageDTO) {
                continue;
            }

            let buylistImportProductCardItem = this.buylistImportProductCardItemRepository.create({
                buylistImportProductCardId: buylistImportProductCardDTO.buylistImportProductCardId,
                productCardId: productCard.productCardId,
                productCardTCGdbId: productCard.productCardTCGdbId,
                productCardTCGPlayerId: productCard.productCardTCGPlayerId,
                commerceAccountId: buylistImportProductCardDTO.commerceAccountId,
                commerceLocationId: buylistImportProductCardDTO.commerceLocationId,
                productVendorId: buylistImportProductCardDTO.productVendorId,
                productLineId: buylistImportProductCardDTO.productLineId,
                productTypeId: buylistImportProductCardDTO.productTypeId,
                productLanguageId: buylistImportProductCardDTO.productLanguageId,
                productLanguageCode: buylistImportProductCardDTO.productLanguageCode,
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

        }

        this.eventEmitter.emit(
            'inventory.product.card.service.import.job.update.status',
            {
                buylistImportProductCardId: buylistImportProductCardDTO.buylistImportProductCardId,
                buylistImportProductCardStatus: INVENTORY_PRODUCT_CARD_SERVICE_IMPORT_JOB_STATUS.PROCESSING_READY_FOR_REVIEW,

            }
        )

        return true;
    }

    async getBuylistImportProductCardItemDetailsByJob(buylistImportProductCardDTO: BuylistImportProductCardDTO) {

        let buylistImportProductCardItems = await this.buylistImportProductCardItemRepository.find({
            where: {
                buylistImportProductCardId: buylistImportProductCardDTO.buylistImportProductCardId,
            }
        });

        let buylistImportProductCardItemDTOs: BuylistImportProductCardItemDTO[] = [];

        if(buylistImportProductCardItems == null || buylistImportProductCardItems.length == 0) {
            return buylistImportProductCardItemDTOs;
        }

        for(let i = 0; i < buylistImportProductCardItems.length; i++) {
            let buylistImportProductCardItem = buylistImportProductCardItems[i];
            let buylistImportProductCardItemDTO: BuylistImportProductCardItemDTO = ({ ...buylistImportProductCardItem});
            buylistImportProductCardItemDTO.buylistImportProductCardItemCSVData = JSON.parse(buylistImportProductCardItem.buylistImportProductCardItemCSVData);
            buylistImportProductCardItemDTOs.push(buylistImportProductCardItemDTO);
        }

        return buylistImportProductCardItemDTOs;

    }

    async approveBuylistImportProductCardItemsByJobId(buylistImportProductCardId: string) {
            
        this.eventEmitter.emit(
            'inventory.product.card.service.import.job.update.status',
            {
                buylistImportProductCardId: buylistImportProductCardId,
                buylistImportProductCardStatus: INVENTORY_PRODUCT_CARD_SERVICE_IMPORT_JOB_STATUS.PROCESSING_ADDING_TO_INVENTORY,
            }
        )   

        let buylistImportProductCardItemDTOs = await this.getBuylistImportProductCardItemsByJobId(buylistImportProductCardId);
        for(let i = 0; i < buylistImportProductCardItemDTOs.length; i++) {
            let buylistImportProductCardItemDTO = buylistImportProductCardItemDTOs[i];
            let inventoryProductCardDTO = await this.inventoryProductCardService.getInventoryProductCardByProductCardPrintingId(buylistImportProductCardItemDTO.commerceAccountId, buylistImportProductCardItemDTO.commerceLocationId, buylistImportProductCardItemDTO.productCardId, buylistImportProductCardItemDTO.productCardPrintingId, buylistImportProductCardItemDTO.productLanguageId);
            
            if(inventoryProductCardDTO == null || inventoryProductCardDTO instanceof ErrorMessageDTO) {
                continue;
            }

            let inventoryProductCardItem = inventoryProductCardDTO.inventoryProductCardItems.find(item => item.productCardConditionCode === buylistImportProductCardItemDTO.productCardConditionCode);
            
            if(inventoryProductCardItem == undefined) {
                continue;
            }

            inventoryProductCardItem.inventoryProductCardItemQty = inventoryProductCardItem.inventoryProductCardItemQty + buylistImportProductCardItemDTO.buylistImportProductCardItemQty;
            
            await this.inventoryProductCardService.updateInventoryProductCard(inventoryProductCardDTO);
    }

        this.eventEmitter.emit(
            'inventory.product.card.service.create.job.update.status',
            {
                buylistImportProductCardId: buylistImportProductCardId,
                buylistImportProductCardStatus: INVENTORY_PRODUCT_CARD_SERVICE_IMPORT_JOB_STATUS.PROCESSING_COMPLETE,
            }
        )
        
        return true;

    }

    async deleteBuylistImportProductCardItemsByJobId(buylistImportProductCardId: string) {
        
        await this.buylistImportProductCardItemRepository.delete({
            buylistImportProductCardId: buylistImportProductCardId
        });
        
        return true;

    }


    
}

