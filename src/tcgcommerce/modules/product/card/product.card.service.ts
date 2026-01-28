import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductCardDTO } from './dto/product.card.dto';
import { ProductCard } from 'src/typeorm/entities/tcgcommerce/modules/product/card/product.card.entity';
import { TCGdbMTGCardService } from 'src/tcgdb/modules/tcgdb/api/mtg/card/tcgdb.mtg.card.service';
import { ProductSetService } from 'src/tcgcommerce/modules/product/set/product.set.service';
import { ProductLineService } from 'src/tcgcommerce/modules/product/line/product.line.service';
import { ProductVendorService } from 'src/tcgcommerce/modules/product/vendor/product.vendor.service';
import { ProductTypeService } from 'src/tcgcommerce/modules/product/type/product.type.service';
import { ProductLanguageService } from 'src/tcgcommerce/modules/product/language/product.language.service';
import { ProductCardRarityService } from 'src/tcgcommerce/modules/product/card/rarity/product.card.rarity.service';
import { PRODUCT_LINE_CODE, PRODUCT_VENDOR_CODE, PRODUCT_TYPE_CODE, PRODUCT_LANGUAGE_CODE } from 'src/system/constants/tcgcommerce/product/constants.tcgcommerce.product';

@Injectable()
export class ProductCardService {

    constructor(
        @InjectRepository(ProductCard) private productCardRepository: Repository<ProductCard>,
        private tcgdbMTGCardService: TCGdbMTGCardService,
        private productSetService: ProductSetService,
        private productLineService: ProductLineService,
        private productVendorService: ProductVendorService,
        private productTypeService: ProductTypeService,
        private productLanguageService: ProductLanguageService,
        private productCardRarityService: ProductCardRarityService,
    ) { }

    async getProductCardByProductCardId(productCardId: string): Promise<ProductCardDTO> {
        let productCard = await this.productCardRepository.findOneOrFail({ 
            where: {
                productCardId: productCardId
            }
        });
        
        let productCardDTO: ProductCardDTO = ({ ...productCard})
       
        return productCardDTO;
    }

    async getProductCardByTCGdbId(tcgdbId: string): Promise<ProductCardDTO> {
        let productCard = await this.productCardRepository.findOneOrFail({ 
            where: {
                productCardTCGdbId: tcgdbId, 
            }
        });

        let productCardDTO: ProductCardDTO = ({ ...productCard})
            
        return productCardDTO;
    }

    async getProductCardByTCGPlayerId(tcgPlayerId: number): Promise<ProductCardDTO> {
        let productCard = await this.productCardRepository.findOneOrFail({ 
            where: {
                productCardTCGPlayerId: tcgPlayerId, 
            }
        });

        let productCardDTO: ProductCardDTO = ({ ...productCard})

        return productCardDTO;
    }

    async getProductCardsByProductLineId(productLineId: string): Promise<ProductCardDTO[]> {
        //TO DO: ADD LIMITS AND OFFSETS;
        
        let productCards = await this.productCardRepository.find({ 
            where: {
                productLineId: productLineId, 
            }
        });

        let productCardDTOs: ProductCardDTO[] = [];

        if(!productCards) {
            return productCardDTOs
        }

        for(let i = 0; i < productCards.length; i++) {
            let productCard = productCards[i];
            let productCardDTO: ProductCardDTO = ({ ...productCard})
            
            productCardDTOs.push(productCardDTO);

        }

        return productCardDTOs;
    }

    async getProductCardsByProductSetId(productSetId: string): Promise<ProductCardDTO[]> {
        //TO DO: ADD LIMITS AND OFFSETS;
        
        let productCards = await this.productCardRepository.find({ 
            where: {
                productSetId: productSetId, 
            }
        });

        let productCardDTOs: ProductCardDTO[] = [];

        if(!productCards) {
            return productCardDTOs;
        }

        for(let i = 0; i < productCards.length; i++) {
            let productCard = productCards[i];
            let productCardDTO: ProductCardDTO = ({ ...productCard})
            
            productCardDTOs.push(productCardDTO);

        }

        return productCardDTOs;
    }

    async getMTGProductCardsByProductSetCode(setCode: string, productLineCode: string): Promise<ProductCardDTO[]> {
        let productLine = await this.productLineService.getProductLineByCode(productLineCode); 
        
        
        let productCards = await this.productCardRepository.find({ 
            where: {
                productLineId: productLine.productLineId,
                productSetCode: setCode, 
            },
            order: {
                productCardName: 'ASC'
            }
        });

        let productCardDTOs: ProductCardDTO[] = [];

        if(!productCards) {
            return productCardDTOs;
        }

        for(let i = 0; i < productCards.length; i++) {
            let productCard = productCards[i];
            let productCardDTO: ProductCardDTO = ({ ...productCard})
            
            productCardDTOs.push(productCardDTO);

        }

        return productCardDTOs;
    }

    async getProductCardByNameAndSetCodeAndNumber(productCardName: string, productSetCode: string, productCardNumber: string): Promise<ProductCardDTO> {
        let productCard = await this.productCardRepository.findOneOrFail({ 
            where: {
                productCardName: productCardName,
                productSetCode: productSetCode.toUpperCase(),
                productCardNumber: productCardNumber
            }
        });

        let productCardDTO: ProductCardDTO = ({ ...productCard})
            
        return productCardDTO;
    }
    
    //CREATE PRODUCT CARDS;
    async createProductCardsByProductLineCode(productLineCode: string): Promise<number> {
        
        if (productLineCode == PRODUCT_LINE_CODE.MAGIC_THE_GATHERING) {
            return this.createTCGdbMTGProductCards();
        } else {
            throw new NotFoundException('Product line code not found for bulk product card creation.');
        }
        
    }

    //CREATE PRODUCT CARDS (MTG);
    async createTCGdbMTGProductCards(): Promise<number> {

        let productVendor = await this.productVendorService.getProductVendorByCode(PRODUCT_VENDOR_CODE.WIZARDS_OF_THE_COAST);
        let productLine = await this.productLineService.getProductLineByCode(PRODUCT_LINE_CODE.MAGIC_THE_GATHERING); 
        let productType = await this.productTypeService.getProductTypeByProductVendorIdAndProductLineIdAndProductTypeCode(productVendor.productVendorId, productLine.productLineId, PRODUCT_TYPE_CODE.SINGLE);
        let productLanguage = await this.productLanguageService.getProductLanguageByCodeAndProductLineId(PRODUCT_LANGUAGE_CODE.ENGLISH, productLine.productLineId);
        let productSets = await this.productSetService.getProductSetsByProductVendorIdAndProductLineId(productVendor.productVendorId, productLine.productLineId);
        
        let productCardRecordCount = 0;

        for(let i = 0; i < productSets.length; i++) {
            let productSet = productSets[i];
            console.log("Processing set: " + productSet.productSetName + " (" + productSet.productSetCode + ")");
            let productCardsBySet = await this.tcgdbMTGCardService.getTCGdbMTGCardsBySetId(productSet.productSetTCGdbId);

            if(!productCardsBySet) {
                console.log("No cards found for set: " + productSet.productSetName + " (" + productSet.productSetCode + ")");
                continue;
            }
            console.log("Found " + productCardsBySet.tcgdbMTGCards.length + " cards for set: " + productSet.productSetName + " (" + productSet.productSetCode + ")");
            for(let j = 0; j < productCardsBySet.tcgdbMTGCards.length; j++) {
                let tcgdbMTGCard = productCardsBySet.tcgdbMTGCards[j];
                let productCardRarity = await this.productCardRarityService.getProductCardRarityByCodeAndProductLineId(tcgdbMTGCard.tcgdbMTGCardRarityCode, productLine.productLineId);
                
                let productCard = await this.productCardRepository.findOne({ 
                    where: {
                        productCardTCGdbId: tcgdbMTGCard.tcgdbMTGCardId, 
                    }
                });

                if(!productCard) {
                    let productCardMetadata = null;
                    
                    if (tcgdbMTGCard.tcgdbMTGCardScryfallData != null) {
                        productCardMetadata = tcgdbMTGCard.tcgdbMTGCardScryfallData;
                    }

                    let productCardExtendedData = tcgdbMTGCard.tcgdbMTGCardTCGPlayerData.extendedData;
                    
                    productCard = this.productCardRepository.create({
                        productCardTCGdbId: tcgdbMTGCard.tcgdbMTGCardId,
                        productCardTCGPlayerId: tcgdbMTGCard.tcgdbMTGCardTCGPlayerId,
                        productVendorId: productVendor.productVendorId,
                        productLineId: productLine.productLineId,
                        productTypeId: productType.productTypeId,
                        productLanguageId: productLanguage.productLanguageId,
                        productSetId: productSet.productSetId,
                        productSetCode: productSet.productSetCode,
                        productCardRarityId: productCardRarity.productCardRarityId,
                        productCardRarityCode: productCardRarity.productCardRarityCode,
                        productCardNumber: tcgdbMTGCard.tcgdbMTGCardNumber,
                        productCardName: tcgdbMTGCard.tcgdbMTGCardName,
                        productCardCleanName: tcgdbMTGCard.tcgdbMTGCardCleanName,
                        productCardImage: tcgdbMTGCard.tcgdbMTGCardImageURL,
                        productCardExtendedData: productCardExtendedData,
                        productCardIsPresale: false,
                        productCardIsActive: true,
                    });

                    await this.productCardRepository.save(productCard);
                    
                    console.log(tcgdbMTGCard.tcgdbMTGCardName);

                    productCardRecordCount++;
                }
                
            }

            //DELAY TO AVOID TCGDB RATE LIMITS;
            await this.delay(200);
        }

        return productCardRecordCount;
    }

    //UPDATE PRODUCT CARDS (MTG);
    async updateTCGdbMTGProductCardsWithScryfallData(): Promise<number> {

        let productVendor = await this.productVendorService.getProductVendorByCode(PRODUCT_VENDOR_CODE.WIZARDS_OF_THE_COAST);
        let productLine = await this.productLineService.getProductLineByCode(PRODUCT_LINE_CODE.MAGIC_THE_GATHERING); 
        let productSets = await this.productSetService.getProductSetsByProductVendorIdAndProductLineId(productVendor.productVendorId, productLine.productLineId);
        
        let productCardRecordCount = 0;

        for(let i = 0; i < productSets.length; i++) {
            let productSet = productSets[i];
            console.log("Processing set: " + productSet.productSetName + " (" + productSet.productSetCode + ")");
            let productCardsBySet = await this.tcgdbMTGCardService.getTCGdbMTGCardsScryfallDataBySetId(productSet.productSetTCGdbId);

            if(productCardsBySet == null) {
                console.log("No cards found for set: " + productSet.productSetName + " (" + productSet.productSetCode + ")");
                continue;
            }
            console.log("Found " + productCardsBySet.tcgdbMTGCards.length + " cards for set: " + productSet.productSetName + " (" + productSet.productSetCode + ")");
            for(let j = 0; j < productCardsBySet.tcgdbMTGCards.length; j++) {
                let tcgdbMTGCard = productCardsBySet.tcgdbMTGCards[j];
                
                //CHECK TO SEE IF THE CARD EXISTS;
                let productCard = await this.productCardRepository.findOne({ 
                    where: { 
                        productCardTCGdbId: tcgdbMTGCard.tcgdbMTGCardId
                    } 
                });
                
                if (productCard) {
                    productCard.productCardMetadata = tcgdbMTGCard.tcgdbMTGCardScryfallData;
                    await this.productCardRepository.save(productCard);
                    console.log("Updated existing card: " + tcgdbMTGCard.tcgdbMTGCardName);
                    productCardRecordCount++;
                }
                
            }

            //DELAY TO AVOID TCGDB RATE LIMITS;
            await this.delay(200);
        }

        return productCardRecordCount;
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}