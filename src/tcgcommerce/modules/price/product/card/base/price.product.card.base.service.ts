import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PriceProductCardTypeDTO, CreatePriceProductCardTypeDTO, UpdatePriceProductCardTypeDTO} from './dto/price.product.card.type.dto';
import { PriceProductCardType } from 'src/typeorm/entities/tcgcommerce/modules/price/product/card/type/price.product.card.type.entity';

@Injectable()
export class PriceProductCardTypeService {

    constructor(
        @InjectRepository(PriceProductCardType) private priceProductCardTypeRepository: Repository<PriceProductCardType>,
    ) { }

    async getPriceProductCardType(priceProductCardTypeId: string) {
        let priceProductCardType = await this.priceProductCardTypeRepository.findOne({
            where: {
                priceProductCardTypeId: priceProductCardTypeId,
            }
        });
        
        //TO DO: CREATE AN ERROR TO RETURN;
        if(priceProductCardType == null) {
            return null;
        }

        let priceProductCardTypeDTO: PriceProductCardTypeDTO = ({ ...priceProductCardType})
        
        priceProductCardTypeDTO.priceProductCardTypeUpdateDate = priceProductCardType.priceProductCardTypeUpdateDate;
        
        return priceProductCardTypeDTO;

    }

    async getPriceProductCardTypes() {
        let priceProductCardTypes = await this.priceProductCardTypeRepository.find();
        
        //TO DO: CREATE AN ERROR TO RETURN;
        if(priceProductCardTypes == null) {
            return null;
        }

        let priceProductCardTypesDTO: PriceProductCardTypeDTO[] = [];
        for(let i = 0; i < priceProductCardTypes.length; i++) {
            let priceProductCardType = priceProductCardTypes[i];
        
            let priceProductCardTypeDTO: PriceProductCardTypeDTO = ({ ...priceProductCardType})
            
            priceProductCardTypesDTO.push(priceProductCardTypeDTO);
        }

        return priceProductCardTypesDTO;
    }
    
    async createPriceProductCardType(createPriceProductCardTypeDTO: CreatePriceProductCardTypeDTO) {
        
        let newPriceProductCardType = this.priceProductCardTypeRepository.create({ ...createPriceProductCardTypeDTO });
        newPriceProductCardType = await this.priceProductCardTypeRepository.save(newPriceProductCardType);

        let priceProductCardTypeDTO = this.getPriceProductCardType(newPriceProductCardType.priceProductCardTypeId);

        return priceProductCardTypeDTO;
    }   

    async updatePriceProductCardType(updatePriceProductCardTypeDTO: UpdatePriceProductCardTypeDTO) {
    
        //CHECK TO SEE IF THE PRODUCT CARD TYPE ALREADY EXISTS;
        let priceProductCardType = await this.priceProductCardTypeRepository.findOne({
            where: {
                priceProductCardTypeId: updatePriceProductCardTypeDTO.priceProductCardTypeId
            }
        });
        
        //TO DO: RETURN AN ERROR FOR DUPLICATE PRICING PRODUCT CARD;
        if (priceProductCardType == null) {
            return null;
        }

        priceProductCardType.priceProductCardTypeId = updatePriceProductCardTypeDTO.priceProductCardTypeId;
        priceProductCardType.priceProductCardTypeName = updatePriceProductCardTypeDTO.priceProductCardTypeName;
        priceProductCardType.priceProductCardTypeIsActive = updatePriceProductCardTypeDTO.priceProductCardTypeIsActive;
        priceProductCardType.priceProductCardTypeUpdateDate = new Date();
        
        priceProductCardType = await this.priceProductCardTypeRepository.save(priceProductCardType);

        let priceProductCardDTO = this.getPriceProductCardType(priceProductCardType.priceProductCardTypeId);

        return priceProductCardDTO;
        
    }   
}