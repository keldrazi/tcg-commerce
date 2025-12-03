import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, ILike, Not, Repository } from 'typeorm';
import { ProductCardSearchResultDTO, ProductCardSearchDTO } from './dto/product.card.search.dto';
import { ProductCard } from 'src/typeorm/entities/tcgcommerce/modules/product/card/product.card.entity';
import { ProductLineService } from 'src/tcgcommerce/modules/product/line/product.line.service';
import { ProductSetService } from 'src/tcgcommerce/modules/product/set/product.set.service';
import { AiImageCardServiceXimilarService } from 'src/system/modules/ai/image/card/service/ximilar/ai.image.card.service.ximilar.service';
import { AiImageCardServiceXimilarDTO } from 'src/system/modules/ai/image/card/service/ximilar/dto/ai.image.card.service.ximilar.dto';
import { ErrorMessageService } from 'src/system/modules/error/message/error.message.service';
import { ErrorMessageDTO } from 'src/system/modules/error/message/dto/error.message.dto';


@Injectable()
export class ProductCardSearchService implements OnModuleInit {

    constructor(
        @InjectRepository(ProductCard) private productCardRepository: Repository<ProductCard>,
        private productLineService: ProductLineService,
        private productSetService: ProductSetService,
        private aiImageCardServiceXimilarService: AiImageCardServiceXimilarService,
        private errorMessageService: ErrorMessageService
    ) { }

    private mtgProductLine: any;
    private mtgProductLineId: string;

    async onModuleInit() {

        this.mtgProductLine = await this.productLineService.getProductLineByCode('MTG');
        this.mtgProductLineId = this.mtgProductLine.productLineId;

    }

    async searchProductCardsByName(productLineCode: string, query: string) {

        if(query == null || query.trim() == '') {
            return this.errorMessageService.createErrorMessage('PRODUCT_CARD_SEARCH_QUERY_EMPTY', 'Product card search query cannot be empty.');
        }

        let productLineId = this.getProductLineIdByCode(productLineCode);
        if(productLineId == "0") {
            return this.errorMessageService.createErrorMessage('PRODUCT_LINE_NOT_FOUND', 'Product line was not found for productLineCode: ' + productLineCode);
        }

        let productCardSearchResultDTO: ProductCardSearchResultDTO = {
            productCardSearchResultCount: 0,
            productCardSearchResults: []
        }

        let productCardSearchDTOs: ProductCardSearchDTO[] = [];

        let productCards = await this.productCardRepository.find({ 
            where: {
                productLineId: productLineId,
                productCardName: ILike(`%${query}%`)
            },
            order: { 
                productCardName: 'ASC' 
            } 
        });

        if(!productCards || productCards.length == 0) {
            return productCardSearchResultDTO;
        }

        productCardSearchDTOs = productCards.map(card => {
            const dto = new ProductCardSearchDTO();
            dto.productCardId = card.productCardId;
            dto.productCardTCGdbId = card.productCardTCGdbId;
            dto.productCardTCGPlayerId = card.productCardTCGPlayerId;
            dto.productVendorId = card.productVendorId;
            dto.productLineId = card.productLineId;
            dto.productSetId = card.productSetId;
            dto.productSetCode = card.productSetCode;
            dto.productCardRarityCode = card.productCardRarityCode;
            dto.productCardNumber = card.productCardNumber;
            dto.productCardName = card.productCardName;
            dto.productCardCleanName = card.productCardCleanName;
            dto.productCardImage = card.productCardImage;
        
            return dto;
        });

       productCardSearchResultDTO = {
            productCardSearchResultCount: productCardSearchDTOs.length,
            productCardSearchResults: productCardSearchDTOs
        }

        return productCardSearchResultDTO;

    }

    async searchProductCardsBySetCode(productLineCode: string, setCode: string) {
        
        let productLineId = this.getProductLineIdByCode(productLineCode);
        
        if(productLineId == "0") {
            return this.errorMessageService.createErrorMessage('PRODUCT_LINE_NOT_FOUND', 'Product line was not found for productLineCode: ' + productLineCode);
        }

        let productSet = await this.productSetService.getProductSetByProductSetCode(productLineId, setCode);

        if(productSet == null || productSet instanceof ErrorMessageDTO) {
            return this.errorMessageService.createErrorMessage('PRODUCT_SET_NOT_FOUND', 'Product set was not found for setCode: ' + setCode);
        }

        let productCardSearchResultDTO: ProductCardSearchResultDTO = {
            productCardSearchResultCount: 0,
            productCardSearchResults: []
        }

        let productCardSearchDTOs: ProductCardSearchDTO[] = [];

        let productCards = await this.productCardRepository.find({ 
            where: { 
                productSetId: productSet.productSetId
            },
            order: { 
                productCardName: 'ASC' 
            }
        });

        if(!productCards || productCards.length == 0) {
            return productCardSearchResultDTO;
        }

        productCardSearchDTOs = productCards.map(card => {
            const dto = new ProductCardSearchDTO();
            dto.productCardId = card.productCardId;
            dto.productCardTCGdbId = card.productCardTCGdbId;
            dto.productCardTCGPlayerId = card.productCardTCGPlayerId;
            dto.productVendorId = card.productVendorId;
            dto.productLineId = card.productLineId;
            dto.productSetId = card.productSetId;
            dto.productSetCode = card.productSetCode;
            dto.productCardRarityCode = card.productCardRarityCode;
            dto.productCardNumber = card.productCardNumber;
            dto.productCardName = card.productCardName;
            dto.productCardCleanName = card.productCardCleanName;
            dto.productCardImage = card.productCardImage;
        
            return dto;
        });

       productCardSearchResultDTO = {
            productCardSearchResultCount: productCardSearchDTOs.length,
            productCardSearchResults: productCardSearchDTOs
        }

        return productCardSearchResultDTO;
    }

    async searchProductCardByImage(productLineCode: string,productCardImageBase64: string, productCardPrintingType: string) {
        
        let productLineId = this.getProductLineIdByCode(productLineCode);
        
        if(productLineId == "0") {
            return this.errorMessageService.createErrorMessage('PRODUCT_LINE_NOT_FOUND', 'Product line was not found for productLineCode: ' + productLineCode);
        }

        let aiImageCardServiceXimilarDTO: AiImageCardServiceXimilarDTO | null = await this.aiImageCardServiceXimilarService.analyzeCardImage(productCardImageBase64, productCardPrintingType);

        if(aiImageCardServiceXimilarDTO != null) {
            
            let productCard = await this.productCardRepository.findOne({ 
                where: { 
                    productSetCode: aiImageCardServiceXimilarDTO.aiImageCardServiceXimilarSetCode,
                    productCardNumber: aiImageCardServiceXimilarDTO.aiImageCardServiceXimilarCardNumber,
                    productCardRarityCode: Not(Equal('T'))
                }
            });

            if(productCard != null) {
                const productCardSearchDTO = new ProductCardSearchDTO();
                productCardSearchDTO.productCardId = productCard.productCardId;
                productCardSearchDTO.productCardTCGdbId = productCard.productCardTCGdbId;
                productCardSearchDTO.productCardTCGPlayerId = productCard.productCardTCGPlayerId;
                productCardSearchDTO.productVendorId = productCard.productVendorId;
                productCardSearchDTO.productLineId = productCard.productLineId;
                productCardSearchDTO.productSetId = productCard.productSetId;
                productCardSearchDTO.productSetCode = productCard.productSetCode;
                productCardSearchDTO.productCardRarityCode = productCard.productCardRarityCode;
                productCardSearchDTO.productCardNumber = productCard.productCardNumber;
                productCardSearchDTO.productCardName = productCard.productCardName;
                productCardSearchDTO.productCardCleanName = productCard.productCardCleanName;
                productCardSearchDTO.productCardImage = productCard.productCardImage;

                return productCardSearchDTO;
            }

        }
    }  
      
    private getProductLineIdByCode(productLineCode: string): string {
        switch(productLineCode.toUpperCase()) {
            case 'MTG':
                return this.mtgProductLineId;
            default:
                return "0";
        }
    }
}


