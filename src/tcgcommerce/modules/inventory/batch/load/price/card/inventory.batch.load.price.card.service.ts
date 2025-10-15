import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { INVENTORY_BATCH_LOAD_JOB_PRODUCT_CARD_STATUS } from 'src/system/constants/tcgcommerce/inventory/batch/load/job/product/card/inventory.batch.load.job.product.card.contants';
import { InventoryBatchLoadJobProductCardDTO } from 'src/tcgcommerce/modules/inventory/batch/load/job/product/card/dto/inventory.batch.load.job.product.card.dto';
import { InventoryProductCardItem } from 'src/tcgcommerce/modules/inventory/product/card/interface/inventory.product.card.item.interface';
import { InventoryProductCard } from 'src/typeorm/entities/tcgcommerce/modules/inventory/product/card/inventory.product.card.entity';
import { TCGdbMTGPriceCurrentService } from 'src/tcgdb/modules/tcgdb/api/mtg/price/current/tcgdb.mtg.price.current.service';
import { TCGdbMTGPriceCurrentDTO } from 'src/tcgdb/modules/tcgdb/api/mtg/price/current/dto/tcgdb.mtg.price.current.dto';
import { InventoryBatchLoadProductCardService } from 'src/tcgcommerce/modules/inventory/batch/load/product/card/inventory.batch.load.product.card.service';
import { PriceProductCardBaseService } from 'src/tcgcommerce/modules/price/product/card/base/price.product.card.base.service';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class InventoryBatchLoadProductPriceCardService {

    constructor(
        @InjectRepository(InventoryProductCard) private inventoryProductCardRepository: Repository<InventoryProductCard>,

        private inventoryBatchLoadProductCardService: InventoryBatchLoadProductCardService,
        private tcgdbMTGPriceCurrentService: TCGdbMTGPriceCurrentService,
        private priceProductCardBaseService: PriceProductCardBaseService,
        private eventEmitter: EventEmitter2,
    ) { }

    
    async updateBatchInventoryLoadJobProductPricesByJob(inventoryBatchLoadJobProductCardDTO: InventoryBatchLoadJobProductCardDTO) {
        
        //GET THE INVENTORY PRODUCT CARDS FOR THE SET;
        let inventoryProductCardDTOs = await this.inventoryBatchLoadProductCardService.getInventoryBatchProductCardsBySetId(inventoryBatchLoadJobProductCardDTO);
        //GET THE CURRENT PRICES FOR THE SET;
        let tcgdbMTGPriceCurrentDTOs = await this.tcgdbMTGPriceCurrentService.getTCGdbMTGPricesCurrentBySetCode(inventoryBatchLoadJobProductCardDTO.productSetCode);

        //GET THE BASE PRICE RULES;
        let priceProductCardBaseDTO = await this.priceProductCardBaseService.getPriceProductCardBaseByCommerceAccountId(inventoryBatchLoadJobProductCardDTO.commerceAccountId, inventoryBatchLoadJobProductCardDTO.productVendorId, inventoryBatchLoadJobProductCardDTO.productLineId, inventoryBatchLoadJobProductCardDTO.productTypeId);

        if(priceProductCardBaseDTO == null) {
            //TO DO: USE THE DEFAULTS;
            return;
        }
        //LOOP OVER THE PRICES AND FIND THE CORRESPONDING PRODUCT CARD;
        for(let i = 0; i < tcgdbMTGPriceCurrentDTOs.length; i++) {
            let tcgdbMTGPriceCurrentDTO = tcgdbMTGPriceCurrentDTOs[i];
            let productCardPrintingName = tcgdbMTGPriceCurrentDTO.tcgdbMTGPriceCurrentSubTypeName;
            let productCardTCGdbId = tcgdbMTGPriceCurrentDTO.tcgdbMTGCardId;

            let tcgdbPriceCurrent = await this.getTCGdbPriceCurrentByRule(tcgdbMTGPriceCurrentDTO, priceProductCardBaseDTO);


            let inventoryProductCardDTO = inventoryProductCardDTOs.find(item => 
                item.productCardTCGdbId === productCardTCGdbId &&
                item.productCardPrintingName === productCardPrintingName
            );

            if(inventoryProductCardDTO != undefined) {

                if(inventoryProductCardDTO.inventoryProductCardIsVerified == true) {
                    console.log('Skipping Verified Inventory Product Card: ' + inventoryProductCardDTO.productCardPrintingName + ' - ' + inventoryProductCardDTO.productCardTCGdbId);
                    continue;
                }

                let inventoryProductCardItems: InventoryProductCardItem[] = inventoryProductCardDTO.inventoryProductCardItems;
                for(let j = 0; j < inventoryProductCardItems.length; j++) {
                    let inventoryProductCardItem = inventoryProductCardItems[j];

                    switch(inventoryProductCardItem.productCardConditionCode) {
                        case 'NM':
                            let price = tcgdbPriceCurrent * (priceProductCardBaseDTO.priceProductCardBaseNMPercentage / 100);
                            inventoryProductCardItem.inventoryProductCardItemPrice = parseFloat(price.toFixed(2));
                            break;
                        case 'LP':
                            let priceLP = tcgdbPriceCurrent * (priceProductCardBaseDTO.priceProductCardBaseLPPercentage / 100);
                            inventoryProductCardItem.inventoryProductCardItemPrice = parseFloat(priceLP.toFixed(2));
                            break;
                        case 'MP':
                            let priceMP = tcgdbPriceCurrent * (priceProductCardBaseDTO.priceProductCardBaseMPPercentage / 100);
                            inventoryProductCardItem.inventoryProductCardItemPrice = parseFloat(priceMP.toFixed(2));
                            break;
                        case 'HP':
                            let priceHP = tcgdbPriceCurrent * (priceProductCardBaseDTO.priceProductCardBaseHPPercentage / 100);
                            inventoryProductCardItem.inventoryProductCardItemPrice = parseFloat(priceHP.toFixed(2));
                            break;
                        case 'DM':
                            let priceDM = tcgdbPriceCurrent * (priceProductCardBaseDTO.priceProductCardBaseDMPercentage / 100);
                            inventoryProductCardItem.inventoryProductCardItemPrice = parseFloat(priceDM.toFixed(2));
                            break;
                    }

                    inventoryProductCardItems[j] = inventoryProductCardItem;
                    
                }
                inventoryProductCardDTO.inventoryProductCardItems = inventoryProductCardItems;
                console.log('Update Inventory Product Card Price for: ' + inventoryProductCardDTO.productCardPrintingName + ' - ' + inventoryProductCardDTO.productCardTCGdbId);
                await this.inventoryBatchLoadProductCardService.updateBatchInventoryProductCard(inventoryProductCardDTO);
            }

        }
        
        //EMIT THE EVENT TO UPDATE THE JOB STATUS;
        this.eventEmitter.emit('inventory.batch.load.job.product.card.update.status', {
            inventoryBatchLoadJobProductCardId: inventoryBatchLoadJobProductCardDTO.inventoryBatchLoadJobProductCardId,
            inventoryBatchLoadJobProductCardStatus: INVENTORY_BATCH_LOAD_JOB_PRODUCT_CARD_STATUS.PROCESSING_INVENTORY_CARD_PRICES_COMPLETE,
        });

        //EMIT THE EVENT TO UPDATE THE JOB STATUS;
        this.eventEmitter.emit('inventory.batch.load.job.product.card.update.status', {
            inventoryBatchLoadJobProductCardId: inventoryBatchLoadJobProductCardDTO.inventoryBatchLoadJobProductCardId,
            inventoryBatchLoadJobProductCardStatus: INVENTORY_BATCH_LOAD_JOB_PRODUCT_CARD_STATUS.PROCESSING_READY_FOR_VERIFICATION,
        });
    }

    async getTCGdbPriceCurrentByRule(tcgdbMTGPriceCurrentDTO: TCGdbMTGPriceCurrentDTO, priceProductCardBaseDTO: any) {
        let tcgdbCurrentPrice = 0;

        switch(priceProductCardBaseDTO.priceProductCardBaseOption) {
            case 'TCGPlayer Low':
                tcgdbCurrentPrice = tcgdbMTGPriceCurrentDTO.tcgdbMTGPriceCurrentLowPrice;
                break;
            case 'TCGPlayer Market':
                tcgdbCurrentPrice = tcgdbMTGPriceCurrentDTO.tcgdbMTGPriceCurrentMarketPrice;
                break;
        }

        return tcgdbCurrentPrice;
    }

}