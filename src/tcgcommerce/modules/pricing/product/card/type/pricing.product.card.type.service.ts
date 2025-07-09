import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PricingProductCardTypeDTO, CreatePricingProductCardTypeDTO, UpdatePricingProductCardTypeDTO} from './dto/pricing.product.card.type.dto';
import { PricingProductCardType } from 'src/typeorm/entities/tcgcommerce/modules/pricing/product/card/type/pricing.product.card.type.entity';

@Injectable()
export class PricingProductCardTypeService {

    constructor(
        @InjectRepository(PricingProductCardType) private pricingProductCardTypeRepository: Repository<PricingProductCardType>,
    ) { }

    async getPricingProductCardType(pricingProductCardTypeId: string) {
        let pricingProductCardType = await this.pricingProductCardTypeRepository.findOne({
            where: {
                pricingProductCardTypeId: pricingProductCardTypeId,
            }
        });
        
        //TO DO: CREATE AN ERROR TO RETURN;
        if(pricingProductCardType == null) {
            return null;
        }

        let pricingProductCardTypeDTO: PricingProductCardTypeDTO = ({ ...pricingProductCardType})
        
        pricingProductCardTypeDTO.pricingProductCardTypeUpdateDate = pricingProductCardType.pricingProductCardTypeUpdateDate;
        
        return pricingProductCardTypeDTO;

    }

    async getPricingProductCardTypes() {
        let pricingProductCardTypes = await this.pricingProductCardTypeRepository.find();
        
        //TO DO: CREATE AN ERROR TO RETURN;
        if(pricingProductCardTypes == null) {
            return null;
        }

        let pricingProductCardTypesDTO: PricingProductCardTypeDTO[] = [];
        for(let i = 0; i < pricingProductCardTypes.length; i++) {
            let pricingProductCardType = pricingProductCardTypes[i];
        
            let pricingProductCardTypeDTO: PricingProductCardTypeDTO = ({ ...pricingProductCardType})
            
            pricingProductCardTypesDTO.push(pricingProductCardTypeDTO);
        }

        return pricingProductCardTypesDTO;
    }
    
    async createPricingProductCardType(createPricingProductCardTypeDTO: CreatePricingProductCardTypeDTO) {
        
        let newPricingProductCardType = this.pricingProductCardTypeRepository.create({ ...createPricingProductCardTypeDTO });
        newPricingProductCardType = await this.pricingProductCardTypeRepository.save(newPricingProductCardType);

        let pricingProductCardTypeDTO = this.getPricingProductCardType(newPricingProductCardType.pricingProductCardTypeId);

        return pricingProductCardTypeDTO;
    }   

    async updatePricingProductCardType(updatePricingProductCardTypeDTO: UpdatePricingProductCardTypeDTO) {
    
        //CHECK TO SEE IF THE PRODUCT CARD TYPE ALREADY EXISTS;
        let pricingProductCardType = await this.pricingProductCardTypeRepository.findOne({
            where: {
                pricingProductCardTypeId: updatePricingProductCardTypeDTO.pricingProductCardTypeId
            }
        });
        
        //TO DO: RETURN AN ERROR FOR DUPLICATE PRICING PRODUCT CARD;
        if (pricingProductCardType == null) {
            return null;
        }

        pricingProductCardType.pricingProductCardTypeId = updatePricingProductCardTypeDTO.pricingProductCardTypeId;
        pricingProductCardType.pricingProductCardTypeName = updatePricingProductCardTypeDTO.pricingProductCardTypeName;
        pricingProductCardType.pricingProductCardTypeIsActive = updatePricingProductCardTypeDTO.pricingProductCardTypeIsActive;
        pricingProductCardType.pricingProductCardTypeUpdateDate = new Date();
        
        pricingProductCardType = await this.pricingProductCardTypeRepository.save(pricingProductCardType);

        let pricingProductCardDTO = this.getPricingProductCardType(pricingProductCardType.pricingProductCardTypeId);

        return pricingProductCardDTO;
        
    }   
}