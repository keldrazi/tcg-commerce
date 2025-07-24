import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PricingProductCardRuleSetDTO, CreatePricingProductCardRuleSetDTO, UpdatePricingProductCardRuleSetDTO} from './dto/pricing.product.card.rule.set.dto';
import { PricingProductCardRuleSet } from 'src/typeorm/entities/tcgcommerce/modules/pricing/product/card/rule/set/pricing.product.card.rule.set.entity';
import { PRICING_PRODUCT_CARD_RULE_TYPE_CODE, BASE_PRICE, BASE_PRICE_DEFAULT_RULE_SET, BASE_PRICE_VALUES, CONDITION_PRICE, CONDITION_PRICE_DEFAULT_RULE_SET } from 'src/system/constants/tcgcommerce/pricing/constants.tcgcommerce.pricing';

@Injectable()
export class PricingProductCardRuleSetService {

    constructor(
        @InjectRepository(PricingProductCardRuleSet) private pricingProductCardRuleSetRepository: Repository<PricingProductCardRuleSet>,
    ) { }

    async getPricingProductCardRuleSet(pricingProductCardRuleSetId: string) {
        let pricingProductCardRuleSet = await this.pricingProductCardRuleSetRepository.findOne({
            where: {
                pricingProductCardRuleSetId: pricingProductCardRuleSetId,
            }
        });
        
        //TO DO: CREATE AN ERROR TO RETURN;
        if(pricingProductCardRuleSet == null) {
            return null;
        }

        let pricingProductCardRuleSetDTO: PricingProductCardRuleSetDTO = ({ ...pricingProductCardRuleSet });
        
        return pricingProductCardRuleSetDTO;

    }

    async getPricingProductCardRuleSets(commerceAccountId: string, pricingProductCardTypeId: string) {
        let pricingProductCardRuleSets = await this.pricingProductCardRuleSetRepository.find({
            where: {
                commerceAccountId: commerceAccountId,
                pricingProductCardTypeId: pricingProductCardTypeId
                
            }
        });
        
        //TO DO: CREATE AN ERROR TO RETURN;
        if(pricingProductCardRuleSets == null) {
            return null;
        }

        let pricingProductCardRuleSetsDTO: PricingProductCardRuleSetDTO[] = [];
        for(let i = 0; i < pricingProductCardRuleSets.length; i++) {
            let pricingProductCardRuleSet = pricingProductCardRuleSets[i];
        
            let pricingProductCardRuleSetDTO: PricingProductCardRuleSetDTO = ({ ...pricingProductCardRuleSet });
            
            pricingProductCardRuleSetsDTO.push(pricingProductCardRuleSetDTO);
        }

        return pricingProductCardRuleSetsDTO;
    }
    
    async createPricingProductCardRuleSet(createPricingProductCardRuleSetDTO: CreatePricingProductCardRuleSetDTO) {
        
        let newPricingProductCardRuleSet = this.pricingProductCardRuleSetRepository.create({ ...createPricingProductCardRuleSetDTO });
        newPricingProductCardRuleSet = await this.pricingProductCardRuleSetRepository.save(newPricingProductCardRuleSet);

        let pricingProductCardRuleSetDTO = this.getPricingProductCardRuleSet(newPricingProductCardRuleSet.pricingProductCardRuleSetId);

        return pricingProductCardRuleSetDTO;
    }   

    async updatePricingProductCardRuleSet(updatePricingProductCardRuleSetDTO: UpdatePricingProductCardRuleSetDTO) {
    
        //CHECK TO SEE IF THE PRODUCT CARD TYPE ALREADY EXISTS;
        let pricingProductCardRuleSet = await this.pricingProductCardRuleSetRepository.findOne({
            where: {
                pricingProductCardRuleSetId: updatePricingProductCardRuleSetDTO.pricingProductCardRuleSetId
            }
        });
        
        //TO DO: RETURN AN ERROR FOR DUPLICATE PRICING PRODUCT CARD;
        if (pricingProductCardRuleSet == null) {
            return null;
        }

        pricingProductCardRuleSet.pricingProductCardTypeId = updatePricingProductCardRuleSetDTO.pricingProductCardTypeId;
        pricingProductCardRuleSet.pricingProductCardRuleTypeId = updatePricingProductCardRuleSetDTO.pricingProductCardRuleTypeId;
        pricingProductCardRuleSet.pricingProductCardRuleSetName = updatePricingProductCardRuleSetDTO.pricingProductCardRuleSetName;
        pricingProductCardRuleSet.pricingProductCardRuleSetMetadata = updatePricingProductCardRuleSetDTO.pricingProductCardRuleSetMetadata;
        pricingProductCardRuleSet.pricingProductCardRuleSetIsActive = updatePricingProductCardRuleSetDTO.pricingProductCardRuleSetIsActive;
        pricingProductCardRuleSet.pricingProductCardRuleSetUpdateDate = new Date();
        
        pricingProductCardRuleSet = await this.pricingProductCardRuleSetRepository.save(pricingProductCardRuleSet);

        let pricingProductCardDTO = this.getPricingProductCardRuleSet(pricingProductCardRuleSet.pricingProductCardRuleSetId);

        return pricingProductCardDTO;
        
    }  
    
    async processPricingProductCardRuleSet(pricingProductCardRuleSetsDTO: PricingProductCardRuleSetDTO[]) {
        let pricingProductCardRuleSets: any[] = [];
        
        for (let i = 0; i < pricingProductCardRuleSetsDTO.length; i++) {
            let pricingProductCardRuleSetDTO = pricingProductCardRuleSetsDTO[i];
            let pricingProductCardRuleSet = {
                pricingProductCardRuleTypeCode: pricingProductCardRuleSetDTO.pricingProductCardRuleTypeCode,
                pricingProductCardRuleSet: [] as any[]
            }

            let pricingProductCardRuleSetMetadata = pricingProductCardRuleSetDTO.pricingProductCardRuleSetMetadata.metadata.fields;;
            for (let j = 0; j < pricingProductCardRuleSetMetadata.length; j++) {
                let metadata = pricingProductCardRuleSetMetadata[j];
                pricingProductCardRuleSet.pricingProductCardRuleSet.push({
                    [metadata.id]: metadata.value
                });
            }

            pricingProductCardRuleSets.push(pricingProductCardRuleSet);
        }

        return pricingProductCardRuleSets;
    }

    async applyCustomPricingProductCardRuleSets(processedPricingProductCardRuleSets: any[], productCardConditionAbbreviation:string, productCardPrices:any) {
        //SET THE PRICES
        let productCardPriceLow = productCardPrices.productCardPriceCurrentLowPrice;
        let productCardPriceMarket = productCardPrices.productCardPriceCurrentMarketPrice;
        let productCardPrice = 0;
        //CONDITION PRICE ELEMENT;
        let conditionPricePricingProductCardRules = processedPricingProductCardRuleSets.find(item => item.pricingProductCardRuleTypeCode === PRICING_PRODUCT_CARD_RULE_TYPE_CODE.CONDITION_PRICE);
        let conditionPricePricingProductCardRuleSet = conditionPricePricingProductCardRules.pricingProductCardRuleSet;
        if(conditionPricePricingProductCardRuleSet){
            const conditionPricePercentageNM = conditionPricePricingProductCardRuleSet.pricingProductCardRuleSet.find(rule => rule[CONDITION_PRICE.CONDITION_PRICE_PERCENTAGE_NM] !== undefined)?.[CONDITION_PRICE.CONDITION_PRICE_PERCENTAGE_NM];
            const conditionPricePercentageLP = conditionPricePricingProductCardRuleSet.pricingProductCardRuleSet.find(rule => rule[CONDITION_PRICE.CONDITION_PRICE_PERCENTAGE_LP] !== undefined)?.[CONDITION_PRICE.CONDITION_PRICE_PERCENTAGE_LP];
            const conditionPricePercentageMP = conditionPricePricingProductCardRuleSet.pricingProductCardRuleSet.find(rule => rule[CONDITION_PRICE.CONDITION_PRICE_PERCENTAGE_MP] !== undefined)?.[CONDITION_PRICE.CONDITION_PRICE_PERCENTAGE_MP];
            const conditionPricePercentageHP = conditionPricePricingProductCardRuleSet.pricingProductCardRuleSet.find(rule => rule[CONDITION_PRICE.CONDITION_PRICE_PERCENTAGE_HP] !== undefined)?.[CONDITION_PRICE.CONDITION_PRICE_PERCENTAGE_HP];
            const conditionPricePercentageDM = conditionPricePricingProductCardRuleSet.pricingProductCardRuleSet.find(rule => rule[CONDITION_PRICE.CONDITION_PRICE_PERCENTAGE_DM] !== undefined)?.[CONDITION_PRICE.CONDITION_PRICE_PERCENTAGE_DM];

            switch(productCardConditionAbbreviation) {
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
        let basePricePricingProductCardRules = processedPricingProductCardRuleSets.find(item => item.pricingProductCardRuleTypeCode === PRICING_PRODUCT_CARD_RULE_TYPE_CODE.BASE_PRICE);
        let basePricePricingProductCardRuleSet = basePricePricingProductCardRules.pricingProductCardRuleSet;
        if(basePricePricingProductCardRuleSet){
            const basePrice = basePricePricingProductCardRuleSet.pricingProductCardRuleSet.find(rule => rule[BASE_PRICE.BASE_PRICE] !== undefined)?.[BASE_PRICE.BASE_PRICE];
            const minimumPriceEnabled = basePricePricingProductCardRuleSet.pricingProductCardRuleSet.find(rule => rule[BASE_PRICE.MINIMUM_PRICE_ENABLED] !== undefined)?.[BASE_PRICE.MINIMUM_PRICE_ENABLED];
            const minimumPrice = basePricePricingProductCardRuleSet.pricingProductCardRuleSet.find(rule => rule[BASE_PRICE.MINIMUM_PRICE] !== undefined)?.[BASE_PRICE.MINIMUM_PRICE];
            const roundingPriceEnabled = basePricePricingProductCardRuleSet.pricingProductCardRuleSet.find(rule => rule[BASE_PRICE.ROUNDING_PRICE_ENABLED] !== undefined)?.[BASE_PRICE.ROUNDING_PRICE_ENABLED];
            
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

    async applyDefaultPricingProductCardRuleSet(productCardConditionAbbreviation:string, productCardPrices:any) {
        //SET THE PRICES
        let productCardPriceLow = productCardPrices.productCardPriceCurrentLowPrice;
        let productCardPriceMarket = productCardPrices.productCardPriceCurrentMarketPrice;
        let productCardPrice = 0;
        
        //CONDITION PRICE ELEMENT;
        switch(productCardConditionAbbreviation) {
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