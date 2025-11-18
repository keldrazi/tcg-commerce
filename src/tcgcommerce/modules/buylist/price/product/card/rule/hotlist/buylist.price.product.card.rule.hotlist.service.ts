import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BuylistPriceProductCardRuleHotlistDTO, CreateBuylistPriceProductCardRuleHotlistDTO, UpdateBuylistPriceProductCardRuleHotlistDTO} from './dto/buylist.price.product.card.rule.hotlist.dto';
import { BuylistPriceProductCardRuleHotlist } from 'src/typeorm/entities/tcgcommerce/modules/buylist/price/product/card/rule/hotlist/buylist.price.product.card.rule.hotlist.entity';
import { ErrorMessageService } from 'src/system/modules/error/message/error.message.service';

@Injectable()
export class BuylistPriceProductCardRuleHotlistService {

    constructor(
        @InjectRepository(BuylistPriceProductCardRuleHotlist) private buylistPriceProductCardRuleHotlistRepository: Repository<BuylistPriceProductCardRuleHotlist>,
        private errorMessageService: ErrorMessageService,
    ) { }


    async getBuylistPriceProductCardRuleHotlistById(buylistPriceProductCardRuleHotlistId: string) {
        let buylistPriceProductCardRuleHotlist = await this.buylistPriceProductCardRuleHotlistRepository.findOne({
            where: {
                buylistPriceProductCardRuleHotlistId: buylistPriceProductCardRuleHotlistId,
            }
        });
        
        if(buylistPriceProductCardRuleHotlist == null) {
            return this.errorMessageService.createErrorMessage('BUYLIST_PRICE_PRODUCT_CARD_RULE_HOTLIST_NOT_FOUND', 'Buylist price product card rule hotlist was not found for buylistPriceProductCardRuleHotlistId: ' + buylistPriceProductCardRuleHotlistId);
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
        
        if(buylistPriceProductCardRuleHotlist == null) {
            return this.errorMessageService.createErrorMessage('BUYLIST_PRICE_PRODUCT_CARD_RULE_HOTLIST_NOT_FOUND', 'Buylist price product card rule hotlist was not found for commerceAccountId: ' + commerceAccountId + ', productVendorId: ' + productVendorId + ', productLineId: ' + productLineId + ', productTypeId: ' + productTypeId);
        }

        let buylistPriceProductCardRuleHotlistDTO: BuylistPriceProductCardRuleHotlistDTO = ({ ...buylistPriceProductCardRuleHotlist})

        return buylistPriceProductCardRuleHotlistDTO;
    }



    async createBuylistPriceProductCardRuleHotlist(createBuylistPriceProductCardRuleHotlistDTO: CreateBuylistPriceProductCardRuleHotlistDTO) {
        
        //CHECK TO SEE IF THE PRODUCT CARD BASE ALREADY EXISTS;
        let buylistPriceProductCardRuleHotlist = await this.buylistPriceProductCardRuleHotlistRepository.findOne({
            where: {
                commerceAccountId: createBuylistPriceProductCardRuleHotlistDTO.commerceAccountId,
                productVendorId: createBuylistPriceProductCardRuleHotlistDTO.productVendorId,
                productLineId: createBuylistPriceProductCardRuleHotlistDTO.productLineId,
                productTypeId: createBuylistPriceProductCardRuleHotlistDTO.productTypeId
            }
        });
        
        if (buylistPriceProductCardRuleHotlist != null) {
           return this.errorMessageService.createErrorMessage('BUYLIST_PRICE_PRODUCT_CARD_RULE_HOTLIST_ALREADY_EXISTS', 'Buylist price product card rule hotlist already exists for commerceAccountId: ' + createBuylistPriceProductCardRuleHotlistDTO.commerceAccountId + ', productVendorId: ' + createBuylistPriceProductCardRuleHotlistDTO.productVendorId + ', productLineId: ' + createBuylistPriceProductCardRuleHotlistDTO.productLineId + ', productTypeId: ' + createBuylistPriceProductCardRuleHotlistDTO.productTypeId);
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
        
        if (buylistPriceProductCardRuleHotlist == null) {
            return this.errorMessageService.createErrorMessage('BUYLIST_PRICE_PRODUCT_CARD_RULE_HOTLIST_NOT_FOUND', 'Buylist price product card rule hotlist was not found for buylistPriceProductCardRuleHotlistId: ' + updateBuylistPriceProductCardRuleHotlistDTO.buylistPriceProductCardRuleHotlistId);
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