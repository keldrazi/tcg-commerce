import { Injectable } from '@nestjs/common';
import { UtilCSVService } from 'src/system/modules/util/csv/util.csv.service';
import { InventoryProductCardServiceImportJobProviderRocaDTO } from 'src/tcgcommerce/modules/inventory/product/card/service/import/job/provider/roca/dto/inventory.product.card.service.import.job.provider.roca.dto';
import { INVENTORY_PRODUCT_CARD_SERVICE_IMPORT_JOB_PROVIDER_ROCA_DATA_KEYS } from 'src/system/constants/tcgcommerce/inventory/product/card/service/import/job/inventory.product.card.service.import.job.constants';
import { InventoryProductCardServiceImportJobProviderUtilService } from 'src/tcgcommerce/modules/inventory/product/card/service/import/job/provider/util/inventory.product.card.service.import.job.provider.util.service';

@Injectable()
export class InventoryProductCardServiceImportJobProviderRocaService {
 
    constructor(
        private utilCSVService: UtilCSVService,
        private inventoryProductCardServiceImportJobProviderUtilService: InventoryProductCardServiceImportJobProviderUtilService,
    ) {}
    
    
    async processInventoryProductCardServiceImportJobCards(inventoryProductCardServiceImportJobFile: Express.Multer.File) {

        let inventoryProductCardServiceImportJobCSVData = await this.utilCSVService.parseCSV(inventoryProductCardServiceImportJobFile);
        let inventoryProductCardServiceImportJobData = await this.processInventoryProductCardServiceImportJobCSVData(inventoryProductCardServiceImportJobCSVData);

        let inventoryProductCardServiceImportJobProviderRocaDTOs: InventoryProductCardServiceImportJobProviderRocaDTO[] = [];

        for(let i = 0; i < inventoryProductCardServiceImportJobData.inventoryProductCardServiceImportJobCardData.length; i++) {

            let inventoryProductCardServiceImportJobCardData = inventoryProductCardServiceImportJobData.inventoryProductCardServiceImportJobCardData[i];

            if(inventoryProductCardServiceImportJobCardData[INVENTORY_PRODUCT_CARD_SERVICE_IMPORT_JOB_PROVIDER_ROCA_DATA_KEYS.CARD_TCG_PLAYER_ID] != '') {

                let inventoryProductCardServiceImportJobProviderRocaDTO = new InventoryProductCardServiceImportJobProviderRocaDTO();
                inventoryProductCardServiceImportJobProviderRocaDTO.inventoryProductCardServiceImportJobProviderRocaTCGPlayerId = inventoryProductCardServiceImportJobCardData[INVENTORY_PRODUCT_CARD_SERVICE_IMPORT_JOB_PROVIDER_ROCA_DATA_KEYS.CARD_TCG_PLAYER_ID];
                inventoryProductCardServiceImportJobProviderRocaDTO.inventoryProductCardServiceImportJobProviderRocaCondition = await this.inventoryProductCardServiceImportJobProviderUtilService.getInventoryProductCardServiceImportJobTypeCardCondition(inventoryProductCardServiceImportJobCardData[INVENTORY_PRODUCT_CARD_SERVICE_IMPORT_JOB_PROVIDER_ROCA_DATA_KEYS.CARD_CONDITION]);
                inventoryProductCardServiceImportJobProviderRocaDTO.inventoryProductCardServiceImportJobProviderRocaPrinting = await this.inventoryProductCardServiceImportJobProviderUtilService.getInventoryProductCardServiceImportJobTypeCardPrinting(inventoryProductCardServiceImportJobCardData[INVENTORY_PRODUCT_CARD_SERVICE_IMPORT_JOB_PROVIDER_ROCA_DATA_KEYS.CARD_CONDITION]);
                inventoryProductCardServiceImportJobProviderRocaDTO.inventoryProductCardServiceImportJobProviderRocaQty = parseInt(inventoryProductCardServiceImportJobCardData[INVENTORY_PRODUCT_CARD_SERVICE_IMPORT_JOB_PROVIDER_ROCA_DATA_KEYS.CARD_QTY]);

                inventoryProductCardServiceImportJobProviderRocaDTOs.push(inventoryProductCardServiceImportJobProviderRocaDTO);
            }  
        }

        return inventoryProductCardServiceImportJobProviderRocaDTOs;

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


