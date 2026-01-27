import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
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


    async createProductCard(createProductCardDTO: CreateProductCardDTO): Promise<ProductCardDTO> {

        //CHECK TO SEE IF THE PRODUCT CARD ITEM ALREADY EXISTS;
        let productCard = await this.productCardRepository.findOne({ 
            where: {
                productCardTCGdbId: createProductCardDTO.productCardTCGdbId, 
            }
        });
        
        if(productCard) {
            throw new ConflictException('Product card already exists');
        }

        productCard = this.productCardRepository.create({ ...createProductCardDTO });
        productCard = await this.productCardRepository.save(productCard);

        let productCardDTO = await this.getProductCardByProductCardId(productCard.productCardId);
       
        return productCardDTO;
    } 

    async updateProductCard(updateProductCardDTO: UpdateProductCardDTO) : Promise<ProductCardDTO> {
                                
        let productCard = await this.productCardRepository.findOneOrFail({ 
            where: { 
                productCardId: updateProductCardDTO.productCardId
            } 
        });

        if (!productCard) {
            throw new NotFoundException('Product card was not found');
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

        let productCardDTO = await this.getProductCardByProductCardId(productCard.productCardId);
       
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
                
                let productCard = await this.productCardRepository.findOneOrFail({ 
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
                
            }

            //DELAY TO AVOID TCGDB RATE LIMITS;
            await this.delay(500);
        }

        return productCardRecordCount;
    }

    //CREATE PRODUCT CARDS (MTG);
    async updateTCGdbMTGProductCardsWithScryfallData(): Promise<number> {

        let productVendor = await this.productVendorService.getProductVendorByCode(PRODUCT_VENDOR_CODE.WIZARDS_OF_THE_COAST);
        let productLine = await this.productLineService.getProductLineByCode(PRODUCT_LINE_CODE.MAGIC_THE_GATHERING); 
        

        if (productVendor == null) {
            throw new NotFoundException('Product vendor was not found');
        }
        
        if (productLine == null) {
            throw new NotFoundException('Product line was not found');
        }

        let productType = await this.productTypeService.getProductTypeByProductVendorIdAndProductLineIdAndProductTypeCode(productVendor.productVendorId, productLine.productLineId, PRODUCT_TYPE_CODE.SINGLE);

        if (productType == null) {
            throw new NotFoundException('Product type was not found');
        }

        let productSets = await this.productSetService.getProductSetsByProductVendorIdAndProductLineId(productVendor.productVendorId, productLine.productLineId);
        
        if(productSets == null) {
            throw new NotFoundException('No product sets found for vendor and line.');
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

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}