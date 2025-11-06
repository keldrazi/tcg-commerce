import { Injectable,  } from '@nestjs/common';
import { INVENTORY_PRODUCT_CARD_SERVICE_IMPORT_JOB_PROVIDER_CARD_CONDITION, INVENTORY_PRODUCT_CARD_SERVICE_IMPORT_JOB_PROVIDER_CARD_PRINTING } from 'src/system/constants/tcgcommerce/inventory/product/card/service/import/inventory.product.card.service.import.job.contants';

@Injectable()
export class InventoryProductCardServiceImportJobTypeUtilService {

    constructor(
        
    ) {}

    //TO DO: MOVE THIS TO A DATABASE TABLE LATER;
    
    async getInventoryProductCardServiceImportJobTypeCardCondition(inventoryProductCardServiceImportJobTypeCardCondition: string) {
        
        let cardCondition = "";

        if(inventoryProductCardServiceImportJobTypeCardCondition.indexOf('Near Mint') != -1) {
            cardCondition = INVENTORY_PRODUCT_CARD_SERVICE_IMPORT_JOB_PROVIDER_CARD_CONDITION.NEAR_MINT;
            return cardCondition;
        }
        if(inventoryProductCardServiceImportJobTypeCardCondition.indexOf('Lightly Played') != -1) {
            cardCondition = INVENTORY_PRODUCT_CARD_SERVICE_IMPORT_JOB_PROVIDER_CARD_CONDITION.LIGHTLY_PLAYED;
            return cardCondition;
        }
        if(inventoryProductCardServiceImportJobTypeCardCondition.indexOf('Moderately Played') != -1) {
            cardCondition = INVENTORY_PRODUCT_CARD_SERVICE_IMPORT_JOB_PROVIDER_CARD_CONDITION.MODERATELY_PLAYED;
            return cardCondition;
        }
        if(inventoryProductCardServiceImportJobTypeCardCondition.indexOf('Heavily Played') != -1) {
            cardCondition = INVENTORY_PRODUCT_CARD_SERVICE_IMPORT_JOB_PROVIDER_CARD_CONDITION.HEAVILY_PLAYED;
            return cardCondition;
        }
        if(inventoryProductCardServiceImportJobTypeCardCondition.indexOf('Damaged') != -1) {
            cardCondition = INVENTORY_PRODUCT_CARD_SERVICE_IMPORT_JOB_PROVIDER_CARD_CONDITION.DAMAGED;
            return cardCondition;
        }

        return cardCondition;
    }

    
    async getInventoryProductCardServiceImportJobTypeCardPrinting(inventoryProductCardServiceImportJobTypeCardPrinting: string) {
        
        let cardPrintingType = "";

        if(inventoryProductCardServiceImportJobTypeCardPrinting.indexOf('Foil') != -1) {
            cardPrintingType = INVENTORY_PRODUCT_CARD_SERVICE_IMPORT_JOB_PROVIDER_CARD_PRINTING.FOIL;
        }
        else {
            cardPrintingType = INVENTORY_PRODUCT_CARD_SERVICE_IMPORT_JOB_PROVIDER_CARD_PRINTING.NORMAL;
        }

        return cardPrintingType;
    }
   
}



