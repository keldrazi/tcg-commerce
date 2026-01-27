import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PriceRuleProductCardUpdateDailyDTO, CreatePriceRuleProductCardUpdateDailyDTO, UpdatePriceRuleProductCardUpdateDailyDTO} from './dto/price.rule.product.card.update.daily.dto';
import { PriceRuleProductCardUpdateDaily } from 'src/typeorm/entities/tcgcommerce/modules/price/rule/product/card/update/daily/price.rule.product.card.update.daily.entity';

@Injectable()
export class PriceRuleProductCardUpdateDailyService {

    constructor(
        @InjectRepository(PriceRuleProductCardUpdateDaily) private priceRuleProductCardUpdateDailyRepository: Repository<PriceRuleProductCardUpdateDaily>
    ) { }


    async getPriceRuleProductCardUpdateDailyById(priceRuleProductCardUpdateDailyId: string): Promise<PriceRuleProductCardUpdateDailyDTO> {
        let priceRuleProductCardUpdateDaily = await this.priceRuleProductCardUpdateDailyRepository.findOne({
            where: {
                priceRuleProductCardUpdateDailyId: priceRuleProductCardUpdateDailyId,
            }
        });
        
        if(priceRuleProductCardUpdateDaily == null) {
            throw new NotFoundException('Price rule product card update daily was not found');
        }

        let priceRuleProductCardUpdateDailyDTO: PriceRuleProductCardUpdateDailyDTO = ({ ...priceRuleProductCardUpdateDaily});
        priceRuleProductCardUpdateDailyDTO.priceRuleProductCardUpdateDailyCommerceLocationIds = JSON.parse(priceRuleProductCardUpdateDaily.priceRuleProductCardUpdateDailyCommerceLocationIds);

        return priceRuleProductCardUpdateDailyDTO;
    }

    async getPriceRuleProductCardUpdateDailyByCommerceAccountId(commerceAccountId: string): Promise<PriceRuleProductCardUpdateDailyDTO[]> {
        let priceRuleProductCardUpdateDaily = await this.priceRuleProductCardUpdateDailyRepository.find({
            where: {
                commerceAccountId: commerceAccountId
            }
        });
        
        if(priceRuleProductCardUpdateDaily == null) {
            [];
        }

        let priceRuleProductCardUpdateDailyDTOs: PriceRuleProductCardUpdateDailyDTO[] = [];
        
        for(let i=0; i < priceRuleProductCardUpdateDaily.length; i++) {
            let priceRuleProductCardUpdateDailyDTO: PriceRuleProductCardUpdateDailyDTO = ({ ...priceRuleProductCardUpdateDaily[i]})
            priceRuleProductCardUpdateDailyDTO.priceRuleProductCardUpdateDailyCommerceLocationIds = JSON.parse(priceRuleProductCardUpdateDaily[i].priceRuleProductCardUpdateDailyCommerceLocationIds);
            priceRuleProductCardUpdateDailyDTOs.push(priceRuleProductCardUpdateDailyDTO);
        }

        return priceRuleProductCardUpdateDailyDTOs;
    }

    async getPriceRuleProductCardUpdateDailyByCommerceAccountIdAndVendorId(commerceAccountId: string, productVendorId: string, productLineId: string, productTypeId: string): Promise<PriceRuleProductCardUpdateDailyDTO> {
        let priceRuleProductCardUpdateDaily = await this.priceRuleProductCardUpdateDailyRepository.findOne({
            where: {
                commerceAccountId: commerceAccountId,
                productVendorId: productVendorId,
                productLineId: productLineId,
                productTypeId: productTypeId
            }
        });
        
        if(priceRuleProductCardUpdateDaily == null) {
            throw new NotFoundException('Price rule product card update daily was not found');
        }

        let priceRuleProductCardUpdateDailyDTO: PriceRuleProductCardUpdateDailyDTO = ({ ...priceRuleProductCardUpdateDaily})
        priceRuleProductCardUpdateDailyDTO.priceRuleProductCardUpdateDailyCommerceLocationIds = JSON.parse(priceRuleProductCardUpdateDaily.priceRuleProductCardUpdateDailyCommerceLocationIds);

        return priceRuleProductCardUpdateDailyDTO;
    }

    async createPriceRuleProductCardUpdateDaily(createPriceRuleProductCardUpdateDailyDTO: CreatePriceRuleProductCardUpdateDailyDTO): Promise<PriceRuleProductCardUpdateDailyDTO> {
        
        let priceRuleProductCardUpdateDaily = await this.priceRuleProductCardUpdateDailyRepository.findOne({
            where: {
                commerceAccountId: createPriceRuleProductCardUpdateDailyDTO.commerceAccountId,
                productVendorId: createPriceRuleProductCardUpdateDailyDTO.productVendorId,
                productLineId: createPriceRuleProductCardUpdateDailyDTO.productLineId,
                productTypeId: createPriceRuleProductCardUpdateDailyDTO.productTypeId
            }
        });
        
        if (priceRuleProductCardUpdateDaily != null) {
            throw new ConflictException('Price rule product card update daily already exists for this commerce account and product');
        }

        priceRuleProductCardUpdateDaily = this.priceRuleProductCardUpdateDailyRepository.create({ ...createPriceRuleProductCardUpdateDailyDTO });
        priceRuleProductCardUpdateDaily = await this.priceRuleProductCardUpdateDailyRepository.save(priceRuleProductCardUpdateDaily);

        let priceRuleProductCardUpdateDailyDTO = await this.getPriceRuleProductCardUpdateDailyById(priceRuleProductCardUpdateDaily.priceRuleProductCardUpdateDailyId);

        return priceRuleProductCardUpdateDailyDTO;
    }   

    async updatePriceRuleProductCardUpdateDaily(updatePriceRuleProductCardUpdateDailyDTO: UpdatePriceRuleProductCardUpdateDailyDTO): Promise<PriceRuleProductCardUpdateDailyDTO> {

        let priceRuleProductCardUpdateDaily = await this.priceRuleProductCardUpdateDailyRepository.findOne({
            where: {
                priceRuleProductCardUpdateDailyId: updatePriceRuleProductCardUpdateDailyDTO.priceRuleProductCardUpdateDailyId,
            }
        });

        if(priceRuleProductCardUpdateDaily == null) {
            throw new NotFoundException('Price rule product card update daily was not found');
        }

        priceRuleProductCardUpdateDaily.priceRuleProductCardUpdateDailyCommerceLocationIds = updatePriceRuleProductCardUpdateDailyDTO.priceRuleProductCardUpdateDailyCommerceLocationIds;
        priceRuleProductCardUpdateDaily.priceRuleProductCardUpdateDailyUpdateDate = new Date();

        priceRuleProductCardUpdateDaily = await this.priceRuleProductCardUpdateDailyRepository.save(priceRuleProductCardUpdateDaily);
        
        let priceRuleProductCardUpdateDailyDTO = await this.getPriceRuleProductCardUpdateDailyById(priceRuleProductCardUpdateDaily.priceRuleProductCardUpdateDailyId);
        
        return priceRuleProductCardUpdateDailyDTO;

    }   
}