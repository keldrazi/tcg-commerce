import { Injectable } from '@nestjs/common';
import { UtilCSVService } from 'src/system/modules/util/csv/util.csv.service';
import { InventoryProductCardServiceImportJobTypeRocaDTO } from 'src/tcgcommerce/modules/inventory/product/card/service/import/job/type/roca/dto/inventory.product.card.service.import.job.type.roca.dto';
import { INVENTORY_PRODUCT_CARD_SERVICE_IMPORT_JOB_TYPE_ROCA_DATA_KEYS } from 'src/system/constants/tcgcommerce/inventory/product/card/service/import/inventory.product.card.service.import.job.contants';
import { InventoryProductCardServiceImportJobTypeUtilService } from 'src/tcgcommerce/modules/inventory/product/card/service/import/job/type/util/inventory.product.card.service.import.job.type.util.service';

@Injectable()
export class InventoryProductCardServiceImportJobTypeRocaService {
 
    constructor(
        private utilCSVService: UtilCSVService,
        private inventoryProductCardServiceImportJobTypeUtilService: InventoryProductCardServiceImportJobTypeUtilService,
    ) {}
    
    
    async processImportCards(inventoryProductCardServiceImportJobFile: Express.Multer.File) {

        let inventoryProductCardServiceImportJobCSVData = await this.utilCSVService.parseCSV(inventoryProductCardServiceImportJobFile);
        let importSortCardData = await this.processCSVCardData(importSortCSVData);

        let importSortCardDTOs: ImportSortCardDTO[] = [];

        for(let i = 0; i < importSortCardData.importCardData.length; i++) {

            let cardData = importSortCardData.importCardData[i];

            if(cardData[IMPORT_SORT_ROCA_CARD_DATA_KEYS.CARD_TCG_PLAYER_ID] != '') {

                let importSortCardDTO = new ImportSortCardDTO();
                let importCardTCGPlayerId = cardData[IMPORT_SORT_ROCA_CARD_DATA_KEYS.CARD_TCG_PLAYER_ID];
                importSortCardDTO.importSortCardSetName = cardData[IMPORT_SORT_ROCA_CARD_DATA_KEYS.CARD_SET_NAME];
                importSortCardDTO.importSortCardName = cardData[IMPORT_SORT_ROCA_CARD_DATA_KEYS.CARD_NAME];
                importSortCardDTO.importSortCardNumber = cardData[IMPORT_SORT_ROCA_CARD_DATA_KEYS.CARD_NUMBER];
                importSortCardDTO.importSortCardCondition = await this.importServiceCardUtilService.getImportSortCardCondition(cardData[IMPORT_SORT_ROCA_CARD_DATA_KEYS.CARD_CONDITION]);
                //NEED TO CHECK THIS;
                importSortCardDTO.importSortCardPrinting = IMPORT_SORT_CARD_PRINTING.NORMAL;
                importSortCardDTO.importSortCardTCGPlayerMarketPrice = parseFloat(cardData[IMPORT_SORT_ROCA_CARD_DATA_KEYS.CARD_TCG_PLAYER_MARKET_PRICE]);
                importSortCardDTO.importSortCardTCGPlayerLowPrice = parseFloat(cardData[IMPORT_SORT_ROCA_CARD_DATA_KEYS.CARD_TCG_PLAYER_LOW_PRICE]);
                importSortCardDTO.importSortCardQty = parseInt(cardData[IMPORT_SORT_ROCA_CARD_DATA_KEYS.CARD_QTY]);

                importSortCardDTOs.push(importSortCardDTO);
            }  
        }

        let importSortCardDataDTO = new ImportSortCardDataDTO();
        importSortCardDataDTO.importSortCardTotalCardQty = importSortCardData.importSortCardTotalCardQty;
        importSortCardDataDTO.importSortCardTotalCardTCGPlayerMarketPrice = importSortCardData.importSortCardTotalCardTCGPlayerMarketPrice;
        importSortCardDataDTO.importSortCardTotalCardTCGPlayerLowPrice = importSortCardData.importSortCardTotalCardTCGPlayerLowPrice;
        importSortCardDataDTO.importSortCardData = importSortCardDTOs;

        return importSortCardDataDTO;

    }

    async processCSVCardData(importCSVCardData: any) {
       
        let totalImportCardQty = 0;
        let totalImportCardTCGPlayerMarketPrice = 0;
        let totalImportCardTCGPlayerLowPrice = 0;

        let importCardData: any[] = [];
        

        for(let i = 0; i < importCSVCardData.length; i++) {
            let importCard = importCSVCardData[i];
            let importCardQty = parseInt(importCard[IMPORT_SORT_ROCA_CARD_DATA_KEYS.CARD_QTY]);
            let importCardTCGPlayerMarketPrice = parseFloat(importCard[IMPORT_SORT_ROCA_CARD_DATA_KEYS.CARD_TCG_PLAYER_MARKET_PRICE]) * importCardQty;
            let importCardTCGPlayerLowPrice = parseFloat(importCard[IMPORT_SORT_ROCA_CARD_DATA_KEYS.CARD_TCG_PLAYER_LOW_PRICE]) * importCardQty;

            importCardTCGPlayerMarketPrice = parseFloat(importCardTCGPlayerMarketPrice.toFixed(2));
            importCardTCGPlayerLowPrice = parseFloat(importCardTCGPlayerLowPrice.toFixed(2));

            totalImportCardQty = totalImportCardQty + importCardQty;
            totalImportCardTCGPlayerMarketPrice = totalImportCardTCGPlayerMarketPrice + importCardTCGPlayerMarketPrice;
            totalImportCardTCGPlayerLowPrice = totalImportCardTCGPlayerLowPrice + importCardTCGPlayerLowPrice;

            importCardData.push(importCard);
        }

        let importData = {
            importSortCardTotalCardQty: totalImportCardQty,
            importSortCardTotalCardTCGPlayerMarketPrice: totalImportCardTCGPlayerMarketPrice,
            importSortCardTotalCardTCGPlayerLowPrice: totalImportCardTCGPlayerLowPrice,
            importCardData: importCardData
        }

        return importData;
    }

}


