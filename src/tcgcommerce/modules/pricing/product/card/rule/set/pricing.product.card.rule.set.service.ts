import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PricingProductCardRuleSetDTO, CreatePricingProductCardRuleSetDTO, UpdatePricingProductCardRuleSetDTO} from './dto/pricing.product.card.rule.set.dto';
import { PricingProductCardRuleSet } from 'src/typeorm/entities/tcgcommerce/modules/pricing/product/card/rule/set/pricing.product.card.rule.set.entity';

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
}