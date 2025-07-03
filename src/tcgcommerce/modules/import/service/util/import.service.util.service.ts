import { Injectable,  } from '@nestjs/common';
import { IMPORT_CARD_CONDITION } from 'src/system/constants/tcgcommerce/import/constants.tcgcommerce.import';

@Injectable()
export class ImportServiceUtilService {

    constructor(
        
    ) {}

    async getImportCardCondition(importCardCondition: string) {
        
        let cardCondition = "";

        if(importCardCondition.indexOf('Near Mint') != -1) {
            cardCondition = IMPORT_CARD_CONDITION.NEAR_MINT;
        }
        if(importCardCondition.indexOf('Lightly Played') != -1) {
            cardCondition = IMPORT_CARD_CONDITION.LIGHTLY_PLAYED;
        }
        if(importCardCondition.indexOf('Moderately Played') != -1) {
            cardCondition = IMPORT_CARD_CONDITION.MODERATELY_PLAYED;
        }
        if(importCardCondition.indexOf('Heavily Played') != -1) {
            cardCondition = IMPORT_CARD_CONDITION.HEAVILY_PLAYED;
        }
        if(importCardCondition.indexOf('Damaged') != -1) {
            cardCondition = IMPORT_CARD_CONDITION.DAMAGED;
        }

        return cardCondition;
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



