import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BuylistPriceProductCardRuleBaseDTO, CreateBuylistPriceProductCardRuleBaseDTO, UpdateBuylistPriceProductCardRuleBaseDTO} from './dto/buylist.price.product.card.rule.base.dto';
import { BuylistPriceProductCardRuleBase } from 'src/typeorm/entities/tcgcommerce/modules/buylist/price/product/card/rule/base/buylist.price.product.card.rule.base.entity';
import { ErrorMessageService } from 'src/system/modules/error/message/error.message.service';

@Injectable()
export class BuylistPriceProductCardRuleBaseService {

    constructor(
        @InjectRepository(BuylistPriceProductCardRuleBase) private buylistPriceProductCardRuleBaseRepository: Repository<BuylistPriceProductCardRuleBase>,
        private errorMessageService: ErrorMessageService,
    ) { }


    async getBuylistPriceProductCardRuleBaseById(buylistPriceProductCardRuleBaseId: string) {
        let buylistPriceProductCardRuleBase = await this.buylistPriceProductCardRuleBaseRepository.findOne({
            where: {
                buylistPriceProductCardRuleBaseId: buylistPriceProductCardRuleBaseId,
            }
        });
       
        if(buylistPriceProductCardRuleBase == null) {
            return this.errorMessageService.createErrorMessage('BUYLIST_PRICE_PRODUCT_CARD_RULE_BASE_NOT_FOUND', 'Buylist price product card rule base was not found for buylistPriceProductCardRuleBaseId: ' + buylistPriceProductCardRuleBaseId);
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
        
        if(buylistPriceProductCardRuleBase == null) {
            return this.errorMessageService.createErrorMessage('BUYLIST_PRICE_PRODUCT_CARD_RULE_BASE_NOT_FOUND', 'Buylist price product card rule base was not found for commerceAccountId: ' + commerceAccountId + ', productVendorId: ' + productVendorId + ', productLineId: ' + productLineId + ', productTypeId: ' + productTypeId);
        }

        let buylistPriceProductCardRuleBaseDTO: BuylistPriceProductCardRuleBaseDTO = ({ ...buylistPriceProductCardRuleBase})

        return buylistPriceProductCardRuleBaseDTO;
    }



    async createBuylistPriceProductCardRuleBase(createBuylistPriceProductCardRuleBaseDTO: CreateBuylistPriceProductCardRuleBaseDTO) {
        
        //CHECK TO SEE IF THE PRODUCT CARD BASE ALREADY EXISTS;
        let buylistPriceProductCardRuleBase = await this.buylistPriceProductCardRuleBaseRepository.findOne({
            where: {
                commerceAccountId: createBuylistPriceProductCardRuleBaseDTO.commerceAccountId,
                productVendorId: createBuylistPriceProductCardRuleBaseDTO.productVendorId,
                productLineId: createBuylistPriceProductCardRuleBaseDTO.productLineId,
                productTypeId: createBuylistPriceProductCardRuleBaseDTO.productTypeId
            }
        });
        
        if (buylistPriceProductCardRuleBase != null) {
            return this.errorMessageService.createErrorMessage('BUYLIST_PRICE_PRODUCT_CARD_RULE_BASE_EXISTS', 'Buylist price product card rule base already exists for commerceAccountId: ' + createBuylistPriceProductCardRuleBaseDTO.commerceAccountId + ', productVendorId: ' + createBuylistPriceProductCardRuleBaseDTO.productVendorId + ', productLineId: ' + createBuylistPriceProductCardRuleBaseDTO.productLineId + ', productTypeId: ' + createBuylistPriceProductCardRuleBaseDTO.productTypeId);
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
        
        if (buylistPriceProductCardRuleBase == null) {
            return this.errorMessageService.createErrorMessage('BUYLIST_PRICE_PRODUCT_CARD_RULE_BASE_NOT_FOUND', 'Buylist price product card rule base was not found for buylistPriceProductCardRuleBaseId: ' + updateBuylistPriceProductCardRuleBaseDTO.buylistPriceProductCardRuleBaseId);
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