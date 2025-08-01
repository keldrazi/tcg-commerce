import { Injectable,  } from '@nestjs/common';
import { IMPORT_SORT_CARD_CONDITION } from 'src/system/constants/tcgcommerce/import/job/card/tcgcommerce.import.job.card.constants';

@Injectable()
export class ImportServiceCardUtilService {

    constructor(
        
    ) {}

    async getImportSortCardCondition(importSortCardCondition: string) {
        
        let sortCardCondition = "";

        if(importSortCardCondition.indexOf('Near Mint') != -1) {
            sortCardCondition = IMPORT_SORT_CARD_CONDITION.NEAR_MINT;
        }
        if(importSortCardCondition.indexOf('Lightly Played') != -1) {
            sortCardCondition = IMPORT_SORT_CARD_CONDITION.LIGHTLY_PLAYED;
        }
        if(importSortCardCondition.indexOf('Moderately Played') != -1) {
            sortCardCondition = IMPORT_SORT_CARD_CONDITION.MODERATELY_PLAYED;
        }
        if(importSortCardCondition.indexOf('Heavily Played') != -1) {
            sortCardCondition = IMPORT_SORT_CARD_CONDITION.HEAVILY_PLAYED;
        }
        if(importSortCardCondition.indexOf('Damaged') != -1) {
            sortCardCondition = IMPORT_SORT_CARD_CONDITION.DAMAGED;
        }

        return sortCardCondition;
    }

    //TO DO: IMPLEMENT CARD PRINTINGS FOR OTHER GAMES THAT HAVE DIFFERENT TYPES OF FOILS IE POKEMON;
    /*
    async getImportCardPrinting(importCardPrinting: string) {
        let cardPrintingType = "";

        if(importCardPrinting.indexOf('F') != -1) {
            cardPrintingType = 'foil';
        }
        else {
            cardPrintingType = 'normal';
        }

        return cardPrintingType;
    }
    */
}



