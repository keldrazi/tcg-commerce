import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PriceProductCardBaseDTO, CreatePriceProductCardBaseDTO, UpdatePriceProductCardBaseDTO} from './dto/price.product.card.base.dto';
import { PriceProductCardBase } from 'src/typeorm/entities/tcgcommerce/modules/price/product/card/base/price.product.card.base.entity';

@Injectable()
export class PriceProductCardBaseService {

    constructor(
        @InjectRepository(PriceProductCardBase) private priceProductCardBaseRepository: Repository<PriceProductCardBase>,
    ) { }


    async getPriceProductCardBaseById(priceProductCardBaseId: string) {
        let priceProductCardBase = await this.priceProductCardBaseRepository.findOne({
            where: {
                priceProductCardBaseId: priceProductCardBaseId,
            }
        });
        
        //TO DO: CREATE AN ERROR TO RETURN;
        if(priceProductCardBase == null) {
            return null;
        }

        let priceProductCardBaseDTO: PriceProductCardBaseDTO = ({ ...priceProductCardBase})

        priceProductCardBaseDTO.priceProductCardBaseUpdateDate = priceProductCardBase.priceProductCardBaseUpdateDate;

        return priceProductCardBaseDTO;
    }

    async getPriceProductCardBaseByCommerceAccountId(commerceAccountId: string, productVendorId: string, productLineId: string, productTypeId: string) {
        let priceProductCardBase = await this.priceProductCardBaseRepository.findOne({
            where: {
                commerceAccountId: commerceAccountId,
                productVendorId: productVendorId,
                productLineId: productLineId,
                productTypeId: productTypeId
            }
        });
        
        //TO DO: CREATE AN ERROR TO RETURN;
        if(priceProductCardBase == null) {
            return null;
        }

        let priceProductCardBaseDTO: PriceProductCardBaseDTO = ({ ...priceProductCardBase})

        priceProductCardBaseDTO.priceProductCardBaseUpdateDate = priceProductCardBase.priceProductCardBaseUpdateDate;

        return priceProductCardBaseDTO;
    }



    async createPriceProductCardBase(createPriceProductCardBaseDTO: CreatePriceProductCardBaseDTO) {
        
        let newPriceProductCardBase = this.priceProductCardBaseRepository.create({ ...createPriceProductCardBaseDTO });
        newPriceProductCardBase = await this.priceProductCardBaseRepository.save(newPriceProductCardBase);

        let priceProductCardBaseDTO = this.getPriceProductCardBaseById(newPriceProductCardBase.priceProductCardBaseId);

        return priceProductCardBaseDTO;
    }   

    async updatePriceProductCardBase(updatePriceProductCardBaseDTO: UpdatePriceProductCardBaseDTO) {
    
        //CHECK TO SEE IF THE PRODUCT CARD BASE ALREADY EXISTS;
        let priceProductCardBase = await this.priceProductCardBaseRepository.findOne({
            where: {
                priceProductCardBaseId: updatePriceProductCardBaseDTO.priceProductCardBaseId
            }
        });
        
        //TO DO: RETURN AN ERROR FOR DUPLICATE PRICING PRODUCT CARD;
        if (priceProductCardBase == null) {
            return null;
        }

        priceProductCardBase.priceProductCardBaseId = updatePriceProductCardBaseDTO.priceProductCardBaseId;
        priceProductCardBase.priceProductCardBaseOption = updatePriceProductCardBaseDTO.priceProductCardBaseOption;
        priceProductCardBase.priceProductCardBaseUpdateDate = new Date();

        priceProductCardBase = await this.priceProductCardBaseRepository.save(priceProductCardBase);
        let priceProductCardBaseDTO = this.getPriceProductCardBaseById(priceProductCardBase.priceProductCardBaseId);

        return priceProductCardBaseDTO;

    }   
}