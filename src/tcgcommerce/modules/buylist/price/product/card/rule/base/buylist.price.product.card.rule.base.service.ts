import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BuylistPriceProductCardRuleBaseDTO, CreateBuylistPriceProductCardRuleBaseDTO, UpdateBuylistPriceProductCardRuleBaseDTO} from './dto/buylist.price.product.card.rule.base.dto';
import { BuylistPriceProductCardRuleBase } from 'src/typeorm/entities/tcgcommerce/modules/buylist/price/product/card/rule/base/buylist.price.product.card.rule.base.entity';

@Injectable()
export class BuylistPriceProductCardRuleBaseService {

    constructor(
        @InjectRepository(BuylistPriceProductCardRuleBase) private buylistPriceProductCardRuleBaseRepository: Repository<BuylistPriceProductCardRuleBase>,
    ) { }


    async getBuylistPriceProductCardRuleBaseById(buylistPriceProductCardRuleBaseId: string): Promise<BuylistPriceProductCardRuleBaseDTO> {
        let buylistPriceProductCardRuleBase = await this.buylistPriceProductCardRuleBaseRepository.findOneOrFail({
            where: {
                buylistPriceProductCardRuleBaseId: buylistPriceProductCardRuleBaseId,
            }
        });
       
        let buylistPriceProductCardRuleBaseDTO: BuylistPriceProductCardRuleBaseDTO = ({ ...buylistPriceProductCardRuleBase})

        return buylistPriceProductCardRuleBaseDTO;
    }

    async getBuylistPriceProductCardRuleBaseByCommerceAccountId(commerceAccountId: string, productVendorId: string, productLineId: string, productTypeId: string): Promise<BuylistPriceProductCardRuleBaseDTO> {
        let buylistPriceProductCardRuleBase = await this.buylistPriceProductCardRuleBaseRepository.findOneOrFail({
            where: {
                commerceAccountId: commerceAccountId,
                productVendorId: productVendorId,
                productLineId: productLineId,
                productTypeId: productTypeId
            }
        });
        
        let buylistPriceProductCardRuleBaseDTO: BuylistPriceProductCardRuleBaseDTO = ({ ...buylistPriceProductCardRuleBase})

        return buylistPriceProductCardRuleBaseDTO;
    }
    
    async createBuylistPriceProductCardRuleBase(createBuylistPriceProductCardRuleBaseDTO: CreateBuylistPriceProductCardRuleBaseDTO): Promise<BuylistPriceProductCardRuleBaseDTO> {
        
        //CHECK TO SEE IF THE PRODUCT CARD BASE ALREADY EXISTS;
        let buylistPriceProductCardRuleBase = await this.buylistPriceProductCardRuleBaseRepository.findOne({
            where: {
                commerceAccountId: createBuylistPriceProductCardRuleBaseDTO.commerceAccountId,
                productVendorId: createBuylistPriceProductCardRuleBaseDTO.productVendorId,
                productLineId: createBuylistPriceProductCardRuleBaseDTO.productLineId,
                productTypeId: createBuylistPriceProductCardRuleBaseDTO.productTypeId
            }
        });
        
        if (buylistPriceProductCardRuleBase) {
            throw new ConflictException('Buylist price product card rule base already exists');
        }

        buylistPriceProductCardRuleBase = this.buylistPriceProductCardRuleBaseRepository.create({ ...createBuylistPriceProductCardRuleBaseDTO });
        buylistPriceProductCardRuleBase = await this.buylistPriceProductCardRuleBaseRepository.save(buylistPriceProductCardRuleBase);

        let buylistPriceProductCardRuleBaseDTO = await this.getBuylistPriceProductCardRuleBaseById(buylistPriceProductCardRuleBase.buylistPriceProductCardRuleBaseId);

        return buylistPriceProductCardRuleBaseDTO;
    }   

    async updateBuylistPriceProductCardRuleBase(updateBuylistPriceProductCardRuleBaseDTO: UpdateBuylistPriceProductCardRuleBaseDTO): Promise<BuylistPriceProductCardRuleBaseDTO> {

        //CHECK TO SEE IF THE PRODUCT CARD BASE ALREADY EXISTS;
        let buylistPriceProductCardRuleBase = await this.buylistPriceProductCardRuleBaseRepository.findOneOrFail({
            where: {
                buylistPriceProductCardRuleBaseId: updateBuylistPriceProductCardRuleBaseDTO.buylistPriceProductCardRuleBaseId
            }
        });
        
        buylistPriceProductCardRuleBase.buylistPriceProductCardRuleBaseOption = updateBuylistPriceProductCardRuleBaseDTO.buylistPriceProductCardRuleBaseOption;
        buylistPriceProductCardRuleBase.buylistPriceProductCardRuleBaseCashPercentage = updateBuylistPriceProductCardRuleBaseDTO.buylistPriceProductCardRuleBaseCashPercentage;
        buylistPriceProductCardRuleBase.buylistPriceProductCardRuleBaseCreditPercentage = updateBuylistPriceProductCardRuleBaseDTO.buylistPriceProductCardRuleBaseCreditPercentage;
        buylistPriceProductCardRuleBase.buylistPriceProductCardRuleBaseNMPercentage = updateBuylistPriceProductCardRuleBaseDTO.buylistPriceProductCardRuleBaseNMPercentage;
        buylistPriceProductCardRuleBase.buylistPriceProductCardRuleBaseLPPercentage = updateBuylistPriceProductCardRuleBaseDTO.buylistPriceProductCardRuleBaseLPPercentage;
        buylistPriceProductCardRuleBase.buylistPriceProductCardRuleBaseMPPercentage = updateBuylistPriceProductCardRuleBaseDTO.buylistPriceProductCardRuleBaseMPPercentage;
        buylistPriceProductCardRuleBase.buylistPriceProductCardRuleBaseHPPercentage = updateBuylistPriceProductCardRuleBaseDTO.buylistPriceProductCardRuleBaseHPPercentage;
        buylistPriceProductCardRuleBase.buylistPriceProductCardRuleBaseDMPercentage = updateBuylistPriceProductCardRuleBaseDTO.buylistPriceProductCardRuleBaseDMPercentage;
        buylistPriceProductCardRuleBase.buylistPriceProductCardRuleBaseUpdateDate = new Date();

        await this.buylistPriceProductCardRuleBaseRepository.save(buylistPriceProductCardRuleBase);
        
        let buylistPriceProductCardRuleBaseDTO = await this.getBuylistPriceProductCardRuleBaseById(buylistPriceProductCardRuleBase.buylistPriceProductCardRuleBaseId);
        
        return buylistPriceProductCardRuleBaseDTO;

    }   
}