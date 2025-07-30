import { Injectable } from '@nestjs/common';
import { UtilCSVService } from 'src/system/modules/util/csv/util.csv.service';
import { ImportSortDTO, ImportSortCardDTO } from 'src/tcgcommerce/modules/import/sort/card/data/dto/import.sort.card.data.dto';
import { IMPORT_JOB_STATUS, IMPORT_CARD_CONDITION, IMPORT_CARD_PRINTING, IMPORT_PHYZBATCH_CARD_DATA_KEYS } from 'src/system/constants/tcgcommerce/import/constants.tcgcommerce.import';
import { ImportServiceUtilService } from 'src/tcgcommerce/modules/import/service/card/util/import.service.card.util.service';

@Injectable()
export class ImportServicePhyzbatchService {
 
    constructor(
        private utilCSVService: UtilCSVService,
        private importServiceUtilService: ImportServiceUtilService,
    ) {}
    
    
    async processImport(importFile: Express.Multer.File) {

        let importCSVData = await this.utilCSVService.parseCSV(importFile);
        let importData = await this.processCSVCardData(importCSVData); 

        let importSortCardDTOs: ImportSortCardDTO[] = [];

        for(let i = 0; i < importData.importCardData.length; i++) {

            let cardData = importData.importCardData[i];

            if(cardData[IMPORT_PHYZBATCH_CARD_DATA_KEYS.CARD_TCG_PLAYER_ID] != '') {

                let importSortCardDTO = new ImportSortCardDTO();
                importSortCardDTO.importSortCardTCGPlayerId = parseInt(cardData[IMPORT_PHYZBATCH_CARD_DATA_KEYS.CARD_TCG_PLAYER_ID]);
                importSortCardDTO.importSortCardSetName = cardData[IMPORT_PHYZBATCH_CARD_DATA_KEYS.CARD_SET_NAME];
                importSortCardDTO.importSortCardName = cardData[IMPORT_PHYZBATCH_CARD_DATA_KEYS.CARD_NAME];
                importSortCardDTO.importSortCardNumber = cardData[IMPORT_PHYZBATCH_CARD_DATA_KEYS.CARD_NUMBER];
                importSortCardDTO.importSortCardCondition = await this.importServiceUtilService.getImportCardCondition(cardData[IMPORT_PHYZBATCH_CARD_DATA_KEYS.CARD_CONDITION]);
                //NEED TO CHECK THIS;
                importSortCardDTO.importSortCardPrinting = IMPORT_CARD_PRINTING.NORMAL;
                importSortCardDTO.importSortCardTCGPlayerMarketPrice = parseFloat(cardData[IMPORT_PHYZBATCH_CARD_DATA_KEYS.CARD_TCG_PLAYER_MARKET_PRICE]);
                importSortCardDTO.importSortCardTCGPlayerLowPrice = parseFloat(cardData[IMPORT_PHYZBATCH_CARD_DATA_KEYS.CARD_TCG_PLAYER_LOW_PRICE]);
                importSortCardDTO.importSortCardQty = parseInt(cardData[IMPORT_PHYZBATCH_CARD_DATA_KEYS.CARD_QTY]);

                importSortCardDTOs.push(importSortCardDTO);
            }  
        }

        let importSortDTO = new ImportSortDTO();
        importSortDTO.importSortTotalCardQty = importData.totalImportCardQty;
        importSortDTO.importSortTotalCardTCGPlayerMarketPrice = importData.totalImportCardTCGPlayerMarketPrice;
        importSortDTO.importSortTotalCardTCGPlayerLowPrice = importData.totalImportCardTCGPlayerLowPrice;
        importSortDTO.importSortCards = importSortCardDTOs;

        return importSortDTO;

    }

    async processCSVCardData(importCSVCardData: any) {
       
        let totalImportCardQty = 0;
        let totalImportCardTCGPlayerMarketPrice = 0;
        let totalImportCardTCGPlayerLowPrice = 0;

        let importCardData: any[] = [];
        

        for(let i = 0; i < importCSVCardData.length; i++) {
            let importCard = importCSVCardData[i];

            let importCardQty = parseInt(importCard[IMPORT_PHYZBATCH_CARD_DATA_KEYS.CARD_QTY]);
            let importCardTCGPlayerMarketPrice = parseFloat(importCard[IMPORT_PHYZBATCH_CARD_DATA_KEYS.CARD_TCG_PLAYER_MARKET_PRICE]) * importCardQty;
            let importCardTCGPlayerLowPrice = parseFloat(importCard[IMPORT_PHYZBATCH_CARD_DATA_KEYS.CARD_TCG_PLAYER_LOW_PRICE]) * importCardQty;

            importCardTCGPlayerMarketPrice = parseFloat(importCardTCGPlayerMarketPrice.toFixed(2));
            importCardTCGPlayerLowPrice = parseFloat(importCardTCGPlayerLowPrice.toFixed(2));

            totalImportCardQty = totalImportCardQty + importCardQty;
            totalImportCardTCGPlayerMarketPrice = totalImportCardTCGPlayerMarketPrice + importCardTCGPlayerMarketPrice;
            totalImportCardTCGPlayerLowPrice = totalImportCardTCGPlayerLowPrice + importCardTCGPlayerLowPrice;

            importCardData.push(importCard);
        }

        let importData = {
            totalImportCardQty: totalImportCardQty,
            totalImportCardTCGPlayerMarketPrice: totalImportCardTCGPlayerMarketPrice,
            totalImportCardTCGPlayerLowPrice: totalImportCardTCGPlayerLowPrice,
            importCardData: importCardData
        }

        return importData;
    }

}


