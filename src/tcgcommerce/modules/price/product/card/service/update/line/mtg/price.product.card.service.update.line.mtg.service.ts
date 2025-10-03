import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PriceProductCardServiceUpdate } from 'src/typeorm/entities/tcgcommerce/modules/price/product/card/service/update/price.product.card.service.update.entity';
import { ProductCardService } from 'src/tcgcommerce/modules/product/card/product.card.service';
import { ProductSetService } from 'src/tcgcommerce/modules/product/set/product.set.service';
import { InventoryProductCardService } from 'src/tcgcommerce/modules/inventory/product/card/inventory.product.card.service';
import { TCGdbMTGPriceChangeDailyService } from 'src/tcgdb/modules/tcgdb/api/mtg/price/change/daily/tcgdb.mtg.price.change.daily.service';
import { TCGdbMTGPriceChangeDailyDTO } from 'src/tcgdb/modules/tcgdb/api/mtg/price/change/daily/dto/tcgdb.mtg.price.change.daily.dto';
import { PRODUCT_LINE_CODE } from 'src/system/constants/tcgcommerce/product/constants.tcgcommerce.product';
import { PriceProductCardServiceUpdateData } from 'src/tcgcommerce/modules/price/product/card/service/update/interface/price.product.card.service.update.data.interface';

@Injectable()
export class PriceProductCardServiceLineMTGService {

    constructor(
       @InjectRepository(PriceProductCardServiceUpdate) private priceProductCardServiceUpdateRepository: Repository<PriceProductCardServiceUpdate>,
       private productCardService: ProductCardService,
       private productSetService: ProductSetService,
       private inventoryProductCardService: InventoryProductCardService,
       private tcgdbMTGPriceChangeDailyService: TCGdbMTGPriceChangeDailyService
    ) { }

    /*
    async updateMTGPriceProductCards(productVendorId: string, productLineId: string, productTypeId: string, productCardLanguageCode: string, commerceAccountId: string) {
        
        let productSets = await this.getProductSetsByProductLineId(productLineId);
        if (productSets == null) {
            return null;
        }

        for(let i=0; i < productSets.length; i++) {
            let productSet = productSets[i];
            let tcgdbMTGPriceChangesDaily = await this.tcgdbMTGPriceChangeDailyService.getTCGdbMTGPriceChangeDailyBySet(productSet.productSetCode);

            let mtgPriceProductCardUpdateData = []; 
            let mtgPriceProductCardUpdateDataBySet = {
                productLineCode: PRODUCT_LINE_CODE.MAGIC_THE_GATHERING,
                productSetCode: productSet.productSetCode,
                priceProductCardChanges: tcgdbMTGPriceChangesDaily
            }

            let mtgPriceProductCardChanges = await this.processMTGPriceProductCards(tcgdbMTGPriceChangesDaily, productCardLanguageCode, commerceAccountId);
        }

    }
    /*
    async processMTGPriceProductCards(tcgdbMTGPriceChangesDaily: TCGdbMTGPriceChangeDailyDTO[], productCardLanguageCode: string, commerceAccountId: string) {
        for(let i=0; i < tcgdbMTGPriceChangesDaily.length; i++) {
            let tcgdbMTGPriceChangeDaily = tcgdbMTGPriceChangesDaily[i];
            let productCard = await this.getProductCardByTCGdbId(tcgdbMTGPriceChangeDaily.tcgdbMTGCardId);
            
            if (productCard == null) {
                continue;
            }

            /*let inventoryProductCards = await this.getInventoryProductCardsByCommerceAccountIdAndProductCardIdAndProductCardLanguageCode(commerceAccountId, productCard.productCardId, productCardLanguageCode);
            if (inventoryProductCards == null) {
                continue;
            }

            



        }
    }

    //UTILITY FUNCTIONS;
    //GET PRODUCT SETS;
    async getProductSetsByProductLineId(productLineId: string) {
        let productSets = await this.productSetService.getProductSetsByProductLineId(productLineId);
        //TO DO: THROW CUSTOM ERROR;
        if (productSets == null) {
            return null;
        }
        
        return productSets;
    }

    //GET PRICE CHANGES DAILY;
    async getPriceChangesDailyBySet(productSetCode: string) {
        let tcgdbMTGPriceChangesDaily = await this.tcgdbMTGPriceChangeDailyService.getTCGdbMTGPriceChangeDailyBySet(productSetCode);
        //TO DO: THROW CUSTOM ERROR;
        if (tcgdbMTGPriceChangesDaily == null) {
            return null;
        }

        return tcgdbMTGPriceChangesDaily;
    }

    //GET PRODUCT CARD;
    async getProductCardByTCGdbId(tcgdbId: string) {
        let productCard = await this.productCardService.getProductCardByTCGdbId(tcgdbId);
        //TO DO: THROW CUSTOM ERROR;
        if (productCard == null) {
            return null;
        }

        return productCard;
    }

    //GET INVENTORY PRODUCT CARDS;
    /*
    async getInventoryProductCardsByCommerceAccountIdAndProductCardIdAndProductCardLanguageCode(commerceAccountId: string, productCardId: string, productCardLanguageCode: string) {
        let inventoryProductCards = await this.inventoryProductCardService.getInventoryProductCardsByCommerceAccountIdAndProductCardIdAndProductCardLanguageCode(commerceAccountId, productCardId, productCardLanguageCode);
        //TO DO: THROW CUSTOM ERROR;
        if (inventoryProductCards == null) {
            return null;
        }

        return inventoryProductCards;
    }
    */
}