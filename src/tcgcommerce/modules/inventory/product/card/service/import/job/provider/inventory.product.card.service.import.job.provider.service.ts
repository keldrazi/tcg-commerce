import { Injectable } from '@nestjs/common';
import { UtilCSVService } from 'src/system/modules/util/csv/util.csv.service';
import { InventoryProductCardServiceImportJobProviderDTO } from 'src/tcgcommerce/modules/inventory/product/card/service/import/job/provider/dto/inventory.product.card.service.import.job.provider.dto';
import { INVENTORY_PRODUCT_CARD_SERVICE_IMPORT_JOB_STATUS } from 'src/system/constants/tcgcommerce/inventory/product/card/service/import/job/inventory.product.card.service.import.job.constants';
import { InventoryProductCardServiceImportJobProviderUtilService } from 'src/tcgcommerce/modules/inventory/product/card/service/import/job/provider/util/inventory.product.card.service.import.job.provider.util.service';
import { InventoryProductCardServiceImportJobProviderTypeService } from 'src/tcgcommerce/modules/inventory/product/card/service/import/job/provider/type/inventory.product.card.service.import.job.provider.type.service';
import { InventoryProductCardServiceImportJobProviderTypeDTO } from 'src/tcgcommerce/modules/inventory/product/card/service/import/job/provider/type/dto/inventory.product.card.service.import.job.provider.type.dto';
import { InventoryProductCardServiceImportJobProviderTypeDataKey } from 'src/tcgcommerce/modules/inventory/product/card/service/import/job/provider/type/interface/inventory.product.card.service.import.job.provider.type.interface';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ErrorMessageService } from 'src/system/modules/error/message/error.message.service';
import { ErrorMessageDTO } from 'src/system/modules/error/message/dto/error.message.dto';


@Injectable()
export class InventoryProductCardServiceImportJobProviderService {
 
    constructor(
        private utilCSVService: UtilCSVService,
        private inventoryProductCardServiceImportJobProviderUtilService: InventoryProductCardServiceImportJobProviderUtilService,
        private inventoryProductCardServiceImportJobProviderTypeService: InventoryProductCardServiceImportJobProviderTypeService,
        private eventEmitter: EventEmitter2,
        private errorMessageService: ErrorMessageService,
    ) {}
    
    
    async processInventoryProductCardServiceImportJobCards(inventoryProductCardServiceImportJobFile: Express.Multer.File, inventoryProductCardServiceImportJobId: string, inventoryProductCardServiceImportJobProviderTypeCode: string) {

        let inventoryProductCardServiceImportJobProviderTypeDTO = await this.inventoryProductCardServiceImportJobProviderTypeService.getInventoryProductCardServiceImportJobProviderTypeByCode(inventoryProductCardServiceImportJobProviderTypeCode);

        if(inventoryProductCardServiceImportJobProviderTypeDTO == null || inventoryProductCardServiceImportJobProviderTypeDTO instanceof ErrorMessageDTO) {
            return this.errorMessageService.createErrorMessage('INVENTORY_PRODUCT_CARD_SERVICE_IMPORT_JOB_PROVIDER_TYPE_NOT_FOUND', 'Inventory product card service import job provider type not found');
        }

        let inventoryProductCardServiceImportJobProviderTypeDataKey: InventoryProductCardServiceImportJobProviderTypeDataKey = inventoryProductCardServiceImportJobProviderTypeDTO.inventoryProductCardServiceImportJobProviderTypeFileDataKey;
        let inventoryProductCardServiceImportJobProviderTypeDataKeyTCGPlayerId = inventoryProductCardServiceImportJobProviderTypeDataKey.inventoryProductCardServiceImportJobProviderTypeDataKeyTCGPlayerId;
        let inventoryProductCardServiceImportJobProviderTypeDataKeySetName = inventoryProductCardServiceImportJobProviderTypeDataKey.inventoryProductCardServiceImportJobProviderTypeDataKeySetName;
        let inventoryProductCardServiceImportJobProviderTypeDataKeyProductName = inventoryProductCardServiceImportJobProviderTypeDataKey.inventoryProductCardServiceImportJobProviderTypeDataKeyProductName;
        let inventoryProductCardServiceImportJobProviderTypeDataKeyNumber = inventoryProductCardServiceImportJobProviderTypeDataKey.inventoryProductCardServiceImportJobProviderTypeDataKeyNumber;
        let inventoryProductCardServiceImportJobProviderTypeDataKeyRarity = inventoryProductCardServiceImportJobProviderTypeDataKey.inventoryProductCardServiceImportJobProviderTypeDataKeyRarity;
        let inventoryProductCardServiceImportJobProviderTypeDataKeyCondition = inventoryProductCardServiceImportJobProviderTypeDataKey.inventoryProductCardServiceImportJobProviderTypeDataKeyCondition;
        let inventoryProductCardServiceImportJobProviderTypeDataKeyPrinting = inventoryProductCardServiceImportJobProviderTypeDataKey.inventoryProductCardServiceImportJobProviderTypeDataKeyPrinting;
        let inventoryProductCardServiceImportJobProviderTypeDataKeyQty = inventoryProductCardServiceImportJobProviderTypeDataKey.inventoryProductCardServiceImportJobProviderTypeDataKeyQty;

        let inventoryProductCardServiceImportJobCSVData = await this.utilCSVService.parseCSV(inventoryProductCardServiceImportJobFile);
        let inventoryProductCardServiceImportJobData = await this.processInventoryProductCardServiceImportJobCSVData(inventoryProductCardServiceImportJobCSVData, inventoryProductCardServiceImportJobProviderTypeDataKeyQty);

        this.eventEmitter.emit(
            'inventory.product.card.service.import.job.update.status',
            {
                inventoryProductCardServiceImportJobId: inventoryProductCardServiceImportJobId,
                inventoryProductCardServiceImportJobCount: inventoryProductCardServiceImportJobData.inventoryProductCardServiceImportJobCardData.length,
                inventoryProductCardServiceImportJobQtyCount: inventoryProductCardServiceImportJobData.totalInventoryProductCardServiceImportJobCardQty,
                inventoryProductCardServiceImportJobStatus: INVENTORY_PRODUCT_CARD_SERVICE_IMPORT_JOB_STATUS.PROCESSING_UPDATE_JOB_COUNT,

            }
        )
        
        let inventoryProductCardServiceImportJobProviderDTOs: InventoryProductCardServiceImportJobProviderDTO[] = [];

        for(let i = 0; i < inventoryProductCardServiceImportJobData.inventoryProductCardServiceImportJobCardData.length; i++) {

            let inventoryProductCardServiceImportJobCardData = inventoryProductCardServiceImportJobData.inventoryProductCardServiceImportJobCardData[i];

            if(inventoryProductCardServiceImportJobCardData[inventoryProductCardServiceImportJobProviderTypeDataKeyTCGPlayerId] != '') {

                let inventoryProductCardServiceImportJobProviderDTO = new InventoryProductCardServiceImportJobProviderDTO();
                inventoryProductCardServiceImportJobProviderDTO.inventoryProductCardServiceImportJobProviderTCGPlayerId = inventoryProductCardServiceImportJobCardData[inventoryProductCardServiceImportJobProviderTypeDataKeyTCGPlayerId];
                inventoryProductCardServiceImportJobProviderDTO.inventoryProductCardServiceImportJobProviderSetName = inventoryProductCardServiceImportJobCardData[inventoryProductCardServiceImportJobProviderTypeDataKeySetName];
                inventoryProductCardServiceImportJobProviderDTO.inventoryProductCardServiceImportJobProviderProductName = inventoryProductCardServiceImportJobCardData[inventoryProductCardServiceImportJobProviderTypeDataKeyProductName];
                inventoryProductCardServiceImportJobProviderDTO.inventoryProductCardServiceImportJobProviderNumber = inventoryProductCardServiceImportJobCardData[inventoryProductCardServiceImportJobProviderTypeDataKeyNumber];
                inventoryProductCardServiceImportJobProviderDTO.inventoryProductCardServiceImportJobProviderRarity = inventoryProductCardServiceImportJobCardData[inventoryProductCardServiceImportJobProviderTypeDataKeyRarity];
                inventoryProductCardServiceImportJobProviderDTO.inventoryProductCardServiceImportJobProviderCondition = await this.inventoryProductCardServiceImportJobProviderUtilService.getInventoryProductCardServiceImportJobTypeCardCondition(inventoryProductCardServiceImportJobCardData[inventoryProductCardServiceImportJobProviderTypeDataKeyCondition]);
                inventoryProductCardServiceImportJobProviderDTO.inventoryProductCardServiceImportJobProviderPrinting = await this.inventoryProductCardServiceImportJobProviderUtilService.getInventoryProductCardServiceImportJobTypeCardPrinting(inventoryProductCardServiceImportJobCardData[inventoryProductCardServiceImportJobProviderTypeDataKeyPrinting]);
                inventoryProductCardServiceImportJobProviderDTO.inventoryProductCardServiceImportJobProviderQty = parseInt(inventoryProductCardServiceImportJobCardData[inventoryProductCardServiceImportJobProviderTypeDataKeyQty]);

                inventoryProductCardServiceImportJobProviderDTOs.push(inventoryProductCardServiceImportJobProviderDTO);
            }  
        }

        return inventoryProductCardServiceImportJobProviderDTOs;

    }

    async processInventoryProductCardServiceImportJobCSVData(inventoryProductCardServiceImportJobCSVData: any, inventoryProductCardServiceImportJobProviderTypeDataKeyQty: string) {
       
        let totalInventoryProductCardServiceImportJobCardQty = 0;
        
        let inventoryProductCardServiceImportJobCardData: any[] = [];
        
        for(let i = 0; i < inventoryProductCardServiceImportJobCSVData.length; i++) {
            let inventoryProductCardServiceImportJobCard = inventoryProductCardServiceImportJobCSVData[i];
            let inventoryProductCardServiceImportJobQty = parseInt(inventoryProductCardServiceImportJobCard[inventoryProductCardServiceImportJobProviderTypeDataKeyQty]);

            totalInventoryProductCardServiceImportJobCardQty = totalInventoryProductCardServiceImportJobCardQty + inventoryProductCardServiceImportJobQty;

            inventoryProductCardServiceImportJobCardData.push(inventoryProductCardServiceImportJobCard);
        }

        let inventoryProductCardServiceImportJobData = {
            totalInventoryProductCardServiceImportJobCardQty: totalInventoryProductCardServiceImportJobCardQty,
            inventoryProductCardServiceImportJobCardData: inventoryProductCardServiceImportJobCardData,
        }

        return inventoryProductCardServiceImportJobData;
    }

}


