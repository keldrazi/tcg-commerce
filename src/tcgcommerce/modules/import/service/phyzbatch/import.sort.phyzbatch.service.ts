import { Injectable } from '@nestjs/common';
import { UtilCSVService } from 'src/tcgcommerce/modules/util/csv/util.csv.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ImportSortDTO, ImportSortCardDTO } from '../../sort/data/dto/import.sort.data.dto';

@Injectable()
export class ImportSortPhyzbatchService {

    constructor(
        private utilCSVService: UtilCSVService,
        private eventEmitter: EventEmitter2,
    ) {}
    
    private cardConditions = {
        'Near Mint': 'NM',
        'Lightly Played': 'LP',
        'Moderately Played': 'MP',
        'Heavily Played': 'HP',
        'Damaged': 'D'
    };

    private cardDataKeys = {
        'cardTCGPlayerId': 'TCGplayer Id',
        'cardSetName': 'Set Name',
        'cardName': 'Product Name',
        'cardNumber': 'Number',
        'cardCondition': 'Condition',
        'cardTCGPlayerMarketPrice': 'TCG Market Price',
        'cardTCGPlayerLowPrice': 'TCG Low Price',
        'cardQty': 'Add to Quantity'
    }


    async processPhyzbatchSortCSVFile (importJobId: string, phyzbatchSortCSVFile: Express.Multer.File) {


        this.eventEmitter.emit(
            'import.job.status',
            {
                importJobId: importJobId,
                importJobStatus: 'PROCESSING IMPORT FILE',
            }
        )


        let phyzbatchSortCSVCardData = await this.utilCSVService.parseCSV(phyzbatchSortCSVFile);

        let phyzbatchSortData = await this.processPhyzbatchSortCSVCardData(phyzbatchSortCSVCardData); 
        
        let importSortCardDTOs: ImportSortCardDTO[] = [];

        for(let i = 0; i < phyzbatchSortData.phyzbatchSortCardData.length; i++) {
            
            let cardData = phyzbatchSortData.phyzbatchSortCardData[i];

            if(cardData[this.cardDataKeys.cardTCGPlayerId] != '') {
                
                let importSortCardDTO = new ImportSortCardDTO();
                importSortCardDTO.importSortCardTCGPlayerId = parseInt(cardData[this.cardDataKeys.cardTCGPlayerId]);
                importSortCardDTO.importSortCardSetName = cardData[this.cardDataKeys.cardSetName];
                importSortCardDTO.importSortCardName = cardData[this.cardDataKeys.cardName];
                importSortCardDTO.importSortCardNumber = cardData[this.cardDataKeys.cardNumber];
                importSortCardDTO.importSortCardCondition = cardData[this.cardDataKeys.cardCondition];
                importSortCardDTO.importSortCardPrinting = cardData[this.cardDataKeys.cardCondition];
                importSortCardDTO.importSortCardTCGPlayerMarketPrice = parseFloat(cardData[this.cardDataKeys.cardTCGPlayerMarketPrice]);
                importSortCardDTO.importSortCardTCGPlayerLowPrice = parseFloat(cardData[this.cardDataKeys.cardTCGPlayerLowPrice]);
                importSortCardDTO.importSortCardQty = parseInt(cardData[this.cardDataKeys.cardQty]);

                importSortCardDTOs.push(importSortCardDTO);
            }  
        }

        let importSortDTO = new ImportSortDTO();
        importSortDTO.importSortTotalCardQty = phyzbatchSortData.totalCardQty;
        importSortDTO.importSortTotalCardTCGPlayerMarketPrice = phyzbatchSortData.totalCardTCGPlayerMarketPrice;
        importSortDTO.importSortTotalCardTCGPlayerLowPrice = phyzbatchSortData.totalCardTCGPlayerLowPrice;
        importSortDTO.importSortCards = importSortCardDTOs;

        return importSortDTO;

    }

    async processPhyzbatchSortCSVCardData(phyzbatchSortCSVCardData: any) {
       
        let totalCardQty = 0;
        let totalCardTCGPlayerMarketPrice = 0;
        let totalCardTCGPlayerLowPrice = 0;
        
        let phyzbatchSortCardData: any[] = [];
        

        for(let i = 0; i < phyzbatchSortCSVCardData.length; i++) {
            let cardData = phyzbatchSortCSVCardData[i];

                
            let cardQty = parseInt(cardData[this.cardDataKeys.cardQty]);
            let cardTCGPlayerMarketPrice = parseFloat(cardData[this.cardDataKeys.cardTCGPlayerMarketPrice]) * cardQty;
            let cardTCGPlayerLowPrice = parseFloat(cardData[this.cardDataKeys.cardTCGPlayerLowPrice]) * cardQty;

            cardTCGPlayerMarketPrice = parseFloat(cardTCGPlayerMarketPrice.toFixed(2));
            cardTCGPlayerLowPrice = parseFloat(cardTCGPlayerLowPrice.toFixed(2));

            totalCardQty = totalCardQty + cardQty;
            totalCardTCGPlayerMarketPrice = totalCardTCGPlayerMarketPrice + cardTCGPlayerMarketPrice;
            totalCardTCGPlayerLowPrice = totalCardTCGPlayerLowPrice + cardTCGPlayerLowPrice;

            phyzbatchSortCardData.push(cardData);
        }


        let phyzbatchSortData = {
            totalCardQty: totalCardQty,
            totalCardTCGPlayerMarketPrice: totalCardTCGPlayerMarketPrice,
            totalCardTCGPlayerLowPrice: totalCardTCGPlayerLowPrice,
            phyzbatchSortCardData: phyzbatchSortCardData
        }

        return phyzbatchSortData;
    }

    async getCardCondition(importSortCardCondition: string) {
        
        let cardCondition = "";
  
        if(importSortCardCondition.indexOf('Near Mint') != -1) {
            cardCondition = this.cardConditions['Near Mint'];
        }
        if(importSortCardCondition.indexOf('Lightly Played') != -1) {
            cardCondition = this.cardConditions['Lightly Played'];
        }
        if(importSortCardCondition.indexOf('Moderately Played') != -1) {
            cardCondition = this.cardConditions['Moderately Played'];
        }
        if(importSortCardCondition.indexOf('Heavily Played') != -1) {
            cardCondition = this.cardConditions['Heavily Played'];
        }
        if(importSortCardCondition.indexOf('Damaged') != -1) {
            cardCondition = this.cardConditions['Damaged'];
        }

        return cardCondition;
    }

    //TO DO: IMPLEMENT CARD PRINTINGS FOR OTHER GAMES THAT HAVE DIFFERENT TYPES OF FOILS IE POKEMON;
    async getCardPrinting(importCardPrinting: string) {
        let cardPrintingType = "";

        if(importCardPrinting.indexOf('F') != -1) {
            cardPrintingType = 'foil';
        }
        else {
            cardPrintingType = 'normal';
        }

        return cardPrintingType;
    }
}


