import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PriceRuleProductCardBaseDTO, CreatePriceRuleProductCardBaseDTO, UpdatePriceRuleProductCardBaseDTO} from './dto/price.rule.product.card.base.dto';
import { PriceRuleProductCardBase } from 'src/typeorm/entities/tcgcommerce/modules/price/rule/product/card/base/price.rule.product.card.base.entity';

@Injectable()
export class PriceRuleProductCardBaseService {

    constructor(
        @InjectRepository(PriceRuleProductCardBase) private priceRuleProductCardBaseRepository: Repository<PriceRuleProductCardBase>,
    ) { }


    async getPriceRuleProductCardBaseById(priceRuleProductCardBaseId: string) {
        let priceRuleProductCardBase = await this.priceRuleProductCardBaseRepository.findOne({
            where: {
                priceRuleProductCardBaseId: priceRuleProductCardBaseId,
            }
        });
        
        //TO DO: CREATE AN ERROR TO RETURN;
        if(priceRuleProductCardBase == null) {
            return null;
        }

        let priceRuleProductCardBaseDTO: PriceRuleProductCardBaseDTO = ({ ...priceRuleProductCardBase})

        return priceRuleProductCardBaseDTO;
    }

    async getPriceRuleProductCardBaseByCommerceAccountId(commerceAccountId: string, productVendorId: string, productLineId: string, productTypeId: string) {
        let priceRuleProductCardBase = await this.priceRuleProductCardBaseRepository.findOne({
            where: {
                commerceAccountId: commerceAccountId,
                productVendorId: productVendorId,
                productLineId: productLineId,
                productTypeId: productTypeId
            }
        });
        
        //TO DO: CREATE AN ERROR TO RETURN;
        if(priceRuleProductCardBase == null) {
            return null;
        }

        let priceRuleProductCardBaseDTO: PriceRuleProductCardBaseDTO = ({ ...priceRuleProductCardBase})

        return priceRuleProductCardBaseDTO;
    }



    async createPriceRuleProductCardBase(createPriceRuleProductCardBaseDTO: CreatePriceRuleProductCardBaseDTO) {
        
        //CHECK TO SEE IF THE PRODUCT CARD BASE ALREADY EXISTS;
        let priceRuleProductCardBase = await this.getPriceRuleProductCardBaseByCommerceAccountId(createPriceRuleProductCardBaseDTO.commerceAccountId, createPriceRuleProductCardBaseDTO.productVendorId, createPriceRuleProductCardBaseDTO.productLineId, createPriceRuleProductCardBaseDTO.productTypeId);
        
        //TO DO: RETURN AN ERROR FOR DUPLICATE PRICING PRODUCT CARD;
        if (priceRuleProductCardBase != null) {
            console.log('Price Rule Product Card Base already exists for the Commerce Account / Vendor / Line / Type combination.');
            return null;
        }

        let newPriceRuleProductCardBase = this.priceRuleProductCardBaseRepository.create({ ...createPriceRuleProductCardBaseDTO });
        newPriceRuleProductCardBase = await this.priceRuleProductCardBaseRepository.save(newPriceRuleProductCardBase);

        let priceRuleProductCardBaseDTO = await this.getPriceRuleProductCardBaseById(newPriceRuleProductCardBase.priceRuleProductCardBaseId);

        return priceRuleProductCardBaseDTO;
    }   

    async updatePriceRuleProductCardBase(updatePriceRuleProductCardBaseDTO: UpdatePriceRuleProductCardBaseDTO) {

        //CHECK TO SEE IF THE PRODUCT CARD BASE ALREADY EXISTS;
        let priceRuleProductCardBase = await this.priceRuleProductCardBaseRepository.findOne({
            where: {
                priceRuleProductCardBaseId: updatePriceRuleProductCardBaseDTO.priceRuleProductCardBaseId
            }
        });
        
        //TO DO: RETURN AN ERROR FOR DUPLICATE PRICING PRODUCT CARD;
        if (priceRuleProductCardBase == null) {
            return null;
        }

        priceRuleProductCardBase.priceRuleProductCardBaseId = updatePriceRuleProductCardBaseDTO.priceRuleProductCardBaseId;
        priceRuleProductCardBase.priceRuleProductCardBaseOption = updatePriceRuleProductCardBaseDTO.priceRuleProductCardBaseOption;
        priceRuleProductCardBase.priceRuleProductCardBaseNMPercentage = updatePriceRuleProductCardBaseDTO.priceRuleProductCardBaseNMPercentage;
        priceRuleProductCardBase.priceRuleProductCardBaseLPPercentage = updatePriceRuleProductCardBaseDTO.priceRuleProductCardBaseLPPercentage;
        priceRuleProductCardBase.priceRuleProductCardBaseMPPercentage = updatePriceRuleProductCardBaseDTO.priceRuleProductCardBaseMPPercentage;
        priceRuleProductCardBase.priceRuleProductCardBaseHPPercentage = updatePriceRuleProductCardBaseDTO.priceRuleProductCardBaseHPPercentage;
        priceRuleProductCardBase.priceRuleProductCardBaseDMPercentage = updatePriceRuleProductCardBaseDTO.priceRuleProductCardBaseDMPercentage;
        priceRuleProductCardBase.priceRuleProductCardBaseUpdateDate = new Date();

        priceRuleProductCardBase = await this.priceRuleProductCardBaseRepository.save(priceRuleProductCardBase);
        
        let priceRuleProductCardBaseDTO = await this.getPriceRuleProductCardBaseById(priceRuleProductCardBase.priceRuleProductCardBaseId);
        
        return priceRuleProductCardBaseDTO;

    }   
}