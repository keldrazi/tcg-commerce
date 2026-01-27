import { Injectable,  } from '@nestjs/common';
import { BUYLIST_IMPORT_PRODUCT_CARD_PROVIDER_TYPE_CARD_CONDITION, BUYLIST_IMPORT_PRODUCT_CARD_PROVIDER_TYPE_CARD_PRINTING } from 'src/system/constants/tcgcommerce/buylist/import/buylist.import.product.card.constants';
import { BuylistImportProductCardProviderTypeFileConditionKey, BuylistImportProductCardProviderTypeFilePrintingKey } from '../interface/buylist.import.product.card.provider.type.interface';

@Injectable()
export class BuylistImportProductCardProviderTypeUtilService {

    constructor(
        
    ) {}

    //TO DO: MOVE THIS TO A DATABASE TABLE LATER;
    
    async getBuylistImportProductCardProviderTypeCardCondition(buylistImportProductCardProviderTypeCardCondition: string, buylistImportProductCardProviderTypeFileConditionKey: BuylistImportProductCardProviderTypeFileConditionKey): Promise<string> {
        
        let cardCondition = "";

        if(buylistImportProductCardProviderTypeCardCondition.indexOf(buylistImportProductCardProviderTypeFileConditionKey.buylistImportProductCardProviderTypeFileConditionKeyNM) != -1) {
            cardCondition = BUYLIST_IMPORT_PRODUCT_CARD_PROVIDER_TYPE_CARD_CONDITION.NEAR_MINT;
            return cardCondition;
        }
        if(buylistImportProductCardProviderTypeCardCondition.indexOf(buylistImportProductCardProviderTypeFileConditionKey.buylistImportProductCardProviderTypeFileConditionKeyLP) != -1) {
            cardCondition = BUYLIST_IMPORT_PRODUCT_CARD_PROVIDER_TYPE_CARD_CONDITION.LIGHTLY_PLAYED;
            return cardCondition;
        }
        if(buylistImportProductCardProviderTypeCardCondition.indexOf(buylistImportProductCardProviderTypeFileConditionKey.buylistImportProductCardProviderTypeFileConditionKeyMP) != -1) {
            cardCondition = BUYLIST_IMPORT_PRODUCT_CARD_PROVIDER_TYPE_CARD_CONDITION.MODERATELY_PLAYED;
            return cardCondition;
        }
        if(buylistImportProductCardProviderTypeCardCondition.indexOf(buylistImportProductCardProviderTypeFileConditionKey.buylistImportProductCardProviderTypeFileConditionKeyHP) != -1) {
            cardCondition = BUYLIST_IMPORT_PRODUCT_CARD_PROVIDER_TYPE_CARD_CONDITION.HEAVILY_PLAYED;
            return cardCondition;
        }
        if(buylistImportProductCardProviderTypeCardCondition.indexOf(buylistImportProductCardProviderTypeFileConditionKey.buylistImportProductCardProviderTypeFileConditionKeyDM) != -1) {
            cardCondition = BUYLIST_IMPORT_PRODUCT_CARD_PROVIDER_TYPE_CARD_CONDITION.DAMAGED;
            return cardCondition;
        }

        return cardCondition;
    }

    
    async getBuylistImportProductCardProviderTypeCardPrinting(buylistImportProductCardProviderTypeCardPrinting: string, buylistImportProductCardProviderTypeFilePrintingKey: BuylistImportProductCardProviderTypeFilePrintingKey): Promise<string> {
        
        let cardPrinting = "";

        if(buylistImportProductCardProviderTypeCardPrinting.indexOf(buylistImportProductCardProviderTypeFilePrintingKey.buylistImportProductCardProviderTypeFilePrintingKeyEtched) != -1) {
            cardPrinting = BUYLIST_IMPORT_PRODUCT_CARD_PROVIDER_TYPE_CARD_PRINTING.FOIL;
            return cardPrinting;
        }
        if(buylistImportProductCardProviderTypeCardPrinting.indexOf(buylistImportProductCardProviderTypeFilePrintingKey.buylistImportProductCardProviderTypeFilePrintingKeyFoil) != -1) {
            cardPrinting = BUYLIST_IMPORT_PRODUCT_CARD_PROVIDER_TYPE_CARD_PRINTING.FOIL;
            return cardPrinting;
        }
        if(buylistImportProductCardProviderTypeCardPrinting.indexOf(buylistImportProductCardProviderTypeFilePrintingKey.buylistImportProductCardProviderTypeFilePrintingKeyNormal) != -1) {
            cardPrinting = BUYLIST_IMPORT_PRODUCT_CARD_PROVIDER_TYPE_CARD_PRINTING.NORMAL;
            return cardPrinting;
        }

        return cardPrinting;
    }
   
}



