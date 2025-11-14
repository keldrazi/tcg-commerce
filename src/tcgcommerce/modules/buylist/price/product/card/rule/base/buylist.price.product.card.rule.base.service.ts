import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BuylistPriceProductCardRuleBaseDTO, CreateBuylistPriceProductCardRuleBaseDTO, UpdateBuylistPriceProductCardRuleBaseDTO} from './dto/buylist.price.product.card.rule.base.dto';
import { BuylistPriceProductCardRuleBase } from 'src/typeorm/entities/tcgcommerce/modules/buylist/price/product/card/rule/base/buylist.price.product.card.rule.base.entity';

@Injectable()
export class BuylistPriceProductCardRuleBaseService {

    constructor(
        @InjectRepository(BuylistPriceProductCardRuleBase) private buylistPriceProductCardRuleBaseRepository: Repository<BuylistPriceProductCardRuleBase>,
    ) { }


    async getBuylistPriceProductCardRuleBaseById(buylistPriceProductCardRuleBaseId: string) {
        let buylistPriceProductCardRuleBase = await this.buylistPriceProductCardRuleBaseRepository.findOne({
            where: {
                buylistPriceProductCardRuleBaseId: buylistPriceProductCardRuleBaseId,
            }
        });
        
        //TO DO: CREATE AN ERROR TO RETURN;
        if(buylistPriceProductCardRuleBase == null) {
            return null;
        }

        let buylistPriceProductCardRuleBaseDTO: BuylistPriceProductCardRuleBaseDTO = ({ ...buylistPriceProductCardRuleBase})

        return buylistPriceProductCardRuleBaseDTO;
    }

    async getBuylistPriceProductCardRuleBaseByCommerceAccountId(commerceAccountId: string, productVendorId: string, productLineId: string, productTypeId: string) {
        let buylistPriceProductCardRuleBase = await this.buylistPriceProductCardRuleBaseRepository.findOne({
            where: {
                commerceAccountId: commerceAccountId,
                productVendorId: productVendorId,
                productLineId: productLineId,
                productTypeId: productTypeId
            }
        });
        
        //TO DO: CREATE AN ERROR TO RETURN;
        if(buylistPriceProductCardRuleBase == null) {
            return null;
        }

        let buylistPriceProductCardRuleBaseDTO: BuylistPriceProductCardRuleBaseDTO = ({ ...buylistPriceProductCardRuleBase})

        return buylistPriceProductCardRuleBaseDTO;
    }



    async createBuylistPriceProductCardRuleBase(createBuylistPriceProductCardRuleBaseDTO: CreateBuylistPriceProductCardRuleBaseDTO) {
        
        //CHECK TO SEE IF THE PRODUCT CARD BASE ALREADY EXISTS;
        let buylistPriceProductCardRuleBase = await this.getBuylistPriceProductCardRuleBaseByCommerceAccountId(createBuylistPriceProductCardRuleBaseDTO.commerceAccountId, createBuylistPriceProductCardRuleBaseDTO.productVendorId, createBuylistPriceProductCardRuleBaseDTO.productLineId, createBuylistPriceProductCardRuleBaseDTO.productTypeId);
        
        //TO DO: RETURN AN ERROR FOR DUPLICATE PRICING PRODUCT CARD;
        if (buylistPriceProductCardRuleBase != null) {
            console.log('Price Rule Product Card Base already exists for the Commerce Account / Vendor / Line / Type combination.');
            return null;
        }

        let newBuylistPriceProductCardRuleBase = this.buylistPriceProductCardRuleBaseRepository.create({ ...createBuylistPriceProductCardRuleBaseDTO });
        newBuylistPriceProductCardRuleBase = await this.buylistPriceProductCardRuleBaseRepository.save(newBuylistPriceProductCardRuleBase);

        let buylistPriceProductCardRuleBaseDTO = await this.getBuylistPriceProductCardRuleBaseById(newBuylistPriceProductCardRuleBase.buylistPriceProductCardRuleBaseId);

        return buylistPriceProductCardRuleBaseDTO;
    }   

    async updateBuylistPriceProductCardRuleBase(updateBuylistPriceProductCardRuleBaseDTO: UpdateBuylistPriceProductCardRuleBaseDTO) {

        //CHECK TO SEE IF THE PRODUCT CARD BASE ALREADY EXISTS;
        let buylistPriceProductCardRuleBase = await this.buylistPriceProductCardRuleBaseRepository.findOne({
            where: {
                buylistPriceProductCardRuleBaseId: updateBuylistPriceProductCardRuleBaseDTO.buylistPriceProductCardRuleBaseId
            }
        });
        
        //TO DO: RETURN AN ERROR FOR DUPLICATE PRICING PRODUCT CARD;
        if (buylistPriceProductCardRuleBase == null) {
            return null;
        }

        buylistPriceProductCardRuleBase.buylistPriceProductCardRuleBaseId = updateBuylistPriceProductCardRuleBaseDTO.buylistPriceProductCardRuleBaseId;
        buylistPriceProductCardRuleBase.buylistPriceProductCardRuleBaseOption = updateBuylistPriceProductCardRuleBaseDTO.buylistPriceProductCardRuleBaseOption;
        buylistPriceProductCardRuleBase.buylistPriceProductCardRuleBaseCashPercentage = updateBuylistPriceProductCardRuleBaseDTO.buylistPriceProductCardRuleBaseCashPercentage;
        buylistPriceProductCardRuleBase.buylistPriceProductCardRuleBaseCreditPercentage = updateBuylistPriceProductCardRuleBaseDTO.buylistPriceProductCardRuleBaseCreditPercentage;
        buylistPriceProductCardRuleBase.buylistPriceProductCardRuleBaseNMPercentage = updateBuylistPriceProductCardRuleBaseDTO.buylistPriceProductCardRuleBaseNMPercentage;
        buylistPriceProductCardRuleBase.buylistPriceProductCardRuleBaseLPPercentage = updateBuylistPriceProductCardRuleBaseDTO.buylistPriceProductCardRuleBaseLPPercentage;
        buylistPriceProductCardRuleBase.buylistPriceProductCardRuleBaseMPPercentage = updateBuylistPriceProductCardRuleBaseDTO.buylistPriceProductCardRuleBaseMPPercentage;
        buylistPriceProductCardRuleBase.buylistPriceProductCardRuleBaseHPPercentage = updateBuylistPriceProductCardRuleBaseDTO.buylistPriceProductCardRuleBaseHPPercentage;
        buylistPriceProductCardRuleBase.buylistPriceProductCardRuleBaseDMPercentage = updateBuylistPriceProductCardRuleBaseDTO.buylistPriceProductCardRuleBaseDMPercentage;
        buylistPriceProductCardRuleBase.buylistPriceProductCardRuleBaseUpdateDate = new Date();

        buylistPriceProductCardRuleBase = await this.buylistPriceProductCardRuleBaseRepository.save(buylistPriceProductCardRuleBase);
        
        let buylistPriceProductCardRuleBaseDTO = await this.getBuylistPriceProductCardRuleBaseById(buylistPriceProductCardRuleBase.buylistPriceProductCardRuleBaseId);
        
        return buylistPriceProductCardRuleBaseDTO;

    }   
}