import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
//import { INVENTORY_PRODUCT_CARD_SERVICE_IMPORT_JOB_STATUS } from 'src/system/constants/tcgcommerce/inventory/product/card/service/import/job/inventory.product.card.service.import.job.constants';
import { ProductCardDTO } from 'src/tcgcommerce/modules/product/card/dto/product.card.dto';
import { InventoryProductCardServiceImportJobDTO, CreateInventoryProductCardServiceImportJobDTO } from 'src/tcgcommerce/modules/inventory/product/card/service/import/job/dto/inventory.product.card.service.import.job.dto';
import { InventoryProductCardServiceImportJobItemDTO } from 'src/tcgcommerce/modules/inventory/product/card/service/import/job/item/dto/inventory.product.card.service.import.job.item.dto';
import { InventoryProductCardServiceImportJobItem } from 'src/typeorm/entities/tcgcommerce/modules/inventory/product/card/service/import/job/item/inventory.product.card.service.import.job.item.entity';
import { ProductCardService } from 'src/tcgcommerce/modules/product/card/product.card.service';
import { ProductVendorService } from 'src/tcgcommerce/modules/product/vendor/product.vendor.service';
import { ProductLineService } from 'src/tcgcommerce/modules/product/line/product.line.service';
import { ProductSetService } from 'src/tcgcommerce/modules/product/set/product.set.service';
import { ProductCardConditionService } from 'src/tcgcommerce/modules/product/card/condition/product.card.condition.service';
import { ProductLanguageService } from 'src/tcgcommerce/modules/product/language/product.language.service';
import { ProductCardPrintingService } from 'src/tcgcommerce/modules/product/card/printing/product.card.printing.service';
import { CommerceLocationService } from 'src/tcgcommerce/modules/commerce/location/commerce.location.service';
import { InventoryProductCardService } from 'src/tcgcommerce/modules/inventory/product/card/inventory.product.card.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { TCGdbMTGPriceCurrentService } from 'src/tcgdb/modules/tcgdb/api/mtg/price/current/tcgdb.mtg.price.current.service';
import { TCGdbMTGPriceCurrentDTO } from 'src/tcgdb/modules/tcgdb/api/mtg/price/current/dto/tcgdb.mtg.price.current.dto';
import { PriceRuleProductCardBaseService } from 'src/tcgcommerce/modules/price/rule/product/card/base/price.rule.product.card.base.service';
import { InventoryProductCardServiceImportJobProviderService } from '../provider/inventory.product.card.service.import.job.provider.service';
import { InventoryProductCardServiceImportJobProviderDTO } from '../provider/dto/inventory.product.card.service.import.job.provider.dto';

@Injectable()
export class InventoryProductCardServiceImportJobItemService {

    constructor(
        @InjectRepository(InventoryProductCardServiceImportJobItem) private inventoryProductCardServiceImportJobItemRepository: Repository<InventoryProductCardServiceImportJobItem>,
        private productCardService: ProductCardService,
        private productVendorService: ProductVendorService,
        private productLineService: ProductLineService,
        private productSetService: ProductSetService,
        private productCardConditionService: ProductCardConditionService,
        private productLanguageService: ProductLanguageService,
        private productCardPrintingService: ProductCardPrintingService,
        private commerceLocationService: CommerceLocationService,
        private inventoryProductCardService: InventoryProductCardService,
        private eventEmitter: EventEmitter2,
        private tcgdbMTGPriceCurrentService: TCGdbMTGPriceCurrentService,
        private priceRuleProductCardBaseService: PriceRuleProductCardBaseService,
        private inventoryProductCardServiceImportJobProviderRocaService: InventoryProductCardServiceImportJobProviderService,
    ) { }

    async createInventoryProductCardServiceImportJobItems(inventoryProductCardServiceImportJobFile: Express.Multer.File, inventoryProductCardServiceImportJobDTO: InventoryProductCardServiceImportJobDTO) {

        let inventoryProductCardServiceImportJobProviderDTOs = await this.inventoryProductCardServiceImportJobProviderRocaService.processInventoryProductCardServiceImportJobCards(inventoryProductCardServiceImportJobFile, inventoryProductCardServiceImportJobDTO.inventoryProductCardServiceImportJobId, inventoryProductCardServiceImportJobDTO.inventoryProductCardServiceImportJobProviderTypeCode);
        
        if(inventoryProductCardServiceImportJobProviderDTOs == null) {
            return null;   
        }

        for(let i = 0; i < inventoryProductCardServiceImportJobProviderDTOs.length; i++) {
            let inventoryProductCardServiceImportJobProviderDTO = inventoryProductCardServiceImportJobProviderDTOs[i];

            let productCard = await this.productCardService.getProductCardByTCGPlayerId(inventoryProductCardServiceImportJobProviderDTO.inventoryProductCardServiceImportJobProviderTCGPlayerId);
            let productCardCondition = await this.productCardConditionService.getProductCardConditionByCodeAndProductLineId(inventoryProductCardServiceImportJobProviderDTO.inventoryProductCardServiceImportJobProviderCondition, inventoryProductCardServiceImportJobDTO.productLineId);
            let productCardPrinting = await this.productCardPrintingService.getProductCardPrintingByNameAndProductLineId(inventoryProductCardServiceImportJobProviderDTO.inventoryProductCardServiceImportJobProviderPrinting, inventoryProductCardServiceImportJobDTO.productLineId);
            
            if(productCard == null || productCardCondition == null || productCardPrinting == null) {
                //TO DO CREATE AN ERROR FOR THE ITEM NOT FOUND;
                continue;
            }

            let productSet = await this.productSetService.getProductSet(productCard.productSetId);

            if(productSet == null) {
                //TO DO CREATE AN ERROR FOR THE ITEM NOT FOUND;
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
                productCardConditionName: productCardCondition.productCardConditionName,
                productCardPrintingId: productCardPrinting.productCardPrintingId,
                productCardPrintingName: productCardPrinting.productCardPrintingName,
                inventoryProductCardServiceImportJobItemQuantity: inventoryProductCardServiceImportJobProviderDTO.inventoryProductCardServiceImportJobProviderQty,
                inventoryProductCardServiceImportJobItemCSVData: JSON.stringify(inventoryProductCardServiceImportJobProviderDTO)
            });

            await this.inventoryProductCardServiceImportJobItemRepository.save(inventoryProductCardServiceImportJobItem);

        }




    }


    
}

