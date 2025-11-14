import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BuylistPriceProductCardRuleHotlistDTO, CreateBuylistPriceProductCardRuleHotlistDTO, UpdateBuylistPriceProductCardRuleHotlistDTO} from './dto/buylist.price.product.card.rule.hotlist.dto';
import { BuylistPriceProductCardRuleHotlist } from 'src/typeorm/entities/tcgcommerce/modules/buylist/price/product/card/rule/hotlist/buylist.price.product.card.rule.hotlist.entity';

@Injectable()
export class BuylistPriceProductCardRuleHotlistService {

    constructor(
        @InjectRepository(BuylistPriceProductCardRuleHotlist) private buylistPriceProductCardRuleHotlistRepository: Repository<BuylistPriceProductCardRuleHotlist>,
    ) { }


    async getBuylistPriceProductCardRuleHotlistById(buylistPriceProductCardRuleHotlistId: string) {
        let buylistPriceProductCardRuleHotlist = await this.buylistPriceProductCardRuleHotlistRepository.findOne({
            where: {
                buylistPriceProductCardRuleHotlistId: buylistPriceProductCardRuleHotlistId,
            }
        });
        
        //TO DO: CREATE AN ERROR TO RETURN;
        if(buylistPriceProductCardRuleHotlist == null) {
            return null;
        }

        let buylistPriceProductCardRuleHotlistDTO: BuylistPriceProductCardRuleHotlistDTO = ({ ...buylistPriceProductCardRuleHotlist})

        return buylistPriceProductCardRuleHotlistDTO;
    }

    async getBuylistPriceProductCardRuleHotlistByCommerceAccountId(commerceAccountId: string, productVendorId: string, productLineId: string, productTypeId: string) {
        let buylistPriceProductCardRuleHotlist = await this.buylistPriceProductCardRuleHotlistRepository.findOne({
            where: {
                commerceAccountId: commerceAccountId,
                productVendorId: productVendorId,
                productLineId: productLineId,
                productTypeId: productTypeId
            }
        });
        
        //TO DO: CREATE AN ERROR TO RETURN;
        if(buylistPriceProductCardRuleHotlist == null) {
            return null;
        }

        let buylistPriceProductCardRuleHotlistDTO: BuylistPriceProductCardRuleHotlistDTO = ({ ...buylistPriceProductCardRuleHotlist})

        return buylistPriceProductCardRuleHotlistDTO;
    }



    async createBuylistPriceProductCardRuleHotlist(createBuylistPriceProductCardRuleHotlistDTO: CreateBuylistPriceProductCardRuleHotlistDTO) {
        
        //CHECK TO SEE IF THE PRODUCT CARD BASE ALREADY EXISTS;
        let buylistPriceProductCardRuleHotlist = await this.getBuylistPriceProductCardRuleHotlistByCommerceAccountId(createBuylistPriceProductCardRuleHotlistDTO.commerceAccountId, createBuylistPriceProductCardRuleHotlistDTO.productVendorId, createBuylistPriceProductCardRuleHotlistDTO.productLineId, createBuylistPriceProductCardRuleHotlistDTO.productTypeId);
        
        //TO DO: RETURN AN ERROR FOR DUPLICATE PRICING PRODUCT CARD;
        if (buylistPriceProductCardRuleHotlist != null) {
            console.log('Price Rule Product Card Hotlist already exists for the Commerce Account / Vendor / Line / Type combination.');
            return null;
        }

        let newBuylistPriceProductCardRuleHotlist = this.buylistPriceProductCardRuleHotlistRepository.create({ ...createBuylistPriceProductCardRuleHotlistDTO });
        newBuylistPriceProductCardRuleHotlist = await this.buylistPriceProductCardRuleHotlistRepository.save(newBuylistPriceProductCardRuleHotlist);

        let buylistPriceProductCardRuleHotlistDTO = await this.getBuylistPriceProductCardRuleHotlistById(newBuylistPriceProductCardRuleHotlist.buylistPriceProductCardRuleHotlistId);

        return buylistPriceProductCardRuleHotlistDTO;
    }   

    async updateBuylistPriceProductCardRuleHotlist(updateBuylistPriceProductCardRuleHotlistDTO: UpdateBuylistPriceProductCardRuleHotlistDTO) {

        //CHECK TO SEE IF THE PRODUCT CARD BASE ALREADY EXISTS;
        let buylistPriceProductCardRuleHotlist = await this.buylistPriceProductCardRuleHotlistRepository.findOne({
            where: {
                buylistPriceProductCardRuleHotlistId: updateBuylistPriceProductCardRuleHotlistDTO.buylistPriceProductCardRuleHotlistId
            }
        });
        
        //TO DO: RETURN AN ERROR FOR DUPLICATE PRICING PRODUCT CARD;
        if (buylistPriceProductCardRuleHotlist == null) {
            return null;
        }

        buylistPriceProductCardRuleHotlist.buylistPriceProductCardRuleHotlistId = updateBuylistPriceProductCardRuleHotlistDTO.buylistPriceProductCardRuleHotlistId;
        buylistPriceProductCardRuleHotlist.buylistPriceProductCardRuleHotlistOption = updateBuylistPriceProductCardRuleHotlistDTO.buylistPriceProductCardRuleHotlistOption;
        buylistPriceProductCardRuleHotlist.buylistPriceProductCardRuleHotlistCashPercentage = updateBuylistPriceProductCardRuleHotlistDTO.buylistPriceProductCardRuleHotlistCashPercentage;
        buylistPriceProductCardRuleHotlist.buylistPriceProductCardRuleHotlistCreditPercentage = updateBuylistPriceProductCardRuleHotlistDTO.buylistPriceProductCardRuleHotlistCreditPercentage;
        buylistPriceProductCardRuleHotlist.buylistPriceProductCardRuleHotlistNMPercentage = updateBuylistPriceProductCardRuleHotlistDTO.buylistPriceProductCardRuleHotlistNMPercentage;
        buylistPriceProductCardRuleHotlist.buylistPriceProductCardRuleHotlistLPPercentage = updateBuylistPriceProductCardRuleHotlistDTO.buylistPriceProductCardRuleHotlistLPPercentage;
        buylistPriceProductCardRuleHotlist.buylistPriceProductCardRuleHotlistMPPercentage = updateBuylistPriceProductCardRuleHotlistDTO.buylistPriceProductCardRuleHotlistMPPercentage;
        buylistPriceProductCardRuleHotlist.buylistPriceProductCardRuleHotlistHPPercentage = updateBuylistPriceProductCardRuleHotlistDTO.buylistPriceProductCardRuleHotlistHPPercentage;
        buylistPriceProductCardRuleHotlist.buylistPriceProductCardRuleHotlistDMPercentage = updateBuylistPriceProductCardRuleHotlistDTO.buylistPriceProductCardRuleHotlistDMPercentage;
        buylistPriceProductCardRuleHotlist.buylistPriceProductCardRuleHotlistUpdateDate = new Date();

        buylistPriceProductCardRuleHotlist = await this.buylistPriceProductCardRuleHotlistRepository.save(buylistPriceProductCardRuleHotlist);
        
        let buylistPriceProductCardRuleHotlistDTO = await this.getBuylistPriceProductCardRuleHotlistById(buylistPriceProductCardRuleHotlist.buylistPriceProductCardRuleHotlistId);
        
        return buylistPriceProductCardRuleHotlistDTO;

    }   
}