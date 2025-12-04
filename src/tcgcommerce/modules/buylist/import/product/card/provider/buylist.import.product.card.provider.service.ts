import { Injectable } from '@nestjs/common';
import { UtilCSVService } from 'src/system/modules/util/csv/util.csv.service';
import { BuylistImportProductCardProviderDTO } from 'src/tcgcommerce/modules/buylist/import/product/card/provider/dto/buylist.import.product.card.provider.dto';
import { BuylistImportProductCardProviderTypeService } from 'src/tcgcommerce/modules/buylist/import/product/card/provider/type/buylist.import.product.card.provider.type.service';
import { BuylistImportProductCardProviderTypeFileDataKey, BuylistImportProductCardProviderTypeFileConditionKey, BuylistImportProductCardProviderTypeFilePrintingKey } from 'src/tcgcommerce/modules/buylist/import/product/card/provider/type/interface/buylist.import.product.card.provider.type.interface';
import { ErrorMessageService } from 'src/system/modules/error/message/error.message.service';
import { ErrorMessageDTO } from 'src/system/modules/error/message/dto/error.message.dto';
import { BuylistImportProductCardProviderTypeUtilService } from './type/util/buylist.import.product.card.provider.type.util.service';



@Injectable()
export class BuylistImportProductCardProviderService {
 
    constructor(
        private utilCSVService: UtilCSVService,
        private buylistImportProductCardProviderTypeService: BuylistImportProductCardProviderTypeService,
        private errorMessageService: ErrorMessageService,
        private buylistImportProductCardProviderTypeUtilService: BuylistImportProductCardProviderTypeUtilService,
    ) {}
    
    
    async processBuylistImportProductCardCards(buylistImportProductCardFile: Express.Multer.File, buylistImportProductCardId: string, buylistImportProductCardProviderTypeCode: string) {

        let buylistImportProductCardProviderTypeDTO = await this.buylistImportProductCardProviderTypeService.getBuylistImportProductCardProviderTypeByCode(buylistImportProductCardProviderTypeCode);

        if(buylistImportProductCardProviderTypeDTO == null || buylistImportProductCardProviderTypeDTO instanceof ErrorMessageDTO) {
            return this.errorMessageService.createErrorMessage('BUYLIST_IMPORT_PRODUCT_CARD_PROVIDER_TYPE_NOT_FOUND', 'Buylist import product card provider type not found');
        }

        let buylistImportProductCardProviderTypeFileDataKey: BuylistImportProductCardProviderTypeFileDataKey = buylistImportProductCardProviderTypeDTO.buylistImportProductCardProviderTypeFileDataKey;
        let buylistImportProductCardProviderTypeFileDataKeyProductName = buylistImportProductCardProviderTypeFileDataKey.buylistImportProductCardProviderTypeFileDataKeyProductName;
        let buylistImportProductCardProviderTypeFileDataKeyNumber = buylistImportProductCardProviderTypeFileDataKey.buylistImportProductCardProviderTypeFileDataKeyNumber;
        let buylistImportProductCardProviderTypeFileDataKeySetCode = buylistImportProductCardProviderTypeFileDataKey.buylistImportProductCardProviderTypeFileDataKeySetCode;
        let buylistImportProductCardProviderTypeFileDataKeyCondition = buylistImportProductCardProviderTypeFileDataKey.buylistImportProductCardProviderTypeFileDataKeyCondition;
        let buylistImportProductCardProviderTypeFileDataKeyPrinting = buylistImportProductCardProviderTypeFileDataKey.buylistImportProductCardProviderTypeFileDataKeyPrinting;
        let buylistImportProductCardProviderTypeFileDataKeyQty = buylistImportProductCardProviderTypeFileDataKey.buylistImportProductCardProviderTypeFileDataKeyQty;

        let buylistImportProductCardProviderTypeFileConditionKey: BuylistImportProductCardProviderTypeFileConditionKey = buylistImportProductCardProviderTypeDTO.buylistImportProductCardProviderTypeFileConditionKey;
        let buylistImportProductCardProviderTypeFilePrintingKey: BuylistImportProductCardProviderTypeFilePrintingKey = buylistImportProductCardProviderTypeDTO.buylistImportProductCardProviderTypeFilePrintingKey;

        let buylistImportProductCardCSVData = await this.utilCSVService.parseCSV(buylistImportProductCardFile);
        let buylistImportProductCardData = await this.processBuylistImportProductCardCSVData(buylistImportProductCardCSVData, buylistImportProductCardProviderTypeFileDataKeyQty);

        let buylistImportProductCardProviderDTOs: BuylistImportProductCardProviderDTO[] = [];

        for(let i = 0; i < buylistImportProductCardData.buylistImportProductCardCardData.length; i++) {

            let buylistImportProductCardCardData = buylistImportProductCardData.buylistImportProductCardCardData[i];

            if(buylistImportProductCardCardData[buylistImportProductCardProviderTypeFileDataKeyProductName] != undefined && buylistImportProductCardCardData[buylistImportProductCardProviderTypeFileDataKeyNumber] != undefined) {

                let buylistImportProductCardProviderDTO = new BuylistImportProductCardProviderDTO();
                buylistImportProductCardProviderDTO.buylistImportProductCardProviderSetCode = buylistImportProductCardCardData[buylistImportProductCardProviderTypeFileDataKeySetCode];
                buylistImportProductCardProviderDTO.buylistImportProductCardProviderProductName = buylistImportProductCardCardData[buylistImportProductCardProviderTypeFileDataKeyProductName];
                buylistImportProductCardProviderDTO.buylistImportProductCardProviderNumber = buylistImportProductCardCardData[buylistImportProductCardProviderTypeFileDataKeyNumber];
                buylistImportProductCardProviderDTO.buylistImportProductCardProviderCondition = await this.buylistImportProductCardProviderTypeUtilService.getBuylistImportProductCardProviderTypeCardCondition(buylistImportProductCardCardData[buylistImportProductCardProviderTypeFileDataKeyCondition], buylistImportProductCardProviderTypeFileConditionKey);
                buylistImportProductCardProviderDTO.buylistImportProductCardProviderPrinting = await this.buylistImportProductCardProviderTypeUtilService.getBuylistImportProductCardProviderTypeCardPrinting(buylistImportProductCardCardData[buylistImportProductCardProviderTypeFileDataKeyPrinting], buylistImportProductCardProviderTypeFilePrintingKey);
                buylistImportProductCardProviderDTO.buylistImportProductCardProviderQty = parseInt(buylistImportProductCardCardData[buylistImportProductCardProviderTypeFileDataKeyQty]);

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


