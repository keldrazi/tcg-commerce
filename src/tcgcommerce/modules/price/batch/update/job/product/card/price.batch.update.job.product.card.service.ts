import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PriceBatchUpdateJobProductCard } from 'src/typeorm/entities/tcgcommerce/modules/price/batch/update/job/product/card/price.batch.update.job.product.card.entity';
import { PriceBatchUpdateJobProductCardDTO, CreatePriceBatchUpdateJobProductCardDTO } from './dto/price.batch.update.job.product.card.dto';
import { PRICE_BATCH_UPDATE_JOB_PRODUCT_CARD_STATUS } from 'src/system/constants/tcgcommerce/price/batch/update/job/product/card/price.batch.update.job.product.card.constants';
import { OnEvent } from '@nestjs/event-emitter';
import { ProductSetService } from 'src/tcgcommerce/modules/product/set/product.set.service';
import { ProductVendorService } from 'src/tcgcommerce/modules/product/vendor/product.vendor.service';
import { ProductLineService } from 'src/tcgcommerce/modules/product/line/product.line.service';
import { ProductTypeService } from 'src/tcgcommerce/modules/product/type/product.type.service';
import { ProductLanguageService } from 'src/tcgcommerce/modules/product/language/product.language.service';
import { PriceBatchUpdateProductCardService } from 'src/tcgcommerce/modules/price/batch/update/product/card/price.batch.update.product.card.service';
import { PriceRuleProductCardBaseService } from 'src/tcgcommerce/modules/price/rule/product/card/base/price.rule.product.card.base.service';


@Injectable()
export class PriceBatchUpdateJobProductCardService {

    constructor(
        @InjectRepository(PriceBatchUpdateJobProductCard) private priceBatchUpdateJobProductCardRepository: Repository<PriceBatchUpdateJobProductCard>, 
        private productSetService: ProductSetService,
        private priceBatchUpdateProductCardService: PriceBatchUpdateProductCardService,
        private priceRuleProductCardBaseService: PriceRuleProductCardBaseService,
        private productVendorService: ProductVendorService,
        private productLineService: ProductLineService,
        private productTypeService: ProductTypeService,
        private productLanguageService: ProductLanguageService,
    ) { }

    /* GET PRICE BATCH UPDATE JOB PRODUCT CARD BY ID */
    async getPriceBatchUpdateJobProductCardById(priceBatchUpdateJobProductCardId: string) {
        let priceBatchUpdateJobProductCard = await this.priceBatchUpdateJobProductCardRepository.findOne({
            where: {
                priceBatchUpdateJobProductCardId: priceBatchUpdateJobProductCardId
            }
        });

        if(priceBatchUpdateJobProductCard == null) {
            return null;
        }

        //MAP TO DTO;
        let priceBatchUpdateJobProductCardDTO: PriceBatchUpdateJobProductCardDTO = ({ ...priceBatchUpdateJobProductCard});

        return priceBatchUpdateJobProductCardDTO;
    }

    /* CREATE ALL PRODUCT CARD PRICE BATCH UPDATE JOBS */
    async createPriceBatchUpdateJobProductCardAll(commerceAccountId: string, productVendorId: string, productLineId: string, productTypeId: string, productLanguageId: string) {

        //GET THE SETS OF THE PRODUCT LINE;
        let productVendor = await this.productVendorService.getProductVendor(productVendorId);
        let productLine = await this.productLineService.getProductLine(productLineId);
        let productType = await this.productTypeService.getProductType(productTypeId);
        let productLanguage = await this.productLanguageService.getProductLanguage(productLanguageId);
        let productSets = await this.productSetService.getProductSetsByProductVendorIdAndProductLineId(productVendorId, productLineId);

        if(productVendor == null || productLine == null || productType == null || productLanguage == null || productSets == null) {
            //TO DO: HANDLE ERROR FOR NON EXISTENT OBJECTS;;
            return null; 
        }

        let priceRuleProductCardBase = await this.priceRuleProductCardBaseService.getPriceRuleProductCardBaseByCommerceAccountId(productVendorId, productLineId, productTypeId, productLanguageId);

        if(priceRuleProductCardBase == null) {
            //TO DO: HANDLE ERROR FOR NON EXISTENT PRICING RULE;;
            return null; 
        }

        let priceBatchUpdateJobProductCardDTOs: PriceBatchUpdateJobProductCardDTO[] = [];

        for(let i = 0; i < productSets.length; i++) {
            let productSet = productSets[i];
            console.log('Creating Price Batch Update Job for Product Set: ' + productSet.productSetCode);
            let createPriceBatchUpdateJobProductCardDTO: CreatePriceBatchUpdateJobProductCardDTO = {
                commerceAccountId: commerceAccountId,
                productVendorId: productVendor.productVendorId,
                productVendorCode: productVendor.productVendorCode,
                productLineId: productLine.productLineId,
                productLineCode: productLine.productLineCode,
                productTypeId: productType.productTypeId,
                productTypeCode: productType.productTypeCode,
                productLanguageId: productLanguage.productLanguageId,
                productLanguageCode: productLanguage.productLanguageCode,
                productSetId: productSet.productSetId,
                productSetCode: productSet.productSetCode,
                priceRuleProductCardBaseId: priceRuleProductCardBase.priceRuleProductCardBaseId,
                priceRuleProductCardBaseOption: priceRuleProductCardBase.priceRuleProductCardBaseOption,
            }

            let priceBatchUpdateJobProductCardDTO = await this.createPriceBatchUpdateJobProductCardSet(createPriceBatchUpdateJobProductCardDTO);

            if(priceBatchUpdateJobProductCardDTO == null) {
                continue;
            }

            priceBatchUpdateJobProductCardDTOs.push(priceBatchUpdateJobProductCardDTO);

        }
            
        return priceBatchUpdateJobProductCardDTOs;
    }
        
    
    /* CREATE PRODUCT CARD PRICE BATCH UPDATE JOBS BY SET */
    async createPriceBatchUpdateJobProductCardSet(createPriceBatchUpdateJobProductCardDTO: CreatePriceBatchUpdateJobProductCardDTO) {

        let priceBatchUpdateJobProductCardCode = await this.createPriceBatchUpdateJobProductCardCode(createPriceBatchUpdateJobProductCardDTO.productVendorCode, createPriceBatchUpdateJobProductCardDTO.productLineCode, createPriceBatchUpdateJobProductCardDTO.productSetCode);

        let priceBatchUpdateJobProductCard = this.priceBatchUpdateJobProductCardRepository.create({ ...createPriceBatchUpdateJobProductCardDTO });

        priceBatchUpdateJobProductCard.priceBatchUpdateJobProductCardCode = priceBatchUpdateJobProductCardCode;
        priceBatchUpdateJobProductCard.priceBatchUpdateJobProductCardDate = new Date();
        priceBatchUpdateJobProductCard.priceBatchUpdateJobProductCardStatus = PRICE_BATCH_UPDATE_JOB_PRODUCT_CARD_STATUS.PROCESSING;
        priceBatchUpdateJobProductCard = await this.priceBatchUpdateJobProductCardRepository.save(priceBatchUpdateJobProductCard);


        let priceBatchUpdateJobProductCardDTO = await this.getPriceBatchUpdateJobProductCardById(priceBatchUpdateJobProductCard.priceBatchUpdateJobProductCardId);

        if(priceBatchUpdateJobProductCardDTO == null) {
            //TO DO: HANDLE ERROR FOR FAILED CREATION OF IMPORT JOB;
            return null; //RETURN AN ERROR;
        }

        console.log('Created Price Batch Update Job Product Card: ' + priceBatchUpdateJobProductCardDTO.priceBatchUpdateJobProductCardId);
        console.log('Set: ' + priceBatchUpdateJobProductCardDTO.productSetCode);

        //START THE PROCESS OF CREATING THE PRICE BATCH UPDATE FOR THE SET;
        //this.priceBatchUpdateProductCardService.createPriceBatchUpdateProductCardsBySetId(priceBatchUpdateJobProductCardDTO);

        return priceBatchUpdateJobProductCardDTO;

    }

    async createPriceBatchUpdateJobProductCardCode(productVendorCode:string, productLineCode: string, productSetCode: string) {

        let now = new Date();
        let dateCode = now.getFullYear().toString() + '-' + (now.getMonth() + 1).toString().padStart(2, '0') + '-' + now.getDate().toString().padStart(2, '0') + '-' + now.getHours().toString().padStart(2, '0') + now.getMinutes().toString().padStart(2, '0') + now.getSeconds().toString().padStart(2, '0');

        let priceBatchUpdateJobProductCardCode = productVendorCode.toUpperCase() + '-' + productLineCode.toUpperCase() + '-' + productSetCode.replace(/ /g, '-').toUpperCase() + '-' + dateCode;

        return priceBatchUpdateJobProductCardCode;
    }


    async updatePriceBatchUpdateJobProductCardStatus(priceBatchUpdateJobProductCardId: string, priceBatchUpdateJobProductCardStatus: string) {
        let priceBatchUpdateJobProductCard = await this.getPriceBatchUpdateJobProductCardById(priceBatchUpdateJobProductCardId);

        if(priceBatchUpdateJobProductCard == undefined) {
            //TO DO: HANDLE ERROR FOR NON EXISTENT IMPORT JOB;
            return false; //RETURN AN ERROR;
        }

        priceBatchUpdateJobProductCard.priceBatchUpdateJobProductCardStatus = priceBatchUpdateJobProductCardStatus;
        priceBatchUpdateJobProductCard.priceBatchUpdateJobProductCardUpdateDate = new Date();

        await this.priceBatchUpdateJobProductCardRepository.save(priceBatchUpdateJobProductCard);

        return true;
    }

    
    
    /* EVENT LISTENERS */
    @OnEvent('price.batch.update.job.product.card.update.status')
    async handlePriceBatchUpdateJobProductCardStatusEvent(payload: any) {
        console.log('Received Event: price.batch.update.job.product.card.update.status');
        let priceBatchUpdateJobProductCardId = payload.priceBatchUpdateJobProductCardId;
        let priceBatchUpdateJobProductCardStatus = payload.priceBatchUpdateJobProductCardStatus;
        
        await this.updatePriceBatchUpdateJobProductCardStatus(priceBatchUpdateJobProductCardId, priceBatchUpdateJobProductCardStatus);
    }
    

}