import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BuylistPriceProductCardRuleHotlistDTO, CreateBuylistPriceProductCardRuleHotlistDTO, UpdateBuylistPriceProductCardRuleHotlistDTO} from './dto/buylist.price.product.card.rule.hotlist.dto';
import { BuylistPriceProductCardRuleHotlist } from 'src/typeorm/entities/tcgcommerce/modules/buylist/price/product/card/rule/hotlist/buylist.price.product.card.rule.hotlist.entity';

@Injectable()
export class BuylistPriceProductCardRuleHotlistService {

    constructor(
        @InjectRepository(BuylistPriceProductCardRuleHotlist) private buylistPriceProductCardRuleHotlistRepository: Repository<BuylistPriceProductCardRuleHotlist>,
    ) { }


    async getBuylistPriceProductCardRuleHotlistById(buylistPriceProductCardRuleHotlistId: string): Promise<BuylistPriceProductCardRuleHotlistDTO> {
        let buylistPriceProductCardRuleHotlist = await this.buylistPriceProductCardRuleHotlistRepository.findOne({
            where: {
                buylistPriceProductCardRuleHotlistId: buylistPriceProductCardRuleHotlistId,
            }
        });
        
        if(buylistPriceProductCardRuleHotlist == null) {
            throw new NotFoundException('Buylist price product card rule hotlist was not found');
        }

        let buylistPriceProductCardRuleHotlistDTO: BuylistPriceProductCardRuleHotlistDTO = ({ ...buylistPriceProductCardRuleHotlist})

        return buylistPriceProductCardRuleHotlistDTO;
    }

    async getBuylistPriceProductCardRuleHotlistByCommerceAccountId(commerceAccountId: string, productVendorId: string, productLineId: string, productTypeId: string): Promise<BuylistPriceProductCardRuleHotlistDTO> {
        let buylistPriceProductCardRuleHotlist = await this.buylistPriceProductCardRuleHotlistRepository.findOne({
            where: {
                commerceAccountId: commerceAccountId,
                productVendorId: productVendorId,
                productLineId: productLineId,
                productTypeId: productTypeId
            }
        });
        
        if(buylistPriceProductCardRuleHotlist == null) {
            throw new NotFoundException('Buylist price product card rule hotlist was not found');
        }

        let buylistPriceProductCardRuleHotlistDTO: BuylistPriceProductCardRuleHotlistDTO = ({ ...buylistPriceProductCardRuleHotlist})

        return buylistPriceProductCardRuleHotlistDTO;
    }



    async createBuylistPriceProductCardRuleHotlist(createBuylistPriceProductCardRuleHotlistDTO: CreateBuylistPriceProductCardRuleHotlistDTO): Promise<BuylistPriceProductCardRuleHotlistDTO> {
        
        //CHECK TO SEE IF THE PRODUCT CARD BASE ALREADY EXISTS;
        let buylistPriceProductCardRuleHotlist = await this.buylistPriceProductCardRuleHotlistRepository.findOne({
            where: {
                commerceAccountId: createBuylistPriceProductCardRuleHotlistDTO.commerceAccountId,
                productVendorId: createBuylistPriceProductCardRuleHotlistDTO.productVendorId,
                productLineId: createBuylistPriceProductCardRuleHotlistDTO.productLineId,
                productTypeId: createBuylistPriceProductCardRuleHotlistDTO.productTypeId
            }
        });
        
        if (buylistPriceProductCardRuleHotlist != null) {
           throw new ConflictException('Buylist price product card rule hotlist already exists');
        }

        let newBuylistPriceProductCardRuleHotlist = this.buylistPriceProductCardRuleHotlistRepository.create({ ...createBuylistPriceProductCardRuleHotlistDTO });
        newBuylistPriceProductCardRuleHotlist = await this.buylistPriceProductCardRuleHotlistRepository.save(newBuylistPriceProductCardRuleHotlist);

        let buylistPriceProductCardRuleHotlistDTO = await this.getBuylistPriceProductCardRuleHotlistById(newBuylistPriceProductCardRuleHotlist.buylistPriceProductCardRuleHotlistId);

        return buylistPriceProductCardRuleHotlistDTO;
    }   

    async updateBuylistPriceProductCardRuleHotlist(updateBuylistPriceProductCardRuleHotlistDTO: UpdateBuylistPriceProductCardRuleHotlistDTO): Promise<BuylistPriceProductCardRuleHotlistDTO> {

        //CHECK TO SEE IF THE PRODUCT CARD BASE ALREADY EXISTS;
        let buylistPriceProductCardRuleHotlist = await this.buylistPriceProductCardRuleHotlistRepository.findOne({
            where: {
                buylistPriceProductCardRuleHotlistId: updateBuylistPriceProductCardRuleHotlistDTO.buylistPriceProductCardRuleHotlistId
            }
        });
        
        if (buylistPriceProductCardRuleHotlist == null) {
            throw new NotFoundException('Buylist price product card rule hotlist was not found');
        }

        buylistPriceProductCardRuleHotlist.buylistPriceProductCardRuleHotlistId = updateBuylistPriceProductCardRuleHotlistDTO.buylistPriceProductCardRuleHotlistId;
        buylistPriceProductCardRuleHotlist.buylistPriceProductCardRuleHotlistOption = updateBuylistPriceProductCardRuleHotlistDTO.buylistPriceProductCardRuleHotlistOption;
        buylistPriceProductCardRuleHotlist.buylistPriceProductCardRuleHotlistCashPercentage = updateBuylistPriceProductCardRuleHotlistDTO.buylistPriceProductCardRuleHotlistCashPercentage;
        buylistPriceProductCardRuleHotlist.buylistPriceProductCardRuleHotlistCreditPercentage = updateBuylistPriceProductCardRuleHotlistDTO.buylistPriceProductCardRuleHotlistCreditPercentage;
        buylistPriceProductCardRuleHotlist.buylistPriceProductCardRuleHotlistNMPercentage = updateBuylistPriceProductCardRuleHotlistDTO.buylistPriceProductCardRuleHotlistNMPercentage;
        buylistPriceProductCardRuleHotlist.buylistPriceProductCardRuleHotlistLPPercentage = updateBuylistPriceProductCardRuleHotlistDTO.buylistPriceProductCardRuleHotlistLPPercentage;
        buylistPriceProductCardRuleHotlist.buylistPriceProductCardRuleHotlistMPPercentage = updateBuylistPriceProductCardRuleHotlistDTO.buylistPriceProductCardRuleHotlistMPPercentage;
        buylistPriceProductCardRuleHotlist.buylistPriceProductCardRuleHotlistHPPercentage = updateBuylistPriceProductCardRuleHotlistDTO.buylistPriceProductCardRuleHotlistHPPercentage;
        buylistPriceProductCardRuleHotlist.buylistPriceProductCardRuleHotlistDMPercentage = updateBuylistPriceProductCardRuleHotlistDTO.buylistPriceProductCardRuleHotlistDMPercentage;
        buylistPriceProductCardRuleHotlist.buylistPriceProductCardRuleHotlistUpdateDate = new Date();

        buylistPriceProductCardRuleHotlist = await this.buylistPriceProductCardRuleHotlistRepository.save(buylistPriceProductCardRuleHotlist);
        
        let buylistPriceProductCardRuleHotlistDTO = await this.getBuylistPriceProductCardRuleHotlistById(buylistPriceProductCardRuleHotlist.buylistPriceProductCardRuleHotlistId);
        
        return buylistPriceProductCardRuleHotlistDTO;

    }   
}