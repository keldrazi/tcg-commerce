import { Injectable } from '@nestjs/common';
import { UtilCSVService } from 'src/system/modules/util/csv/util.csv.service';
import { InventoryProductCardServiceImportJobTypeRocaDTO } from 'src/tcgcommerce/modules/inventory/product/card/service/import/job/provider/roca/dto/inventory.product.card.service.import.job.provider.roca.dto';
import { INVENTORY_PRODUCT_CARD_SERVICE_IMPORT_JOB_PROVIDER_ROCA_DATA_KEYS } from 'src/system/constants/tcgcommerce/inventory/product/card/service/import/inventory.product.card.service.import.job.contants';
import { InventoryProductCardServiceImportJobUtilService } from 'src/tcgcommerce/modules/inventory/product/card/service/import/job/provider/util/inventory.product.card.service.import.job.provider.util.service';

@Injectable()
export class InventoryProductCardServiceImportJobProviderRocaService {
 
    constructor(
        private utilCSVService: UtilCSVService,
        private inventoryProductCardServiceImportJobUtilService: InventoryProductCardServiceImportJobUtilService,
    ) {}
    
    
    async processInventoryProductCardServiceImportJobCards(inventoryProductCardServiceImportJobFile: Express.Multer.File) {

        let inventoryProductCardServiceImportJobCSVData = await this.utilCSVService.parseCSV(inventoryProductCardServiceImportJobFile);
        let inventoryProductCardServiceImportJobData = await this.processInventoryProductCardServiceImportJobCSVData(inventoryProductCardServiceImportJobCSVData);

        let inventoryProductCardServiceImportJobTypeRocaDTOs: InventoryProductCardServiceImportJobTypeRocaDTO[] = [];

        for(let i = 0; i < inventoryProductCardServiceImportJobData.inventoryProductCardServiceImportJobCardData.length; i++) {

            let inventoryProductCardServiceImportJobCardData = inventoryProductCardServiceImportJobData.inventoryProductCardServiceImportJobCardData[i];

            if(inventoryProductCardServiceImportJobCardData[INVENTORY_PRODUCT_CARD_SERVICE_IMPORT_JOB_PROVIDER_ROCA_DATA_KEYS.CARD_TCG_PLAYER_ID] != '') {

                let inventoryProductCardServiceImportJobTypeRocaDTO = new InventoryProductCardServiceImportJobTypeRocaDTO();
                inventoryProductCardServiceImportJobTypeRocaDTO.inventoryProductCardServiceImportJobTypeRocaTCGPlayerId = inventoryProductCardServiceImportJobCardData[INVENTORY_PRODUCT_CARD_SERVICE_IMPORT_JOB_PROVIDER_ROCA_DATA_KEYS.CARD_TCG_PLAYER_ID];
                inventoryProductCardServiceImportJobTypeRocaDTO.inventoryProductCardServiceImportJobTypeRocaCondition = await this.inventoryProductCardServiceImportJobUtilService.getInventoryProductCardServiceImportJobTypeCardCondition(inventoryProductCardServiceImportJobCardData[INVENTORY_PRODUCT_CARD_SERVICE_IMPORT_JOB_PROVIDER_ROCA_DATA_KEYS.CARD_CONDITION]);
                inventoryProductCardServiceImportJobTypeRocaDTO.inventoryProductCardServiceImportJobTypeRocaPrinting = await this.inventoryProductCardServiceImportJobUtilService.getInventoryProductCardServiceImportJobTypeCardPrinting(inventoryProductCardServiceImportJobCardData[INVENTORY_PRODUCT_CARD_SERVICE_IMPORT_JOB_PROVIDER_ROCA_DATA_KEYS.CARD_CONDITION]);
                inventoryProductCardServiceImportJobTypeRocaDTO.inventoryProductCardServiceImportJobTypeRocaQty = parseInt(inventoryProductCardServiceImportJobCardData[INVENTORY_PRODUCT_CARD_SERVICE_IMPORT_JOB_PROVIDER_ROCA_DATA_KEYS.CARD_QTY]);

                inventoryProductCardServiceImportJobTypeRocaDTOs.push(inventoryProductCardServiceImportJobTypeRocaDTO);
            }  
        }

        return inventoryProductCardServiceImportJobTypeRocaDTOs;

    }

    async processInventoryProductCardServiceImportJobCSVData(inventoryProductCardServiceImportJobCSVData: any) {
       
        let totalinventoryProductCardServiceImportJobCardQty = 0;
        
        let inventoryProductCardServiceImportJobCardData: any[] = [];
        

        for(let i = 0; i < inventoryProductCardServiceImportJobCSVData.length; i++) {
            let inventoryProductCardServiceImportJobCard = inventoryProductCardServiceImportJobCSVData[i];
            let inventoryProductCardServiceImportJobQty = parseInt(inventoryProductCardServiceImportJobCard[INVENTORY_PRODUCT_CARD_SERVICE_IMPORT_JOB_PROVIDER_ROCA_DATA_KEYS.CARD_QTY]);

            totalinventoryProductCardServiceImportJobCardQty = totalinventoryProductCardServiceImportJobCardQty + inventoryProductCardServiceImportJobQty;

            inventoryProductCardServiceImportJobCardData.push(inventoryProductCardServiceImportJobCard);
        }

        let inventoryProductCardServiceImportJobData = {
            totalinventoryProductCardServiceImportJobCardQty: totalinventoryProductCardServiceImportJobCardQty,
            inventoryProductCardServiceImportJobCardData: inventoryProductCardServiceImportJobCardData,
        }

        return inventoryProductCardServiceImportJobData;
    }

}


