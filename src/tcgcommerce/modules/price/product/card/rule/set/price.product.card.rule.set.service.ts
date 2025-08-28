import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PriceProductCardRuleSetDTO, CreatePriceProductCardRuleSetDTO, UpdatePriceProductCardRuleSetDTO} from './dto/price.product.card.rule.set.dto';
import { PriceProductCardRuleSet } from 'src/typeorm/entities/tcgcommerce/modules/price/product/card/rule/set/price.product.card.rule.set.entity';
import { PRICE_PRODUCT_CARD_RULE_TYPE_CODE, BASE_PRICE, BASE_PRICE_DEFAULT_RULE_SET, BASE_PRICE_VALUES, CONDITION_PRICE, CONDITION_PRICE_DEFAULT_RULE_SET } from 'src/system/constants/tcgcommerce/price/constants.tcgcommerce.price';

@Injectable()
export class PriceProductCardRuleSetService {

    constructor(
        @InjectRepository(PriceProductCardRuleSet) private priceProductCardRuleSetRepository: Repository<PriceProductCardRuleSet>,
    ) { }

    async getPriceProductCardRuleSet(priceProductCardRuleSetId: string) {
        let priceProductCardRuleSet = await this.priceProductCardRuleSetRepository.findOne({
            where: {
                priceProductCardRuleSetId: priceProductCardRuleSetId,
            }
        });
        
        //TO DO: CREATE AN ERROR TO RETURN;
        if(priceProductCardRuleSet == null) {
            return null;
        }

        let priceProductCardRuleSetDTO: PriceProductCardRuleSetDTO = ({ ...priceProductCardRuleSet });
        
        return priceProductCardRuleSetDTO;

    }

    async getPriceProductCardRuleSets(commerceAccountId: string, priceProductCardTypeId: string) {
        let priceProductCardRuleSets = await this.priceProductCardRuleSetRepository.find({
            where: {
                commerceAccountId: commerceAccountId,
                priceProductCardTypeId: priceProductCardTypeId
                
            }
        });
        
        //TO DO: CREATE AN ERROR TO RETURN;
        if(priceProductCardRuleSets == null) {
            return null;
        }

        let priceProductCardRuleSetsDTO: PriceProductCardRuleSetDTO[] = [];
        for(let i = 0; i < priceProductCardRuleSets.length; i++) {
            let priceProductCardRuleSet = priceProductCardRuleSets[i];
        
            let priceProductCardRuleSetDTO: PriceProductCardRuleSetDTO = ({ ...priceProductCardRuleSet });
            
            priceProductCardRuleSetsDTO.push(priceProductCardRuleSetDTO);
        }

        return priceProductCardRuleSetsDTO;
    }
    
    async createPriceProductCardRuleSet(createPriceProductCardRuleSetDTO: CreatePriceProductCardRuleSetDTO) {
        
        let newPriceProductCardRuleSet = this.priceProductCardRuleSetRepository.create({ ...createPriceProductCardRuleSetDTO });
        newPriceProductCardRuleSet = await this.priceProductCardRuleSetRepository.save(newPriceProductCardRuleSet);

        let priceProductCardRuleSetDTO = this.getPriceProductCardRuleSet(newPriceProductCardRuleSet.priceProductCardRuleSetId);

        return priceProductCardRuleSetDTO;
    }   

    async updatePriceProductCardRuleSet(updatePriceProductCardRuleSetDTO: UpdatePriceProductCardRuleSetDTO) {
    
        //CHECK TO SEE IF THE PRODUCT CARD TYPE ALREADY EXISTS;
        let priceProductCardRuleSet = await this.priceProductCardRuleSetRepository.findOne({
            where: {
                priceProductCardRuleSetId: updatePriceProductCardRuleSetDTO.priceProductCardRuleSetId
            }
        });
        
        //TO DO: RETURN AN ERROR FOR DUPLICATE PRICING PRODUCT CARD;
        if (priceProductCardRuleSet == null) {
            return null;
        }

        priceProductCardRuleSet.priceProductCardTypeId = updatePriceProductCardRuleSetDTO.priceProductCardTypeId;
        priceProductCardRuleSet.priceProductCardRuleTypeId = updatePriceProductCardRuleSetDTO.priceProductCardRuleTypeId;
        priceProductCardRuleSet.priceProductCardRuleSetName = updatePriceProductCardRuleSetDTO.priceProductCardRuleSetName;
        priceProductCardRuleSet.priceProductCardRuleSetMetadata = updatePriceProductCardRuleSetDTO.priceProductCardRuleSetMetadata;
        priceProductCardRuleSet.priceProductCardRuleSetIsActive = updatePriceProductCardRuleSetDTO.priceProductCardRuleSetIsActive;
        priceProductCardRuleSet.priceProductCardRuleSetUpdateDate = new Date();
        
        priceProductCardRuleSet = await this.priceProductCardRuleSetRepository.save(priceProductCardRuleSet);

        let priceProductCardDTO = this.getPriceProductCardRuleSet(priceProductCardRuleSet.priceProductCardRuleSetId);

        return priceProductCardDTO;
        
    }  
    
    async processPriceProductCardRuleSet(priceProductCardRuleSetsDTO: PriceProductCardRuleSetDTO[]) {
        let priceProductCardRuleSets: any[] = [];
        
        for (let i = 0; i < priceProductCardRuleSetsDTO.length; i++) {
            let priceProductCardRuleSetDTO = priceProductCardRuleSetsDTO[i];
            let priceProductCardRuleSet = {
                priceProductCardRuleTypeCode: priceProductCardRuleSetDTO.priceProductCardRuleTypeCode,
                priceProductCardRuleSet: [] as any[]
            }

            let priceProductCardRuleSetMetadata = priceProductCardRuleSetDTO.priceProductCardRuleSetMetadata.metadata.fields;;
            for (let j = 0; j < priceProductCardRuleSetMetadata.length; j++) {
                let metadata = priceProductCardRuleSetMetadata[j];
                priceProductCardRuleSet.priceProductCardRuleSet.push({
                    [metadata.id]: metadata.value
                });
            }

            priceProductCardRuleSets.push(priceProductCardRuleSet);
        }

        return priceProductCardRuleSets;
    }

    async applyCustomPriceProductCardRuleSets(processedPriceProductCardRuleSets: any[], productCardConditionCode:string, productCardPrices:any) {
        //SET THE PRICES
        let productCardPriceLow = productCardPrices.productCardPriceCurrentLowPrice;
        let productCardPriceMarket = productCardPrices.productCardPriceCurrentMarketPrice;
        let productCardPrice = 0;
        //CONDITION PRICE ELEMENT;
        let conditionPricePriceProductCardRules = processedPriceProductCardRuleSets.find(item => item.priceProductCardRuleTypeCode === PRICE_PRODUCT_CARD_RULE_TYPE_CODE.CONDITION_PRICE);
        let conditionPricePriceProductCardRuleSet = conditionPricePriceProductCardRules.priceProductCardRuleSet;
        if(conditionPricePriceProductCardRuleSet){
            const conditionPricePercentageNM = conditionPricePriceProductCardRuleSet.priceProductCardRuleSet.find(rule => rule[CONDITION_PRICE.CONDITION_PRICE_PERCENTAGE_NM] !== undefined)?.[CONDITION_PRICE.CONDITION_PRICE_PERCENTAGE_NM];
            const conditionPricePercentageLP = conditionPricePriceProductCardRuleSet.priceProductCardRuleSet.find(rule => rule[CONDITION_PRICE.CONDITION_PRICE_PERCENTAGE_LP] !== undefined)?.[CONDITION_PRICE.CONDITION_PRICE_PERCENTAGE_LP];
            const conditionPricePercentageMP = conditionPricePriceProductCardRuleSet.priceProductCardRuleSet.find(rule => rule[CONDITION_PRICE.CONDITION_PRICE_PERCENTAGE_MP] !== undefined)?.[CONDITION_PRICE.CONDITION_PRICE_PERCENTAGE_MP];
            const conditionPricePercentageHP = conditionPricePriceProductCardRuleSet.priceProductCardRuleSet.find(rule => rule[CONDITION_PRICE.CONDITION_PRICE_PERCENTAGE_HP] !== undefined)?.[CONDITION_PRICE.CONDITION_PRICE_PERCENTAGE_HP];
            const conditionPricePercentageDM = conditionPricePriceProductCardRuleSet.priceProductCardRuleSet.find(rule => rule[CONDITION_PRICE.CONDITION_PRICE_PERCENTAGE_DM] !== undefined)?.[CONDITION_PRICE.CONDITION_PRICE_PERCENTAGE_DM];

            switch(productCardConditionCode) {
                case 'NM':
                    productCardPriceLow = productCardPriceLow * (conditionPricePercentageNM / 100);
                    productCardPriceMarket = productCardPriceMarket * (conditionPricePercentageNM / 100);
                    break;
                case 'LP':
                    productCardPriceLow = productCardPriceLow * (conditionPricePercentageLP / 100);
                    productCardPriceMarket = productCardPriceMarket * (conditionPricePercentageLP / 100);
                    break;
                case 'MP':
                    productCardPriceLow = productCardPriceLow * (conditionPricePercentageMP / 100);
                    productCardPriceMarket = productCardPriceMarket * (conditionPricePercentageMP / 100);
                    break;
                case 'HP':
                    productCardPriceLow = productCardPriceLow * (conditionPricePercentageHP / 100);
                    productCardPriceMarket = productCardPriceMarket * (conditionPricePercentageHP / 100);
                    break;
                case 'DM':
                    productCardPriceLow = productCardPriceLow * (conditionPricePercentageDM / 100);
                    productCardPriceMarket = productCardPriceMarket * (conditionPricePercentageDM / 100);
                    break;
            }

            productCardPriceLow = parseFloat(productCardPriceLow.toFixed(2));
            productCardPriceMarket = parseFloat(productCardPriceMarket.toFixed(2));

        }

        //BASE PRICE ELEMENT;
        let basePricePriceProductCardRules = processedPriceProductCardRuleSets.find(item => item.priceProductCardRuleTypeCode === PRICE_PRODUCT_CARD_RULE_TYPE_CODE.BASE_PRICE);
        let basePricePriceProductCardRuleSet = basePricePriceProductCardRules.priceProductCardRuleSet;
        if(basePricePriceProductCardRuleSet){
            const basePrice = basePricePriceProductCardRuleSet.priceProductCardRuleSet.find(rule => rule[BASE_PRICE.BASE_PRICE] !== undefined)?.[BASE_PRICE.BASE_PRICE];
            const minimumPriceEnabled = basePricePriceProductCardRuleSet.priceProductCardRuleSet.find(rule => rule[BASE_PRICE.MINIMUM_PRICE_ENABLED] !== undefined)?.[BASE_PRICE.MINIMUM_PRICE_ENABLED];
            const minimumPrice = basePricePriceProductCardRuleSet.priceProductCardRuleSet.find(rule => rule[BASE_PRICE.MINIMUM_PRICE] !== undefined)?.[BASE_PRICE.MINIMUM_PRICE];
            const roundingPriceEnabled = basePricePriceProductCardRuleSet.priceProductCardRuleSet.find(rule => rule[BASE_PRICE.ROUNDING_PRICE_ENABLED] !== undefined)?.[BASE_PRICE.ROUNDING_PRICE_ENABLED];
            
            if(basePrice == BASE_PRICE_VALUES.LOW) {
                productCardPrice = productCardPriceLow;
            } else if(basePrice == BASE_PRICE_VALUES.MARKET) {
                productCardPrice = productCardPriceMarket;
            }

            if(minimumPriceEnabled && productCardPrice < minimumPrice) {
                productCardPrice = minimumPrice;
            }

            if(roundingPriceEnabled) {
                productCardPrice = await this.applyRoundingPrice(productCardPrice);
            }
        }

        return productCardPrice;

    }

    async applyDefaultPriceProductCardRuleSet(productCardConditionCode:string, productCardPrices:any) {
        //SET THE PRICES
        let productCardPriceLow = productCardPrices.productCardPriceCurrentLowPrice;
        let productCardPriceMarket = productCardPrices.productCardPriceCurrentMarketPrice;
        let productCardPrice = 0;
        
        //CONDITION PRICE ELEMENT;
        switch(productCardConditionCode) {
            case 'NM':
                productCardPriceLow = productCardPriceLow * (CONDITION_PRICE_DEFAULT_RULE_SET.CONDITION_PRICE_PERCENTAGE_NM / 100);
                productCardPriceMarket = productCardPriceMarket * (CONDITION_PRICE_DEFAULT_RULE_SET.CONDITION_PRICE_PERCENTAGE_NM / 100);
                break;
            case 'LP':
                productCardPriceLow = productCardPriceLow * (CONDITION_PRICE_DEFAULT_RULE_SET.CONDITION_PRICE_PERCENTAGE_LP / 100);
                productCardPriceMarket = productCardPriceMarket * (CONDITION_PRICE_DEFAULT_RULE_SET.CONDITION_PRICE_PERCENTAGE_LP / 100);
                break;
            case 'MP':
                productCardPriceLow = productCardPriceLow * (CONDITION_PRICE_DEFAULT_RULE_SET.CONDITION_PRICE_PERCENTAGE_MP / 100);
                productCardPriceMarket = productCardPriceMarket * (CONDITION_PRICE_DEFAULT_RULE_SET.CONDITION_PRICE_PERCENTAGE_MP / 100);
                break;
            case 'HP':
                productCardPriceLow = productCardPriceLow * (CONDITION_PRICE_DEFAULT_RULE_SET.CONDITION_PRICE_PERCENTAGE_HP / 100);
                productCardPriceMarket = productCardPriceMarket * (CONDITION_PRICE_DEFAULT_RULE_SET.CONDITION_PRICE_PERCENTAGE_HP / 100);
                break;
            case 'DM':
                productCardPriceLow = productCardPriceLow * (CONDITION_PRICE_DEFAULT_RULE_SET.CONDITION_PRICE_PERCENTAGE_DM / 100);
                productCardPriceMarket = productCardPriceMarket * (CONDITION_PRICE_DEFAULT_RULE_SET.CONDITION_PRICE_PERCENTAGE_DM / 100);
                break;
        }

        productCardPriceLow = parseFloat(productCardPriceLow.toFixed(2));
        productCardPriceMarket = parseFloat(productCardPriceMarket.toFixed(2));

        //BASE PRICE ELEMENT;
        const basePrice = BASE_PRICE_DEFAULT_RULE_SET.BASE_PRICE;
        const minimumPriceEnabled = BASE_PRICE_DEFAULT_RULE_SET.MINIMUM_PRICE_ENABLED;
        const minimumPrice = BASE_PRICE_DEFAULT_RULE_SET.MINIMUM_PRICE;
        const roundingPriceEnabled = BASE_PRICE_DEFAULT_RULE_SET.ROUNDING_PRICE_ENABLED;

        if(basePrice == BASE_PRICE_VALUES.LOW) {
            productCardPrice = productCardPriceLow;
        } else if(basePrice == BASE_PRICE_VALUES.MARKET) {
            productCardPrice = productCardPriceMarket;
        }

        if(minimumPriceEnabled && productCardPrice < minimumPrice) {
            productCardPrice = minimumPrice;
        }

        if(roundingPriceEnabled) {
            productCardPrice = await this.applyRoundingPrice(productCardPrice);
        }

        return productCardPrice;
    }

    async applyRoundingPrice(productCardPrice: number) {
        const productCardPriceWhole = Math.floor(productCardPrice);
        const productCardPriceDecimal = productCardPrice - productCardPriceWhole;

        if (productCardPriceDecimal < 0.50) {
            return productCardPriceWhole + 0.49;
        } else {
            return productCardPriceWhole + 0.99;
        }
    }

}