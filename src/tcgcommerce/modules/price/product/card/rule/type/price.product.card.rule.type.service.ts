import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PriceProductCardRuleTypeDTO, CreatePriceProductCardRuleTypeDTO, UpdatePriceProductCardRuleTypeDTO} from './dto/price.product.card.rule.type.dto';
import { PriceProductCardRuleType } from 'src/typeorm/entities/tcgcommerce/modules/price/product/card/rule/type/price.product.card.rule.type.entity';

@Injectable()
export class PriceProductCardRuleTypeService {

    constructor(
        @InjectRepository(PriceProductCardRuleType) private priceProductCardRuleTypeRepository: Repository<PriceProductCardRuleType>,
    ) { }

    async getPriceProductCardRuleType(priceProductCardRuleTypeId: string) {
        let priceProductCardRuleType = await this.priceProductCardRuleTypeRepository.findOne({
            where: {
                priceProductCardRuleTypeId: priceProductCardRuleTypeId,
            }
        });
        
        //TO DO: CREATE AN ERROR TO RETURN;
        if(priceProductCardRuleType == null) {
            return null;
        }

        let priceProductCardRuleTypeDTO: PriceProductCardRuleTypeDTO = ({ ...priceProductCardRuleType });
        
        return priceProductCardRuleTypeDTO;

    }

    async getPriceProductCardRuleTypesByPriceProductCardTypeId(priceProductCardTypeId: string) {
        let priceProductCardRuleTypes = await this.priceProductCardRuleTypeRepository.find({
            where: {
                priceProductCardTypeId: priceProductCardTypeId,
            }
        });

        //TO DO: CREATE AN ERROR TO RETURN;
        if(priceProductCardRuleTypes == null) {
            return null;
        }

        let priceProductCardRuleTypesDTO: PriceProductCardRuleTypeDTO[] = [];
        for(let i = 0; i < priceProductCardRuleTypes.length; i++) {
            let priceProductCardRuleType = priceProductCardRuleTypes[i];

            let priceProductCardRuleTypeDTO: PriceProductCardRuleTypeDTO = ({ ...priceProductCardRuleType });

            priceProductCardRuleTypesDTO.push(priceProductCardRuleTypeDTO);
        }

        return priceProductCardRuleTypesDTO;
    }

        

    async getPriceProductCardRuleTypes() {
        let priceProductCardRuleTypes = await this.priceProductCardRuleTypeRepository.find();
        
        //TO DO: CREATE AN ERROR TO RETURN;
        if(priceProductCardRuleTypes == null) {
            return null;
        }

        let priceProductCardRuleTypesDTO: PriceProductCardRuleTypeDTO[] = [];
        for(let i = 0; i < priceProductCardRuleTypes.length; i++) {
            let priceProductCardRuleType = priceProductCardRuleTypes[i];
        
            let priceProductCardRuleTypeDTO: PriceProductCardRuleTypeDTO = ({ ...priceProductCardRuleType });
            
            priceProductCardRuleTypesDTO.push(priceProductCardRuleTypeDTO);
        }

        return priceProductCardRuleTypesDTO;
    }
    
    async createPriceProductCardRuleType(createPriceProductCardRuleTypeDTO: CreatePriceProductCardRuleTypeDTO) {
        
        let newPriceProductCardRuleType = this.priceProductCardRuleTypeRepository.create({ ...createPriceProductCardRuleTypeDTO });
        newPriceProductCardRuleType = await this.priceProductCardRuleTypeRepository.save(newPriceProductCardRuleType);

        let priceProductCardRuleTypeDTO = this.getPriceProductCardRuleType(newPriceProductCardRuleType.priceProductCardRuleTypeId);

        return priceProductCardRuleTypeDTO;
    }   

    async updatePriceProductCardRuleType(updatePriceProductCardRuleTypeDTO: UpdatePriceProductCardRuleTypeDTO) {
    
        //CHECK TO SEE IF THE PRODUCT CARD TYPE ALREADY EXISTS;
        let priceProductCardRuleType = await this.priceProductCardRuleTypeRepository.findOne({
            where: {
                priceProductCardRuleTypeId: updatePriceProductCardRuleTypeDTO.priceProductCardRuleTypeId
            }
        });
        
        //TO DO: RETURN AN ERROR FOR DUPLICATE PRICING PRODUCT CARD;
        if (priceProductCardRuleType == null) {
            return null;
        }

        priceProductCardRuleType.priceProductCardRuleTypeId = updatePriceProductCardRuleTypeDTO.priceProductCardRuleTypeId;
        priceProductCardRuleType.priceProductCardRuleTypeName = updatePriceProductCardRuleTypeDTO.priceProductCardRuleTypeName;
        priceProductCardRuleType.priceProductCardRuleTypeCode = updatePriceProductCardRuleTypeDTO.priceProductCardRuleTypeCode;
        priceProductCardRuleType.priceProductCardRuleTypeDescription = updatePriceProductCardRuleTypeDTO.priceProductCardRuleTypeDescription;
        priceProductCardRuleType.priceProductCardRuleTypeMetadata = updatePriceProductCardRuleTypeDTO.priceProductCardRuleTypeMetadata;
        priceProductCardRuleType.priceProductCardRuleTypeIsActive = updatePriceProductCardRuleTypeDTO.priceProductCardRuleTypeIsActive;
        priceProductCardRuleType.priceProductCardRuleTypeUpdateDate = new Date();
        
        priceProductCardRuleType = await this.priceProductCardRuleTypeRepository.save(priceProductCardRuleType);

        let priceProductCardDTO = this.getPriceProductCardRuleType(priceProductCardRuleType.priceProductCardRuleTypeId);

        return priceProductCardDTO;
        
    }   
}