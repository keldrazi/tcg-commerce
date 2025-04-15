import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PricingProductCardRuleSetDTO, CreatePricingProductCardRuleSetDTO, UpdatePricingProductCardRuleSetDTO} from './dto/pricing.product.card.rule.set.dto';
import { PricingProductCardRuleSet } from 'src/typeorm/entities/tcgcommerce/modules/pricing/product/card/rule/set/pricing.product.card.rule.set.entity';

@Injectable()
export class PricingProductCardRuleSetService {

    constructor(
        @InjectRepository(PricingProductCardRuleSet) private pricingProductCardRepository: Repository<PricingProductCardRuleSet>,
    ) { }

    async getPricingProductCardRuleSet(pricingProductCardRuleSetId: string) {
        let pricingProductCardRuleSet = await this.pricingProductCardRepository.findOne({
            where: {
                pricingProductCardRuleSetId: pricingProductCardRuleSetId,
            }
        });
        
        //TO DO: CREATE AN ERROR TO RETURN;
        if(pricingProductCardRuleSet == null) {
            return null;
        }

        let pricingProductCardRuleSetDTO = new PricingProductCardRuleSetDTO();
        pricingProductCardRuleSetDTO.pricingProductCardRuleSetId = pricingProductCardRuleSet.pricingProductCardRuleSetId;
        pricingProductCardRuleSetDTO.commerceAccountId = pricingProductCardRuleSet.commerceAccountId;
        pricingProductCardRuleSetDTO.productLineId = pricingProductCardRuleSet.productLineId;
        pricingProductCardRuleSetDTO.pricingProductCardTypeId = pricingProductCardRuleSet.pricingProductCardTypeId;
        pricingProductCardRuleSetDTO.pricingProductCardRuleTypeId = pricingProductCardRuleSet.pricingProductCardRuleTypeId;
        pricingProductCardRuleSetDTO.pricingProductCardRuleSetName = pricingProductCardRuleSet.pricingProductCardRuleSetName;
        pricingProductCardRuleSetDTO.pricingProductCardRuleSetPriceMinimumEnabled = pricingProductCardRuleSet.pricingProductCardRuleSetPriceMinimumEnabled;
        pricingProductCardRuleSetDTO.pricingProductCardRuleSetPriceMinimum = pricingProductCardRuleSet.pricingProductCardRuleSetPriceMinimum;
        pricingProductCardRuleSetDTO.pricingProductCardRuleSetMetadata = pricingProductCardRuleSet.pricingProductCardRuleSetMetadata;
        pricingProductCardRuleSetDTO.pricingProductCardRuleSetIsActive = pricingProductCardRuleSet.pricingProductCardRuleSetIsActive;
        pricingProductCardRuleSetDTO.pricingProductCardRuleSetCreateDate = pricingProductCardRuleSet.pricingProductCardRuleSetCreateDate;
        pricingProductCardRuleSetDTO.pricingProductCardRuleSetUpdateDate = pricingProductCardRuleSet.pricingProductCardRuleSetUpdateDate;
        
        return pricingProductCardRuleSetDTO;

    }

    async getPricingProductCardRuleSets(commerceAccountId: string, productLineId: string) {
        let pricingProductCardRuleSets = await this.pricingProductCardRepository.find({
            where: {
                commerceAccountId: commerceAccountId,
                productLineId: productLineId
            }
        });
        
        //TO DO: CREATE AN ERROR TO RETURN;
        if(pricingProductCardRuleSets == null) {
            return null;
        }

        let pricingProductCardRuleSetsDTO: PricingProductCardRuleSetDTO[] = [];
        for(let i = 0; i < pricingProductCardRuleSets.length; i++) {
            let pricingProductCardRuleSet = pricingProductCardRuleSets[i];
        
            let pricingProductCardRuleSetDTO = new PricingProductCardRuleSetDTO();
            pricingProductCardRuleSetDTO.pricingProductCardRuleSetId = pricingProductCardRuleSet.pricingProductCardRuleSetId;
            pricingProductCardRuleSetDTO.commerceAccountId = pricingProductCardRuleSet.commerceAccountId;
            pricingProductCardRuleSetDTO.productLineId = pricingProductCardRuleSet.productLineId;
            pricingProductCardRuleSetDTO.pricingProductCardTypeId = pricingProductCardRuleSet.pricingProductCardTypeId;
            pricingProductCardRuleSetDTO.pricingProductCardRuleTypeId = pricingProductCardRuleSet.pricingProductCardRuleTypeId;
            pricingProductCardRuleSetDTO.pricingProductCardRuleSetName = pricingProductCardRuleSet.pricingProductCardRuleSetName;
            pricingProductCardRuleSetDTO.pricingProductCardRuleSetPriceMinimumEnabled = pricingProductCardRuleSet.pricingProductCardRuleSetPriceMinimumEnabled;
            pricingProductCardRuleSetDTO.pricingProductCardRuleSetPriceMinimum = pricingProductCardRuleSet.pricingProductCardRuleSetPriceMinimum;
            pricingProductCardRuleSetDTO.pricingProductCardRuleSetMetadata = pricingProductCardRuleSet.pricingProductCardRuleSetMetadata;
            pricingProductCardRuleSetDTO.pricingProductCardRuleSetIsActive = pricingProductCardRuleSet.pricingProductCardRuleSetIsActive;
            pricingProductCardRuleSetDTO.pricingProductCardRuleSetCreateDate = pricingProductCardRuleSet.pricingProductCardRuleSetCreateDate;
            pricingProductCardRuleSetDTO.pricingProductCardRuleSetUpdateDate = pricingProductCardRuleSet.pricingProductCardRuleSetUpdateDate;
            
            pricingProductCardRuleSetsDTO.push(pricingProductCardRuleSetDTO);
        }

        return pricingProductCardRuleSetsDTO;
    }
    
    async createPricingProductCardRuleSet(createPricingProductCardRuleSetDTO: CreatePricingProductCardRuleSetDTO) {
        
        let newPricingProductCardRuleSet = this.pricingProductCardRepository.create({ ...createPricingProductCardRuleSetDTO });
        newPricingProductCardRuleSet = await this.pricingProductCardRepository.save(newPricingProductCardRuleSet);

        let pricingProductCardRuleSetDTO = this.getPricingProductCardRuleSet(newPricingProductCardRuleSet.pricingProductCardRuleSetId);

        return pricingProductCardRuleSetDTO;
    }   

    async updatePricingProductCardRuleSet(updatePricingProductCardRuleSetDTO: UpdatePricingProductCardRuleSetDTO) {
    
        //CHECK TO SEE IF THE PRODUCT CARD TYPE ALREADY EXISTS;
        let pricingProductCardRuleSet = await this.pricingProductCardRepository.findOne({
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
        pricingProductCardRuleSet.pricingProductCardRuleSetPriceMinimumEnabled = updatePricingProductCardRuleSetDTO.pricingProductCardRuleSetPriceMinimumEnabled;
        pricingProductCardRuleSet.pricingProductCardRuleSetPriceMinimum = updatePricingProductCardRuleSetDTO.pricingProductCardRuleSetPriceMinimum;
        pricingProductCardRuleSet.pricingProductCardRuleSetMetadata = updatePricingProductCardRuleSetDTO.pricingProductCardRuleSetMetadata;
        pricingProductCardRuleSet.pricingProductCardRuleSetIsActive = updatePricingProductCardRuleSetDTO.pricingProductCardRuleSetIsActive;
        pricingProductCardRuleSet.pricingProductCardRuleSetUpdateDate = new Date();
        
        pricingProductCardRuleSet = await this.pricingProductCardRepository.save(pricingProductCardRuleSet);

        let pricingProductCardDTO = this.getPricingProductCardRuleSet(pricingProductCardRuleSet.pricingProductCardRuleSetId);

        return pricingProductCardDTO;
        
    }   
}