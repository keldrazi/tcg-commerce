import { Injectable } from '@nestjs/common';
import { UtilCSVService } from 'src/system/modules/util/csv/util.csv.service';
import { BuylistImportProductCardProviderDTO } from 'src/tcgcommerce/modules/buylist/import/product/card/provider/dto/buylist.import.product.card.provider.dto';
import { INVENTORY_PRODUCT_CARD_SERVICE_IMPORT_JOB_STATUS } from 'src/system/constants/tcgcommerce/inventory/product/card/service/import/job/inventory.product.card.service.import.job.constants';
import { BuylistImportProductCardProviderUtilService } from 'src/tcgcommerce/modules/buylist/import/product/card/provider/util/buylist.import.product.card.provider.util.service';
import { BuylistImportProductCardProviderTypeService } from 'src/tcgcommerce/modules/buylist/import/product/card/provider/type/buylist.import.product.card.provider.type.service';
import { BuylistImportProductCardProviderTypeDTO } from 'src/tcgcommerce/modules/buylist/import/product/card/provider/type/dto/buylist.import.product.card.provider.type.dto';
import { BuylistImportProductCardProviderTypeDataKey } from 'src/tcgcommerce/modules/buylist/import/product/card/provider/type/interface/buylist.import.product.card.provider.type.interface';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ErrorMessageService } from 'src/system/modules/error/message/error.message.service';
import { ErrorMessageDTO } from 'src/system/modules/error/message/dto/error.message.dto';


@Injectable()
export class BuylistImportProductCardProviderService {
 
    constructor(
        private utilCSVService: UtilCSVService,
        private buylistImportProductCardProviderUtilService: BuylistImportProductCardProviderUtilService,
        private buylistImportProductCardProviderTypeService: BuylistImportProductCardProviderTypeService,
        private eventEmitter: EventEmitter2,
        private errorMessageService: ErrorMessageService,
    ) {}
    
    
    async processBuylistImportProductCardCards(buylistImportProductCardFile: Express.Multer.File, buylistImportProductCardId: string, buylistImportProductCardProviderTypeCode: string) {

        let buylistImportProductCardProviderTypeDTO = await this.buylistImportProductCardProviderTypeService.getBuylistImportProductCardProviderTypeByCode(buylistImportProductCardProviderTypeCode);

        if(buylistImportProductCardProviderTypeDTO == null || buylistImportProductCardProviderTypeDTO instanceof ErrorMessageDTO) {
            return this.errorMessageService.createErrorMessage('INVENTORY_PRODUCT_CARD_SERVICE_IMPORT_JOB_PROVIDER_TYPE_NOT_FOUND', 'Inventory product card service import job provider type not found for code: ' + buylistImportProductCardProviderTypeCode);
        }

        let buylistImportProductCardProviderTypeDataKey: BuylistImportProductCardProviderTypeDataKey = buylistImportProductCardProviderTypeDTO.buylistImportProductCardProviderTypeFileDataKey;
        let buylistImportProductCardProviderTypeDataKeyTCGPlayerId = buylistImportProductCardProviderTypeDataKey.buylistImportProductCardProviderTypeDataKeyTCGPlayerId;
        let buylistImportProductCardProviderTypeDataKeySetName = buylistImportProductCardProviderTypeDataKey.buylistImportProductCardProviderTypeDataKeySetName;
        let buylistImportProductCardProviderTypeDataKeyProductName = buylistImportProductCardProviderTypeDataKey.buylistImportProductCardProviderTypeDataKeyProductName;
        let buylistImportProductCardProviderTypeDataKeyNumber = buylistImportProductCardProviderTypeDataKey.buylistImportProductCardProviderTypeDataKeyNumber;
        let buylistImportProductCardProviderTypeDataKeyRarity = buylistImportProductCardProviderTypeDataKey.buylistImportProductCardProviderTypeDataKeyRarity;
        let buylistImportProductCardProviderTypeDataKeyCondition = buylistImportProductCardProviderTypeDataKey.buylistImportProductCardProviderTypeDataKeyCondition;
        let buylistImportProductCardProviderTypeDataKeyPrinting = buylistImportProductCardProviderTypeDataKey.buylistImportProductCardProviderTypeDataKeyPrinting;
        let buylistImportProductCardProviderTypeDataKeyQty = buylistImportProductCardProviderTypeDataKey.buylistImportProductCardProviderTypeDataKeyQty;

        let buylistImportProductCardCSVData = await this.utilCSVService.parseCSV(buylistImportProductCardFile);
        let buylistImportProductCardData = await this.processBuylistImportProductCardCSVData(buylistImportProductCardCSVData, buylistImportProductCardProviderTypeDataKeyQty);

        this.eventEmitter.emit(
            'inventory.product.card.service.import.job.update.status',
            {
                buylistImportProductCardId: buylistImportProductCardId,
                buylistImportProductCardCount: buylistImportProductCardData.buylistImportProductCardCardData.length,
                buylistImportProductCardQtyCount: buylistImportProductCardData.totalbuylistImportProductCardCardQty,
                buylistImportProductCardStatus: INVENTORY_PRODUCT_CARD_SERVICE_IMPORT_JOB_STATUS.PROCESSING_UPDATE_JOB_COUNT,

            }
        )


        let buylistImportProductCardProviderDTOs: BuylistImportProductCardProviderDTO[] = [];

        for(let i = 0; i < buylistImportProductCardData.buylistImportProductCardCardData.length; i++) {

            let buylistImportProductCardCardData = buylistImportProductCardData.buylistImportProductCardCardData[i];

            if(buylistImportProductCardCardData[buylistImportProductCardProviderTypeDataKeyTCGPlayerId] != '') {

                let buylistImportProductCardProviderDTO = new BuylistImportProductCardProviderDTO();
                buylistImportProductCardProviderDTO.buylistImportProductCardProviderTCGPlayerId = buylistImportProductCardCardData[buylistImportProductCardProviderTypeDataKeyTCGPlayerId];
                buylistImportProductCardProviderDTO.buylistImportProductCardProviderSetName = buylistImportProductCardCardData[buylistImportProductCardProviderTypeDataKeySetName];
                buylistImportProductCardProviderDTO.buylistImportProductCardProviderProductName = buylistImportProductCardCardData[buylistImportProductCardProviderTypeDataKeyProductName];
                buylistImportProductCardProviderDTO.buylistImportProductCardProviderNumber = buylistImportProductCardCardData[buylistImportProductCardProviderTypeDataKeyNumber];
                buylistImportProductCardProviderDTO.buylistImportProductCardProviderRarity = buylistImportProductCardCardData[buylistImportProductCardProviderTypeDataKeyRarity];
                buylistImportProductCardProviderDTO.buylistImportProductCardProviderCondition = await this.buylistImportProductCardProviderUtilService.getBuylistImportProductCardTypeCardCondition(buylistImportProductCardCardData[buylistImportProductCardProviderTypeDataKeyCondition]);
                buylistImportProductCardProviderDTO.buylistImportProductCardProviderPrinting = await this.buylistImportProductCardProviderUtilService.getBuylistImportProductCardTypeCardPrinting(buylistImportProductCardCardData[buylistImportProductCardProviderTypeDataKeyPrinting]);
                buylistImportProductCardProviderDTO.buylistImportProductCardProviderQty = parseInt(buylistImportProductCardCardData[buylistImportProductCardProviderTypeDataKeyQty]);

                buylistImportProductCardProviderDTOs.push(buylistImportProductCardProviderDTO);
            }  
        }

        return buylistImportProductCardProviderDTOs;

    }

    async processBuylistImportProductCardCSVData(buylistImportProductCardCSVData: any, buylistImportProductCardProviderTypeDataKeyQty: string) {
       
        let totalbuylistImportProductCardCardQty = 0;
        
        let buylistImportProductCardCardData: any[] = [];
        
        for(let i = 0; i < buylistImportProductCardCSVData.length; i++) {
            let buylistImportProductCardCard = buylistImportProductCardCSVData[i];
            let buylistImportProductCardQty = parseInt(buylistImportProductCardCard[buylistImportProductCardProviderTypeDataKeyQty]);

            totalbuylistImportProductCardCardQty = totalbuylistImportProductCardCardQty + buylistImportProductCardQty;

            buylistImportProductCardCardData.push(buylistImportProductCardCard);
        }

        let buylistImportProductCardData = {
            totalbuylistImportProductCardCardQty: totalbuylistImportProductCardCardQty,
            buylistImportProductCardCardData: buylistImportProductCardCardData,
        }

        return buylistImportProductCardData;
    }

}


