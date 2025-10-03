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

@Injectable()
export class ProductCardService {


    constructor(
        @InjectRepository(ProductCard) private productCardRepository: Repository<ProductCard>,
        private tcgdbMTGCardService: TCGdbMTGCardService,
        private productSetService: ProductSetService,
        private productLineService: ProductLineService,
        private productVendorService: ProductVendorService,
        private productTypeService: ProductTypeService,
    ) { }

    async getProductCardByProductCardId(productCardId: string) {
        let productCard = await this.productCardRepository.findOne({ 
            where: {
                productCardId: productCardId
            }
        });

        //TO DO: CREATE AN ERROR TO RETURN;
        if(productCard == null) {
            return null;
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

        //TO DO: CREATE AN ERROR TO RETURN;
        if(productCard == null) {
            return null;
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

        //TO DO: CREATE AN ERROR TO RETURN;
        if(productCards == null) {
            return null;
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

        //TO DO: CREATE AN ERROR TO RETURN;
        if(productCards == null) {
            return null;
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

        //TO DO: CREATE AN ERROR TO RETURN;
        if(productCards == null) {
            return null;
        }

        let productCardDTOs: ProductCardDTO[] = [];

        for(let i = 0; i < productCards.length; i++) {
            let productCard = productCards[i];
            let productCardDTO: ProductCardDTO = ({ ...productCard})
            
            productCardDTOs.push(productCardDTO);

        }

        return productCardDTOs;
    }


    async createProductCard(createProductCardDTO: CreateProductCardDTO) {

        //CHECK TO SEE IF THE PRODUCT CARD ITEM ALREADY EXISTS;
        let productCard = await this.getProductCardByTCGdbId(createProductCardDTO.productCardTCGdbId);

        //TO DO: CREATE AN ERROR TO RETURN;
        if(productCard != null) {
            return null;
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

        //TO DO: RETURN AN ERROR IF PRODUCT MODULE NOT FOUND;
        if (!existingProductCard) {
            return null; 
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

        let productCardRecordCount = 0;
        
        if(productLine == null || productVendor == null || productType == null) {
            //TO DO: CREATE AN ERROR TO RETURN;
            return null;
        }

        switch (productLine.productLineCode) {
            case "MTG":
                console.log("MTG");
                productCardRecordCount = await this.createMTGProductCards(productVendor.productVendorId, productLine.productLineId, productType.productTypeId);
                break;
        }

        return productCardRecordCount;
    }

    //CREATE PRODUCT CARDS (MTG);
    async createMTGProductCards(productVendorId: string, productLineId: string, productTypeId: string) {
        let productSets = await this.productSetService.getProductSetsByProductVendorIdAndProductLineId(productVendorId, productLineId);
        
        if(productSets == null) {
            //TO DO: CREATE AN ERROR TO RETURN;
            return 0;
        }
        
        let productCardRecordCount = 0;

        for(let i = 0; i < productSets.length; i++) {
            let productSet = productSets[i];
            
            let productCardsBySet = await this.tcgdbMTGCardService.getTCGdbMTGCardsBySetId(productSet.productSetTCGdbId);

            if(productCardsBySet == null) {
                return 0;
            }

            //console.log(productCardsBySet);

            for(let j = 0; j < productCardsBySet.tcgdbMTGCards.length; j++) {
                let tcgdbMTGCard = productCardsBySet.tcgdbMTGCards[j];

                //CHECK TO SEE IF THE CARD EXISTS;
                let productCardCheck = await this.getProductCardByTCGdbId(tcgdbMTGCard.tcgdbMTGCardId);
                
                //TO DO: RETURN AN ERROR FOR DUPLICATE CARD VARIANT;
                if (productCardCheck != null) {
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
                    productCardRarityCode: tcgdbMTGCard.tcgdbMTGCardRarityCode,
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
        }

        return productCardRecordCount;
    }
}