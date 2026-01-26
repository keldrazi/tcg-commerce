import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InventoryProductCardServiceImportJobDTO } from 'src/tcgcommerce/modules/inventory/product/card/service/import/job/dto/inventory.product.card.service.import.job.dto';
import { InventoryProductCardServiceImportJobItemDTO } from 'src/tcgcommerce/modules/inventory/product/card/service/import/job/item/dto/inventory.product.card.service.import.job.item.dto';
import { InventoryProductCardServiceImportJobItem } from 'src/typeorm/entities/tcgcommerce/modules/inventory/product/card/service/import/job/item/inventory.product.card.service.import.job.item.entity';
import { ProductCardService } from 'src/tcgcommerce/modules/product/card/product.card.service';
import { ProductSetService } from 'src/tcgcommerce/modules/product/set/product.set.service';
import { ProductCardConditionService } from 'src/tcgcommerce/modules/product/card/condition/product.card.condition.service';
import { ProductCardPrintingService } from 'src/tcgcommerce/modules/product/card/printing/product.card.printing.service';
import { InventoryProductCardService } from 'src/tcgcommerce/modules/inventory/product/card/inventory.product.card.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { InventoryProductCardServiceImportJobProviderService } from '../provider/inventory.product.card.service.import.job.provider.service';
import { INVENTORY_PRODUCT_CARD_SERVICE_IMPORT_JOB_STATUS } from 'src/system/constants/tcgcommerce/inventory/product/card/service/import/job/inventory.product.card.service.import.job.constants';


@Injectable()
export class InventoryProductCardServiceImportJobItemService {

    constructor(
        @InjectRepository(InventoryProductCardServiceImportJobItem) private inventoryProductCardServiceImportJobItemRepository: Repository<InventoryProductCardServiceImportJobItem>,
        private productCardService: ProductCardService,
        private productSetService: ProductSetService,
        private productCardConditionService: ProductCardConditionService,
        private productCardPrintingService: ProductCardPrintingService,
        private inventoryProductCardService: InventoryProductCardService,
        private eventEmitter: EventEmitter2,
        private inventoryProductCardServiceImportJobProviderService: InventoryProductCardServiceImportJobProviderService,
    ) { }

    async getInventoryProductCardServiceImportJobItemsByJobId(inventoryProductCardServiceImportJobId: string) {
    
            let inventoryProductCardServiceImportJobItemDTOs: InventoryProductCardServiceImportJobItemDTO[] = [];
    
            let inventoryProductCardServiceImportJobItems = await this.inventoryProductCardServiceImportJobItemRepository.find({
                where: {
                    inventoryProductCardServiceImportJobId: inventoryProductCardServiceImportJobId,
                }
            });

            if(inventoryProductCardServiceImportJobItems == null || inventoryProductCardServiceImportJobItems.length == 0) {
                return [];
            }
    
            for(let i = 0; i < inventoryProductCardServiceImportJobItems.length; i++) {
                let inventoryProductCardServiceImportJobItem = inventoryProductCardServiceImportJobItems[i];
                let inventoryProductCardServiceImportJobItemDTO: InventoryProductCardServiceImportJobItemDTO = ({ ...inventoryProductCardServiceImportJobItem});
                inventoryProductCardServiceImportJobItemDTO.inventoryProductCardServiceImportJobItemCSVData = JSON.parse(inventoryProductCardServiceImportJobItem.inventoryProductCardServiceImportJobItemCSVData);
                
                inventoryProductCardServiceImportJobItemDTOs.push(inventoryProductCardServiceImportJobItemDTO);
            }
    
            return inventoryProductCardServiceImportJobItemDTOs;
    
        }

    async createInventoryProductCardServiceImportJobItems(inventoryProductCardServiceImportJobFile: Express.Multer.File, inventoryProductCardServiceImportJobDTO: InventoryProductCardServiceImportJobDTO) {

        let inventoryProductCardServiceImportJobProviderDTOs = await this.inventoryProductCardServiceImportJobProviderService.processInventoryProductCardServiceImportJobCards(inventoryProductCardServiceImportJobFile, inventoryProductCardServiceImportJobDTO.inventoryProductCardServiceImportJobId, inventoryProductCardServiceImportJobDTO.inventoryProductCardServiceImportJobProviderTypeCode);
        
        if(inventoryProductCardServiceImportJobProviderDTOs == null || inventoryProductCardServiceImportJobProviderDTOs.length === 0) {
            throw new BadRequestException('No valid inventory product card service import job items found in the import file.');
        }

        for(let i = 0; i < inventoryProductCardServiceImportJobProviderDTOs.length; i++) {
            let inventoryProductCardServiceImportJobProviderDTO = inventoryProductCardServiceImportJobProviderDTOs[i];

            let productCard = await this.productCardService.getProductCardByTCGPlayerId(inventoryProductCardServiceImportJobProviderDTO.inventoryProductCardServiceImportJobProviderTCGPlayerId);
            let productCardCondition = await this.productCardConditionService.getProductCardConditionByCodeAndProductLineId(inventoryProductCardServiceImportJobProviderDTO.inventoryProductCardServiceImportJobProviderCondition, inventoryProductCardServiceImportJobDTO.productLineId);
            let productCardPrinting = await this.productCardPrintingService.getProductCardPrintingByNameAndProductLineId(inventoryProductCardServiceImportJobProviderDTO.inventoryProductCardServiceImportJobProviderPrinting, inventoryProductCardServiceImportJobDTO.productLineId);
            
            if(productCard == null || productCardCondition == null || productCardPrinting == null) {
                continue;
            }

            let productSet = await this.productSetService.getProductSetById(productCard.productSetId);

            if(productSet == null) {
                continue;
            }

            let inventoryProductCardServiceImportJobItem = this.inventoryProductCardServiceImportJobItemRepository.create({
                inventoryProductCardServiceImportJobId: inventoryProductCardServiceImportJobDTO.inventoryProductCardServiceImportJobId,
                productCardId: productCard.productCardId,
                productCardTCGdbId: productCard.productCardTCGdbId,
                productCardTCGPlayerId: productCard.productCardTCGPlayerId,
                commerceAccountId: inventoryProductCardServiceImportJobDTO.commerceAccountId,
                commerceLocationId: inventoryProductCardServiceImportJobDTO.commerceLocationId,
                productVendorId: inventoryProductCardServiceImportJobDTO.productVendorId,
                productLineId: inventoryProductCardServiceImportJobDTO.productLineId,
                productTypeId: inventoryProductCardServiceImportJobDTO.productTypeId,
                productLanguageId: inventoryProductCardServiceImportJobDTO.productLanguageId,
                productLanguageCode: inventoryProductCardServiceImportJobDTO.productLanguageCode,
                productSetId: productSet.productSetId,
                productSetCode: productSet.productSetCode,
                productCardConditionId: productCardCondition.productCardConditionId,
                productCardConditionCode: productCardCondition.productCardConditionCode,
                productCardConditionName: productCardCondition.productCardConditionName,
                productCardPrintingId: productCardPrinting.productCardPrintingId,
                productCardPrintingName: productCardPrinting.productCardPrintingName,
                inventoryProductCardServiceImportJobItemQty: inventoryProductCardServiceImportJobProviderDTO.inventoryProductCardServiceImportJobProviderQty,
                inventoryProductCardServiceImportJobItemCSVData: JSON.stringify(inventoryProductCardServiceImportJobProviderDTO)
            });

            await this.inventoryProductCardServiceImportJobItemRepository.save(inventoryProductCardServiceImportJobItem); 

        }

        this.eventEmitter.emit(
            'inventory.product.card.service.import.job.update.status',
            {
                inventoryProductCardServiceImportJobId: inventoryProductCardServiceImportJobDTO.inventoryProductCardServiceImportJobId,
                inventoryProductCardServiceImportJobStatus: INVENTORY_PRODUCT_CARD_SERVICE_IMPORT_JOB_STATUS.PROCESSING_READY_FOR_REVIEW,

            }
        )

        return true;
    }

    async getInventoryProductCardServiceImportJobItemDetailsByJob(inventoryProductCardServiceImportJobDTO: InventoryProductCardServiceImportJobDTO) {

        let inventoryProductCardServiceImportJobItems = await this.inventoryProductCardServiceImportJobItemRepository.find({
            where: {
                inventoryProductCardServiceImportJobId: inventoryProductCardServiceImportJobDTO.inventoryProductCardServiceImportJobId,
            }
        });

        let inventoryProductCardServiceImportJobItemDTOs: InventoryProductCardServiceImportJobItemDTO[] = [];

        if(inventoryProductCardServiceImportJobItems == null || inventoryProductCardServiceImportJobItems.length == 0) {
            return inventoryProductCardServiceImportJobItemDTOs;
        }

        for(let i = 0; i < inventoryProductCardServiceImportJobItems.length; i++) {
            let inventoryProductCardServiceImportJobItem = inventoryProductCardServiceImportJobItems[i];
            let inventoryProductCardServiceImportJobItemDTO: InventoryProductCardServiceImportJobItemDTO = ({ ...inventoryProductCardServiceImportJobItem});
            inventoryProductCardServiceImportJobItemDTO.inventoryProductCardServiceImportJobItemCSVData = JSON.parse(inventoryProductCardServiceImportJobItem.inventoryProductCardServiceImportJobItemCSVData);
            inventoryProductCardServiceImportJobItemDTOs.push(inventoryProductCardServiceImportJobItemDTO);
        }

        return inventoryProductCardServiceImportJobItemDTOs;

    }

    async approveInventoryProductCardServiceImportJobItemsByJobId(inventoryProductCardServiceImportJobId: string) {
            
        this.eventEmitter.emit(
            'inventory.product.card.service.import.job.update.status',
            {
                inventoryProductCardServiceImportJobId: inventoryProductCardServiceImportJobId,
                inventoryProductCardServiceImportJobStatus: INVENTORY_PRODUCT_CARD_SERVICE_IMPORT_JOB_STATUS.PROCESSING_ADDING_TO_INVENTORY,
            }
        )   

        let inventoryProductCardServiceImportJobItemDTOs = await this.getInventoryProductCardServiceImportJobItemsByJobId(inventoryProductCardServiceImportJobId);
        for(let i = 0; i < inventoryProductCardServiceImportJobItemDTOs.length; i++) {
            let inventoryProductCardServiceImportJobItemDTO = inventoryProductCardServiceImportJobItemDTOs[i];
            let inventoryProductCardDTO = await this.inventoryProductCardService.getInventoryProductCardByProductCardPrintingId(inventoryProductCardServiceImportJobItemDTO.commerceAccountId, inventoryProductCardServiceImportJobItemDTO.commerceLocationId, inventoryProductCardServiceImportJobItemDTO.productCardId, inventoryProductCardServiceImportJobItemDTO.productCardPrintingId, inventoryProductCardServiceImportJobItemDTO.productLanguageId);
            
            if(inventoryProductCardDTO == null) {
                continue;
            }

            let inventoryProductCardItem = inventoryProductCardDTO.inventoryProductCardItems.find(item => item.productCardConditionCode === inventoryProductCardServiceImportJobItemDTO.productCardConditionCode);
            
            if(inventoryProductCardItem == undefined) {
                continue;
            }

            inventoryProductCardItem.inventoryProductCardItemQty = inventoryProductCardItem.inventoryProductCardItemQty + inventoryProductCardServiceImportJobItemDTO.inventoryProductCardServiceImportJobItemQty;
            
            await this.inventoryProductCardService.updateInventoryProductCard(inventoryProductCardDTO);
        }

        this.eventEmitter.emit(
            'inventory.product.card.service.create.job.update.status',
            {
                inventoryProductCardServiceImportJobId: inventoryProductCardServiceImportJobId,
                inventoryProductCardServiceImportJobStatus: INVENTORY_PRODUCT_CARD_SERVICE_IMPORT_JOB_STATUS.PROCESSING_COMPLETE,
            }
        )
        
        return true;

    }

    async deleteInventoryProductCardServiceImportJobItemsByJobId(inventoryProductCardServiceImportJobId: string) {
        
        await this.inventoryProductCardServiceImportJobItemRepository.delete({
            inventoryProductCardServiceImportJobId: inventoryProductCardServiceImportJobId
        });
        
        return true;

    }

}

