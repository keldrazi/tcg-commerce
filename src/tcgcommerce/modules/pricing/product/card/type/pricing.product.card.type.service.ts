import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PricingProductCardRuleTypeDTO, CreatePricingProductCardRuleTypeDTO, UpdatePricingProductCardRuleTypeDTO} from './dto/pricing.product.card.type.dto';
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

        let pricingProductCardRuleTypeDTO = new PricingProductCardRuleTypeDTO();
        pricingProductCardRuleTypeDTO.pricingProductCardRuleTypeId = pricingProductCardRuleType.pricingProductCardRuleTypeId;
        pricingProductCardRuleTypeDTO.pricingProductCardRuleTypeName = pricingProductCardRuleType.pricingProductCardRuleTypeName;
        pricingProductCardRuleTypeDTO.pricingProductCardRuleTypeMetadata = pricingProductCardRuleType.pricingProductCardRuleTypeMetadata;
        pricingProductCardRuleTypeDTO.pricingProductCardRuleTypeIsActive = pricingProductCardRuleType.pricingProductCardRuleTypeIsActive;
        pricingProductCardRuleTypeDTO.pricingProductCardRuleTypeCreateDate = pricingProductCardRuleType.pricingProductCardRuleTypeCreateDate;
        pricingProductCardRuleTypeDTO.pricingProductCardRuleTypeUpdateDate = pricingProductCardRuleType.pricingProductCardRuleTypeUpdateDate;
        
        return pricingProductCardRuleTypeDTO;

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
        
            let pricingProductCardRuleTypeDTO = new PricingProductCardRuleTypeDTO();
            pricingProductCardRuleTypeDTO.pricingProductCardRuleTypeId = pricingProductCardRuleType.pricingProductCardRuleTypeId;
            pricingProductCardRuleTypeDTO.pricingProductCardRuleTypeName = pricingProductCardRuleType.pricingProductCardRuleTypeName;
            pricingProductCardRuleTypeDTO.pricingProductCardRuleTypeMetadata = pricingProductCardRuleType.pricingProductCardRuleTypeMetadata;
            pricingProductCardRuleTypeDTO.pricingProductCardRuleTypeIsActive = pricingProductCardRuleType.pricingProductCardRuleTypeIsActive;
            pricingProductCardRuleTypeDTO.pricingProductCardRuleTypeCreateDate = pricingProductCardRuleType.pricingProductCardRuleTypeCreateDate;
            pricingProductCardRuleTypeDTO.pricingProductCardRuleTypeUpdateDate = pricingProductCardRuleType.pricingProductCardRuleTypeUpdateDate;
            
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
        pricingProductCardRuleType.pricingProductCardRuleTypeMetadata = updatePricingProductCardRuleTypeDTO.pricingProductCardRuleTypeMetadata;
        pricingProductCardRuleType.pricingProductCardRuleTypeIsActive = updatePricingProductCardRuleTypeDTO.pricingProductCardRuleTypeIsActive;
        pricingProductCardRuleType.pricingProductCardRuleTypeUpdateDate = new Date();
        
        pricingProductCardRuleType = await this.pricingProductCardRuleTypeRepository.save(pricingProductCardRuleType);

        let pricingProductCardDTO = this.getPricingProductCardRuleType(pricingProductCardRuleType.pricingProductCardRuleTypeId);

        return pricingProductCardDTO;
        
    }   
}