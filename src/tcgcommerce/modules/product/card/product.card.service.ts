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
            return this.errorMessageService.createErrorMessage('PRODUCT_CARD_NOT_FOUND', 'Product card was not found for productCardId: ' + productCardId);
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
            return this.errorMessageService.createErrorMessage('PRODUCT_CARD_NOT_FOUND', 'Product card was not found for productCardTCGdbId: ' + tcgdbId);
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
            return this.errorMessageService.createErrorMessage('PRODUCT_CARD_NOT_FOUND', 'Product card was not found for productCardTCGPlayerId: ' + tcgPlayerId);
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
            return this.errorMessageService.createErrorMessage('PRODUCT_CARDS_NOT_FOUND', 'Product cards were not found for productLineId: ' + productLineId);
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
            return this.errorMessageService.createErrorMessage('PRODUCT_CARDS_NOT_FOUND', 'Product cards were not found for productSetId: ' + productSetId);
        }

        let productCardDTOs: ProductCardDTO[] = [];

        for(let i = 0; i < productCards.length; i++) {
            let productCard = productCards[i];
            let productCardDTO: ProductCardDTO = ({ ...productCard})
            
            productCardDTOs.push(productCardDTO);

        }

        return productCardDTOs;
    }

    async getProductCardsByProductSetCode(setCode: string) {
        //TO DO: ADD LIMITS AND OFFSETS;
        
        let productCards = await this.productCardRepository.find({ 
            where: {
                productSetCode: setCode, 
            }
        });

        if(productCards == null) {
            return this.errorMessageService.createErrorMessage('PRODUCT_CARDS_NOT_FOUND', 'Product cards were not found for productSetCode: ' + setCode);   
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
            return this.errorMessageService.createErrorMessage('PRODUCT_CARD_NOT_FOUND', 'Product card was not found for productCardName: ' + productCardName + ', productSetCode: ' + productSetCode + ', productCardNumber: ' + productCardNumber);
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
            return this.errorMessageService.createErrorMessage('PRODUCT_CARD_ALREADY_EXISTS', 'Product card already exists for productCardTCGdbId: ' + createProductCardDTO.productCardTCGdbId);
        }

        let newProductCard = this.productCardRepository.create({ ...createProductCardDTO });
        newProductCard = await this.productCardRepository.save(newProductCard);

        let productCardDTO = this.getProductCardByProductCardId(newProductCard.productCardId);
       
        return productCardDTO;
    } 

    async updateProductCard(updateProductCardDTO: UpdateProductCardDTO) {
                                
        let existingProductCard = await this.productCardRepository.findOne({ 
            where: { 
                productCardId: updateProductCardDTO.productCardId
            } 
        });

        if (!existingProductCard) {
            return this.errorMessageService.createErrorMessage('PRODUCT_CARD_NOT_FOUND', 'Product card was not found for productCardId: ' + updateProductCardDTO.productCardId);
        }

        existingProductCard.productSetCode = updateProductCardDTO.productSetCode;
        existingProductCard.productCardNumber = updateProductCardDTO.productCardNumber;
        existingProductCard.productCardName = updateProductCardDTO.productCardName;
        existingProductCard.productCardCleanName = updateProductCardDTO.productCardCleanName;
        existingProductCard.productCardImage = updateProductCardDTO.productCardImage;
        existingProductCard.productCardExtendedData = updateProductCardDTO.productCardExtendedData;
        existingProductCard.productCardMetadata = updateProductCardDTO.productCardMetadata;
        existingProductCard.productCardSKUs = updateProductCardDTO.productCardSKUs;
        existingProductCard.productCardIsActive = updateProductCardDTO.productCardIsActive;
        existingProductCard.productCardUpdateDate = new Date();
        
        await this.productCardRepository.save(existingProductCard);

        let productCardDTO = this.getProductCardByProductCardId(existingProductCard.productCardId);
       
        return productCardDTO;
    } 

    //CREATE PRODUCT CARDS;
    async createProductCards(productVendorCode: string, productLineCode: string, productTypeCode: string) {
        
        let productVendor = await this.productVendorService.getProductVendorByCode(productVendorCode);
        let productLine = await this.productLineService.getProductLineByCode(productLineCode);
        let productType = await this.productTypeService.getProductTypeByCode(productTypeCode);
        
        if((productLine == null || productLine instanceof ErrorMessageDTO) || (productVendor == null || productVendor instanceof ErrorMessageDTO) || (productType == null || productType instanceof ErrorMessageDTO)) {
            return this.errorMessageService.createErrorMessage('PRODUCT_CARD_CREATION_FAILED', 'Failed to create product cards due to invalid product line, vendor, or type.');
        }

        switch (productLine.productLineCode) {
            case "MTG":
                console.log("MTG");
                return await this.createMTGProductCards(productVendor.productVendorId, productLine.productLineId, productType.productTypeId);

        }
        
        return true;

        
    }

    //CREATE PRODUCT CARDS (MTG);
    async createMTGProductCards(productVendorId: string, productLineId: string, productTypeId: string) {
        let productSets = await this.productSetService.getProductSetsByProductVendorIdAndProductLineId(productVendorId, productLineId);
        
        if(productSets == null || productSets instanceof ErrorMessageDTO) {
            return this.errorMessageService.createErrorMessage('PRODUCT_SETS_NOT_FOUND', 'No product sets found for productVendorId: ' + productVendorId + ' and productLineId: ' + productLineId);
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
            //DELAY TO AVOID TCGDB RATE LIMITS;
            await this.delay(500);
        }

        return productCardRecordCount;
    }

    //CREATE PRODUCT CARDS;
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

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}