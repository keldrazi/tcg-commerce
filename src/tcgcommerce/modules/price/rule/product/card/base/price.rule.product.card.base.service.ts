import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PriceRuleProductCardBaseDTO, CreatePriceRuleProductCardBaseDTO, UpdatePriceRuleProductCardBaseDTO} from './dto/price.rule.product.card.base.dto';
import { PriceRuleProductCardBase } from 'src/typeorm/entities/tcgcommerce/modules/price/rule/product/card/base/price.rule.product.card.base.entity';

@Injectable()
export class PriceRuleProductCardBaseService {

    constructor(
        @InjectRepository(PriceRuleProductCardBase) private priceRuleProductCardBaseRepository: Repository<PriceRuleProductCardBase>
    ) { }


    async getPriceRuleProductCardBaseById(priceRuleProductCardBaseId: string): Promise<PriceRuleProductCardBaseDTO> {
        let priceRuleProductCardBase = await this.priceRuleProductCardBaseRepository.findOneOrFail({
            where: {
                priceRuleProductCardBaseId: priceRuleProductCardBaseId,
            }
        });
        
        let priceRuleProductCardBaseDTO: PriceRuleProductCardBaseDTO = ({ ...priceRuleProductCardBase})

        return priceRuleProductCardBaseDTO;
    }

    async getPriceRuleProductCardBaseByCommerceAccountId(commerceAccountId: string, productVendorId: string, productLineId: string, productTypeId: string): Promise<PriceRuleProductCardBaseDTO> {
        let priceRuleProductCardBase = await this.priceRuleProductCardBaseRepository.findOneOrFail({
            where: {
                commerceAccountId: commerceAccountId,
                productVendorId: productVendorId,
                productLineId: productLineId,
                productTypeId: productTypeId
            }
        });
        
        let priceRuleProductCardBaseDTO: PriceRuleProductCardBaseDTO = ({ ...priceRuleProductCardBase})

        return priceRuleProductCardBaseDTO;
    }



    async createPriceRuleProductCardBase(createPriceRuleProductCardBaseDTO: CreatePriceRuleProductCardBaseDTO): Promise<PriceRuleProductCardBaseDTO> {
        
        //CHECK TO SEE IF THE PRODUCT CARD BASE ALREADY EXISTS;
        let priceRuleProductCardBase = await this.priceRuleProductCardBaseRepository.findOne({
            where: {
                commerceAccountId: createPriceRuleProductCardBaseDTO.commerceAccountId,
                productVendorId: createPriceRuleProductCardBaseDTO.productVendorId,
                productLineId: createPriceRuleProductCardBaseDTO.productLineId,
                productTypeId: createPriceRuleProductCardBaseDTO.productTypeId
            }
        });

        if (priceRuleProductCardBase != null) {
            throw new ConflictException('Price rule product card base already exists for this commerce account and product');
        }

        priceRuleProductCardBase = this.priceRuleProductCardBaseRepository.create({ ...createPriceRuleProductCardBaseDTO });
        priceRuleProductCardBase = await this.priceRuleProductCardBaseRepository.save(priceRuleProductCardBase);

        let priceRuleProductCardBaseDTO = await this.getPriceRuleProductCardBaseById(priceRuleProductCardBase.priceRuleProductCardBaseId);

        return priceRuleProductCardBaseDTO;
    }   

    async updatePriceRuleProductCardBase(updatePriceRuleProductCardBaseDTO: UpdatePriceRuleProductCardBaseDTO): Promise<PriceRuleProductCardBaseDTO> {

        //CHECK TO SEE IF THE PRODUCT CARD BASE ALREADY EXISTS;
        let priceRuleProductCardBase = await this.priceRuleProductCardBaseRepository.findOneOrFail({
            where: {
                priceRuleProductCardBaseId: updatePriceRuleProductCardBaseDTO.priceRuleProductCardBaseId
            }
        });
        
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