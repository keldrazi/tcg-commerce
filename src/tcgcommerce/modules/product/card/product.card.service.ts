import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductCardDTO, CreateProductCardDTO, UpdateProductCardDTO } from './dto/product.card.dto';
import { ProductCard } from 'src/typeorm/entities/tcgcommerce/modules/product/card/product.card.entity';
import { TCGdbMTGCardService } from 'src/tcgdb/modules/tcgdb/api/mtg/card/tcgdb.mtg.card.service';
import { ProductSetService } from 'src/tcgcommerce/modules/product/set/product.set.service';
import { ProductLineService } from 'src/tcgcommerce/modules/product/line/product.line.service';
import { ProductVendorService } from 'src/tcgcommerce/modules/product/vendor/product.vendor.service';
import { ProductTypeService } from 'src/tcgcommerce/modules/product/type/product.type.service';
import { ProductCardRarityService } from 'src/tcgcommerce/modules/product/card/rarity/product.card.rarity.service';
import { ErrorMessageService } from 'src/system/modules/error/message/error.message.service';
import { ErrorMessageDTO } from 'src/system/modules/error/message/dto/error.message.dto';
import { PRODUCT_LINE_CODE, PRODUCT_VENDOR_CODE, PRODUCT_TYPE_CODE } from 'src/system/constants/tcgcommerce/product/constants.tcgcommerce.product';

@Injectable()
export class ProductCardService {

    constructor(
        @InjectRepository(ProductCard) private productCardRepository: Repository<ProductCard>,
        private tcgdbMTGCardService: TCGdbMTGCardService,
        private productSetService: ProductSetService,
        private productLineService: ProductLineService,
        private productVendorService: ProductVendorService,
        private productTypeService: ProductTypeService,
        private productCardRarityService: ProductCardRarityService,
        private errorMessageService: ErrorMessageService
    ) { }

    async getProductCardByProductCardId(productCardId: string) {
        let productCard = await this.productCardRepository.findOne({ 
            where: {
                productCardId: productCardId
            }
        });

        if(productCard == null) {
            return this.errorMessageService.createErrorMessage('PRODUCT_CARD_NOT_FOUND', 'Product card was not found');
        } 
        
        let productCardDTO: ProductCardDTO = ({ ...productCard})
       
        return productCardDTO;
    }

    async getProductCardByTCGdbId(tcgdbId: string) {
        let productCard = await this.productCardRepository.findOne({ 
            where: {
                productCardTCGdbId: tcgdbId, 
            }
        });

        if(productCard == null) {
            return this.errorMessageService.createErrorMessage('PRODUCT_CARD_NOT_FOUND', 'Product card was not found');
        }

        let productCardDTO: ProductCardDTO = ({ ...productCard})
            
        return productCardDTO;
    }

    async getProductCardByTCGPlayerId(tcgPlayerId: number) {
        let productCard = await this.productCardRepository.findOne({ 
            where: {
                productCardTCGPlayerId: tcgPlayerId, 
            }
        });

        if(productCard == null) {
            return this.errorMessageService.createErrorMessage('PRODUCT_CARD_NOT_FOUND', 'Product card was not found');
        }

        let productCardDTO: ProductCardDTO = ({ ...productCard})

        return productCardDTO;
    }

    async getProductCardsByProductLineId(productLineId: string) {
        //TO DO: ADD LIMITS AND OFFSETS;
        
        let productCards = await this.productCardRepository.find({ 
            where: {
                productLineId: productLineId, 
            }
        });

        if(productCards == null) {
            return [];
        }

        let productCardDTOs: ProductCardDTO[] = [];

        for(let i = 0; i < productCards.length; i++) {
            let productCard = productCards[i];
            let productCardDTO: ProductCardDTO = ({ ...productCard})
            
            productCardDTOs.push(productCardDTO);

        }

        return productCardDTOs;
    }

    async getProductCardsByProductSetId(productSetId: string) {
        //TO DO: ADD LIMITS AND OFFSETS;
        
        let productCards = await this.productCardRepository.find({ 
            where: {
                productSetId: productSetId, 
            }
        });

        if(productCards == null) {
            return [];
        }

        let productCardDTOs: ProductCardDTO[] = [];

        for(let i = 0; i < productCards.length; i++) {
            let productCard = productCards[i];
            let productCardDTO: ProductCardDTO = ({ ...productCard})
            
            productCardDTOs.push(productCardDTO);

        }

        return productCardDTOs;
    }

    async getMTGProductCardsByProductSetCode(setCode: string) {
        let productLine = await this.productLineService.getProductLineByCode(PRODUCT_LINE_CODE.MAGIC_THE_GATHERING); 
        
        if (productLine == null || productLine instanceof ErrorMessageDTO) {
            return this.errorMessageService.createErrorMessage('PRODUCT_LINE_NOT_FOUND', 'Product line was not found');
        }
        
        let productCards = await this.productCardRepository.find({ 
            where: {
                productLineId: productLine.productLineId,
                productSetCode: setCode, 
            },
            order: {
                productCardName: 'ASC'
            }
        });

        if(productCards == null) {
            return [];
        }

        let productCardDTOs: ProductCardDTO[] = [];

        for(let i = 0; i < productCards.length; i++) {
            let productCard = productCards[i];
            let productCardDTO: ProductCardDTO = ({ ...productCard})
            
            productCardDTOs.push(productCardDTO);

        }

        return productCardDTOs;
    }

    async getProductCardByNameAndSetCodeAndNumber(productCardName: string, productSetCode: string, productCardNumber: string) {
        let productCard = await this.productCardRepository.findOne({ 
            where: {
                productCardName: productCardName,
                productSetCode: productSetCode.toUpperCase(),
                productCardNumber: productCardNumber
            }
        });

        if(productCard == null) {
            return this.errorMessageService.createErrorMessage('PRODUCT_CARD_NOT_FOUND', 'Product card was not found');
        }

        let productCardDTO: ProductCardDTO = ({ ...productCard})
            
        return productCardDTO;
    }


    async createProductCard(createProductCardDTO: CreateProductCardDTO) {

        //CHECK TO SEE IF THE PRODUCT CARD ITEM ALREADY EXISTS;
        let productCard = await this.productCardRepository.findOne({ 
            where: {
                productCardTCGdbId: createProductCardDTO.productCardTCGdbId, 
            }
        });
        
        if(productCard != null) {
            return this.errorMessageService.createErrorMessage('PRODUCT_CARD_ALREADY_EXISTS', 'Product card already exists');
        }

        productCard = this.productCardRepository.create({ ...createProductCardDTO });
        productCard = await this.productCardRepository.save(productCard);

        let productCardDTO = this.getProductCardByProductCardId(productCard.productCardId);
       
        return productCardDTO;
    } 

    async updateProductCard(updateProductCardDTO: UpdateProductCardDTO) {
                                
        let productCard = await this.productCardRepository.findOne({ 
            where: { 
                productCardId: updateProductCardDTO.productCardId
            } 
        });

        if (!productCard) {
            return this.errorMessageService.createErrorMessage('PRODUCT_CARD_NOT_FOUND', 'Product card was not found');
        }

        productCard.productSetCode = updateProductCardDTO.productSetCode;
        productCard.productCardNumber = updateProductCardDTO.productCardNumber;
        productCard.productCardName = updateProductCardDTO.productCardName;
        productCard.productCardCleanName = updateProductCardDTO.productCardCleanName;
        productCard.productCardImage = updateProductCardDTO.productCardImage;
        productCard.productCardExtendedData = updateProductCardDTO.productCardExtendedData;
        productCard.productCardMetadata = updateProductCardDTO.productCardMetadata;
        productCard.productCardSKUs = updateProductCardDTO.productCardSKUs;
        productCard.productCardIsActive = updateProductCardDTO.productCardIsActive;
        productCard.productCardUpdateDate = new Date();
        
        await this.productCardRepository.save(productCard);

        let productCardDTO = this.getProductCardByProductCardId(productCard.productCardId);
       
        return productCardDTO;
    } 

    //CREATE PRODUCT CARDS;
    async createProductCardsByProductLineCode(productLineCode: string) {
        
        if (productLineCode == PRODUCT_LINE_CODE.MAGIC_THE_GATHERING) {
            return this.createTCGdbMTGProductCards();
        } else {
            return this.errorMessageService.createErrorMessage('PRODUCT_LINE_NOT_FOUND', 'Product line was not found');
        }
        
    }

    //CREATE PRODUCT CARDS (MTG);
    async createTCGdbMTGProductCards() {

        let productVendor = await this.productVendorService.getProductVendorByCode(PRODUCT_VENDOR_CODE.WIZARDS_OF_THE_COAST);
        let productLine = await this.productLineService.getProductLineByCode(PRODUCT_LINE_CODE.MAGIC_THE_GATHERING); 
        

        if (productVendor == null || productVendor instanceof ErrorMessageDTO) {
            return this.errorMessageService.createErrorMessage('PRODUCT_VENDOR_NOT_FOUND', 'Product vendor was not found');
        }
        
        if (productLine == null || productLine instanceof ErrorMessageDTO) {
            return this.errorMessageService.createErrorMessage('PRODUCT_LINE_NOT_FOUND', 'Product line was not found');
        }

        let productType = await this.productTypeService.getProductTypeByProductVendorIdAndProductLineIdAndProductTypeCode(productVendor.productVendorId, productLine.productLineId, PRODUCT_TYPE_CODE.SINGLE);

        if (productType == null || productType instanceof ErrorMessageDTO) {
            return this.errorMessageService.createErrorMessage('PRODUCT_TYPE_NOT_FOUND', 'Product type was not found');
        }

        let productSets = await this.productSetService.getProductSetsByProductVendorIdAndProductLineId(productVendor.productVendorId, productLine.productLineId);
        
        if(productSets == null || productSets instanceof ErrorMessageDTO) {
            return this.errorMessageService.createErrorMessage('PRODUCT_SETS_NOT_FOUND', 'No product sets found for vendor and line.');
        }
        
        let productCardRecordCount = 0;

        for(let i = 0; i < productSets.length; i++) {
            let productSet = productSets[i];
            console.log("Processing set: " + productSet.productSetName + " (" + productSet.productSetCode + ")");
            let productCardsBySet = await this.tcgdbMTGCardService.getTCGdbMTGCardsBySetId(productSet.productSetTCGdbId);

            if(productCardsBySet == null) {
                console.log("No cards found for set: " + productSet.productSetName + " (" + productSet.productSetCode + ")");
                continue;
            }
            console.log("Found " + productCardsBySet.tcgdbMTGCards.length + " cards for set: " + productSet.productSetName + " (" + productSet.productSetCode + ")");
            for(let j = 0; j < productCardsBySet.tcgdbMTGCards.length; j++) {
                let tcgdbMTGCard = productCardsBySet.tcgdbMTGCards[j];
                let productCardRarity = await this.productCardRarityService.getProductCardRarityByCodeAndProductLineId(tcgdbMTGCard.tcgdbMTGCardRarityCode, productLine.productLineId);
                
                if(productCardRarity == null || productCardRarity instanceof ErrorMessageDTO) {
                    console.log("Skipping card due to missing rarity: " + tcgdbMTGCard.tcgdbMTGCardName + " (" + tcgdbMTGCard.tcgdbMTGCardNumber + ") Rarity: " + tcgdbMTGCard.tcgdbMTGCardRarityCode);
                    continue;
                }
                //CHECK TO SEE IF THE CARD EXISTS;
                let productCardCheck = await this.getProductCardByTCGdbId(tcgdbMTGCard.tcgdbMTGCardId);
                
                if (productCardCheck instanceof ProductCardDTO) {
                    console.log("Skipping existing card: " + tcgdbMTGCard.tcgdbMTGCardName + " (" + tcgdbMTGCard.tcgdbMTGCardNumber + ")" );
                    continue;  
                }

                let productCardMetadata = null;
                
                if (tcgdbMTGCard.tcgdbMTGCardScryfallData != null) {
                    productCardMetadata = tcgdbMTGCard.tcgdbMTGCardScryfallData;
                }

                
                let productCardExtendedData = tcgdbMTGCard.tcgdbMTGCardTCGPlayerData.extendedData;
                let productCardSKUs = tcgdbMTGCard.tcgdbMTGCardTCGPlayerData.skus;
                
                
                const newProductCard = this.productCardRepository.create({
                    productCardTCGdbId: tcgdbMTGCard.tcgdbMTGCardId,
                    productCardTCGPlayerId: tcgdbMTGCard.tcgdbMTGCardTCGPlayerId,
                    productVendorId: productVendor.productVendorId,
                    productLineId: productLine.productLineId,
                    productTypeId: productType.productTypeId,
                    productSetId: productSet.productSetId,
                    productSetCode: productSet.productSetCode,
                    productCardRarityId: productCardRarity.productCardRarityId,
                    productCardRarityCode: productCardRarity.productCardRarityCode,
                    productCardNumber: tcgdbMTGCard.tcgdbMTGCardNumber,
                    productCardName: tcgdbMTGCard.tcgdbMTGCardName,
                    productCardCleanName: tcgdbMTGCard.tcgdbMTGCardCleanName,
                    productCardImage: tcgdbMTGCard.tcgdbMTGCardImageURL,
                    productCardExtendedData: productCardExtendedData,
                    productCardSKUs: productCardSKUs,
                    productCardIsPresale: false,
                    productCardIsActive: true,
                });

                await this.productCardRepository.save(newProductCard);
                console.log(tcgdbMTGCard.tcgdbMTGCardName);

                productCardRecordCount++;
                
            }

            //DELAY TO AVOID TCGDB RATE LIMITS;
            await this.delay(500);
        }

        return productCardRecordCount;
    }

    //CREATE PRODUCT CARDS (MTG);
    async updateTCGdbMTGProductCardsWithScryfallData() {

        let productVendor = await this.productVendorService.getProductVendorByCode(PRODUCT_VENDOR_CODE.WIZARDS_OF_THE_COAST);
        let productLine = await this.productLineService.getProductLineByCode(PRODUCT_LINE_CODE.MAGIC_THE_GATHERING); 
        

        if (productVendor == null || productVendor instanceof ErrorMessageDTO) {
            return this.errorMessageService.createErrorMessage('PRODUCT_VENDOR_NOT_FOUND', 'Product vendor was not found');
        }
        
        if (productLine == null || productLine instanceof ErrorMessageDTO) {
            return this.errorMessageService.createErrorMessage('PRODUCT_LINE_NOT_FOUND', 'Product line was not found');
        }

        let productType = await this.productTypeService.getProductTypeByProductVendorIdAndProductLineIdAndProductTypeCode(productVendor.productVendorId, productLine.productLineId, PRODUCT_TYPE_CODE.SINGLE);

        if (productType == null || productType instanceof ErrorMessageDTO) {
            return this.errorMessageService.createErrorMessage('PRODUCT_TYPE_NOT_FOUND', 'Product type was not found');
        }

        let productSets = await this.productSetService.getProductSetsByProductVendorIdAndProductLineId(productVendor.productVendorId, productLine.productLineId);
        
        if(productSets == null || productSets instanceof ErrorMessageDTO) {
            return this.errorMessageService.createErrorMessage('PRODUCT_SETS_NOT_FOUND', 'No product sets found for vendor and line.');
        }
        
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
                
                if (productCard != null) {
                    productCard.productCardMetadata = tcgdbMTGCard.tcgdbMTGCardScryfallData;
                    await this.productCardRepository.save(productCard);
                    console.log("Updated existing card: " + tcgdbMTGCard.tcgdbMTGCardId);
                    productCardRecordCount++;
                }
                
            }

            //DELAY TO AVOID TCGDB RATE LIMITS;
            await this.delay(500);
        }

        return productCardRecordCount;
    }

    //CREATE PRODUCT CARDS;
    //WILL EVENTUALLY NEED THIS FOR PRERELEASE SETS;
    /*
    async createProductCardsBySet(productSetCode: string, productVendorCode: string, productLineCode: string, productTypeCode: string) {
        
        let productVendor = await this.productVendorService.getProductVendorByCode(productVendorCode);
        let productLine = await this.productLineService.getProductLineByCode(productLineCode);
        let productType = await this.productTypeService.getProductTypeByCode(productTypeCode);
        
        if((productLine == null || productLine instanceof ErrorMessageDTO) || (productVendor == null || productVendor instanceof ErrorMessageDTO) || (productType == null || productType instanceof ErrorMessageDTO)) {
            return this.errorMessageService.createErrorMessage('PRODUCT_CARD_CREATION_FAILED', 'Failed to create product cards due to invalid product line, vendor, or type.');
        }

        let productSet = await this.productSetService.getProductSetByCode(productVendor.productVendorId, productLine.productLineId, productSetCode);

        if(productSet == null || productSet instanceof ErrorMessageDTO) {
            return this.errorMessageService.createErrorMessage('PRODUCT_SET_NOT_FOUND', 'Product set not found for set code: ' + productSetCode);
        }

        switch (productLine.productLineCode) {
            case "MTG":
                console.log("MTG");
                return await this.createMTGProductCardsBySet(productSet.productSetId, productVendor.productVendorId, productLine.productLineId, productType.productTypeId);

        }
        
        return true;

        
    }

    //CREATE PRODUCT CARDS BY SET (MTG);
    async createMTGProductCardsBySet(productSetId: string, productVendorId: string, productLineId: string, productTypeId: string) {
        
        let productCardRecordCount = 0;

        let productSet = await this.productSetService.getProductSet(productSetId);

        if(productSet == null || productSet instanceof ErrorMessageDTO) {
            return this.errorMessageService.createErrorMessage('PRODUCT_SET_NOT_FOUND', 'Product set not found');
        }
            
        let productCardsBySet = await this.tcgdbMTGCardService.getTCGdbMTGCardsBySetId(productSet.productSetTCGdbId);

        if(productCardsBySet == null) {
            return this.errorMessageService.createErrorMessage('PRODUCT_CARDS_NOT_FOUND', 'No cards found for set: ' + productSet.productSetName + " (" + productSet.productSetCode + ")");
        }

        console.log("Found " + productCardsBySet.tcgdbMTGCards.length + " cards for set: " + productSet.productSetName + " (" + productSet.productSetCode + ")");
        for(let j = 0; j < productCardsBySet.tcgdbMTGCards.length; j++) {
            let tcgdbMTGCard = productCardsBySet.tcgdbMTGCards[j];
            let productCardRarity = await this.productCardRarityService.getProductCardRarityByCodeAndProductLineId(tcgdbMTGCard.tcgdbMTGCardRarityCode, productLineId);
            
            if(productCardRarity == null || productCardRarity instanceof ErrorMessageDTO) {
                console.log("Skipping card due to missing rarity: " + tcgdbMTGCard.tcgdbMTGCardName + " (" + tcgdbMTGCard.tcgdbMTGCardNumber + ") Rarity: " + tcgdbMTGCard.tcgdbMTGCardRarityCode);
                continue;
            }
            //CHECK TO SEE IF THE CARD EXISTS;
            let productCardCheck = await this.getProductCardByTCGdbId(tcgdbMTGCard.tcgdbMTGCardId);
            
            if (productCardCheck instanceof ProductCardDTO) {
                continue;
            }

            let productCardMetadata = "[]";
            
            if (tcgdbMTGCard.tcgdbMTGCardScryfallData != null) {
                productCardMetadata = tcgdbMTGCard.tcgdbMTGCardScryfallData;
            }

            const newProductCard = this.productCardRepository.create({
                productCardTCGdbId: tcgdbMTGCard.tcgdbMTGCardId,
                productCardTCGPlayerId: tcgdbMTGCard.tcgdbMTGCardTCGPlayerId,
                productVendorId: productVendorId,
                productLineId: productLineId,
                productTypeId: productTypeId,
                productSetId: productSet.productSetId,
                productSetCode: productSet.productSetCode,
                productCardRarityId: productCardRarity.productCardRarityId,
                productCardRarityCode: productCardRarity.productCardRarityCode,
                productCardNumber: tcgdbMTGCard.tcgdbMTGCardNumber,
                productCardName: tcgdbMTGCard.tcgdbMTGCardName,
                productCardCleanName: tcgdbMTGCard.tcgdbMTGCardCleanName,
                productCardImage: tcgdbMTGCard.tcgdbMTGCardImageURL,
                productCardExtendedData: tcgdbMTGCard.tcgdbMTGCardTCGPlayerData,
                productCardMetadata: productCardMetadata,
                productCardSKUs: tcgdbMTGCard.tcgdbMTGCardTCGPlayerSKUs,
                productCardIsPresale: false,
                productCardIsActive: true,
            });

            await this.productCardRepository.save(newProductCard);

            productCardRecordCount++;
        }
        
        return productCardRecordCount;
    }
    */

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}