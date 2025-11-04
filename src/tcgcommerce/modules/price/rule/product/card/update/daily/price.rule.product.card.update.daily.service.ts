import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PriceRuleProductCardUpdateDailyDTO, CreatePriceRuleProductCardUpdateDailyDTO, UpdatePriceRuleProductCardUpdateDailyDTO} from './dto/price.rule.product.card.update.daily.dto';
import { PriceRuleProductCardUpdateDaily } from 'src/typeorm/entities/tcgcommerce/modules/price/rule/product/card/update/daily/price.rule.product.card.update.daily.entity';

@Injectable()
export class PriceRuleProductCardUpdateDailyService {

    constructor(
        @InjectRepository(PriceRuleProductCardUpdateDaily) private priceRuleProductCardUpdateDailyRepository: Repository<PriceRuleProductCardUpdateDaily>,
    ) { }


    async getPriceRuleProductCardUpdateDailyById(priceRuleProductCardUpdateDailyId: string) {
        let priceRuleProductCardUpdateDaily = await this.priceRuleProductCardUpdateDailyRepository.findOne({
            where: {
                priceRuleProductCardUpdateDailyId: priceRuleProductCardUpdateDailyId,
            }
        });
        
        //TO DO: CREATE AN ERROR TO RETURN;
        if(priceRuleProductCardUpdateDaily == null) {
            return null;
        }

        let priceRuleProductCardUpdateDailyDTO: PriceRuleProductCardUpdateDailyDTO = ({ ...priceRuleProductCardUpdateDaily});
        priceRuleProductCardUpdateDailyDTO.priceRuleProductCardUpdateDailyCommerceLocationIds = JSON.parse(priceRuleProductCardUpdateDaily.priceRuleProductCardUpdateDailyCommerceLocationIds);

        return priceRuleProductCardUpdateDailyDTO;
    }

    async getPriceRuleProductCardUpdateDailyByCommerceAccountId(commerceAccountId: string) {
        let priceRuleProductCardUpdateDaily = await this.priceRuleProductCardUpdateDailyRepository.find({
            where: {
                commerceAccountId: commerceAccountId
            }
        });
        
        //TO DO: CREATE AN ERROR TO RETURN;
        if(priceRuleProductCardUpdateDaily == null) {
            return null;
        }

        let priceRuleProductCardUpdateDailyDTOs: PriceRuleProductCardUpdateDailyDTO[] = [];
        for(let i=0; i < priceRuleProductCardUpdateDaily.length; i++) {
            let priceRuleProductCardUpdateDailyDTO: PriceRuleProductCardUpdateDailyDTO = ({ ...priceRuleProductCardUpdateDaily[i]})
            priceRuleProductCardUpdateDailyDTO.priceRuleProductCardUpdateDailyCommerceLocationIds = JSON.parse(priceRuleProductCardUpdateDaily[i].priceRuleProductCardUpdateDailyCommerceLocationIds);
            priceRuleProductCardUpdateDailyDTOs.push(priceRuleProductCardUpdateDailyDTO);
        }

        return priceRuleProductCardUpdateDailyDTOs;
    }

    async getPriceRuleProductCardUpdateDailyByCommerceAccountIdAndVendorId(commerceAccountId: string, productVendorId: string, productLineId: string, productTypeId: string) {
        let priceRuleProductCardUpdateDaily = await this.priceRuleProductCardUpdateDailyRepository.findOne({
            where: {
                commerceAccountId: commerceAccountId,
                productVendorId: productVendorId,
                productLineId: productLineId,
                productTypeId: productTypeId
            }
        });
        
        //TO DO: CREATE AN ERROR TO RETURN;
        if(priceRuleProductCardUpdateDaily == null) {
            return null;
        }

        let priceRuleProductCardUpdateDailyDTO: PriceRuleProductCardUpdateDailyDTO = ({ ...priceRuleProductCardUpdateDaily})
        priceRuleProductCardUpdateDailyDTO.priceRuleProductCardUpdateDailyCommerceLocationIds = JSON.parse(priceRuleProductCardUpdateDaily.priceRuleProductCardUpdateDailyCommerceLocationIds);

        return priceRuleProductCardUpdateDailyDTO;
    }

    async createPriceRuleProductCardUpdateDaily(createPriceRuleProductCardUpdateDailyDTO: CreatePriceRuleProductCardUpdateDailyDTO) {
        
        //CHECK TO SEE IF THE PRODUCT CARD BASE ALREADY EXISTS;
        let priceRuleProductCardUpdateDaily = await this.getPriceRuleProductCardUpdateDailyByCommerceAccountIdAndVendorId(createPriceRuleProductCardUpdateDailyDTO.commerceAccountId, createPriceRuleProductCardUpdateDailyDTO.productVendorId, createPriceRuleProductCardUpdateDailyDTO.productLineId, createPriceRuleProductCardUpdateDailyDTO.productTypeId);
        
        //TO DO: RETURN AN ERROR FOR DUPLICATE PRICING PRODUCT CARD;
        if (priceRuleProductCardUpdateDaily != null) {
            console.log('Price Rule Product Card Base already exists for the Commerce Account / Vendor / Line / Type combination.');
            return null;
        }

        let newPriceRuleProductCardUpdateDaily = this.priceRuleProductCardUpdateDailyRepository.create({ ...createPriceRuleProductCardUpdateDailyDTO });
        newPriceRuleProductCardUpdateDaily = await this.priceRuleProductCardUpdateDailyRepository.save(newPriceRuleProductCardUpdateDaily);

        let priceRuleProductCardUpdateDailyDTO = await this.getPriceRuleProductCardUpdateDailyById(newPriceRuleProductCardUpdateDaily.priceRuleProductCardUpdateDailyId);

        return priceRuleProductCardUpdateDailyDTO;
    }   

    async updatePriceRuleProductCardUpdateDaily(updatePriceRuleProductCardUpdateDailyDTO: UpdatePriceRuleProductCardUpdateDailyDTO) {

        //CHECK TO SEE IF THE PRODUCT CARD BASE ALREADY EXISTS;
        let priceRuleProductCardUpdateDaily = await this.getPriceRuleProductCardUpdateDailyById(updatePriceRuleProductCardUpdateDailyDTO.priceRuleProductCardUpdateDailyId);
        
        //TO DO: RETURN AN ERROR FOR DUPLICATE PRICING PRODUCT CARD;
        if (priceRuleProductCardUpdateDaily == null) {
            return null;
        }

        priceRuleProductCardUpdateDaily.priceRuleProductCardUpdateDailyCommerceLocationIds = updatePriceRuleProductCardUpdateDailyDTO.priceRuleProductCardUpdateDailyCommerceLocationIds;
        priceRuleProductCardUpdateDaily.priceRuleProductCardUpdateDailyUpdateDate = new Date();

        priceRuleProductCardUpdateDaily = await this.priceRuleProductCardUpdateDailyRepository.save(priceRuleProductCardUpdateDaily);
        
        let priceRuleProductCardUpdateDailyDTO = await this.getPriceRuleProductCardUpdateDailyById(priceRuleProductCardUpdateDaily.priceRuleProductCardUpdateDailyId);
        
        return priceRuleProductCardUpdateDailyDTO;

    }   
}