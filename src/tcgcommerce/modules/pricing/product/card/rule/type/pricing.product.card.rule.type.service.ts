import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PricingProductCardRuleTypeDTO, CreatePricingProductCardRuleTypeDTO, UpdatePricingProductCardRuleTypeDTO} from './dto/pricing.product.card.rule.type.dto';
import { PricingProductCardRuleType } from 'src/typeorm/entities/tcgcommerce/modules/pricing/product/card/rule/type/pricing.product.card.rule.type.entity';

@Injectable()
export class PricingProductCardRuleTypeService {

    constructor(
        @InjectRepository(PricingProductCardRuleType) private pricingProductCardRuleTypeRepository: Repository<PricingProductCardRuleType>,
    ) { }

    async getPricingProductCardRuleType(pricingProductCardRuleTypeId: string) {
        let pricingProductCardRuleType = await this.pricingProductCardRuleTypeRepository.findOne({
            where: {
                pricingProductCardRuleTypeId: pricingProductCardRuleTypeId,
            }
        });
        
        //TO DO: CREATE AN ERROR TO RETURN;
        if(pricingProductCardRuleType == null) {
            return null;
        }

        let pricingProductCardRuleTypeDTO: PricingProductCardRuleTypeDTO = ({ ...pricingProductCardRuleType });
        
        return pricingProductCardRuleTypeDTO;

    }

    async getPricingProductCardRuleTypesByPricingProductCardTypeId(pricingProductCardTypeId: string) {
        let pricingProductCardRuleTypes = await this.pricingProductCardRuleTypeRepository.find({
            where: {
                pricingProductCardTypeId: pricingProductCardTypeId,
            }
        });

        //TO DO: CREATE AN ERROR TO RETURN;
        if(pricingProductCardRuleTypes == null) {
            return null;
        }

        let pricingProductCardRuleTypesDTO: PricingProductCardRuleTypeDTO[] = [];
        for(let i = 0; i < pricingProductCardRuleTypes.length; i++) {
            let pricingProductCardRuleType = pricingProductCardRuleTypes[i];

            let pricingProductCardRuleTypeDTO: PricingProductCardRuleTypeDTO = ({ ...pricingProductCardRuleType });

            pricingProductCardRuleTypesDTO.push(pricingProductCardRuleTypeDTO);
        }

        return pricingProductCardRuleTypesDTO;
    }

        

    async getPricingProductCardRuleTypes() {
        let pricingProductCardRuleTypes = await this.pricingProductCardRuleTypeRepository.find();
        
        //TO DO: CREATE AN ERROR TO RETURN;
        if(pricingProductCardRuleTypes == null) {
            return null;
        }

        let pricingProductCardRuleTypesDTO: PricingProductCardRuleTypeDTO[] = [];
        for(let i = 0; i < pricingProductCardRuleTypes.length; i++) {
            let pricingProductCardRuleType = pricingProductCardRuleTypes[i];
        
            let pricingProductCardRuleTypeDTO: PricingProductCardRuleTypeDTO = ({ ...pricingProductCardRuleType });
            
            pricingProductCardRuleTypesDTO.push(pricingProductCardRuleTypeDTO);
        }

        return pricingProductCardRuleTypesDTO;
    }
    
    async createPricingProductCardRuleType(createPricingProductCardRuleTypeDTO: CreatePricingProductCardRuleTypeDTO) {
        
        let newPricingProductCardRuleType = this.pricingProductCardRuleTypeRepository.create({ ...createPricingProductCardRuleTypeDTO });
        newPricingProductCardRuleType = await this.pricingProductCardRuleTypeRepository.save(newPricingProductCardRuleType);

        let pricingProductCardRuleTypeDTO = this.getPricingProductCardRuleType(newPricingProductCardRuleType.pricingProductCardRuleTypeId);

        return pricingProductCardRuleTypeDTO;
    }   

    async updatePricingProductCardRuleType(updatePricingProductCardRuleTypeDTO: UpdatePricingProductCardRuleTypeDTO) {
    
        //CHECK TO SEE IF THE PRODUCT CARD TYPE ALREADY EXISTS;
        let pricingProductCardRuleType = await this.pricingProductCardRuleTypeRepository.findOne({
            where: {
                pricingProductCardRuleTypeId: updatePricingProductCardRuleTypeDTO.pricingProductCardRuleTypeId
            }
        });
        
        //TO DO: RETURN AN ERROR FOR DUPLICATE PRICING PRODUCT CARD;
        if (pricingProductCardRuleType == null) {
            return null;
        }

        pricingProductCardRuleType.pricingProductCardRuleTypeId = updatePricingProductCardRuleTypeDTO.pricingProductCardRuleTypeId;
        pricingProductCardRuleType.pricingProductCardRuleTypeName = updatePricingProductCardRuleTypeDTO.pricingProductCardRuleTypeName;
        pricingProductCardRuleType.pricingProductCardRuleTypeCode = updatePricingProductCardRuleTypeDTO.pricingProductCardRuleTypeCode;
        pricingProductCardRuleType.pricingProductCardRuleTypeDescription = updatePricingProductCardRuleTypeDTO.pricingProductCardRuleTypeDescription;
        pricingProductCardRuleType.pricingProductCardRuleTypeMetadata = updatePricingProductCardRuleTypeDTO.pricingProductCardRuleTypeMetadata;
        pricingProductCardRuleType.pricingProductCardRuleTypeIsActive = updatePricingProductCardRuleTypeDTO.pricingProductCardRuleTypeIsActive;
        pricingProductCardRuleType.pricingProductCardRuleTypeUpdateDate = new Date();
        
        pricingProductCardRuleType = await this.pricingProductCardRuleTypeRepository.save(pricingProductCardRuleType);

        let pricingProductCardDTO = this.getPricingProductCardRuleType(pricingProductCardRuleType.pricingProductCardRuleTypeId);

        return pricingProductCardDTO;
        
    }   
}