import { Injectable } from '@nestjs/common';
import { UtilCSVService } from 'src/system/modules/util/csv/util.csv.service';
import { InventoryProductCardServiceImportJobProviderRocaDTO } from 'src/tcgcommerce/modules/inventory/product/card/service/import/job/provider/roca/dto/inventory.product.card.service.import.job.provider.roca.dto';
import { INVENTORY_PRODUCT_CARD_SERVICE_IMPORT_JOB_PROVIDER_ROCA_DATA_KEYS } from 'src/system/constants/tcgcommerce/inventory/product/card/service/import/job/inventory.product.card.service.import.job.constants';
import { InventoryProductCardServiceImportJobProviderUtilService } from 'src/tcgcommerce/modules/inventory/product/card/service/import/job/provider/util/inventory.product.card.service.import.job.provider.util.service';
import { InventoryProductCardServiceImportJobProviderTypeService } from 'src/tcgcommerce/modules/inventory/product/card/service/import/job/provider/type/inventory.product.card.service.import.job.provider.type.service';
import { InventoryProductCardServiceImportJobProviderTypeDTO } from 'src/tcgcommerce/modules/inventory/product/card/service/import/job/provider/type/dto/inventory.product.card.service.import.job.provider.type.dto';
import { InventoryProductCardServiceImportJobProviderTypeDataKey } from 'src/tcgcommerce/modules/inventory/product/card/service/import/job/provider/type/interface/inventory.product.card.service.import.job.provider.type.interface';

@Injectable()
export class InventoryProductCardServiceImportJobProviderRocaService {
 
    constructor(
        private utilCSVService: UtilCSVService,
        private inventoryProductCardServiceImportJobProviderUtilService: InventoryProductCardServiceImportJobProviderUtilService,
        private inventoryProductCardServiceImportJobProviderTypeService: InventoryProductCardServiceImportJobProviderTypeService,
    ) {}
    
    
    async processInventoryProductCardServiceImportJobCards(inventoryProductCardServiceImportJobFile: Express.Multer.File) {

        let inventoryProductCardServiceImportJobProviderTypeDTO = await this.inventoryProductCardServiceImportJobProviderTypeService.getInventoryProductCardServiceImportJobProviderTypeByCode('ROCA');

        if(inventoryProductCardServiceImportJobProviderTypeDTO == null) {
            return null;
        }

        let inventoryProductCardServiceImportJobProviderTypeDataKey: InventoryProductCardServiceImportJobProviderTypeDataKey = inventoryProductCardServiceImportJobProviderTypeDTO.inventoryProductCardServiceImportJobProviderTypeFileDataKey;
        let inventoryProductCardServiceImportJobProviderTypeDataKeyTCGPlayerId = inventoryProductCardServiceImportJobProviderTypeDataKey.inventoryProductCardServiceImportJobProviderTypeDataKeyTCGPlayerId;
        let inventoryProductCardServiceImportJobProviderTypeDataKeyCondition = inventoryProductCardServiceImportJobProviderTypeDataKey.inventoryProductCardServiceImportJobProviderTypeDataKeyCondition;
        let inventoryProductCardServiceImportJobProviderTypeDataKeyPrinting = inventoryProductCardServiceImportJobProviderTypeDataKey.inventoryProductCardServiceImportJobProviderTypeDataKeyPrinting;
        let inventoryProductCardServiceImportJobProviderTypeDataKeyQty = inventoryProductCardServiceImportJobProviderTypeDataKey.inventoryProductCardServiceImportJobProviderTypeDataKeyQty;

        let inventoryProductCardServiceImportJobCSVData = await this.utilCSVService.parseCSV(inventoryProductCardServiceImportJobFile);
        let inventoryProductCardServiceImportJobData = await this.processInventoryProductCardServiceImportJobCSVData(inventoryProductCardServiceImportJobCSVData, inventoryProductCardServiceImportJobProviderTypeDataKeyQty);

        let inventoryProductCardServiceImportJobProviderRocaDTOs: InventoryProductCardServiceImportJobProviderRocaDTO[] = [];

        for(let i = 0; i < inventoryProductCardServiceImportJobData.inventoryProductCardServiceImportJobCardData.length; i++) {

            let inventoryProductCardServiceImportJobCardData = inventoryProductCardServiceImportJobData.inventoryProductCardServiceImportJobCardData[i];

            if(inventoryProductCardServiceImportJobCardData[inventoryProductCardServiceImportJobProviderTypeDataKeyTCGPlayerId] != '') {

                let inventoryProductCardServiceImportJobProviderRocaDTO = new InventoryProductCardServiceImportJobProviderRocaDTO();
                inventoryProductCardServiceImportJobProviderRocaDTO.inventoryProductCardServiceImportJobProviderRocaTCGPlayerId = inventoryProductCardServiceImportJobCardData[inventoryProductCardServiceImportJobProviderTypeDataKeyTCGPlayerId];
                inventoryProductCardServiceImportJobProviderRocaDTO.inventoryProductCardServiceImportJobProviderRocaCondition = await this.inventoryProductCardServiceImportJobProviderUtilService.getInventoryProductCardServiceImportJobTypeCardCondition(inventoryProductCardServiceImportJobCardData[inventoryProductCardServiceImportJobProviderTypeDataKeyCondition]);
                inventoryProductCardServiceImportJobProviderRocaDTO.inventoryProductCardServiceImportJobProviderRocaPrinting = await this.inventoryProductCardServiceImportJobProviderUtilService.getInventoryProductCardServiceImportJobTypeCardPrinting(inventoryProductCardServiceImportJobCardData[inventoryProductCardServiceImportJobProviderTypeDataKeyPrinting]);
                inventoryProductCardServiceImportJobProviderRocaDTO.inventoryProductCardServiceImportJobProviderRocaQty = parseInt(inventoryProductCardServiceImportJobCardData[inventoryProductCardServiceImportJobProviderTypeDataKeyQty]);

                inventoryProductCardServiceImportJobProviderRocaDTOs.push(inventoryProductCardServiceImportJobProviderRocaDTO);
            }  
        }

        return inventoryProductCardServiceImportJobProviderRocaDTOs;

    }

    async processInventoryProductCardServiceImportJobCSVData(inventoryProductCardServiceImportJobCSVData: any, inventoryProductCardServiceImportJobProviderTypeDataKeyQty: string) {
       
        let totalinventoryProductCardServiceImportJobCardQty = 0;
        
        let inventoryProductCardServiceImportJobCardData: any[] = [];
        

        for(let i = 0; i < inventoryProductCardServiceImportJobCSVData.length; i++) {
            let inventoryProductCardServiceImportJobCard = inventoryProductCardServiceImportJobCSVData[i];
            let inventoryProductCardServiceImportJobQty = parseInt(inventoryProductCardServiceImportJobCard[inventoryProductCardServiceImportJobProviderTypeDataKeyQty]);

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


